// frontend/src/redux/slices/wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlistItems: localStorage.getItem('wishlistItems')
    ? JSON.parse(localStorage.getItem('wishlistItems'))
    : [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      const existItem = state.wishlistItems.find((x) => x._id === item._id);

      if (existItem) {
        // If item already exists, do nothing or update its properties if needed
        state.wishlistItems = state.wishlistItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.wishlistItems = [...state.wishlistItems, item];
      }
      localStorage.setItem('wishlistItems', JSON.stringify(state.wishlistItems));
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter((x) => x._id !== action.payload);
      localStorage.setItem('wishlistItems', JSON.stringify(state.wishlistItems));
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
      localStorage.removeItem('wishlistItems');
    },
    // Optional: Add to cart from wishlist, this would usually trigger a cartSlice action
    addToCartFromWishlist: (state, action) => {
      const itemToAdd = action.payload;
      // This reducer only removes from wishlist.
      // The actual add to cart logic would be dispatched to cartSlice in the component.
      state.wishlistItems = state.wishlistItems.filter((x) => x._id !== itemToAdd._id);
      localStorage.setItem('wishlistItems', JSON.stringify(state.wishlistItems));
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist, addToCartFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;