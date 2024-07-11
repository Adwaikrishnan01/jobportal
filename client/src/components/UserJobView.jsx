import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from "../utils/AxiosConfig"
import JobCard from './JobCard';
import SkeletonJobCard from './loading/SkeletonJobCard';
import EmptyState from './EmptyState';
import Button from './Button';
import { IoMdAdd } from "react-icons/io";
import { openModal } from '../redux/slices/modalSlice';
import { fetchCurrentUser } from '../redux/slices/authSlice';
import UserApplications from './ApplicationCard';



const UserJobView = () => {
  const { user } = useSelector((state) => state.auth);
  const role = user?.role
  return (
    <section className='relative w-full bg-purple-100 pt-10 pb-20'>
      <div className="max-w-6xl mx-auto">
        <h2 className='text-2xl text-purple-950 text-center font-semibold'>
          Applied Jobs</h2>
       <UserApplications />

      </div>
    </section>
  );
};

export default UserJobView;