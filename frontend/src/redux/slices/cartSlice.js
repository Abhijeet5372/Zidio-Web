// // frontend/src/redux/slices/cartSlice.js
// import { createSlice } from '@reduxjs/toolkit';
// import { updateCart } from '../../utils/cartUtils'; // Import the utility function

// const initialState = localStorage.getItem('cart')
//   ? JSON.parse(localStorage.getItem('cart'))
//   : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const item = action.payload;

//       const existItem = state.cartItems.find((x) => x._id === item._id);

//       if (existItem) {
//         state.cartItems = state.cartItems.map((x) =>
//           x._id === existItem._id ? item : x
//         );
//       } else {
//         state.cartItems = [...state.cartItems, item];
//       }
//       return updateCart(state);
//     },
//     removeFromCart: (state, action) => {
//       state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
//       return updateCart(state);
//     },
//     saveShippingAddress: (state, action) => {
//       state.shippingAddress = action.payload;
//       return updateCart(state);
//     },
//     savePaymentMethod: (state, action) => {
//       state.paymentMethod = action.payload;
//       return updateCart(state);
//     },
//     clearCartItems: (state, action) => {
//       state.cartItems = [];
//       return updateCart(state);
//     },
//     resetCart: (state) => (state = initialState), // Optional: for a full reset
//   },
// });

// export const {
//   addToCart,
//   removeFromCart,
//   saveShippingAddress,
//   savePaymentMethod,
//   clearCartItems,
//   resetCart,
// } = cartSlice.actions;

// export default cartSlice.reducer;

// frontend/src/redux/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../../utils/cartUtils'; // Import the utility function

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : {
      cartItems: [],
      shippingAddress: {},
      paymentMethod: 'PayPal',
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0,
    };

// Ensure initial state from localStorage has numeric prices, or default to 0
const storedCart = localStorage.getItem('cart');
if (storedCart) {
    const parsedCart = JSON.parse(storedCart);
    if (parsedCart.cartItems && parsedCart.cartItems.length > 0 && (parsedCart.itemsPrice === undefined || isNaN(parsedCart.itemsPrice))) {
        let tempState = { ...parsedCart };
        updateCart(tempState);
        initialState.itemsPrice = tempState.itemsPrice;
        initialState.shippingPrice = tempState.shippingPrice;
        initialState.taxPrice = tempState.taxPrice;
        initialState.totalPrice = tempState.totalPrice;
    } else if (parsedCart.cartItems.length === 0) {
        initialState.itemsPrice = 0;
        initialState.shippingPrice = 0;
        initialState.taxPrice = 0;
        initialState.totalPrice = 0;
    } else {
        initialState.itemsPrice = Number(parsedCart.itemsPrice || 0);
        initialState.shippingPrice = Number(parsedCart.shippingPrice || 0);
        initialState.taxPrice = Number(parsedCart.taxPrice || 0);
        initialState.totalPrice = Number(parsedCart.totalPrice || 0);
    }
}


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      // 🚨🚨🚨 CRITICAL FIX: Ensure price and qty are numbers and exist 🚨🚨🚨
      const newItem = {
        ...item,
        price: Number(item.price) || 0, // Ensure price is a number, default to 0 if invalid
        qty: Number(item.qty) || 1,    // Ensure qty is a number, default to 1 if invalid
      };

      const existItem = state.cartItems.find((x) => x._id === newItem._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? newItem : x // Use newItem here
        );
      } else {
        state.cartItems = [...state.cartItems, newItem]; // Use newItem here
      }
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      state.itemsPrice = 0;
      state.shippingPrice = 0;
      state.taxPrice = 0;
      state.totalPrice = 0;
      localStorage.setItem('cart', JSON.stringify(state));
      return state;
    },
    resetCart: (state) => {
      localStorage.removeItem('cart');
      return {
        cartItems: [],
        shippingAddress: {},
        paymentMethod: 'PayPal',
        itemsPrice: 0,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 0,
      };
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;