import { motion, useInView } from 'framer-motion';
import React from 'react'

const Services = () => {

    const services = [
        {
            id: 1,
            image: "",
            heading: "Study abroad councelling",
            description: "Our trained and experienced team of counselors helps students identify a course and university that perfectly match their aptitude, interests, academic and financial background."
        },
        {
            id: 2,
            image: "",
            heading: "Visa Assistance",
            description: "We provide comprehensive guidance on visa application procedures and documentation, ensuring a smooth and hassle-free process for students aspiring to study abroad."
        },
        {
            id: 3,
            image: "",
            heading: "Test Preparation",
            description: "Our test preparation services include coaching for standardized tests like IELTS, TOEFL, GRE, and GMAT to help students achieve the scores needed for admission to their desired universities."
        },
        {
            id: 4,
            image: "",
            heading: "Financial Aid and Scholarships",
            description: "We assist students in finding and applying for scholarships and financial aid opportunities to make studying abroad more affordable and accessible."
        },
        {
            id: 5,
            image: "",
            heading: "Pre-Departure Briefing",
            description: "Our pre-departure sessions equip students with essential information about living abroad, cultural differences, and practical tips to help them adapt smoothly to their new environment."
        },
        {
            id: 6,
            image: "",
            heading: "Accommodation Assistance",
            description: "We help students find suitable accommodation options near their universities, ensuring they have a comfortable and safe place to stay while studying abroad."
        }
    ]
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
  
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    };
  
    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
        },
      },
    };
    return (
        <section className="bg-fuchsia-100" ref={ref}>
      <motion.div
        className='max-w-6xl px-14 py-12 mx-auto'
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className='text-center' variants={itemVariants}>
          <div className='text-md text-green-700 uppercase'>explore how we work for you</div>
          <div className='text-3xl'>
            <span className='font-thin capitalize mr-3'>our</span>
            <span className='text-gray-700 text-3xl font-bold'>Services</span>
          </div>
        </motion.div>
        
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4'>
          {services.map(service => (
            <motion.div
              className="rounded-md px-4 py-5 bg-white cursor-pointer"
              key={service.id}
              variants={itemVariants}
            >
              {/* <div className="w-full"><img className='rounded-md' src={service.imageUrl} alt={service.heading} /></div> */}
              <div className="text-xl mb-2">{service.heading}</div>
              <div className="text-gray-600 text-sm line-clamp-4 mb-2">{service.description}</div>
              <hr />
              <div className="px-4 pt-2 text-blue-600">--Learn more</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
    )
}

export default Services