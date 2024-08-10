import JobCard from "./JobCard";
import React, { useEffect } from 'react';
import SkeletonJobCard from "../loading/SkeletonJobCard";

const JobListings = ({ jobs, isLoading, error }) => {
  if (error) return <p className="text-gray-800 m-5">{error}</p>;

  return (
    <div className="md:w-6/6 px-3 py-3">
    {jobs.map((jobPosting, index) => (
      <JobCard 
        jobPosting={jobPosting} 
        key={`${jobPosting._id}-${index}`}
      />
    ))}
    {isLoading && jobs.length === 0 && (
      <>
        <SkeletonJobCard />
        <SkeletonJobCard />
        <SkeletonJobCard />
      </>
    )}
  </div>
  );
};
export default JobListings;