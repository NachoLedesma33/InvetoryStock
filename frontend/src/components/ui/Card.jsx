"use client";

import React from "react";

export const Card = ({
  children,
  variant = "default",
  size = "medium",
  className = "",
  ...props
}) => {
  const baseClasses =
    "rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    default: "bg-white dark:bg-gray-800",
    primary: "bg-blue-50 dark:bg-blue-900",
    secondary: "bg-gray-50 dark:bg-gray-900",
    accent: "bg-blue-50/50 dark:bg-blue-900/50",
  };

  const sizeClasses = {
    small: "p-4",
    medium: "p-6",
    large: "p-8",
  };

  return (
    <div
      className={`${baseClasses} ${
        variantClasses[variant] || variantClasses.default
      } ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
