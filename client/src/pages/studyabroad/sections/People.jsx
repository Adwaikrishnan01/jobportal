import React from 'react'
import PeopleCard from '../components/PeopleCard'

const People = () => {
  return (
   <section className='bg-white py-8'>
    <div className='text-3xl  text-center my-5'>Stories from our students <br/>around the world</div>
     <div className='max-w-5xl grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-3 justify-center mx-auto px-10 lg:px-2'>
        <PeopleCard/>
     </div>
   </section>
  )
}

export default People