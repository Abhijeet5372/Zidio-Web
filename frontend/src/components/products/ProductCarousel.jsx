// frontend/src/components/products/ProductCarousel.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetTopProductsQuery } from '../../redux/slices/productSlice'; // Assuming this slice exists
import Loader from '../ui/Loader';
import Message from '../ui/Message';
import defaultProductImage from '../../assets/images/default_product.png'; // Default image fallback

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (products && products.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
      }, 5000); // Change image every 5 seconds
      return () => clearInterval(interval);
    }
  }, [products]);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = defaultProductImage;
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="error">{error?.data?.message || error.error}</Message>;
  }

  if (!products || products.length === 0) {
    return <Message variant="info">No top products available for carousel.</Message>;
  }

  const currentProduct = products[currentIndex];

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-xl mb-8 bg-starnox-dark">
      <Link to={`/product/${currentProduct._id}`} className="block">
        <img
          src={currentProduct.image || defaultProductImage}
          alt={currentProduct.name}
          onError={handleImageError}
          className="w-full h-64 md:h-96 object-cover object-center transition-opacity duration-1000 ease-in-out opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-6">
          <h2 className="text-starnox-text-light text-2xl md:text-4xl font-hero tracking-wide text-shadow-lg">
            {currentProduct.name} (${currentProduct.price.toFixed(2)})
          </h2>
        </div>
      </Link>
      {/* Navigation dots (optional) */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-starnox-primary' : 'bg-gray-400 opacity-70'
            } transition-colors duration-300`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;