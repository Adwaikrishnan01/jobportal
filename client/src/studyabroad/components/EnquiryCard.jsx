import React from 'react';

const EnquiryCard = () => {

  const items = [
    {
      id: 1,
      image: "/enquiryimg/img-3.jpg",
      heading: "Study Abroad",
      description: "Open your mind to a whole new world, experience world-class education, and develop a global perspective."
    },
    {
      id: 2,
      image: "/enquiryimg/img-2.jpg",
      heading: "Test Preparation",
      description: "IELTS, PTE, TOEFL training to get admission in top-notch universities overseas"
    },
    {
      id: 3, image: "/enquiryimg/img-1.jpg",
      heading: "Visa & Flight Ticket Booking",
      description: "You can directly contact us by filling up the form. Our team will get back to you with your visa inquiry."
    }
  ]
  return (
    <>
   
    {/* Background image */}
    {/* <div className="h-64 md:h-80 lg:h-96 bg-cover bg-center" style={{backgroundImage: "url('/path-to-your-background-image.jpg')"}}>
      
    </div> */}
    
    {/* Cards container */}
    <div className="md:absolute md:top-[-30px] lg:top-[-40px] left-2 right-2 flex flex-col md:flex-row justify-center 
    z-10 
    items-center md:items-stretch px-2 md:px-0">
      {items.map((item) => (
        <div key={item.id} className="w-full md:w-80 mx-4 bg-white rounded-md
        shadow-md overflow-hidden mb-4 md:mb-0">
          <div className="pb-8 pt-4 px-8 md:px-4">
            <img src={item.image} alt={item.heading} className="w-full mx-auto mb-4 rounded-sm" />
            <h3 className="text-xl font-bold text-center mb-2 md:h-12">{item.heading}</h3>
            <p className="text-sm text-center text-gray-600 md:h-14">{item.description}</p>
          </div>
          <div className="px-2 py-4 flex justify-around mb-4">
            <button className="text-blue-500 font-bold text-sm">Learn More</button>
            <button className="text-green-500 font-bold text-sm">Enquire Now</button>
          </div>
        </div>
      ))}
    </div>
    
  </>
  );
};

export default EnquiryCard;