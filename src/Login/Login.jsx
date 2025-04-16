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
    
    if (!email || !password) {
      setMessage("Please enter both email and password");
      return;
    }

    try {
      const loginUrl = config.LoginUrl;
      console.log('Login attempt with:', { 
        url: loginUrl,
        email: email,
        hasPassword: !!password 
      });
      
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        mode: 'cors',
        credentials: 'same-origin',
        body: JSON.stringify({ email, password }),
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response data:', result);

      if (!response.ok) {
        console.error('Login failed:', result);
        throw new Error(result.message || "Login failed");
      }

      if (result.token) {
        console.log('Login successful, token received');
        localStorage.setItem("token", result.token);
        localStorage.setItem("isAdmin", result.is_admin); 
        setMessage(result.message || "Login successful!");
        navigate("/books");
      } else {
        console.error('No token in response:', result);
        throw new Error("No token received");
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage(error.message || "An error occurred during login");
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