import React from 'react';

const EmptyState = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <img alt='loading' src='/create.png' width={250}/>
      <p className="text-lg text-gray-600">{message}</p>
    </div>
  );
};

export default EmptyState;
