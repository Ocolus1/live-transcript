import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`animate-spin ${sizeClasses[size]}`}>
        <div className="absolute w-full h-full border-4 border-current border-t-transparent rounded-full opacity-75"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;