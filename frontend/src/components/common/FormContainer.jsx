// frontend/src/components/common/FormContainer.jsx
import React from 'react';

const FormContainer = ({ children }) => {
  return (
    <div className="flex justify-center">
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 p-4">
        {children}
      </div>
    </div>
  );
};

export default FormContainer;