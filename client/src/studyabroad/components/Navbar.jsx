
import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const navigate=useNavigate()
  const handleNav = () => {
    setNav(!nav);
  };
  const navItems = [
    { id: 1, text: 'Home', type: 'anchor' },
    // { id: 2, text: 'Aboutus', type: 'anchor' },
    { id: 3, text: 'Admission', type: 'anchor' },
    { id: 4, text: 'People', type: 'anchor' },
    { id: 5, text: 'Services', type: 'anchor' },
    { id: 6, text: 'Partners', type: 'anchor' },
    { id: 7, text: 'Countries', type: 'link', to: '/studyabroad/countries' },
  ];

  const handleNavigation = (item) => {
    if (item.type === 'link') {
      navigate(item.to);
      setNav(!nav)
    }
  };

  return (
    <div className="h-auto bg-gray-100">
    <div className='w-full z-10
       flex justify-between items-center h-16 
       max-w-[1240px] mx-auto px-6 text-green-700'>
      <h1 className='w-full text-2xl text-green font-semibold'>Studyabroad</h1>

      <ul className='hidden md:flex'>
        {navItems.map(item => (
       <li
       key={item.id}
       onClick={() => handleNavigation(item)}
       className='p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black font-mono'
     >
       {item.type === 'anchor' ? (
         <a href={`/studyabroad/#${item.text}`}>{item.text}</a>
       ) : (
         item.text
       )}
     </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-white bg-green-600 ease-in-out duration-500 z-30'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%] z-30'
        }>
        {/* Mobile Logo */}
        <h1 className='w-full text-3xl font-bold m-4 text-white'>Studyabroad</h1>

        {/* Mobile Navigation Items */}
        {navItems.map(item => (
          <li
            key={item.id}
            onClick={() => handleNavigation(item)}
            className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 text-white
             hover:text-black cursor-pointer border-gray-600'
          >
            {item.type === 'anchor' ? (
         <a href={`/studyabroad/#${item.text}`}>{item.text}</a>
       ) : (
         item.text
       )}
          </li>
        ))}
      </ul>
    </div></div>
  );
};

export default Navbar;