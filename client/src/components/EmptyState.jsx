import React from 'react';

const EmptyState = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <svg
        className="w-24 h-24 mb-4 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 17v2a4 4 0 01-4-4H3a6 6 0 0012 0h-2a4 4 0 01-4 4v-2a4 4 0 01-4-4H3a6 6 0 0012 0h-2a4 4 0 01-4 4v-2zm0-4V9a4 4 0 00-8 0v4a4 4 0 108 0zm6 4v2a4 4 0 01-4-4h-2a6 6 0 0012 0h-2a4 4 0 01-4 4v-2a4 4 0 01-4 4v-2zm0-4V9a4 4 0 00-8 0v4a4 4 0 108 0z"
        ></path>
      </svg>
      <p className="text-lg text-gray-600">{message}</p>
    </div>
  );
};

export default EmptyState;