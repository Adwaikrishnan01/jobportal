import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
const Input = ({ label, name, type = 'text', value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className="mb-4">
      <label  className="block text-gray-700 text-md font-bold">
        {label}
      </label>
      <div className="relative">
        <input
          name={name}
          type={showPassword && type === 'password' ? 'text' : type}
          value={value}
          onChange={onChange}
          className="appearance-none border-b-2 border-fuchsia-300 w-full pb-2
           text-gray-700 leading-tight focus:outline-none focus:border-fuchsia-600 mb-2"
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-0 top-0 mt-3 mr-4 text-gray-600 focus:outline-none"
          >
            {showPassword ? (
              <FaRegEye />
            ) : (
              <FaRegEyeSlash />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
