import React from 'react';

const EmptyState: React.FC = () => {
  return (
    <div className="bg-[#EBEBEB] border border-gray-300 rounded p-4 flex items-center justify-center mx-4 mt-6">
      <svg className="w-8 h-8 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
      <span className="text-gray-700 font-medium text-sm">Je hebt geen diensten voor deze dag</span>
    </div>
  );
};

export default EmptyState;