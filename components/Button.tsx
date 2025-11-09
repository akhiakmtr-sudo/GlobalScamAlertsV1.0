
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseClasses = "px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-secondary text-white hover:bg-purple-700 focus:ring-purple-500",
    danger: "bg-danger text-white hover:bg-red-700 focus:ring-red-500",
    outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400",
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
