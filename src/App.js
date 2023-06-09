
import React from 'react';
import HomePage from './routes/HomePage';
import ShowsComplaints from './routes/ShowsComplaints';
import ShowsComplainants from './routes/ShowsComplainants';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom'
import View from './routes/View';
import MadeComplainantsUsers from './routes/MadeComplaintsUsers';
import ShownDenouncesPerUser from './routes/ShownDenouncesPerUser';
import Dashboard from './routes/Dashboard';
import ShowOrganizers from './routes/ShowOrganizers';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="home" element={<HomePage />} />

          <Route element={<ProtectedRoute />}>
            {/* private routes */}
            <Route path="complaints" element={<ShowsComplaints />} />
            <Route path="complainants" element={<ShowsComplainants />} />
            <Route path="view" element={<View />} />
            <Route path="eventUserCompalints" element={<MadeComplainantsUsers />} />
            <Route path="shownDenouncesPerUser" element={<ShownDenouncesPerUser />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="organizers" element={<ShowOrganizers />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
