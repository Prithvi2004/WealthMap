import React from "react";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
  );
};

export default SkeletonLoader;
