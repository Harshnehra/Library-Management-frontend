import React, { useEffect, useState } from 'react'
import Styles from "./Signup.module.css"
import {Link} from "react-router-dom"
import config from '../config/config';

function Signup() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(config.SignupUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Signup failed");
      }

      setMessage("Signup successful! Please log in.");
    } catch (error) {
      setMessage(error.message);
    }
  };


  return (
    <div className={`${Styles["container"]}`}>
      <form onSubmit={handleSignup}>
        <h1 className={`h1 mb-3 fw-normal ${Styles["heading"]}`}>Sign Up </h1>
        
        <div class="form-floating">
          <input type="text" class="form-control my-3" id="floatingInput" placeholder="Enter your full name" onChange={(e) => setUsername(e.target.value)} />
          <label for="floatingInput">Full name</label>
        </div>
        <div class="form-floating">
          <input type="email" class="form-control my-3" id="floatingInput" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control my-3" id="floatingPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <label for="floatingPassword">Password</label>
        </div>

        <button className="btn btn-primary w-100 py-2 my-2" type="submit">Sign in</button>

        <p>{message}</p>

        <Link to={"/"} ><p>Alredy Have an Account?</p></Link>
      </form>
    </div>
  )
}

export default Signup