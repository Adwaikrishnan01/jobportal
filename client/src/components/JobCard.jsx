import React from 'react';
import Button from './Button';
import { useSelector } from 'react-redux';

const JobCard = ({jobPosting}) => {
  const { user } = useSelector((state) => state.auth);
  let role
  if(user)
   role=user.role
  else
   role='candidate'
  const getDaysAgo = (date) => {
    const postedDate = new Date(date);
    const currentDate = new Date();
    const timeDifference = currentDate - postedDate; 
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); 
    return daysDifference === 0 ? 'today' : `${daysDifference} days ago`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl my-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-md font-semibold">{jobPosting.jobTitle}</h2>
          <div className="flex items-center mt-1">
            <span className="text-gray-600">{jobPosting.companyName}</span>
          </div>
        </div>
        <div className="bg-purple-600 w-8 h-8 flex items-center justify-center text-white font-bold">
          {jobPosting.companyName.trim()[0]}
        </div>
      </div>
      
      <div className="mt-4 flex space-x-4 text-sm text-gray-500">
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {jobPosting.experience.min}- {jobPosting.experience.max} Yrs
        </div>
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {jobPosting.salary?jobPosting.salary:"Not Disclosed"}
        </div>
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {jobPosting.location}
        </div>
      </div>
      
      <p className="mt-4 text-sm text-gray-600">
        {jobPosting.jobDescription}
      </p>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {jobPosting.requiredSkills.map((skill, index) => (
          <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
            {skill}
          </span>
        ))}
      </div>
      
      <div className="mt-4 flex justify-between items-center text-sm">
        <span className="text-gray-500">{getDaysAgo(jobPosting.createdAt)}</span>
        <div className="space-x-4">
          {role==='employer'?'info':<Button label={"Apply"} outline onClick={()=>{}}/>}
        </div>
      </div>
    </div>
  );
};

export default JobCard;