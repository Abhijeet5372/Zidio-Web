// frontend/src/components/ui/Message.jsx
import React from 'react';

const Message = ({ variant, children }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-400';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-400';
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-400';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-400';
    }
  };

  return (
    <div
      className={`p-3 my-4 rounded border ${getVariantClasses()} flex items-center justify-center`}
      role="alert"
    >
      {children}
    </div>
  );
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;