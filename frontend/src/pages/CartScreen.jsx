// // frontend/src/pages/CartScreen.jsx
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { FaTrash } from 'react-icons/fa';
// import { addToCart, removeFromCart } from '../redux/slices/cartSlice';
// import Message from '../components/ui/Message';
// import { toast } from 'react-toastify';
// import {
//   Typography,
//   Grid,
//   Button,
//   Card,
//   CardContent,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemAvatar,
//   Avatar,
//   IconButton,
//   FormControl,
//   Select,
//   MenuItem,
//   Divider,
// } from '@mui/material';

// const CartScreen = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const cart = useSelector((state) => state.cart);
//   const { cartItems } = cart;

//   const addToCartHandler = async (product, qty) => {
//     dispatch(addToCart({ ...product, qty }));
//     toast.success('Product added to cart!');
//   };

//   const removeFromCartHandler = async (id) => {
//     dispatch(removeFromCart(id));
//     toast.info('Product removed from cart!');
//   };

//   const checkoutHandler = () => {
//     navigate('/login?redirect=/shipping');
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <Typography variant="h4" component="h1" className="text-starnox-primary font-bold mb-6 text-center">
//         Shopping Cart
//       </Typography>
//       <Grid container spacing={4}>
//         <Grid item md={8}>
//           {cartItems.length === 0 ? (
//             <Message variant="info">
//               Your cart is empty <Link to="/" className="text-starnox-primary hover:underline">Go Back</Link>
//             </Message>
//           ) : (
//             <List className="bg-white rounded-lg shadow-md p-4">
//               {cartItems.map((item) => (
//                 <div key={item._id}>
//                   <ListItem
//                     secondaryAction={
//                       <IconButton edge="end" aria-label="delete" onClick={() => removeFromCartHandler(item._id)}>
//                         <FaTrash className="text-red-500 hover:text-red-700 transition-colors duration-200" />
//                       </IconButton>
//                     }
//                     className="py-4"
//                   >
//                     <ListItemAvatar>
//                       <Link to={`/product/${item._id}`}>
//                         <Avatar
//                           src={item.image}
//                           alt={item.name}
//                           variant="rounded"
//                           sx={{ width: 80, height: 80, objectFit: 'cover', mr: 2 }}
//                         />
//                       </Link>
//                     </ListItemAvatar>
//                     <ListItemText
//                       primary={
//                         <Link to={`/product/${item._id}`} className="text-starnox-dark hover:text-starnox-primary font-semibold text-lg">
//                           {item.name}
//                         </Link>
//                       }
//                       secondary={`$${item.price.toFixed(2)}`}
//                       className="flex-grow"
//                     />
//                     <FormControl variant="outlined" size="small" sx={{ minWidth: 80, mr: 2 }}>
//                       <Select
//                         value={item.qty}
//                         onChange={(e) => addToCartHandler(item, Number(e.target.value))}
//                         inputProps={{ 'aria-label': 'quantity' }}
//                         className="rounded-md border border-gray-300"
//                       >
//                         {[...Array(item.countInStock).keys()].map((x) => (
//                           <MenuItem key={x + 1} value={x + 1}>
//                             {x + 1}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </ListItem>
//                   <Divider component="li" className="my-2" />
//                 </div>
//               ))}
//             </List>
//           )}
//         </Grid>
//         <Grid item md={4}>
//           <Card className="rounded-lg shadow-md p-4 bg-white">
//             <CardContent>
//               <Typography variant="h5" component="h2" className="text-starnox-dark font-bold mb-4 border-b pb-2">
//                 Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
//               </Typography>
//               <Typography variant="h6" component="p" className="text-starnox-primary font-bold mb-4">
//                 Total: ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
//               </Typography>
//               <Button
//                 variant="contained"
//                 fullWidth
//                 className="btn-primary"
//                 disabled={cartItems.length === 0}
//                 onClick={checkoutHandler}
//                 sx={{ borderRadius: '8px', padding: '10px', textTransform: 'none' }}
//               >
//                 Proceed To Checkout
//               </Button>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default CartScreen;

// frontend/src/pages/CartScreen.jsx
import React, { useState } from 'react'; // Import useState
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';
import Message from '../components/ui/Message';
import { toast } from 'react-toastify';
// Assuming you have useApplyCouponMutation in couponApiSlice.js
import { useApplyCouponMutation } from '../redux/slices/couponApiSlice'; // Make sure this path is correct

import {
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Divider,
  TextField, // Import TextField for coupon input
} from '@mui/material';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // State for coupon code input
  const [couponCode, setCouponCode] = useState('');
  // State to store applied coupon details (e.g., discount amount)
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [appliedCouponInfo, setAppliedCouponInfo] = useState(null); // Store full coupon object if applied

  // RTK Query mutation for applying coupon
  const [applyCoupon, { isLoading: loadingApplyCoupon }] = useApplyCouponMutation();

  // Calculate subtotal before any coupon discount
  // This needs to be calculated whenever cartItems change
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success('Product quantity updated!'); // Changed message as it's often quantity update
    // Reset coupon if quantity changes after applying
    setAppliedDiscount(0);
    setAppliedCouponInfo(null);
    setCouponCode('');
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
    toast.info('Product removed from cart!');
    // Reset coupon if items change after applying
    setAppliedDiscount(0);
    setAppliedCouponInfo(null);
    setCouponCode('');
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code.');
      return;
    }

    try {
      // 🚨🚨🚨 MODIFIED: Pass couponCode as 'code' and itemsPrice as 'amount' 🚨🚨🚨
      const res = await applyCoupon({ code: couponCode.trim(), amount: itemsPrice }).unwrap();

      setAppliedDiscount(res.discountApplied); // Use 'discountApplied' from backend response
      setAppliedCouponInfo(res.couponDetails); // Ensure backend returns couponDetails if you want to display them
      toast.success(`Coupon "${couponCode.trim()}" applied! You saved $${res.discountApplied.toFixed(2)}`);
    } catch (err) {
      setAppliedDiscount(0); // Reset discount on error
      setAppliedCouponInfo(null);
      toast.error(err?.data?.message || 'Failed to apply coupon. Please check the code.');
    }
  };

  // Calculate final total including discount
  const finalTotalPrice = itemsPrice - appliedDiscount;


  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" component="h1" className="text-starnox-primary font-bold mb-6 text-center">
        Shopping Cart
      </Typography>
      <Grid container spacing={4}>
        <Grid item md={8}>
          {cartItems.length === 0 ? (
            <Message variant="info">
              Your cart is empty <Link to="/" className="text-starnox-primary hover:underline">Go Back</Link>
            </Message>
          ) : (
            <List className="bg-white rounded-lg shadow-md p-4">
              {cartItems.map((item) => (
                <div key={item._id}>
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => removeFromCartHandler(item._id)}>
                        <FaTrash className="text-red-500 hover:text-red-700 transition-colors duration-200" />
                      </IconButton>
                    }
                    className="py-4"
                  >
                    <ListItemAvatar>
                      <Link to={`/product/${item._id}`}>
                        <Avatar
                          src={item.image}
                          alt={item.name}
                          variant="rounded"
                          sx={{ width: 80, height: 80, objectFit: 'cover', mr: 2 }}
                        />
                      </Link>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Link to={`/product/${item._id}`} className="text-starnox-dark hover:text-starnox-primary font-semibold text-lg">
                          {item.name}
                        </Link>
                      }
                      secondary={`$${item.price.toFixed(2)}`}
                      className="flex-grow"
                    />
                    <FormControl variant="outlined" size="small" sx={{ minWidth: 80, mr: 2 }}>
                      <Select
                        value={item.qty}
                        onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                        inputProps={{ 'aria-label': 'quantity' }}
                        className="rounded-md border border-gray-300"
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <MenuItem key={x + 1} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </ListItem>
                  <Divider component="li" className="my-2" />
                </div>
              ))}
            </List>
          )}
        </Grid>
        <Grid item md={4}>
          <Card className="rounded-lg shadow-md p-4 bg-white">
            <CardContent>
              <Typography variant="h5" component="h2" className="text-starnox-dark font-bold mb-4 border-b pb-2">
                Order Summary
              </Typography>
              <List>
                <ListItem disablePadding>
                  <ListItemText primary="Items Subtotal:" />
                  <Typography variant="body1" className="font-semibold">${itemsPrice.toFixed(2)}</Typography>
                </ListItem>

                {/* Coupon Application Section */}
                <Divider className="my-2" />
                <ListItem disablePadding className="flex flex-col items-start">
                  <ListItemText primary="Apply Coupon:" className="mb-2" />
                  <div className="flex w-full space-x-2">
                    <TextField
                      label="Coupon Code"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      sx={{
                        '& label.Mui-focused': { color: '#6b46c1' },
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': { borderColor: '#6b46c1' },
                          borderRadius: '8px',
                        },
                      }}
                    />
                    <Button
                      variant="contained"
                      className="btn-primary"
                      onClick={handleApplyCoupon}
                      disabled={loadingApplyCoupon || !couponCode.trim()}
                      sx={{ borderRadius: '8px', textTransform: 'none', minWidth: 'auto' }}
                    >
                      {loadingApplyCoupon ? 'Applying...' : 'Apply'}
                    </Button>
                  </div>
                </ListItem>

                {appliedDiscount > 0 && (
                  <>
                    <ListItem disablePadding>
                      <ListItemText primary="Coupon Discount:" />
                      <Typography variant="body1" className="font-semibold text-green-600">
                        -${appliedDiscount.toFixed(2)}
                      </Typography>
                    </ListItem>
                    {appliedCouponInfo && (
                      <ListItem disablePadding>
                        <ListItemText secondary={`Code: ${appliedCouponInfo.code} (${appliedCouponInfo.discountType === 'percentage' ? `${appliedCouponInfo.discountValue}%` : `$${appliedCouponInfo.discountValue.toFixed(2)}`})`} />
                      </ListItem>
                    )}
                  </>
                )}

                <Divider className="my-2" />
                <ListItem disablePadding>
                  <Typography variant="h6" component="p" className="text-starnox-primary font-bold">
                    Order Total:
                  </Typography>
                  <Typography variant="h6" component="p" className="text-starnox-primary font-bold ml-auto">
                    ${finalTotalPrice.toFixed(2)}
                  </Typography>
                </ListItem>
              </List>

              <Button
                variant="contained"
                fullWidth
                className="btn-primary"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                sx={{ borderRadius: '8px', padding: '10px', textTransform: 'none', mt: 2 }}
              >
                Proceed To Checkout
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default CartScreen;
