// frontend/src/redux/slices/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/baseConstants';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User', 'Category', 'Coupon'], // Define tag types for caching and invalidation
  endpoints: (builder) => ({}), // Empty endpoint as this is a base slice
});