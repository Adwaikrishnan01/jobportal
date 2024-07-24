import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
const Hero = () => {
    const images = ['/heroimg/img1.jpg', '/heroimg/img2.jpg', '/heroimg/img3.jpg'];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isChanging, setIsChanging] = useState(false);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 6000);
  
      return () => clearInterval(interval);
    }, []);

    const changeImage = (direction) => {
        setIsChanging(true);
        setTimeout(() => {
          if (direction === 'next') {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
          } else {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
          }
          setIsChanging(false);
        }, 100); // This should match the transition duration in CSS
      };

  return (
    <section 
      className={`relative bg-cover bg-center py-32 transition-opacity duration-100
        ${isChanging ? 'opacity-0' : 'opacity-100'}`}
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
    >
    <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-45"></div>
    <div className="relative container mx-auto px-6 lg:px-20 flex flex-col md:flex-row items-center">
      <motion.div 
        className="md:w-1/2"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl lg:text-5xl font-semibold mb-8 text-white">Easy way to apply</h1>
        <p className="text-md lg:text-lg font-thin mb-8 text-white">
         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam ducimus quae eius iure repellendus, quas hic quasi dolorum magni tempore omnis, nemo pariatur quo odit similique debitis eveniet? Labore, quam!.
        </p>
        <motion.button 
          className="bg-white text-green-500 py-3 px-6 rounded-full font-semibold text-lg hover:bg-gray-100 transition duration-300"
          whileHover={{ scale: 1.05 }}
        >
          Get Started
        </motion.button>
      </motion.div>
      <motion.div 
        className="md:w-1/2 mt-10 md:mt-0 flex justify-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="rounded-lg shadow-lg">
          <img src="/heroimg.jpg" alt="Laundry Hero Image" className="hidden" />
        </div>
      </motion.div>
    </div>
    <button 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
        onClick={() => changeImage('prev')}
      >
        <FaChevronLeft className="text-2xl text-gray-800" />
      </button>
      
      <button 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
        onClick={() => changeImage('next')}
      >
        <FaChevronRight className="text-2xl text-gray-800" />
      </button>
  </section>
  );
};

export default Hero;