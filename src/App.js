
import React, {useState} from 'react';
import HomePage from './routes/HomePage';
import ShowsComplaints from './routes/ShowsComplaints';
import ShowsComplainants from './routes/ShowsComplainants';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom'
import View from './routes/View';



function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false)
  return (
    <>
      
      <Routes>
      <Route path="/" element={<Layout />}>
          {/* public routes */}
         
          <Route path="home" element={<HomePage />} />
          <Route path="complaints" element={<ShowsComplaints />} />
          <Route path="complainants" element={<ShowsComplainants />} />
          <Route path="view" element={<View />} />
         
         

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
