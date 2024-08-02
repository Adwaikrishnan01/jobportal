import React, { useEffect, useState } from 'react'
import JobListings from '../components/cards/JobListings'
import Sidebar from '../components/sidebar/SideBar'
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../utils/API';
import axios from 'axios'


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
    const [isLoading, setIsLoading] = useState(false); 
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

    useEffect(() => {
      const fetchJobPostings = async () => {
        try {
          const response = await axios.get(`${API_URL}/jobs/getalljobs`);
        
          const {data} =response
          
          setJobs(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchJobPostings();
    }, []);

  return (
    <div className="bg-gray-50 min-h-screen md:flex">
      <div className='w-full md:w-2/6 lg:w-1/6 md:block bg-gray-100 py-4'>
      <Sidebar 
      filters={filters} 
      onFilterChange={handleFilterChange} 
      onApplyFilters={applyFilters} 
      onClearFilters={clearFilters}/></div>
      <JobListings jobs={jobs} isLoading={isLoading} error={error}/>  
    </div>
  )}

export default Home 