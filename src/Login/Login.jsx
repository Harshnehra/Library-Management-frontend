import React from 'react'
import { useState } from 'react';
import Styles from "./Login.module.css"
import {Link , useNavigate} from "react-router-dom"
import config from '../config/config';


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const loginUrl = config.LoginUrl.replace(/"/g, ''); // Remove any quotes from the URL
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const result = await response.json();

      if (result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("isAdmin", result.is_admin); 
        setMessage("Login successful!");
        navigate("/books");
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className={`${Styles["container"]}`}>
      <form onSubmit={handleLogin}>
        <h1 className={`h1 mb-3 fw-normal ${Styles["heading"]}`}> Sign in</h1>

        <div class="form-floating my-4">
          <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating my-4">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password"  onChange={(e) => setPassword(e.target.value)}/>
          <label for="floatingPassword">Password</label>
        </div>

        <div class="form-check text-start my-4">
          <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
          <label class="form-check-label" for="flexCheckDefault">Remember me</label>
        </div>

        <button class="btn btn-primary w-100 py-2 my-2" type="submit">Sign in</button>
        <p>{message}</p>
        <Link to={"/signup"}><p>Don't Have an Account?</p></Link>
      </form>
    </div>
  )
}

export default Login