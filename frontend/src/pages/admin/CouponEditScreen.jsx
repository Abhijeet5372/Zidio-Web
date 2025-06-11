// frontend/src/pages/admin/CouponEditScreen.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useGetCouponDetailsQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
} from '../../redux/slices/couponApiSlice';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';
import FormContainer from '../../components/common/FormContainer';
import { toast } from 'react-toastify';
import {
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

const CouponEditScreen = () => {
  const { id: couponId } = useParams();
  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState('percentage');
  const [discountValue, setDiscountValue] = useState(0);
  const [minOrderAmount, setMinOrderAmount] = useState(0);
  const [maxDiscountAmount, setMaxDiscountAmount] = useState(''); // Use string for empty
  const [expiresAt, setExpiresAt] = useState('');
  const [isActive, setIsActive] = useState(true);

  const {
    data: coupon,
    isLoading,
    error,
    refetch,
  } = useGetCouponDetailsQuery(couponId, {
    skip: !couponId, // Skip query if no couponId (for create mode)
  });

  const [createCoupon, { isLoading: loadingCreate }] = useCreateCouponMutation();
  const [updateCoupon, { isLoading: loadingUpdate }] = useUpdateCouponMutation();

  useEffect(() => {
    if (coupon) {
      setCode(coupon.code);
      setDiscountType(coupon.discountType);
      setDiscountValue(coupon.discountValue);
      setMinOrderAmount(coupon.minOrderAmount);
      setMaxDiscountAmount(coupon.maxDiscountAmount === null ? '' : coupon.maxDiscountAmount);
      setExpiresAt(coupon.expiresAt ? new Date(coupon.expiresAt).toISOString().split('T')[0] : '');
      setIsActive(coupon.isActive);
    }
  }, [coupon]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!code.trim() || discountValue <= 0) {
      toast.error('Please fill in required fields and ensure discount value is positive.');
      return;
    }

    const couponData = {
      code,
      discountType,
      discountValue: Number(discountValue),
      minOrderAmount: Number(minOrderAmount),
      maxDiscountAmount: maxDiscountAmount === '' ? null : Number(maxDiscountAmount),
      expiresAt: expiresAt || null,
      isActive,
    };

    try {
      if (couponId) {
        // Update existing coupon
        await updateCoupon({ couponId, ...couponData }).unwrap();
        toast.success('Coupon updated successfully');
      } else {
        // Create new coupon
        await createCoupon(couponData).unwrap();
        toast.success('Coupon created successfully');
      }
      refetch(); // Refetch to ensure data is fresh
      navigate('/admin/couponlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <Link to="/admin/couponlist" className="text-starnox-primary hover:underline mb-4 inline-block">
        Go Back
      </Link>
      <Typography variant="h4" component="h1" className="text-starnox-primary font-bold mb-6 text-center">
        {couponId ? 'Edit Coupon' : 'Create Coupon'}
      </Typography>

      {(isLoading || loadingCreate || loadingUpdate) && <Loader />}
      {error ? (
        <Message variant="error">{error?.data?.message || error.error}</Message>
      ) : (
        <Box component="form" onSubmit={submitHandler} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="code"
            label="Coupon Code"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            sx={{
              '& label.Mui-focused': { color: '#6b46c1' },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': { borderColor: '#6b46c1' },
              },
            }}
          />

          <FormControl fullWidth margin="normal" sx={{
            '& label.Mui-focused': { color: '#6b46c1' },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': { borderColor: '#6b46c1' },
            },
          }}>
            <InputLabel id="discount-type-label">Discount Type</InputLabel>
            <Select
              labelId="discount-type-label"
              id="discountType"
              value={discountType}
              label="Discount Type"
              onChange={(e) => setDiscountType(e.target.value)}
            >
              <MenuItem value="percentage">Percentage</MenuItem>
              <MenuItem value="fixed">Fixed Amount</MenuItem>
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            required
            fullWidth
            id="discountValue"
            label="Discount Value"
            name="discountValue"
            type="number"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
            inputProps={{ min: 0 }}
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
            id="minOrderAmount"
            label="Minimum Order Amount"
            name="minOrderAmount"
            type="number"
            value={minOrderAmount}
            onChange={(e) => setMinOrderAmount(e.target.value)}
            inputProps={{ min: 0 }}
            sx={{
              '& label.Mui-focused': { color: '#6b46c1' },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': { borderColor: '#6b46c1' },
              },
            }}
          />

          {discountType === 'percentage' && (
            <TextField
              margin="normal"
              fullWidth
              id="maxDiscountAmount"
              label="Maximum Discount Amount (for %)"
              name="maxDiscountAmount"
              type="number"
              value={maxDiscountAmount}
              onChange={(e) => setMaxDiscountAmount(e.target.value)}
              inputProps={{ min: 0 }}
              sx={{
                '& label.Mui-focused': { color: '#6b46c1' },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#6b46c1' },
                },
              }}
            />
          )}

          <TextField
            margin="normal"
            fullWidth
            id="expiresAt"
            label="Expires At"
            name="expiresAt"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            sx={{
              '& label.Mui-focused': { color: '#6b46c1' },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': { borderColor: '#6b46c1' },
              },
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                name="isActive"
                sx={{
                  color: '#6b46c1', // Custom color for unchecked state
                  '&.Mui-checked': {
                    color: '#6b46c1', // Custom color for checked state
                  },
                }}
              />
            }
            label="Is Active"
            className="text-starnox-text-dark"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="btn-primary"
            sx={{ mt: 3, mb: 2, padding: '10px', borderRadius: '8px' }}
            disabled={loadingCreate || loadingUpdate}
          >
            {(loadingCreate || loadingUpdate) ? <Loader /> : (couponId ? 'Update' : 'Create')}
          </Button>
        </Box>
      )}
    </FormContainer>
  );
};

export default CouponEditScreen;