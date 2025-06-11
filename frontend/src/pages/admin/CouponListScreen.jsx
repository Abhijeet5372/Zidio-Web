// frontend/src/pages/admin/CouponListScreen.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useGetCouponsQuery,
  useDeleteCouponMutation,
} from '../../redux/slices/couponApiSlice';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';
import CustomModal from '../../components/ui/CustomModal';
import { toast } from 'react-toastify';
import {
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Chip,
} from '@mui/material';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const CouponListScreen = () => {
  const { data: coupons, isLoading, error, refetch } = useGetCouponsQuery();
  const [deleteCoupon, { isLoading: loadingDelete }] = useDeleteCouponMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      try {
        await deleteCoupon(id).unwrap();
        toast.success('Coupon deleted successfully');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const formatExpiresAt = (dateString) => {
    if (!dateString) return 'No Expiry';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" component="h1" className="text-starnox-primary font-bold">
          Coupons
        </Typography>
        <Link to="/admin/coupon/create">
          <Button
            variant="contained"
            className="btn-primary"
            startIcon={<FaPlus />}
            sx={{ borderRadius: '8px', padding: '10px 20px', textTransform: 'none' }}
          >
            Create Coupon
          </Button>
        </Link>
      </div>

      {loadingDelete && <Loader />}
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
                <TableCell className="text-starnox-text-light font-semibold">CODE</TableCell>
                <TableCell className="text-starnox-text-light font-semibold">TYPE</TableCell>
                <TableCell className="text-starnox-text-light font-semibold">VALUE</TableCell>
                <TableCell className="text-starnox-text-light font-semibold">MIN ORDER</TableCell>
                <TableCell className="text-starnox-text-light font-semibold">MAX DISC.</TableCell>
                <TableCell className="text-starnox-text-light font-semibold">EXPIRES</TableCell>
                <TableCell className="text-starnox-text-light font-semibold">ACTIVE</TableCell>
                <TableCell className="text-starnox-text-light font-semibold"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon._id} className="even:bg-gray-50 hover:bg-gray-100 transition-colors duration-150">
                  <TableCell className="text-starnox-text-dark text-sm">{coupon._id}</TableCell>
                  <TableCell className="text-starnox-text-dark font-mono font-bold">{coupon.code}</TableCell>
                  <TableCell className="text-starnox-text-dark capitalize">{coupon.discountType}</TableCell>
                  <TableCell className="text-starnox-text-dark">
                    {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `$${coupon.discountValue.toFixed(2)}`}
                  </TableCell>
                  <TableCell className="text-starnox-text-dark">${coupon.minOrderAmount.toFixed(2)}</TableCell>
                  <TableCell className="text-starnox-text-dark">
                    {coupon.maxDiscountAmount ? `$${coupon.maxDiscountAmount.toFixed(2)}` : 'N/A'}
                  </TableCell>
                  <TableCell className="text-starnox-text-dark text-sm">{formatExpiresAt(coupon.expiresAt)}</TableCell>
                  <TableCell className="text-starnox-text-dark">
                    <Chip
                      label={coupon.isActive ? 'Active' : 'Inactive'}
                      color={coupon.isActive ? 'success' : 'error'}
                      size="small"
                      sx={{ borderRadius: '6px' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Link to={`/admin/coupon/${coupon._id}/edit`}>
                      <IconButton color="primary" sx={{ '&:hover': { color: '#6b46c1' } }}>
                        <FaEdit />
                      </IconButton>
                    </Link>
                    <IconButton color="error" onClick={() => deleteHandler(coupon._id)} sx={{ '&:hover': { color: '#c53030' } }}>
                      <FaTrash />
                    </IconButton>
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

export default CouponListScreen;