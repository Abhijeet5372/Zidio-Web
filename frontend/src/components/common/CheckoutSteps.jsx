// frontend/src/components/common/CheckoutSteps.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="flex justify-center mb-6 space-x-2 sm:space-x-4 font-semibold text-sm sm:text-base">
      <div className="flex items-center">
        {step1 ? (
          <Link to="/login" className="px-3 py-2 rounded-md bg-starnox-primary text-starnox-text-light hover:bg-starnox-secondary hover:text-starnox-dark transition-colors duration-200">
            Sign In
          </Link>
        ) : (
          <div className="px-3 py-2 rounded-md bg-gray-300 text-gray-600 cursor-not-allowed">
            Sign In
          </div>
        )}
      </div>

      <div className="flex items-center">
        <span className="text-starnox-dark mx-1 sm:mx-2">&gt;</span>
        {step2 ? (
          <Link to="/shipping" className="px-3 py-2 rounded-md bg-starnox-primary text-starnox-text-light hover:bg-starnox-secondary hover:text-starnox-dark transition-colors duration-200">
            Shipping
          </Link>
        ) : (
          <div className="px-3 py-2 rounded-md bg-gray-300 text-gray-600 cursor-not-allowed">
            Shipping
          </div>
        )}
      </div>

      <div className="flex items-center">
        <span className="text-starnox-dark mx-1 sm:mx-2">&gt;</span>
        {step3 ? (
          <Link to="/payment" className="px-3 py-2 rounded-md bg-starnox-primary text-starnox-text-light hover:bg-starnox-secondary hover:text-starnox-dark transition-colors duration-200">
            Payment
          </Link>
        ) : (
          <div className="px-3 py-2 rounded-md bg-gray-300 text-gray-600 cursor-not-allowed">
            Payment
          </div>
        )}
      </div>

      <div className="flex items-center">
        <span className="text-starnox-dark mx-1 sm:mx-2">&gt;</span>
        {step4 ? (
          <Link to="/placeorder" className="px-3 py-2 rounded-md bg-starnox-primary text-starnox-text-light hover:bg-starnox-secondary hover:text-starnox-dark transition-colors duration-200">
            Place Order
          </Link>
        ) : (
          <div className="px-3 py-2 rounded-md bg-gray-300 text-gray-600 cursor-not-allowed">
            Place Order
          </div>
        )}
      </div>
    </nav>
  );
};

export default CheckoutSteps;