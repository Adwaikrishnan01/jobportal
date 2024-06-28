import React, { useEffect } from 'react'
import JobListings from '../components/JobListings'
import Sidebar from '../components/SideBar'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../redux/slices/authSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {

  return (
    <div className="bg-gray-50 min-h-screen flex">
      <ToastContainer position='top-center'/>
      <Sidebar/>
      <JobListings/>

    </div>
    
    
  )
}

export default Home 