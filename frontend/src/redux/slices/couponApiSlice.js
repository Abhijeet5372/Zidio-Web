// // frontend/src/redux/slices/couponApiSlice.js
// import { COUPON_URL } from '../../constants/baseConstants';
// import { apiSlice } from './apiSlice';

// export const couponApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getCoupons: builder.query({
//       query: () => ({
//         url: COUPON_URL,
//       }),
//       providesTags: ['Coupon'],
//       keepUnusedDataFor: 5,
//     }),
//     getCouponDetails: builder.query({
//       query: (couponId) => ({
//         url: `${COUPON_URL}/${couponId}`,
//       }),
//       providesTags: (result, error, arg) => [{ type: 'Coupon', id: arg }],
//       keepUnusedDataFor: 5,
//     }),
//     createCoupon: builder.mutation({
//       query: (data) => ({
//         url: COUPON_URL,
//         method: 'POST',
//         body: data,
//       }),
//       invalidatesTags: ['Coupon'],
//     }),
//     updateCoupon: builder.mutation({
//       query: (data) => ({
//         url: `${COUPON_URL}/${data.couponId}`,
//         method: 'PUT',
//         body: data,
//       }),
//       invalidatesTags: ['Coupon'],
//     }),
//     deleteCoupon: builder.mutation({
//       query: (couponId) => ({
//         url: `${COUPON_URL}/${couponId}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Coupon'],
//     }),
//     applyCoupon: builder.mutation({
//       query: (couponCode) => ({
//         url: `${COUPON_URL}/apply`,
//         method: 'POST',
//         body: { couponCode },
//       }),
//     }),
//   }),
// });

// export const {
//   useGetCouponsQuery,
//   useGetCouponDetailsQuery,
//   useCreateCouponMutation,
//   useUpdateCouponMutation,
//   useDeleteCouponMutation,
//   useApplyCouponMutation,
// } = couponApiSlice;

// frontend/src/redux/slices/couponApiSlice.js
import { COUPON_URL } from '../../constants/baseConstants';
import { apiSlice } from './apiSlice';

export const couponApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoupons: builder.query({
      query: () => ({
        url: COUPON_URL,
      }),
      providesTags: ['Coupon'],
      keepUnusedDataFor: 5,
    }),
    getCouponDetails: builder.query({
      query: (couponId) => ({
        url: `${COUPON_URL}/${couponId}`,
      }),
      providesTags: (result, error, arg) => [{ type: 'Coupon', id: arg }],
      keepUnusedDataFor: 5,
    }),
    createCoupon: builder.mutation({
      query: (data) => ({
        url: COUPON_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Coupon'],
    }),
    updateCoupon: builder.mutation({
      query: (data) => ({
        url: `${COUPON_URL}/${data.couponId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Coupon'],
    }),
    deleteCoupon: builder.mutation({
      query: (couponId) => ({
        url: `${COUPON_URL}/${couponId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Coupon'],
    }),
    applyCoupon: builder.mutation({
      // 🚨🚨🚨 MODIFIED: Accepts an object { code, amount } 🚨🚨🚨
      query: ({ code, amount }) => ({
        url: `${COUPON_URL}/apply`,
        method: 'POST',
        body: { code, amount }, // Ensure the body matches backend's expectation
      }),
    }),
  }),
});

export const {
  useGetCouponsQuery,
  useGetCouponDetailsQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useApplyCouponMutation,
} = couponApiSlice;