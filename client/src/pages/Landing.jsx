import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../jobportal/components/ui/Button'

const Landing = () => {
  useEffect(() => {
    document.title = "Landing";
  }, []);
    const navigate=useNavigate()
  return (
    <section className='h-screen bg-gray-100'>
        
        <div className='flex justify-center py-10 text-gray-800 text-4xl font-sans'>
            <span className=''>Welcome </span>
                    <img src='/hand.png' width={40} height={30} className='mx-2' alt="Waving hand" />to LearnBuds app
        </div>    
        <div className="w-1/2 flex flex-col shadow-md gap-6 bg-white px-4 py-10 rounded-md mx-auto">
        <Button label={"Jobportal"} onClick={()=>{navigate('/jobs')}} outline/>
        <Button label={"Studyabroad"} onClick={()=>{navigate('/studyabroad')}} outline/>
        </div>
    </section>
  )
}

export default Landing