
import React, {useState} from 'react';
import HomePage from './routes/HomePage';
import ShowsComplaints from './routes/ShowsComplaints';
import ShowsComplainants from './routes/ShowsComplainants';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom'
import View from './routes/View';
import MadeComplainantsUsers from './routes/MadeComplaintsUsers';
import ShownDenouncesPerUser from './routes/ShownDenouncesPerUser';
import Dashboard from './routes/Dashboard';
import Menu from './routes/Menu';


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
          <Route path="eventUserCompalints" element={<MadeComplainantsUsers />} />
          <Route path="shownDenouncesPerUser" element={<ShownDenouncesPerUser />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="menu" element={<Menu />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
