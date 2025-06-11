// frontend/src/pages/admin/OrderListScreen.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetOrdersQuery } from '../../redux/slices/orderSlice';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';
import { toast } from 'react-toastify';
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Chip,
} from '@mui/material';
import { FaTimes } from 'react-icons/fa';

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" component="h1" className="text-starnox-primary font-bold mb-6 text-center">
        Orders
      </Typography>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error?.data?.message || error.error}</Message>
      ) : (
        <TableContainer component={Paper} className="rounded-lg shadow-md overflow-hidden">
          <Table>
            <TableHead className="bg-starnox-dark">
              <TableRow>
                <TableCell className="text-starnox-text-light font-semibold">ID</TableCell>
                <TableCell className="text-starnox-text-light font-semibold">USER</TableCell>
                <TableCell className="text-starnox-text-light font-semibold">DATE</TableCell>
                <TableCell className="text-starnox-text-light font-semibold">TOTAL</TableCell>
                <TableCell className="text-starnox-text-light font-semibold">PAID</TableCell>
                <TableCell className="text-starnox-text-light font-semibold">DELIVERED</TableCell>
                <TableCell className="text-starnox-text-light font-semibold"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id} className="even:bg-gray-50 hover:bg-gray-100 transition-colors duration-150">
                  <TableCell className="text-starnox-text-dark text-sm">{order._id}</TableCell>
                  <TableCell className="text-starnox-text-dark">{order.user && order.user.name}</TableCell>
                  <TableCell className="text-starnox-text-dark">
                    {order.createdAt.substring(0, 10)}
                  </TableCell>
                  <TableCell className="text-starnox-text-dark">${order.totalPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-starnox-text-dark">
                    {order.isPaid ? (
                      <Chip label={order.paidAt.substring(0, 10)} color="success" size="small" sx={{ borderRadius: '6px' }} />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </TableCell>
                  <TableCell className="text-starnox-text-dark">
                    {order.isDelivered ? (
                      <Chip label={order.deliveredAt.substring(0, 10)} color="success" size="small" sx={{ borderRadius: '6px' }} />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Link to={`/order/${order._id}`}>
                      <Button variant="outlined" className="btn-outline-primary" sx={{ borderRadius: '8px', textTransform: 'none' }}>
                        Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default OrderListScreen;