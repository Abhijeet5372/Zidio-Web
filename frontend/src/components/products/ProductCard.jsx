// // // frontend/src/components/products/ProductCard.jsx
// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import Rating from '../common/Rating'; // Assuming Rating component exists
// // import defaultProductImage from '../../assets/images/default_product.png'; // Default image fallback

// // const ProductCard = ({ product }) => {
// //   const handleImageError = (e) => {
// //     e.target.onerror = null; // Prevent infinite loop
// //     e.target.src = defaultProductImage; // Set fallback image
// //   };

// //   return (
// //     <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-hero-glow">
// //       <Link to={`/product/${product._id}`}>
// //         <img
// //           src={product.image || defaultProductImage}
// //           alt={product.name}
// //           onError={handleImageError}
// //           className="w-full h-48 object-cover"
// //         />
// //       </Link>

// //       <div className="p-4">
// //         <Link to={`/product/${product._id}`}>
// //           <h3 className="text-lg font-semibold text-starnox-dark hover:text-starnox-primary transition-colors duration-200 mb-2 truncate">
// //             {product.name}
// //           </h3>
// //         </Link>

// //         <div className="flex items-center mb-2">
// //           <Rating value={product.rating} text={`${product.numReviews} reviews`} />
// //         </div>

// //         <p className="text-xl font-bold text-starnox-primary">
// //           ${product.price.toFixed(2)}
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductCard;

// // frontend/src/components/products/ProductCard.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import Rating from '../common/Rating'; // Assuming Rating component exists
// import defaultProductImage from '../../assets/images/default_product.png'; // Default image fallback

// const ProductCard = ({ product }) => {
//   const handleImageError = (e) => {
//     e.target.onerror = null; // Prevent infinite loop
//     e.target.src = defaultProductImage; // Set fallback image
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-hero-glow
//                 flex flex-col h-full min-h-[350px]"> {/* Decreased min-h from 450px to 350px */}
//       <Link to={`/product/${product._id}`} className="flex flex-col flex-grow">
//         <img
//           src={product.image || defaultProductImage}
//           alt={product.name}
//           onError={handleImageError}
//           className="w-full h-40 object-cover flex-shrink-0"
//         />
//         {/* Content area: Use flex-grow to take remaining space and flex-col for vertical layout */}
//         <div className="p-3 flex flex-col flex-grow justify-between"> {/* Changed p-4 to p-3 to reduce padding */}
//           <div> {/* Wrapper for name and rating to group them */}
//             <h3 className="text-lg font-semibold text-starnox-dark hover:text-starnox-primary transition-colors duration-200 mb-2
//                        h-14 overflow-hidden text-ellipsis line-clamp-2">
//               {product.name}
//             </h3>
//             <div className="flex items-center mb-2">
//               <Rating value={product.rating} text={`${product.numReviews} reviews`} />
//             </div>
//           </div>
//           <p className="text-xl font-bold text-starnox-primary mt-auto">
//             ${product.price.toFixed(2)}
//           </p>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default ProductCard;

// frontend/src/components/products/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../common/Rating';
import defaultProductImage from '../../assets/images/default_product.png';

const ProductCard = ({ product }) => {
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = defaultProductImage;
  };

  return (
    <div className="p-2 h-full"> {/* Wrapper div for consistent spacing, and takes full height */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-hero-glow
                  flex flex-col h-full min-h-[300px]"> {/* Adjusted min-h, ensure h-full */}
        <Link to={`/product/${product._id}`} className="flex flex-col flex-grow">
          <img
            src={product.image || defaultProductImage}
            alt={product.name}
            onError={handleImageError}
            className="w-full h-40 object-cover flex-shrink-0" // Keeps image aspect ratio for visual width
          />
          <div className="p-3 flex flex-col flex-grow justify-between">
            <div>
              <h3 className="text-lg font-semibold text-starnox-dark hover:text-starnox-primary transition-colors duration-200 mb-2
                         h-14 overflow-hidden text-ellipsis line-clamp-2">
                {product.name}
              </h3>
              <div className="flex items-center mb-2">
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
              </div>
            </div>
            <p className="text-xl font-bold text-starnox-primary mt-auto">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;