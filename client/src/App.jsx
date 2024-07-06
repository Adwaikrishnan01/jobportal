import Home from './pages/Home.jsx'
import Register from './pages/Register'
import Login from './pages/Login.jsx'
import Navbar from './components/navbar/Navbar.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store/store.js';
import UserProfile from './pages/UserProfile';
import PrivateRoute from './components/PrivateRoute';
import CreateJobPosting from './pages/PostJobs.jsx';
import { useEffect, useState } from 'react';
import { fetchCurrentUser } from './redux/slices/authSlice.js';
import Onboarding from './pages/Onboarding.jsx';

const App = () => {
  return (
      <Router>
        <Navbar/>
        <Routes>
        <Route path="/" element={ <Home/> } />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={ <Register/> } />
          <Route path="/onboarding" element={ <PrivateRoute><Onboarding/></PrivateRoute> } />
          <Route path="/profile" element={<PrivateRoute><UserProfile/></PrivateRoute>} />
          <Route path="/post-job" element={<CreateJobPosting/>}/>
        </Routes>
      </Router> 
 
  );
};
export default App;
