import React from "react";

const Input = ({ label, type = "text", placeholder, value, onChange, className = "", name }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-gray-700 mb-1">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      />
    </div>
  );
};

export default Input;
