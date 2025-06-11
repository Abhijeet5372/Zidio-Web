// // frontend/src/utils/cartUtils.js
// import { addDecimals } from './priceUtils'; // Assuming priceUtils has addDecimals

// export const updateCart = (state) => {
//   // Calculate items price
//   state.itemsPrice = addDecimals(
//     state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
//   );

//   // Calculate shipping price (If order is over $100 then free, else $10 shipping)
//   state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

//   // Calculate tax price (15% tax)
//   state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

//   // Calculate total price
//   state.totalPrice = addDecimals(
//     Number(state.itemsPrice) +
//       Number(state.shippingPrice) +
//       Number(state.taxPrice)
//   );

//   localStorage.setItem('cart', JSON.stringify(state));

//   return state;
// };

// frontend/src/utils/cartUtils.js
import { addDecimals } from './priceUtils'; // Assuming priceUtils has addDecimals

export const updateCart = (state) => {
  // Calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate shipping price (If order is over $100 then free, else $10 shipping)
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // Calculate tax price (15% tax)
  // itemsPrice is now a number, so no need for Number() and .toFixed(2) here
  state.taxPrice = addDecimals(0.15 * state.itemsPrice);

  // Calculate total price
  // All price components are now numbers, so direct addition is fine
  state.totalPrice = addDecimals(
    state.itemsPrice + state.shippingPrice + state.taxPrice
  );

  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};