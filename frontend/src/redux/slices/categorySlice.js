// // frontend/src/redux/slices/categorySlice.js
// import { CATEGORY_URL } from '../../constants/baseConstants';
// import { apiSlice } from './apiSlice';

// export const categoryApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getCategories: builder.query({
//       query: () => ({
//         url: CATEGORY_URL,
//       }),
//       providesTags: ['Category'],
//       keepUnusedDataFor: 5,
//     }),
//     getCategoryDetails: builder.query({
//       query: (categoryId) => ({
//         url: `${CATEGORY_URL}/${categoryId}`,
//       }),
//       providesTags: (result, error, arg) => [{ type: 'Category', id: arg }],
//       keepUnusedDataFor: 5,
//     }),
//     createCategory: builder.mutation({
//       query: (name) => ({
//         url: CATEGORY_URL,
//         method: 'POST',
//         body: { name },
//       }),
//       invalidatesTags: ['Category'],
//     }),
//     updateCategory: builder.mutation({
//       query: (data) => ({
//         url: `${CATEGORY_URL}/${data.categoryId}`,
//         method: 'PUT',
//         body: data,
//       }),
//       invalidatesTags: ['Category'],
//     }),
//     deleteCategory: builder.mutation({
//       query: (categoryId) => ({
//         url: `${CATEGORY_URL}/${categoryId}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Category'],
//     }),
//   }),
// });

// export const {
//   useGetCategoriesQuery,
//   useGetCategoryDetailsQuery,
//   useCreateCategoryMutation,
//   useUpdateCategoryMutation,
//   useDeleteCategoryMutation,
// } = categoryApiSlice;

// // This part is for the non-RTK Query state, if you have any
// // For categories, it's typically fully handled by RTK Query.
// // If you need a simple reducer, you'd define createSlice here.
// // For now, we'll keep it simple as RTK Query handles most of it.
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   // No initial state needed here if all category data is fetched via RTK Query
// };

// const categorySlice = createSlice({
//   name: 'category',
//   initialState,
//   reducers: {
//     // You might add reducers here for UI-specific category state if needed,
//     // like `setSelectedCategory` or `setCategoryFilter`
//   },
// });

// // export const { /* any actions here */ } = categorySlice.actions;
// export default categorySlice.reducer;

// frontend/src/redux/slices/categorySlice.js
import { CATEGORY_URL } from '../../constants/baseConstants';
import { apiSlice } from './apiSlice';

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: CATEGORY_URL,
      }),
      providesTags: ['Category'],
      keepUnusedDataFor: 5,
    }),
    getCategoryDetails: builder.query({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
      }),
      providesTags: (result, error, arg) => [{ type: 'Category', id: arg }],
      keepUnusedDataFor: 5,
    }),
    createCategory: builder.mutation({
      // 🚨 MAJOR CHANGE HERE: Expect an object (e.g., categoryData) as the parameter
      // This 'categoryData' will be { name: '...', description: '...' }
      query: (categoryData) => ({
        url: CATEGORY_URL,
        method: 'POST',
        body: categoryData, // <-- Send the object directly as the request body
      }),
      invalidatesTags: ['Category'],
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/${data.categoryId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Category'],
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryDetailsQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;

// This part is for the non-RTK Query state, if you have any
// For categories, it's typically fully handled by RTK Query.
// If you need a simple reducer, you'd define createSlice here.
// For now, we'll keep it simple as RTK Query handles most of it.
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // No initial state needed here if all category data is fetched via RTK Query
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // You might add reducers here for UI-specific category state if needed,
    // like `setSelectedCategory` or `setCategoryFilter`
  },
});

// export const { /* any actions here */ } = categorySlice.actions;
export default categorySlice.reducer;