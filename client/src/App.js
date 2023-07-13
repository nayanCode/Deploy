import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminHome from './Components/Home/AdminHome';
import StudentHome from './Components/Home/StudentHome';
import AdminLogin from './Components/AdminLogin';
import StudentLogin from './Components/StudentLogin';
import React from 'react';
import Form from './Components/Students/Form.js';
import Table from './Components/Table';
import Verification from './Components/Home/Verification';
import Particle1 from './Components/ParticlesComponent';
import ParticlesComponent from './Components/ParticlesComponent';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/adminhome' element={<AdminHome />} />
        <Route exact path='/studenthome/:id' element={<StudentHome />} />
        <Route exact path='/adminlogin' element={<AdminLogin />} />
        <Route exact path='/studentlogin' element={<StudentLogin />} />
        <Route exact path='/form' element={<Form />} />
        <Route exact path='/table' element={<Table />} />
        <Route exact path='/verification' element={<Verification />} />
        <Route exact path='/particle' element={<ParticlesComponent/>} />
      </Routes>
    </Router>
  );
}

export default App;
