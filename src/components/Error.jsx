import React from 'react';

/**
 * Error displays an error message in red.
 * @param {object} props
 * @param {string} props.message - The error message to display.
 */
const Error = ({ message }) => {
  return (
    <div className="text-red-500">{message}</div>
  );
};

export default Error; 