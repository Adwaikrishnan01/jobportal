import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../sections/Footer'
import { countrydata } from '../data/constants';
import { useParams } from 'react-router-dom';

const CountryInfo = () => {
  const {name}=useParams()
  const country = countrydata.find(c => c.name.toLowerCase() === name.toLowerCase());
 
  return (
    <>
     <Navbar/>
      <section className='w-full py-14'>
        <div className="max-w-5xl mx-auto">
          <div className="flex w-full gap-2 justify-between flex-col md:flex-row">
            <div className="md:w-1/2 p-4">
              <img src={country.image} alt={country.name} className='rounded-md bg-cover'/>
            </div>
            <div className="md:w-1/2 p-4">
              <h1 className="text-3xl font-bold mb-4">{country.name}</h1>
              <p className="mb-4 text-gray-700">{country.description}</p>
              <h2 className="text-xl font-semibold mb-2">Quick Facts</h2>
              <ul className='text-sm text-gray-700'>
                <li>Capital : {country.quickfacts.Capital}</li>
                <li>Universities : {country.quickfacts.Number_of_universities}</li>
                <li>Languages : {country.quickfacts.Official_Languages}</li>
                <li>Currency : {country.quickfacts.Currency}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>    
  )
}

export default CountryInfo