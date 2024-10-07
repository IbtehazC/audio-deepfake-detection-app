import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  colorScheme?: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, colorScheme = 'blue', className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-semibold text-white bg-${colorScheme}-500 hover:bg-${colorScheme}-600 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;