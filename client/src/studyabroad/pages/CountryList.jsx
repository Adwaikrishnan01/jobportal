import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../sections/Footer';
import { useNavigate } from 'react-router-dom';
import { countrydata } from '../data/constants';

const CountryList = () => {
  const navigate=useNavigate()
  const handleClick=(name)=>{
     navigate(`/studyabroad/country/${name.toLowerCase()}`)
  }
  const countries=countrydata;
  return (
  <>
    <Navbar/>
    <section className='bg-gray-100 min-h-screen w-full py-12'  id='Countries'>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 max-w-5xl mx-auto lg:px-1 md:px-8 px-4'>
          {countries.map((country)=>(
             <div className='px-3 py-4 rounded-md shadow-md hover:scale-105 cursor-pointer bg-white duration-500' 
             key={country.id}
             onClick={()=>{handleClick(country.name)}}>
              <div className="w-full mb-3 space-y-2">
                <img className='rounded-md bg-cover' alt='img' src={country.image}/>  
              </div>
              <div className='text-gray-600'>{country.name}</div>
              <div className='text-blue-600 ml-3 my-3'>-- Learn more</div>
             </div>
          )
          )}
      </div>
    </section>
    <Footer/>
  </>)
}

export default CountryList;