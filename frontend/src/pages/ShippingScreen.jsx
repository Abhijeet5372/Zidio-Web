// frontend/src/pages/ShippingScreen.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../redux/slices/cartSlice';
import FormContainer from '../components/common/FormContainer';
import CheckoutSteps from '../components/common/CheckoutSteps';
import { toast } from 'react-toastify';
import {
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!address.trim() || !city.trim() || !postalCode.trim() || !country.trim()) {
      toast.error('Please fill in all shipping details.');
      return;
    }
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <Typography variant="h4" component="h1" className="text-starnox-primary font-bold mb-6 text-center">
        Shipping
      </Typography>
      <Box component="form" onSubmit={submitHandler} sx={{ width: '100%' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="address"
          label="Address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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
          id="city"
          label="City"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
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
          id="postalCode"
          label="Postal Code"
          name="postalCode"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
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
          id="country"
          label="Country"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
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
        >
          Continue
        </Button>
      </Box>
    </FormContainer>
  );
};

export default ShippingScreen;