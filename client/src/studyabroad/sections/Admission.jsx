import React from 'react'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
const Admission = () => {

  const admissionlist=[
    {
      id:1,
      title:"Create Profile",
      description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex officia dolore sapiente illo sequi quo? Neque voluptates non aliquam nam atque repudiandae tenetur dicta, consequuntur, praesentium autem suscipit fuga quod!"
    },
    {
      id:2,
      title:"Select Interest",
      description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex officia dolore sapiente illo sequi quo? Neque voluptates non aliquam nam atque repudiandae tenetur dicta, consequuntur, praesentium autem suscipit fuga quod!"
    },
    {
      id:3,
      title:"Compare University",
      description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex officia dolore sapiente illo sequi quo? Neque voluptates non aliquam nam atque repudiandae tenetur dicta, consequuntur, praesentium autem suscipit fuga quod!"
    },
    {
      id:4,
      title:"Start Applying",
      description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex officia dolore sapiente illo sequi quo? Neque voluptates non aliquam nam atque repudiandae tenetur dicta, consequuntur, praesentium autem suscipit fuga quod!"
    },
  ]

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <section className="bg-gray-200 py-10" ref={ref} id="Admission">
      <div className='max-w-7xl flex flex-col md:flex-row px-14 py-12 mx-auto'>
        <motion.div
          className="w-full md:w-1/2 mx-auto px-4 sm:px-6 hidden md:flex"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 1 }}
        >
          <img className='w-full rounded-md' src='/admission/img1.jpg' alt='img' />
        </motion.div>
        <div className='w-full md:w-1/2'>
          <motion.h2
            className='text-3xl font-semibold text-green-700 pb-6 text-center'
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
          >
            Get admission in 4 easy steps
          </motion.h2>
          <motion.div
            className='grid grid-cols-1 md:grid-cols-2 gap-4 justify-center'
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {admissionlist.map(list => (
              <motion.div
                className='flex flex-col gap-2 bg-white rounded-md py-4 px-2 hover:bg-green-100'
                key={list.id}
                variants={itemVariants}
              >
                <div className='flex flex-row items-center'>
                  <div className='py-2 px-4 bg-green-600 text-white rounded-md'>{list.id}</div>
                  <div className='text-xl mx-3'>{list.title}</div>
                </div>
                <div className="flex">
                  <div className="w-1/6"></div>
                  <div className='text-gray-600 line-clamp-4 w-5/6'>{list.description}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Admission