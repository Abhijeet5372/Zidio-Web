// backend/utils/priceUtils.js

// Function to add decimals to a number string
function addDecimals(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}

// Function to calculate prices for an order
export const calcPrices = (orderItems) => {
  // Calculate the items price
  const itemsPrice = addDecimals(
    orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate the shipping price (if orderItemsPrice is > $100, then free, else $10 shipping)
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);

  // Calculate the tax price (15% tax)
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));

  // Calculate the total price
  const totalPrice = addDecimals(
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)
  );

  return { itemsPrice, taxPrice, shippingPrice, totalPrice };
};