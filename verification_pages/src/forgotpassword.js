import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import './login.css';

const ForgotPassword=()=>{
    const [email,setEmail]=useState('');
    const [message,setMessage]=useState('');

    const handleResetPassword=(e)=>{
        e.preventDefault();

        setMessage('Password reset link is sent to your email');
    };
    return(
        <div>
         <h1 id="title">Reset it!</h1>
      <div id="page">
        <form onSubmit={handleResetPassword}>
          <div>
            <label className="email-label">Email</label>
            <input
              type="email"
              id="e1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              title="Enter a valid email address"
            />
          </div>
          <button type="submit" id="btn">Reset Password</button>
        </form>
      </div>
      <p>{message}</p>
      <p><Link to="/">Login Again</Link></p>
    </div>
    );
    
}
export default ForgotPassword;