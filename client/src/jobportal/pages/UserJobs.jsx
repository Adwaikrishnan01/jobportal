import React, { useCallback, useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import JobCard from '../components/cards/JobCard';
import SkeletonJobCard from '../components/loading/SkeletonJobCard';
import EmptyState from '../components/cards/EmptyState';
import axios from '../utils/AxiosConfig';
import Button from '../components/ui/Button';
import { openModal } from '../redux/slices/modalSlice';
import { useNavigate } from 'react-router-dom';


const EmployerJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { user } = useSelector(state => state.auth)
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
    fetchEmployerJobs();
  }, [dispatch, fetchEmployerJobs]);


  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-0 max-w-5xl mx-auto pt-32">
        <SkeletonJobCard />
        <SkeletonJobCard />
        <SkeletonJobCard />
        <SkeletonJobCard />
        <SkeletonJobCard />
        <SkeletonJobCard />
      </div>
    );
  }
  if (jobs.length === 0) {
    return (
      <div>
        {user.role === 'employer' ?
          <div>
            <EmptyState message={"You have not created a job"} />;
            <div className='w-40 mx-auto'>
              <Button
                label={"Create new"}
                small
                onClick={handleCreateNewJob}
                icon={IoMdAdd}
              />
            </div></div> : 
            <div>
              <EmptyState message={"You are currently not an employer."} />;
            <div className='w-40 mx-auto'>
              <Button
                small
                label={"Register as an employer"}
                onClick={()=>{navigate('/onboarding')}}
              />
            </div>
          </div>}
       </div>
      )}
        return (
        <section className="bg-purple-100 min-h-screen flex">
          <div className='max-w-5xl mx-auto px-4'>
            <div className="w-full my-5 py-4 px-8
        shadow-md rounded-md bg-white
        text-gray-700 font-semibold text-xl">
              <div className='text-purple-500'>Total Jobs Created: {jobs.length}</div>
            </div>
            <div className='flex justify-end'>
              <div className='w-40'>
                <Button
                  label={"Create new"}
                  small
                  onClick={handleCreateNewJob}
                  icon={IoMdAdd}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-0 mx-4">
              {jobs.map((jobPosting) => (
                <JobCard jobPosting={jobPosting} key={jobPosting._id} />
              ))} </div>
          </div>
        </section>
        );
  };
        export default EmployerJobs;
