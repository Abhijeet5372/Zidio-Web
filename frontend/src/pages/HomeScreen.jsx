// // // frontend/src/pages/HomeScreen.jsx
// // import React from 'react';
// // import { Link, useParams } from 'react-router-dom';
// // import { useGetProductsQuery } from '../redux/slices/productSlice';
// // import Loader from '../components/ui/Loader';
// // import Message from '../components/ui/Message';
// // import ProductCard from '../components/products/ProductCard';
// // import Pagination from '../components/common/Pagination';
// // import ProductCarousel from '../components/products/ProductCarousel';
// // import Meta from '../components/common/Meta';
// // import { Typography, Grid } from '@mui/material'; // Using MUI Grid for layout

// // const HomeScreen = () => {
// //   const { pageNumber, keyword } = useParams();

// //   const { data, isLoading, error } = useGetProductsQuery({
// //     keyword,
// //     pageNumber,
// //   });

// //   return (
// //     <>
// //       <Meta /> {/* Default Meta tags */}
// //       {!keyword ? (
// //         <ProductCarousel />
// //       ) : (
// //         <Link to="/" className="text-starnox-primary hover:underline inline-block mb-4">
// //           Go Back
// //         </Link>
// //       )}
// //       {isLoading ? (
// //         <Loader />
// //       ) : error ? (
// //         <Message variant="error">{error?.data?.message || error.error}</Message>
// //       ) : (
// //         <>
// //           <Typography variant="h4" component="h1" className="text-starnox-primary font-bold mb-6 text-center">
// //             Latest Products
// //           </Typography>
// //           <Grid container spacing={4}>
// //             {data.products.map((product) => (
// //               <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
// //                 <ProductCard product={product} />
// //               </Grid>
// //             ))}
// //           </Grid>
// //           <Pagination
// //             pages={data.pages}
// //             page={data.page}
// //             keyword={keyword ? keyword : ''}
// //           />
// //         </>
// //       )}
// //     </>
// //   );
// // };

// // export default HomeScreen;

// // frontend/src/pages/HomeScreen.jsx
// import React from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { useGetProductsQuery } from '../redux/slices/productSlice';
// import Loader from '../components/ui/Loader';
// import Message from '../components/ui/Message';
// import ProductCard from '../components/products/ProductCard';
// import Pagination from '../components/common/Pagination';
// import ProductCarousel from '../components/products/ProductCarousel';
// import Meta from '../components/common/Meta';
// import { Typography, Grid, Box } from '@mui/material';

// const HomeScreen = () => {
//   const { pageNumber, keyword } = useParams();

//   const { data, isLoading, error } = useGetProductsQuery({
//     keyword,
//     pageNumber,
//   });

//   return (
//     <Box className="container mx-auto p-4">
//       <Meta />
//       {!keyword ? (
//         <ProductCarousel />
//       ) : (
//         <Link to="/" className="text-starnox-primary hover:underline inline-block mb-4">
//           Go Back
//         </Link>
//       )}
//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="error">{error?.data?.message || error.error}</Message>
//       ) : (
//         <>
//           <Typography variant="h4" component="h1" className="text-starnox-primary font-bold mb-10 text-center"> {/* Increased mb-6 to mb-10 */}
//             Latest Products
//           </Typography>
//           <Grid
//             container
//             spacing={4}
//             alignItems="stretch"
//             justifyContent="space-between"
//           >
//             {data.products.map((product) => (
//               <Grid
//                 item
//                 key={product._id}
//                 xs={12}
//                 sm={6}
//                 md={4}
//                 lg={3}
//                 sx={{
//                   '@media (min-width:1280px)': {
//                     flexBasis: '20%',
//                     maxWidth: '20%',
//                   },
//                 }}
//               >
//                 <ProductCard product={product} />
//               </Grid>
//             ))}
//           </Grid>
//           <Pagination
//             pages={data.pages}
//             page={data.page}
//             keyword={keyword ? keyword : ''}
//           />
//         </>
//       )}
//     </Box>
//   );
// };

// export default HomeScreen;

// frontend/src/pages/HomeScreen.jsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../redux/slices/productSlice';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import ProductCard from '../components/products/ProductCard';
import Pagination from '../components/common/Pagination';
import ProductCarousel from '../components/products/ProductCarousel';
import Meta from '../components/common/Meta';
import { Typography, Grid, Box } from '@mui/material';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <Box className="container mx-auto p-4">
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="text-starnox-primary hover:underline inline-block mb-4">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Typography variant="h4" component="h1" className="text-starnox-primary font-bold mb-8 text-center mt-4"> {/* Increased mb for title, added mt-4 */}
            Latest Products
          </Typography>
          <Grid
            container
            // Removed justifyContent="space-between" to allow for consistent column alignment
            // Removed spacing to control it via padding on ProductCard wrapper
            alignItems="stretch"
            sx={{
              // Custom spacing for the grid items
              // This creates the gutter between items
              margin: '0 -8px', // Negative margin to offset padding on Grid items
              width: 'calc(100% + 16px)', // Adjust width to fill container
              // Ensure consistent wrapping and alignment for 5 columns
              // Each item will be 20% width minus padding
              display: 'flex', // Ensure flex container behavior
              flexWrap: 'wrap', // Allow items to wrap
            }}
          >
            {data.products.map((product) => (
              <Grid
                item
                key={product._id}
                xs={12}   // 1 column on extra small screens
                sm={6}    // 2 columns on small screens
                md={4}    // 3 columns on medium screens
                lg={3}    // 4 columns on large screens
                // Custom flexBasis for 5 columns on extra-large screens
                sx={{
                  padding: '8px', // Add padding to Grid item for spacing (equal to half of desired gutter)
                  '@media (min-width:1280px)': { // Targeting 'xl' breakpoint
                    flexBasis: '20%', // Each item takes 20% of the width
                    maxWidth: '20%',
                  },
                }}
              >
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
          <Pagination
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </Box>
  );
};

export default HomeScreen;