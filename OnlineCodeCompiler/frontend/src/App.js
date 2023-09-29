import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [code, setCode] = useState('');
  const [className, setClassName] = useState(''); // Add state for className

  const handleSubmit = () => {
    const payload = {
      language: 'java',
      code,
      className: className, 
    };

    axios
      .post('http://localhost:5000/run', payload)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.error('Error:', error.message);
        }
      });
  };

  return (
    <div className="App">
      <h1>Online Code Compiler</h1>
    <input
        type="text"
        placeholder="Enter class name"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
      />
      <br/>
      <textarea
        rows="20"
        cols="75"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      ></textarea>
      <br />
      
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
