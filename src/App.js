import logo from './logo.svg';
import React, {useState} from 'react';
import './App.css';

import HomePage from './routes/HomePage';
import DashBoardPage from './routes/DashboardPage';

import { Routes, Route } from 'react-router-dom'


function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false)
  return (
    <>
      
      <Routes>
        <Route path="/" element={<HomePage />}>
          {/* public routes */}
         
          <Route path="dashboard" element={<DashBoardPage />} />
         
         

          {/*
        <Route element={<RequireAuth allowedRoles={[ROLES.Inquilino]} />}>
          <Route path="/" element={<Home />} />
        </Route>
  
        <Route element={<RequireAuth allowedRoles={[ROLES.Casero]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>
  
  
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>
  
        <Route element={<RequireAuth allowedRoles={[ROLES.Casero, ROLES.Admin]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route> */}


         
        </Route>
      </Routes>
    </>
  );
}

export default App;
