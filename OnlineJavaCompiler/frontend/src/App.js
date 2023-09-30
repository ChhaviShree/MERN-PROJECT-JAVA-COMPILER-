import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [code, setCode] = useState('');
  const [language,setlanguage]=useState('java');
  const [className, setClassName] = useState(''); // Add state for className
  const [output,setOutput]=useState('');

  const handleSubmit = () => {
    const payload = {
      language: language,
      code,
      className: className,
    };

    axios
      .post('http://localhost:5000/run', payload)
      .then((response) => {
        setOutput(response.data.output);
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
      <h1 >Online Code Compiler</h1>
      <div className='editor-container'>
        <label id="lang">Choose Language</label>
        <select
          value={language}
          onChange={(e) => {
              setlanguage(e.target.value);
               console.log(e.target.value);
       }}
>
            <option value="java">java</option>
            <option value="py">python</option>
          </select>
      </div>
    <br/>  
    <input
        type="text"
        placeholder="Enter class name"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
      />
      <br/>
      <br/>
      <textarea
        rows="20"
        cols="75"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
        className='code-editor'
      ></textarea>
      <br />
      <br/>
      <button id="btn1" onClick={handleSubmit}>Submit</button>
      <br/>
      <h3>Output</h3>
      <textarea
        rows="5" 
        cols="50"
        value={output}
        readOnly 
        className="output-textarea" 
      ></textarea>
      <br/>
    </div>
  );
}

export default App;
