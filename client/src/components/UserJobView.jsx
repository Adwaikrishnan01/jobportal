import React from 'react'
import UserApplications from './ApplicationCard';

const UserJobView = () => {
 
  return (
    <section className='relative w-full bg-purple-100 pt-10 pb-20'>
      <div className="mx-auto">
        <h2 className='text-2xl text-purple-950 mb-10
        text-center font-semibold'>Applied Jobs</h2>
       <UserApplications />
      </div>
    </section>
  );
};

export default UserJobView;