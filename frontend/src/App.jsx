import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import UploadCertificate from './pages/Admin/UploadCertificate';
import UploadProject from './pages/Admin/Uploadproject';
import Admin from './pages/Admin/Admin';
import Auth from './pages/Admin/Auth';
import Certificates from './pages/Certificates/Certificates';

function App() {

  const isLoggedIn = window.localStorage.getItem('authenticated')
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/certificates' element={<Certificates />} />
        <Route path='/auth' element={isLoggedIn === 'true'? <Admin />:<Auth />} />
          <Route path='/admin' element={isLoggedIn === 'true'? <Admin />:<Auth />} />
          <Route path='/admin/uploadcertificate' element={isLoggedIn === 'true'? <UploadCertificate />:<Auth />} />
          <Route path='/admin/uploadproject' element={isLoggedIn === 'true'? <UploadProject />:<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
