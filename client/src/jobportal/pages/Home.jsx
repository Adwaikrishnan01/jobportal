import React, { useEffect, useState, useCallback } from 'react'
import JobListings from '../components/cards/JobListings'
import Sidebar from '../components/sidebar/SideBar'
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../utils/API';
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonJobCard from '../components/loading/SkeletonJobCard';


const Home = () => {

  const [filters, setFilters] = useState({
    locations: [],
    skills: [],
    minSalary: '',
    maxSalary: '',
    minExperience: '',
    maxExperience: '',
  });
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const filteredJobs = async (appliedFilters = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      
      Object.entries(appliedFilters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(item => {
            if (item.trim()) params.append(key, item.trim());
          });
        } else if (value) {
          params.append(key, value);
        }
      });

      const response = await axios.get(`${API_URL}/jobs/filter`, { params });
      setJobs(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while fetching jobs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const applyFilters = () => {
    filteredJobs(filters);
  };
  const clearFilters=()=>{
    filteredJobs('')
    setFilters({
      locations: [],
      skills: [],
      minSalary: '',
      maxSalary: '',
      minExperience: '',
      maxExperience: '',
    })
  }
  const fetchJobPostings = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/jobs/getalljobs?page=${page}&limit=3`);
      const data = response.data; 
      setJobs(prevJobs => [...prevJobs, ...data.jobPostings]);
      setHasMore(data.hasMore);
      setPage(prevPage => prevPage + 1);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Error fetching jobs');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
   
    fetchJobPostings();
  }, []);


  return (
    <div className="bg-gray-50 min-h-screen md:flex">
      <div className='w-full md:w-2/6 lg:w-1/6 md:block bg-gray-100 py-4'>
        <Sidebar 
          filters={filters} 
          onFilterChange={handleFilterChange} 
          onApplyFilters={applyFilters} 
          onClearFilters={clearFilters}
        />
      </div>
      
      <div className="md:w-4/6 lg:w-5/6">
      <InfiniteScroll
        dataLength={jobs.length}
        next={fetchJobPostings}
        hasMore={hasMore}
        loader={<SkeletonJobCard />}
      >
        <JobListings jobs={jobs} isLoading={isLoading} error={error} />
      </InfiniteScroll>
    </div>
    </div>
  );
};

export default Home;