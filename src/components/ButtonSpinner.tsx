import React from 'react';

interface ButtonSpinnerProps {
  loading: boolean;
  onClick: (e: any) => Promise<void>;
  children: any
  name: string
}

const ButtonSpinner: React.FC<ButtonSpinnerProps> = ({ loading, onClick, children, name }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`py-2 px-4 bg-blue-500 text-white rounded-md focus:outline-none ${
        loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
      }`}
    >
      {loading ? (
        <div className="flex items-center">
          <div className="w-4 h-4 border-t-2 border-b-2 border-white border-solid animate-spin mr-2"></div>
          <span>{name}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default ButtonSpinner;
