import JobCard from "./JobCard";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/API';
const  JobListings= () => {
 
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        const response = await axios.get(`${API_URL}/jobs/getalljobs`);
      
        const {data} =response
        
        setJobPostings(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobPostings();
  }, []);
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error}</p>;
    return ( 

        <div className="w-4/6 px-3 py-3">
           {jobPostings.map((jobPosting)=>(
            <JobCard jobPosting={jobPosting} key={jobPosting._id}/>
           ))
            
           }
        </div>
     );
}
 
export default JobListings;
