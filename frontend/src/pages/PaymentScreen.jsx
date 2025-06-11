// frontend/src/pages/PaymentScreen.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/common/CheckoutSteps';
import FormContainer from '../components/common/FormContainer';
import { savePaymentMethod } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import {
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
} from '@mui/material';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState('PayPal'); // Default to PayPal

  const submitHandler = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <Typography variant="h4" component="h1" className="text-starnox-primary font-bold mb-6 text-center">
        Payment Method
      </Typography>
      <Box component="form" onSubmit={submitHandler} sx={{ width: '100%' }}>
        <FormControl component="fieldset" margin="normal" fullWidth>
          <Typography variant="h6" component="legend" className="text-starnox-dark font-semibold mb-4">
            Select Method
          </Typography>
          <RadioGroup
            aria-label="payment method"
            name="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel
              value="PayPal"
              control={<Radio sx={{ color: '#6b46c1', '&.Mui-checked': { color: '#6b46c1' } }} />}
              label={<Typography className="text-starnox-text-dark">PayPal or Credit Card</Typography>}
              sx={{ mb: 1 }}
            />
            {/* You can add other payment methods here, e.g., Stripe */}
            {/* <FormControlLabel
              value="Stripe"
              control={<Radio sx={{ color: '#6b46c1', '&.Mui-checked': { color: '#6b46c1' } }} />}
              label={<Typography className="text-starnox-text-dark">Stripe</Typography>}
              sx={{ mb: 1 }}
            /> */}
          </RadioGroup>
        </FormControl>
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

export default PaymentScreen;