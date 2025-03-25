"use client";

import React, { forwardRef } from "react";

export const Input = forwardRef(
  (
    {
      label,
      type = "text",
      id,
      name,
      value,
      onChange,
      placeholder,
      error,
      disabled = false,
      required = false,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id || name}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <input
          ref={ref}
          type={type}
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
          w-full px-3 py-2 rounded-md border 
          ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"} 
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 
          ${error ? "focus:ring-red-500" : "focus:ring-blue-500"}
          focus:border-transparent
          disabled:bg-gray-100 disabled:text-gray-500 
          disabled:dark:bg-gray-700 disabled:dark:text-gray-400
          ${className}
        `}
          {...props}
        />

        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
