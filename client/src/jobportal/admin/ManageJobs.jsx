import React, { useState, useEffect } from 'react';
import axios from '../utils/AxiosConfig';
import JobTable from '../components/tables/JobTable';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const {user}=useSelector(state=>state.auth)
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/admin/jobs');
        setJobs(response.data.jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  const deleteJob = async (jobId) => {
    try {
      await axios.delete(`/admin/job/delete/${jobId}`);
      setJobs(jobs.filter(job => job._id !== jobId));
      toast.success("job deleted successfully")
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };
  return(
       <div className='md:flex bg-fuchsia-50'>
         <Sidebar user={user}/>
        <div className="px-4 container">
          <h1 className="text-2xl font-semibold my-6">Job Management</h1>
          <JobTable jobs={jobs} onDeleteJob={deleteJob} />
        </div>   
      </div>
  )
}
  export default ManageJobs