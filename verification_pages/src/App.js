import React from 'react';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import Login from './login.js';
import ForgotPassword from './forgotpassword.js';
import Multistepform from './MultiStep.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/forgotPassword"element={<ForgotPassword/>}/>
        <Route path="/multiStepform" element={<Multistepform/>}/>
        </Routes>
    </Router>
  );
}

export default App;
