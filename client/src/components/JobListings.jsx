import JobCard from "./JobCard";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/API';
import SkeletonJobCard from "./loading/SkeletonJobCard";
const  JobListings= ({ jobs, isLoading, error }) => {
            if (isLoading) 
              return (
                <div className="w-4/6 px-3 py-3">
               <SkeletonJobCard/>
               <SkeletonJobCard/>
               <SkeletonJobCard/>
               <SkeletonJobCard/>
               <SkeletonJobCard/>
               <SkeletonJobCard/>
               </div>
            )
            if (error) 
              return <p className="text-gray-800 m-5"> {error}</p>;
    return ( 

        <div className="w-4/6 px-3 py-3">
           {jobs.map((jobPosting)=>(
            <JobCard jobPosting={jobPosting} key={jobPosting._id}/>
           ))
            
           }          
        </div>
     );
}
 
export default JobListings;
