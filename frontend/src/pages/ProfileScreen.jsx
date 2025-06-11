// frontend/src/pages/ProfileScreen.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../redux/slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../redux/slices/orderSlice';
import { setCredentials } from '../redux/slices/authSlice';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import {
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Chip,
} from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
  const { data: orders, isLoading: loadingOrders, error: errorOrders } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Grid container spacing={4}>
        <Grid item md={3}>
          <Typography variant="h4" component="h1" className="text-starnox-primary font-bold mb-6 text-center">
            User Profile
          </Typography>
          <Box component="form" onSubmit={submitHandler} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                '& label.Mui-focused': { color: '#6b46c1' },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#6b46c1' },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                '& label.Mui-focused': { color: '#6b46c1' },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#6b46c1' },
                },
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '& label.Mui-focused': { color: '#6b46c1' },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#6b46c1' },
                },
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{
                '& label.Mui-focused': { color: '#6b46c1' },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#6b46c1' },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="btn-primary"
              sx={{ mt: 3, mb: 2, padding: '10px', borderRadius: '8px' }}
              disabled={loadingUpdateProfile}
            >
              {loadingUpdateProfile ? <Loader /> : 'Update Profile'}
            </Button>
          </Box>
        </Grid>
        <Grid item md={9}>
          <Typography variant="h4" component="h1" className="text-starnox-primary font-bold mb-6 text-center">
            My Orders
          </Typography>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="error">{errorOrders?.data?.message || errorOrders.error}</Message>
          ) : (
            <TableContainer component={Paper} className="rounded-lg shadow-md overflow-hidden">
              <Table>
                <TableHead className="bg-starnox-dark">
                  <TableRow>
                    <TableCell className="text-starnox-text-light font-semibold">ID</TableCell>
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
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileScreen;