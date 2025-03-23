import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 

const Books = () => {
    
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [newBook, setNewBook] = useState({ title: "", author: "", description: "" });
    const [editBook, setEditBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            const token = localStorage.getItem("token");
            const isAdmin = localStorage.getItem("isAdmin"); 

            setIsAdmin(isAdmin === "true");

            try {
                const response = await fetch("http://127.0.0.1:8000/api/books/list/", {
                    method: "GET",
                    headers: {
                        "Authorization": `Token ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch books");
                }

                const data = await response.json();
                setBooks(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load books");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const handleAddBook = async () => {

        const token = localStorage.getItem("token");

        console.log(newBook)

        try {
            const response = await fetch("http://127.0.0.1:8000/api/books/list/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`,
                },
                body: JSON.stringify(newBook),
            });

            if (!response.ok) throw new Error("Failed to add book");

            const addedBook = await response.json();
            setNewBook({ title: "", author: "", isbn: "", published_date: "" }); 
        } catch (err) {
            alert(err.message);
        }
    };


    const handleEditBook = async () => {
        if (!editBook.title || !editBook.author) return alert("Title and Author are required!");
        const token = localStorage.getItem("token");
        const isAdmin = localStorage.getItem("isAdmin");
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/books/list/${editBook.ID}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`,
                },
                body: JSON.stringify(editBook),
            });

            if (!response.ok) throw new Error("Failed to update book");
            
            setBooks((prevBooks) => 
                prevBooks.map((book) => (book.ID === editBook.ID ? { ...book, ...editBook } : book))
            );
            setEditBook(null);
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDeleteBook = async (id) => {
        const token = localStorage.getItem("token");
        const isAdmin = localStorage.getItem("isAdmin");
        try {
            console.log(id)
            const response = await fetch(`http://127.0.0.1:8000/api/books/list/${id}/`, {
                method: "DELETE",
                headers: { "Authorization": `Token ${token}` },
            });

            if (!response.ok) throw new Error("Failed to delete book");
            setBooks((prevBooks) => prevBooks.filter((book) => book.ID !== id));
            
        } catch (err) {
            alert(err.message);
        }
    };

    
    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleLogout = () => {
        localStorage.removeItem("token");  
        localStorage.removeItem("isAdmin"); 
        window.location.href = "/";  
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-6">📚 Books Library</h2>

            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>

            <div className="mb-4 d-flex justify-content-center">
                <input
                    type="text"
                    placeholder="Search books by title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="form-control w-50"
                />
            </div>

            {isAdmin && (
                <div className="mb-4">
                    <h5>Add a New Book</h5>
                    <input
                        type="text"
                        placeholder="Book Title"
                        value={newBook.title}
                        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                        className="form-control mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Author"
                        value={newBook.author}
                        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                        className="form-control mb-2"
                    />
                    <input
                        type="text"
                        placeholder="ISBN"
                        value={newBook.isbn}
                        onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                        className="form-control mb-2"
                    />
                    <input
                        type="date"
                        placeholder="Published Date"
                        value={newBook.published_date}
                        onChange={(e) => setNewBook({ ...newBook, published_date: e.target.value })}
                        className="form-control mb-2"
                    />
                    <button className="btn btn-primary" onClick={handleAddBook}>Add Book</button>
                </div>
            )}


            {editBook && (
                <div className="mb-4">
                    <h5>Edit Book</h5>
                    <input
                        type="text"
                        placeholder="Title"
                        value={editBook.title}
                        onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
                        className="form-control mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Author"
                        value={editBook.author}
                        onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
                        className="form-control mb-2"
                    />
                    
                    <button className="btn btn-primary" onClick={handleEditBook}>Update Book</button>
                    <button className="btn btn-secondary ms-2" onClick={() => setEditBook(null)}>Cancel</button>
                </div>
            )}

            
            {loading && <p className="text-center text-primary">Loading books...</p>}
            {error && <p className="text-center text-danger">{error}</p>}

           
            <div className="row">
                {filteredBooks.map((book) => (
                    <div key={book.id} className="col-md-4 mb-4 d-flex justify-content-center">
                    <div className="card shadow-sm h-100" style={{ width: "200px" }}>
                        <img src={book?.bookImage} alt={book.title} className="card-img-top img-fluid" style={{ height: "300px",width:"200px ", objectFit: "cover" }}  />
                        <div className="card-body">
                            <h5 className="card-title text-primary">{book.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">by {book.author}</h6>
                        </div>
                       { isAdmin && (<div> 
                        <button className="btn btn-warning btn-sm me-2" onClick={() => setEditBook(book)}>
                                    Edit
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteBook(book.ID)}>
                                    Delete
                        </button>
                        </div>)
                        
                        }
                        
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Books;


