// frontend/src/pages/WishlistScreen.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/ui/Message';
import { toast } from 'react-toastify';
import {
  Typography,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Divider,
} from '@mui/material';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { removeFromWishlist, addToCartFromWishlist } from '../redux/slices/wishlistSlice'; // Assuming these actions exist
import { addToCart } from '../redux/slices/cartSlice'; // For adding to cart

const WishlistScreen = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist); // Assuming 'wishlist' slice in Redux store
  const { wishlistItems } = wishlist;

  const removeFromWishlistHandler = (id) => {
    dispatch(removeFromWishlist(id));
    toast.info('Item removed from wishlist!');
  };

  const addToCartHandler = (item) => {
    dispatch(addToCart({ ...item, qty: 1 })); // Add to cart with qty 1
    dispatch(removeFromWishlist(item._id)); // Remove from wishlist after adding to cart
    toast.success('Item moved to cart!');
  };

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" component="h1" className="text-starnox-primary font-bold mb-6 text-center">
        My Wishlist
      </Typography>
      <Grid container spacing={4}>
        <Grid item md={12}>
          {wishlistItems.length === 0 ? (
            <Message variant="info">
              Your wishlist is empty! <Link to="/" className="text-starnox-primary hover:underline">Start browsing</Link>
            </Message>
          ) : (
            <List className="bg-white rounded-lg shadow-md p-4">
              {wishlistItems.map((item) => (
                <div key={item._id}>
                  <ListItem
                    secondaryAction={
                      <div className="flex items-center space-x-2">
                        <IconButton edge="end" aria-label="add to cart" onClick={() => addToCartHandler(item)}>
                          <FaShoppingCart className="text-starnox-primary hover:text-starnox-secondary transition-colors duration-200" />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => removeFromWishlistHandler(item._id)}>
                          <FaTrash className="text-red-500 hover:text-red-700 transition-colors duration-200" />
                        </IconButton>
                      </div>
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
                    />
                  </ListItem>
                  <Divider component="li" className="my-2" />
                </div>
              ))}
            </List>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default WishlistScreen;