import React from 'react';

const LoadingSpinner: React.FC<{ message?: string }> = ({ message = 'AI 思考中...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-12 h-12 border-4 border-[var(--color-accent)] border-t-transparent border-solid rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-[var(--color-text-secondary)]">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
