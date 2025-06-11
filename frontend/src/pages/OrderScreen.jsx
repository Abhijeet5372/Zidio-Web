// frontend/src/pages/OrderScreen.jsx
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
} from '../redux/slices/orderSlice';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
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
import { FaCheck, FaTimes } from 'react-icons/fa';

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            clientId: paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }).unwrap();
        refetch();
        toast.success('Payment successful!');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId).unwrap();
      refetch();
      toast.success('Order delivered');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="error">{error?.data?.message || error.error}</Message>
  ) : (
    <div className="container mx-auto p-4">
      <Typography variant="h4" component="h1" className="text-starnox-primary font-bold mb-6 text-center">
        Order {order._id}
      </Typography>
      <Grid container spacing={4}>
        <Grid item md={8}>
          <Card className="rounded-lg shadow-md p-4 mb-6 bg-white">
            <CardContent>
              <Typography variant="h5" component="h2" className="text-starnox-dark font-bold mb-4 border-b pb-2">
                Shipping
              </Typography>
              <Typography variant="body1" className="mb-2">
                <span className="font-semibold">Name: </span> {order.user.name}
              </Typography>
              <Typography variant="body1" className="mb-2">
                <span className="font-semibold">Email: </span>{' '}
                <a href={`mailto:${order.user.email}`} className="text-starnox-primary hover:underline">
                  {order.user.email}
                </a>
              </Typography>
              <Typography variant="body1" className="mb-4">
                <span className="font-semibold">Address: </span>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </Typography>
              {order.isDelivered ? (
                <Message variant="success">Delivered on {order.deliveredAt.substring(0, 10)}</Message>
              ) : (
                <Message variant="error">Not Delivered</Message>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-md p-4 mb-6 bg-white">
            <CardContent>
              <Typography variant="h5" component="h2" className="text-starnox-dark font-bold mb-4 border-b pb-2">
                Payment Method
              </Typography>
              <Typography variant="body1" className="mb-4">
                <span className="font-semibold">Method: </span> {order.paymentMethod}
              </Typography>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt.substring(0, 10)}</Message>
              ) : (
                <Message variant="error">Not Paid</Message>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-md p-4 bg-white">
            <CardContent>
              <Typography variant="h5" component="h2" className="text-starnox-dark font-bold mb-4 border-b pb-2">
                Order Items
              </Typography>
              <List>
                {order.orderItems.map((item, index) => (
                  <div key={index}>
                    <ListItem className="py-2">
                      <ListItemAvatar>
                        <Link to={`/product/${item.product}`}>
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
                          <Link to={`/product/${item.product}`} className="text-starnox-dark hover:text-starnox-primary font-semibold">
                            {item.name}
                          </Link>
                        }
                        secondary={`${item.qty} x $${item.price.toFixed(2)} = $${(item.qty * item.price).toFixed(2)}`}
                      />
                    </ListItem>
                    {index < order.orderItems.length - 1 && <Divider component="li" className="my-1" />}
                  </div>
                ))}
              </List>
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
                  <Typography variant="body1">${order.itemsPrice.toFixed(2)}</Typography>
                </ListItem>
                <ListItem className="py-1">
                  <ListItemText primary="Shipping" />
                  <Typography variant="body1">${order.shippingPrice.toFixed(2)}</Typography>
                </ListItem>
                <ListItem className="py-1">
                  <ListItemText primary="Tax" />
                  <Typography variant="body1">${order.taxPrice.toFixed(2)}</Typography>
                </ListItem>
                <ListItem className="py-1 border-t pt-2 mt-2">
                  <ListItemText primary={<Typography variant="h6" className="font-bold">Total</Typography>} />
                  <Typography variant="h6" className="font-bold">${order.totalPrice.toFixed(2)}</Typography>
                </ListItem>
              </List>

              {!order.isPaid && (
                <div className="mt-4">
                  {loadingPayPal && <Loader />}
                  {errorPayPal && <Message variant="error">{errorPayPal?.data?.message || errorPayPal.error}</Message>}
                  {!isPending && (
                    <div>
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  )}
                </div>
              )}

              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <Button
                  variant="contained"
                  fullWidth
                  className="btn-primary"
                  sx={{ mt: 3, padding: '10px', borderRadius: '8px', textTransform: 'none' }}
                  onClick={deliverOrderHandler}
                >
                  Mark As Delivered
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderScreen;