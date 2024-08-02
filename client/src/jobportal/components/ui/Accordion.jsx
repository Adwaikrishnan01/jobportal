import React, { useState } from 'react';
import { MdKeyboardArrowDown ,MdKeyboardArrowUp} from "react-icons/md";
const Accordion = ({ title,icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="rounded-lg">
      <div 
        onClick={toggleAccordion} 
        className="cursor-pointer p-3 bg-gray-100 hover:bg-purple-200 flex justify-between items-center"
      ><div className='flex items-center space-x-4'>{icon}
        <h2 className="text-xl font-semibold text-gray-800 ml-2">{title}</h2>
        </div>
        <span>{isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</span>
      </div>
      {isOpen && (
        <div className="p-4 bg-gray-50 shadow-sm">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;