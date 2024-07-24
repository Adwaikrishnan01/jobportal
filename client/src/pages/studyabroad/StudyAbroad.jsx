import React from 'react'
import Enquiry from './sections/Enquiry'
import Hero from './sections/Hero'
import Navbar from './components/Navbar'
import People from './sections/People'
import Admission from './sections/Admission'
import Footer from './sections/Footer'
import Services from './sections/Services'
import Partners from './sections/Partners'


const StudyAbroad=()=> {

  return (
    <div className='min-h-screen'>
    <Navbar/>
    <Hero/>
    <Enquiry/>
    <Admission/>
    <People/>
    <Services/>
    <Partners/>
    <Footer/>
    </div>
  )
}

export default StudyAbroad
