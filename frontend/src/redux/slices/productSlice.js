// // frontend/src/redux/slices/productSlice.js
// import { PRODUCTS_URL, UPLOAD_URL } from '../../constants/baseConstants';
// import { apiSlice } from './apiSlice';

// export const productApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getProducts: builder.query({
//       query: ({ keyword, pageNumber }) => ({
//         url: PRODUCTS_URL,
//         params: { keyword, pageNumber },
//       }),
//       providesTags: ['Product'], // Invalidate cache when products change
//       keepUnusedDataFor: 5,
//     }),
//     getProductDetails: builder.query({
//       query: (productId) => ({
//         url: `${PRODUCTS_URL}/${productId}`,
//       }),
//       keepUnusedDataFor: 5,
//     }),
//     createProduct: builder.mutation({
//       query: () => ({
//         url: PRODUCTS_URL,
//         method: 'POST',
//       }),
//       invalidatesTags: ['Product'], // Invalidate cache after creating a product
//     }),
//     updateProduct: builder.mutation({
//       query: (data) => ({
//         url: `${PRODUCTS_URL}/${data.productId}`,
//         method: 'PUT',
//         body: data,
//       }),
//       invalidatesTags: ['Product'], // Invalidate cache after updating a product
//     }),
//     uploadProductImage: builder.mutation({
//       query: (data) => ({
//         url: `${UPLOAD_URL}`,
//         method: 'POST',
//         body: data,
//       }),
//     }),
//     deleteProduct: builder.mutation({
//       query: (productId) => ({
//         url: `${PRODUCTS_URL}/${productId}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Product'],
//     }),
//     createReview: builder.mutation({
//       query: (data) => ({
//         url: `${PRODUCTS_URL}/${data.productId}/reviews`,
//         method: 'POST',
//         body: data,
//       }),
//       invalidatesTags: ['Product'], // Invalidate product cache to show new review
//     }),
//     getTopProducts: builder.query({
//       query: () => ({
//         url: `${PRODUCTS_URL}/top`,
//       }),
//       keepUnusedDataFor: 5,
//     }),
//   }),
// });

// export const {
//   useGetProductsQuery,
//   useGetProductDetailsQuery,
//   useCreateProductMutation,
//   useUpdateProductMutation,
//   useUploadProductImageMutation,
//   useDeleteProductMutation,
//   useCreateReviewMutation,
//   useGetTopProductsQuery,
// } = productApiSlice;

// frontend/src/redux/slices/productSlice.js
import { PRODUCTS_URL, UPLOAD_URL } from '../../constants/baseConstants';
import { apiSlice } from './apiSlice';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: PRODUCTS_URL,
        params: { keyword, pageNumber },
      }),
      // Use `providesTags` with a function for products to invalidate specific product details as well
      providesTags: (result, error, arg) =>
        result
          ? [...result.products.map(({ _id }) => ({ type: 'Product', id: _id })), 'Product']
          : ['Product'],
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      providesTags: (result, error, arg) => [{ type: 'Product', id: arg }],
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      // 🚨 FIX: Add a body to the request with placeholder data
      query: () => ({
        url: PRODUCTS_URL,
        method: 'POST',
        // Send initial, minimal data. The 'user' field is required.
        // Other fields will be updated in ProductEditScreen.
        body: {}, // We will let the backend assign defaults/placeholders
      }),
      invalidatesTags: ['Product'], // Invalidate cache after creating a product
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Product', id: arg.productId }],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Product', id: arg.productId }],
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
} = productApiSlice;