import React, { useCallback, useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { FaArrowLeftLong } from 'react-icons/fa6';
const Partners = () => {
    const universities = [
        { name: 'Northern Lights College', logo: 'https://santamonicaedu.in/wp-content/uploads/2021/06/5.jpg' },
        { name: 'Concordia University Chicago', logo: 'https://santamonicaedu.in/wp-content/uploads/2021/06/1-1.jpg' },
        { name: 'University of Nebraska-Lincoln', logo: 'https://santamonicaedu.in/wp-content/uploads/2021/07/1242.jpg' },
        { name: 'Otago Polytechnic', logo: 'https://santamonicaedu.in/wp-content/uploads/2021/07/73.jpg' },
        { name: 'Fanshawe', logo: 'https://santamonicaedu.in/wp-content/uploads/2021/06/2-1.jpg' },
        { name: 'Thompson rivers', logo: 'https://santamonicaedu.in/wp-content/uploads/2021/06/7.jpg' },
        { name: 'EIT', logo: 'https://santamonicaedu.in/wp-content/uploads/2021/06/4-1.jpg' },
        { name: 'Niagra', logo: 'https://santamonicaedu.in/wp-content/uploads/2021/06/7.jpg' },
        { name: 'St.Laurence College', logo: 'https://santamonicaedu.in/wp-content/uploads/2021/07/490.jpg' },
      
    ];
        const [startIndex, setStartIndex] = useState(0);
        const visibleCount = 6;
        const totalUniversities = universities.length;
      
        const scroll = useCallback(() => {
          setStartIndex((prevIndex) =>
            (prevIndex + 1) % (totalUniversities - visibleCount + 1)
          );
        }, [totalUniversities, visibleCount]);
      
        useEffect(() => {
          const timer = setInterval(scroll, 3000); 
          return () => clearInterval(timer);
        }, [scroll]);
      
        const handlePrev = () => {
          setStartIndex((prevIndex) => Math.max(0, prevIndex - 1));
        };
      
        const handleNext = () => {
          setStartIndex((prevIndex) =>
            Math.min(totalUniversities - visibleCount, prevIndex + 1)
          );
        };
    
    return (
        <div className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-sm font-semibold text-green-600 tracking-wide uppercase">
          OUR PARTNERING UNIVERSITIES/ INSTITUTIONS ACROSS THE GLOBE
        </h2>
        <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl text-center">
          Our Partnering Universities
        </h1>
        <div className="mt-10 relative">
          <div className="flex items-center justify-center">
            <button
              onClick={handlePrev}
              className="absolute left-0 z-10 bg-white rounded-full p-2 shadow-md disabled:opacity-50"
              disabled={startIndex === 0}
            >
              <FaArrowLeftLong className="h-6 w-6 text-gray-600" />
            </button>
            <div className="flex overflow-hidden space-x-8">
              <div 
                className="flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${startIndex * (100 / visibleCount)}%)` }}
              >
                {universities.map((uni, index) => (
                  <div key={index} className="flex-shrink-0 w-1/6">
                    <img
                      src={uni.logo}
                      alt={uni.name}
                      className="h-20 w-auto object-contain mx-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handleNext}
              className="absolute right-0 z-10 bg-white rounded-full p-2 shadow-md disabled:opacity-50"
              disabled={startIndex >= totalUniversities - visibleCount}
            >
              <FaArrowRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Partners;