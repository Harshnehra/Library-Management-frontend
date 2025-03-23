import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route , RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import Signup from './Signup/Signup.jsx'
import Login from './Login/Login.jsx'
import Books from './Books/Books.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/books' element={<Books />} />
    </>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)