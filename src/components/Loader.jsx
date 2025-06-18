import React from 'react';

/**
 * Loader displays a spinning indicator for loading states.
 */
const Loader = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
  </div>
);

export default Loader; 