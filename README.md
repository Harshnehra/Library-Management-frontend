# 📚 Library Management System

This is a **full-stack** Library Management System built using:

- **Backend**: Django & Django REST Framework (DRF)
- **Frontend**: React.js & Bootstrap

---

## ✨ Features

### **Admin Features**
- Add, update, and delete books.
- Manage users.
- Authenticate users with tokens.

### **User Features**
- View books.
- Search books by title.

### **Authentication**
- Token-based authentication.
- Admin and user role differentiation.

---

## 🖥️ Backend: Django & DRF

### **Installation**

#### Prerequisites
- Python 3.10+
- Django 4+
- Django REST Framework
- PostgreSQL / SQLite (Default)

#### **Setup & Run Backend**

```bash
# Clone the repository
git clone https://github.com/your-repo/library-management.git
cd library-management

# Create Virtual Environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Dependencies
pip install -r requirements.txt

# Apply Migrations
python manage.py migrate

# Create Superuser (Admin Access)
python manage.py createsuperuser

# Run Development Server
python manage.py runserver
```

### **API Endpoints**

| Method | Endpoint                | Description                 |
| ------ | ----------------------- | --------------------------- |
| POST   | `/api/auth/login/`      | Login user                  |
| POST   | `/api/auth/register/`   | Register user               |
| GET    | `/api/books/list/`      | Get list of books           |
| POST   | `/api/books/list/`      | Add a new book (Admin only) |
| PUT    | `/api/books/list/{id}/` | Update a book (Admin only)  |
| DELETE | `/api/books/list/{id}/` | Delete a book (Admin only)  |

### **Project Structure (Backend)**

```
📂 library-management/
 ┣ 📂 library/
 ┃ ┣ 📂 books/       # Book Model & APIs
 ┃ ┣ 📂 users/       # Authentication & User Management
 ┃ ┣ 📜 settings.py  # Django Configurations
 ┃ ┗ 📜 urls.py      # Backend Routes
 ┣ 📜 manage.py      # Django Management
```

---

## 🌍 Frontend: React & Bootstrap

### **Installation**

#### Prerequisites
- Node.js 18+
- React.js
- Bootstrap 5

#### **Setup & Run Frontend**

```bash
# Navigate to frontend directory
cd library frontend

# Install Dependencies
npm install

# Run Development Server
npm run dev
```

### **Project Structure (Frontend)**

```
📂 Library frontend/
 ┣ 📂 src/
 ┃ ┣ 📂 components/
 ┃ ┃ ┣ 📜 Books.jsx    # Book Listing & CRUD UI
 ┃ ┃ ┣ 📜 Login.jsx    # User Login Page
 ┃ ┃ ┗ 📜 Signup.jsx  # User Registration Page       
 ┃ ┗ 📜 index.js      # Entry Point
 ┣ 📜 package.json    # Dependencies & Scripts
```


### **Key Functionalities**
- Fetch books from Django API.
- Search books.
- Admin controls (Add, Edit, Delete books).
- User authentication via tokens.


***ADMIN***
- Email = Gotya@12345
- Password = Test

  ---

