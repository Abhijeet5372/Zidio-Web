// // // frontend/src/pages/PlaceOrderScreen.jsx
// // import React, { useEffect } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { toast } from 'react-toastify';
// // import Message from '../components/ui/Message';
// // import Loader from '../components/ui/Loader';
// // import CheckoutSteps from '../components/common/CheckoutSteps';
// // import { useCreateOrderMutation } from '../redux/slices/orderSlice';
// // import { clearCartItems } from '../redux/slices/cartSlice';
// // import {
// //   Typography,
// //   Grid,
// //   Card,
// //   CardContent,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   ListItemAvatar,
// //   Avatar,
// //   Divider,
// //   Button,
// // } from '@mui/material';

// // const PlaceOrderScreen = () => {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   const cart = useSelector((state) => state.cart);

// //   const [createOrder, { isLoading, error }] = useCreateOrderMutation();

// //   useEffect(() => {
// //     if (!cart.shippingAddress.address) {
// //       navigate('/shipping');
// //     } else if (!cart.paymentMethod) {
// //       navigate('/payment');
// //     }
// //   }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

// //   const placeOrderHandler = async () => {
// //     try {
// //       const res = await createOrder({
// //         orderItems: cart.cartItems,
// //         shippingAddress: cart.shippingAddress,
// //         paymentMethod: cart.paymentMethod,
// //         itemsPrice: cart.itemsPrice,
// //         taxPrice: cart.taxPrice,
// //         shippingPrice: cart.shippingPrice,
// //         totalPrice: cart.totalPrice,
// //       }).unwrap();
// //       dispatch(clearCartItems());
// //       navigate(`/order/${res._id}`);
// //     } catch (err) {
// //       toast.error(err?.data?.message || err.error);
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto p-4">
// //       <CheckoutSteps step1 step2 step3 step4 />
// //       <Typography variant="h4" component="h1" className="text-starnox-primary font-bold mb-6 text-center">
// //         Place Order
// //       </Typography>
// //       <Grid container spacing={4}>
// //         <Grid item md={8}>
// //           <Card className="rounded-lg shadow-md p-4 mb-6 bg-white">
// //             <CardContent>
// //               <Typography variant="h5" component="h2" className="text-starnox-dark font-bold mb-4 border-b pb-2">
// //                 Shipping
// //               </Typography>
// //               <Typography variant="body1" className="mb-2">
// //                 <span className="font-semibold">Address: </span>
// //                 {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
// //                 {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
// //               </Typography>
// //             </CardContent>
// //           </Card>

// //           <Card className="rounded-lg shadow-md p-4 mb-6 bg-white">
// //             <CardContent>
// //               <Typography variant="h5" component="h2" className="text-starnox-dark font-bold mb-4 border-b pb-2">
// //                 Payment Method
// //               </Typography>
// //               <Typography variant="body1" className="mb-4">
// //                 <span className="font-semibold">Method: </span> {cart.paymentMethod}
// //               </Typography>
// //             </CardContent>
// //           </Card>

// //           <Card className="rounded-lg shadow-md p-4 bg-white">
// //             <CardContent>
// //               <Typography variant="h5" component="h2" className="text-starnox-dark font-bold mb-4 border-b pb-2">
// //                 Order Items
// //               </Typography>
// //               {cart.cartItems.length === 0 ? (
// //                 <Message variant="info">Your cart is empty</Message>
// //               ) : (
// //                 <List>
// //                   {cart.cartItems.map((item, index) => (
// //                     <div key={index}>
// //                       <ListItem className="py-2">
// //                         <ListItemAvatar>
// //                           <Link to={`/product/${item._id}`}>
// //                             <Avatar
// //                               src={item.image}
// //                               alt={item.name}
// //                               variant="rounded"
// //                               sx={{ width: 60, height: 60, objectFit: 'cover', mr: 2 }}
// //                             />
// //                           </Link>
// //                         </ListItemAvatar>
// //                         <ListItemText
// //                           primary={
// //                             <Link to={`/product/${item._id}`} className="text-starnox-dark hover:text-starnox-primary font-semibold">
// //                               {item.name}
// //                             </Link>
// //                           }
// //                           secondary={`${item.qty} x $${item.price.toFixed(2)} = $${(item.qty * item.price).toFixed(2)}`}
// //                         />
// //                       </ListItem>
// //                       {index < cart.cartItems.length - 1 && <Divider component="li" className="my-1" />}
// //                     </div>
// //                   ))}
// //                 </List>
// //               )}
// //             </CardContent>
// //           </Card>
// //         </Grid>

// //         <Grid item md={4}>
// //           <Card className="rounded-lg shadow-md p-4 bg-white">
// //             <CardContent>
// //               <Typography variant="h5" component="h2" className="text-starnox-dark font-bold mb-4 border-b pb-2">
// //                 Order Summary
// //               </Typography>
// //               <List>
// //                 <ListItem className="py-1">
// //                   <ListItemText primary="Items" />
// //                   <Typography variant="body1">${cart.itemsPrice.toFixed(2)}</Typography>
// //                 </ListItem>
// //                 <ListItem className="py-1">
// //                   <ListItemText primary="Shipping" />
// //                   <Typography variant="body1">${cart.shippingPrice.toFixed(2)}</Typography>
// //                 </ListItem>
// //                 <ListItem className="py-1">
// //                   <ListItemText primary="Tax" />
// //                   <Typography variant="body1">${cart.taxPrice.toFixed(2)}</Typography>
// //                 </ListItem>
// //                 <ListItem className="py-1 border-t pt-2 mt-2">
// //                   <ListItemText primary={<Typography variant="h6" className="font-bold">Total</Typography>} />
// //                   <Typography variant="h6" className="font-bold">${cart.totalPrice.toFixed(2)}</Typography>
// //                 </ListItem>
// //               </List>

// //               {error && <Message variant="error" className="mt-4">{error?.data?.message || error.error}</Message>}

// //               <Button
// //                 type="submit"
// //                 fullWidth
// //                 variant="contained"
// //                 className="btn-primary"
// //                 sx={{ mt: 3, padding: '10px', borderRadius: '8px' }}
// //                 disabled={cart.cartItems.length === 0 || isLoading}
// //                 onClick={placeOrderHandler}
// //               >
// //                 {isLoading ? <Loader /> : 'Place Order'}
// //               </Button>
// //             </CardContent>
// //           </Card>
// //         </Grid>
// //       </Grid>
// //     </div>
// //   );
// // };

// // export default PlaceOrderScreen;

// // frontend/src/pages/PlaceOrderScreen.jsx
// import React, { useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { toast } from 'react-toastify';
// import Message from '../components/ui/Message';
// import Loader from '../components/ui/Loader';
// import CheckoutSteps from '../components/common/CheckoutSteps';
// import { useCreateOrderMutation } from '../redux/slices/orderSlice';
// import { clearCartItems } from '../redux/slices/cartSlice';
// import {
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemAvatar,
//   Avatar,
//   Divider,
//   Button,
// } from '@mui/material';

// const PlaceOrderScreen = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const cart = useSelector((state) => state.cart);

//   const [createOrder, { isLoading, error }] = useCreateOrderMutation();

//   useEffect(() => {
//     if (!cart.shippingAddress.address) {
//       navigate('/shipping');
//     } else if (!cart.paymentMethod) {
//       navigate('/payment');
//     }
//   }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

//   const placeOrderHandler = async () => {
//     try {
//       const res = await createOrder({
//         orderItems: cart.cartItems,
//         shippingAddress: cart.shippingAddress,
//         paymentMethod: cart.paymentMethod,
//         itemsPrice: cart.itemsPrice,
//         taxPrice: cart.taxPrice,
//         shippingPrice: cart.shippingPrice,
//         totalPrice: cart.totalPrice,
//       }).unwrap();
//       dispatch(clearCartItems());
//       navigate(`/order/${res._id}`);
//     } catch (err) {
//       toast.error(err?.data?.message || err.error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <CheckoutSteps step1 step2 step3 step4 />
//       <Typography variant="h4" component="h1" className="text-starnox-primary font-bold mb-6 text-center">
//         Place Order
//       </Typography>
//       <Grid container spacing={4}>
//         <Grid item md={8}>
//           <Card className="rounded-lg shadow-md p-4 mb-6 bg-white">
//             <CardContent>
//               <Typography variant="h5" component="h2" className="text-starnox-dark font-bold mb-4 border-b pb-2">
//                 Shipping
//               </Typography>
//               <Typography variant="body1" className="mb-2">
//                 <span className="font-semibold">Address: </span>
//                 {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
//                 {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
//               </Typography>
//             </CardContent>
//           </Card>

//           <Card className="rounded-lg shadow-md p-4 mb-6 bg-white">
//             <CardContent>
//               <Typography variant="h5" component="h2" className="text-starnox-dark font-bold mb-4 border-b pb-2">
//                 Payment Method
//               </Typography>
//               <Typography variant="body1" className="mb-4">
//                 <span className="font-semibold">Method: </span> {cart.paymentMethod}
//               </Typography>
//             </CardContent>
//           </Card>

//           <Card className="rounded-lg shadow-md p-4 bg-white">
//             <CardContent>
//               <Typography variant="h5" component="h2" className="text-starnox-dark font-bold mb-4 border-b pb-2">
//                 Order Items
//               </Typography>
//               {cart.cartItems.length === 0 ? (
//                 <Message variant="info">Your cart is empty</Message>
//               ) : (
//                 <List>
//                   {cart.cartItems.map((item, index) => (
//                     <div key={index}>
//                       <ListItem className="py-2">
//                         <ListItemAvatar>
//                           <Link to={`/product/${item._id}`}>
//                             <Avatar
//                               src={item.image}
//                               alt={item.name}
//                               variant="rounded"
//                               sx={{ width: 60, height: 60, objectFit: 'cover', mr: 2 }}
//                             />
//                           </Link>
//                         </ListItemAvatar>
//                         <ListItemText
//                           primary={
//                             <Link to={`/product/${item._id}`} className="text-starnox-dark hover:text-starnox-primary font-semibold">
//                               {item.name}
//                             </Link>
//                           }
//                           secondary={`${item.qty} x $${item.price.toFixed(2)} = $${(item.qty * item.price).toFixed(2)}`}
//                         />
//                       </ListItem>
//                       {index < cart.cartItems.length - 1 && <Divider component="li" className="my-1" />}
//                     </div>
//                   ))}
//                 </List>
//               )}
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item md={4}>
//           <Card className="rounded-lg shadow-md p-4 bg-white">
//             <CardContent>
//               <Typography variant="h5" component="h2" className="text-starnox-dark font-bold mb-4 border-b pb-2">
//                 Order Summary
//               </Typography>
//               <List>
//                 <ListItem className="py-1">
//                   <ListItemText primary="Items" />
//                   <Typography variant="body1">${cart.itemsPrice.toFixed(2)}</Typography> {/* This line is now safe */}
//                 </ListItem>
//                 <ListItem className="py-1">
//                   <ListItemText primary="Shipping" />
//                   <Typography variant="body1">${cart.shippingPrice.toFixed(2)}</Typography>
//                 </ListItem>
//                 <ListItem className="py-1">
//                   <ListItemText primary="Tax" />
//                   <Typography variant="body1">${cart.taxPrice.toFixed(2)}</Typography>
//                 </ListItem>
//                 <ListItem className="py-1 border-t pt-2 mt-2">
//                   <ListItemText primary={<Typography variant="h6" className="font-bold">Total</Typography>} />
//                   <Typography variant="h6" className="font-bold">${cart.totalPrice.toFixed(2)}</Typography>
//                 </ListItem>
//               </List>

//               {error && <Message variant="error" className="mt-4">{error?.data?.message || error.error}</Message>}

//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 className="btn-primary"
//                 sx={{ mt: 3, padding: '10px', borderRadius: '8px' }}
//                 disabled={cart.cartItems.length === 0 || isLoading}
//                 onClick={placeOrderHandler}
//               >
//                 {isLoading ? <Loader /> : 'Place Order'}
//               </Button>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default PlaceOrderScreen;

// frontend/src/pages/PlaceOrderScreen.jsx
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../components/ui/Message';
import Loader from '../components/ui/Loader';
import CheckoutSteps from '../components/common/CheckoutSteps';
import { useCreateOrderMutation } from '../redux/slices/orderSlice';
import { clearCartItems } from '../redux/slices/cartSlice';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Button,
} from '@mui/material';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <CheckoutSteps step1 step2 step3 step4 />
      <Typography variant="h4" component="h1" className="text-starnox-primary font-bold mb-6 text-center">
        Place Order
      </Typography>
      <Grid container spacing={4}>
        <Grid item md={8}>
          <Card className="rounded-lg shadow-md p-4 mb-6 bg-white">
            <CardContent>
              <Typography variant="h5" component="h2" className="text-starnox-dark font-bold mb-4 border-b pb-2">
                Shipping
              </Typography>
              <Typography variant="body1" className="mb-2">
                <span className="font-semibold">Address: </span>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </Typography>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-md p-4 mb-6 bg-white">
            <CardContent>
              <Typography variant="h5" component="h2" className="text-starnox-dark font-bold mb-4 border-b pb-2">
                Payment Method
              </Typography>
              <Typography variant="body1" className="mb-4">
                <span className="font-semibold">Method: </span> {cart.paymentMethod}
              </Typography>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-md p-4 bg-white">
            <CardContent>
              <Typography variant="h5" component="h2" className="text-starnox-dark font-bold mb-4 border-b pb-2">
                Order Items
              </Typography>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Your cart is empty</Message>
              ) : (
                <List>
                  {cart.cartItems.map((item, index) => (
                    // 🚨🚨🚨 Defensive check for item and item.price/qty 🚨🚨🚨
                    <div key={index}>
                      {item && typeof item.price === 'number' && typeof item.qty === 'number' ? (
                        <ListItem className="py-2">
                          <ListItemAvatar>
                            <Link to={`/product/${item._id}`}>
                              <Avatar
                                src={item.image}
                                alt={item.name}
                                variant="rounded"
                                sx={{ width: 60, height: 60, objectFit: 'cover', mr: 2 }}
                              />
                            </Link>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Link to={`/product/${item._id}`} className="text-starnox-dark hover:text-starnox-primary font-semibold">
                                {item.name}
                              </Link>
                            }
                            secondary={`${item.qty} x $${item.price.toFixed(2)} = $${(item.qty * item.price).toFixed(2)}`}
                          />
                        </ListItem>
                      ) : (
                        <Message variant="warning">
                          Invalid item in cart. Please remove and re-add.
                        </Message>
                      )}
                      {index < cart.cartItems.length - 1 && <Divider component="li" className="my-1" />}
                    </div>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={4}>
          <Card className="rounded-lg shadow-md p-4 bg-white">
            <CardContent>
              <Typography variant="h5" component="h2" className="text-starnox-dark font-bold mb-4 border-b pb-2">
                Order Summary
              </Typography>
              <List>
                <ListItem className="py-1">
                  <ListItemText primary="Items" />
                  <Typography variant="body1">${cart.itemsPrice.toFixed(2)}</Typography>
                </ListItem>
                <ListItem className="py-1">
                  <ListItemText primary="Shipping" />
                  <Typography variant="body1">${cart.shippingPrice.toFixed(2)}</Typography>
                </ListItem>
                <ListItem className="py-1">
                  <ListItemText primary="Tax" />
                  <Typography variant="body1">${cart.taxPrice.toFixed(2)}</Typography>
                </ListItem>
                <ListItem className="py-1 border-t pt-2 mt-2">
                  <ListItemText primary={<Typography variant="h6" className="font-bold">Total</Typography>} />
                  <Typography variant="h6" className="font-bold">${cart.totalPrice.toFixed(2)}</Typography>
                </ListItem>
              </List>

              {error && <Message variant="error" className="mt-4">{error?.data?.message || error.error}</Message>}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="btn-primary"
                sx={{ mt: 3, padding: '10px', borderRadius: '8px' }}
                disabled={cart.cartItems.length === 0 || isLoading}
                onClick={placeOrderHandler}
              >
                {isLoading ? <Loader /> : 'Place Order'}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default PlaceOrderScreen;