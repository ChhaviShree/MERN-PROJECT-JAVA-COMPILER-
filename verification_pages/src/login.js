import React,{useState} from 'react';
import axios from 'axios';
import {Link,} from 'react-router-dom';
import "./login.css";
const Login=()=>{
    const [email,setEmail]=useState('');
    const [password,setPasword]=useState('');
    const [loginMessage,setLoginMessage]=useState('');
    

    const handleLogin=async(e)=>{
        e.preventDefault();

        axios.post('https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/auth/login', {
        email: 'levitation@levitation.in',
        password: 'levitation',
      })
      .then((response) => {
        console.log(response.data); 

        if (response.data) {
          setLoginMessage('Welcome! Login successful');
        } else {
          setLoginMessage('Something is wrong! Login failed');
        }
      })
      .catch((error) => {
        console.log(error);
        setLoginMessage('Something is wrong! Login failed');
      });
    };
  
    return(
        <div>
            <h1 id="title">Login</h1>
            <div id="page">
            <form onSubmit={handleLogin}>
                <div>
                    <label className="email-label">Email</label>
                    <input type="email" id="e1" value={email} onChange={(e)=>setEmail(e.target.value)}required/>

                </div>
                <div>
                    <label className="password-label">password</label>
                    <input type='password' id="p1" value={password} onChange={(e)=>setPasword(e.target.value)} required autoComplete='current-password'/>
                </div>
                <button type="submit" id="btn">Login</button>
            </form>
            </div>
            <p>{loginMessage}</p>
            <p><Link to="/forgotPassword">Forgot password?</Link></p>
            <p><Link to="/multiStepform">Form</Link></p>
        </div>
    )
};
export default Login;