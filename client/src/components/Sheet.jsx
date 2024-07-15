import React, { useState } from 'react';

const Sheet = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg 
        transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        Close
      </button>
      <div className="overflow-y-auto">{children}</div>
    </div>
  );
};



export default Sheet;
