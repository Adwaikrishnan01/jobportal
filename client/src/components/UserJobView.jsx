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

const DisplayJobs = ({ jobs, loading ,role}) => {
  if (loading) {
    return (
      <>
        <SkeletonJobCard />
        <SkeletonJobCard />
        <SkeletonJobCard />
      </>
    );
  }
  if (jobs.length === 0) {
    return <EmptyState message={role==='employer'?"You have not created a job":"You have not applied to any jobs"} />;
  }
  return (
    <>
      {jobs.map((jobPosting) => (
        <JobCard jobPosting={jobPosting} key={jobPosting._id} />
      ))}
    </>
  );
};

const UserJobView = () => {
  const [role, setRole] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      if(!user.role)
        {
          setRole("candidate")
        }
      setRole(user.role === "employer" ? "employer" : "candidate");
    }
  }, [user]);

  const fetchEmployerJobs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('/jobs/getjobsbyemployer');
      if (response.status !== 200) {
        throw new Error('Failed to fetch jobs');
      }
      setJobs(response.data?.jobs || []);
      dispatch(fetchCurrentUser())
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployerJobs();
  }, [fetchEmployerJobs]);

  const handleCreateNewJob = useCallback(() => {
    dispatch(openModal('postjob'));
    // After the job is posted successfully, call fetchEmployerJobs again
    // You might need to modify your modal or job posting logic to call this function after successful job creation
    fetchEmployerJobs();
  }, [dispatch, fetchEmployerJobs]);

  return (
    <section className='relative w-full bg-purple-100 pt-10 pb-20'>
      <div className="max-w-6xl mx-auto">
        <h2 className='text-2xl text-purple-800 text-center underline underline-offset-4'>
          {role==='employer'?'Created Jobs':'Applied Jobs'}</h2>
        <div className='flex justify-end'>
          <div className='w-40'>
          {  role==='employer'?
            <Button 
              label={"Create new"} 
              small 
              onClick={handleCreateNewJob}
              icon={IoMdAdd}
            />:
            <Button label={"Apply new"} 
            small 
            icon={IoMdAdd}/>}
          </div>
        </div>
        <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-4'>
          <DisplayJobs jobs={jobs} loading={loading} role={role}/>
        </div>
      </div>
    </section>
  );
};

export default UserJobView;