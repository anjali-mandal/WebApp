import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset"; 
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className, type = "button" }) => {
  return (
    <button
      type={type} 
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
