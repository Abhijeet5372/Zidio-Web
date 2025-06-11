// // frontend/src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Common Components
// import Header from './components/common/Header';
// import Footer from './components/common/Footer';

// // UI Components
// import Loader from './components/ui/Loader';
// import Message from './components/ui/Message';

// // User & Product Pages
// import HomeScreen from './pages/HomeScreen';
// import ProductScreen from './pages/ProductScreen';
// import CartScreen from './pages/CartScreen';
// import LoginScreen from './pages/LoginScreen';
// import RegisterScreen from './pages/RegisterScreen';
// import ProfileScreen from './pages/ProfileScreen';
// import ShippingScreen from './pages/ShippingScreen';
// import PaymentScreen from './pages/PaymentScreen';
// import PlaceOrderScreen from './pages/PlaceOrderScreen';
// import OrderScreen from './pages/OrderScreen';
// import WishlistScreen from './pages/WishlistScreen';
// import NotFoundPage from './pages/NotFoundPage'; // Ensure this is imported

// // Admin Pages
// import AdminRoute from './components/admin/AdminRoute'; // Protects admin routes
// import OrderListScreen from './pages/admin/OrderListScreen';
// import ProductListScreen from './pages/admin/ProductListScreen';
// import ProductEditScreen from './pages/admin/ProductEditScreen';
// import UserListScreen from './pages/admin/UserListScreen';
// import UserEditScreen from './pages/admin/UserEditScreen';
// import CategoryListScreen from './pages/admin/CategoryListScreen';
// import CouponListScreen from './pages/admin/CouponListScreen';
// import CouponEditScreen from './pages/admin/CouponEditScreen';

// // Material UI Components for global styling (optional, but good for base)
// import { Container } from '@mui/material';

// const App = () => {
//   return (
//     <Router>
//       <Header />
//       <main className="py-8 bg-starnox-background min-h-screen">
//         <Container maxWidth="xl"> {/* Using MUI Container for consistent padding */}
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<HomeScreen />} />
//             <Route path="/search/:keyword" element={<HomeScreen />} />
//             <Route path="/page/:pageNumber" element={<HomeScreen />} />
//             <Route
//               path="/search/:keyword/page/:pageNumber"
//               element={<HomeScreen />}
//             />
//             <Route path="/product/:id" element={<ProductScreen />} />
//             <Route path="/cart" element={<CartScreen />} />
//             <Route path="/login" element={<LoginScreen />} />
//             <Route path="/register" element={<RegisterScreen />} />
//             <Route path="/wishlist" element={<WishlistScreen />} />

//             {/* Protected User Routes */}
//             <Route path="/profile" element={<ProfileScreen />} />
//             <Route path="/shipping" element={<ShippingScreen />} />
//             <Route path="/payment" element={<PaymentScreen />} />
//             <Route path="/placeorder" element={<PlaceOrderScreen />} />
//             <Route path="/order/:id" element={<OrderScreen />} />

//             {/* Admin Routes */}
//             <Route path="/admin" element={<AdminRoute />}>
//               <Route path="orderlist" element={<OrderListScreen />} />
//               <Route path="productlist" element={<ProductListScreen />} />
//               <Route
//                 path="productlist/:pageNumber"
//                 element={<ProductListScreen />}
//               />
//               <Route path="product/:id/edit" element={<ProductEditScreen />} />
//               <Route path="userlist" element={<UserListScreen />} />
//               <Route path="user/:id/edit" element={<UserEditScreen />} />
//               <Route path="categorylist" element={<CategoryListScreen />} />
//               <Route path="couponlist" element={<CouponListScreen />} />
//               <Route path="coupon/:id/edit" element={<CouponEditScreen />} />
//             </Route>

//             {/* Catch-all for 404 */}
//             <Route path="*" element={<NotFoundPage />} />
//           </Routes>
//         </Container>
//       </main>
//       <Footer />
//       <ToastContainer position="bottom-right" theme="dark" />
//     </Router>
//   );
// };

// export default App;

// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Common Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// UI Components
import Loader from './components/ui/Loader';
import Message from './components/ui/Message';

// User & Product Pages
import HomeScreen from './pages/HomeScreen';
import ProductScreen from './pages/ProductScreen';
import CartScreen from './pages/CartScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import ProfileScreen from './pages/ProfileScreen';
import ShippingScreen from './pages/ShippingScreen';
import PaymentScreen from './pages/PaymentScreen';
import PlaceOrderScreen from './pages/PlaceOrderScreen';
import OrderScreen from './pages/OrderScreen';
import WishlistScreen from './pages/WishlistScreen';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminRoute from './components/admin/AdminRoute'; // Protects admin routes
import OrderListScreen from './pages/admin/OrderListScreen';
import ProductListScreen from './pages/admin/ProductListScreen';
import ProductEditScreen from './pages/admin/ProductEditScreen';
import UserListScreen from './pages/admin/UserListScreen';
import UserEditScreen from './pages/admin/UserEditScreen';
import CategoryListScreen from './pages/admin/CategoryListScreen';
import CouponListScreen from './pages/admin/CouponListScreen';
import CouponEditScreen from './pages/admin/CouponEditScreen';

// Material UI Components for global styling (optional, but good for base)
import { Container } from '@mui/material';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-8 bg-starnox-background min-h-screen">
        <Container maxWidth="xl">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomeScreen />} />
            <Route path="/search/:keyword" element={<HomeScreen />} />
            <Route path="/page/:pageNumber" element={<HomeScreen />} />
            <Route
              path="/search/:keyword/page/:pageNumber"
              element={<HomeScreen />}
            />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/wishlist" element={<WishlistScreen />} />

            {/* Protected User Routes (accessible via separate PrivateRoute if you have one, or direct) */}
            {/* If these were nested under PrivateRoute, they would be:
                <Route path="" element={<PrivateRoute />}>
                  <Route path="profile" element={<ProfileScreen />} />
                  <Route path="shipping" element={<ShippingScreen />} />
                  <Route path="payment" element={<PaymentScreen />} />
                  <Route path="placeorder" element={<PlaceOrderScreen />} />
                  <Route path="order/:id" element={<OrderScreen />} />
                </Route>
                For now, they are public and directly accessible.
            */}
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminRoute />}>
              <Route path="orderlist" element={<OrderListScreen />} />
              <Route path="productlist" element={<ProductListScreen />} />
              <Route
                path="productlist/:pageNumber"
                element={<ProductListScreen />}
              />
              <Route path="product/:id/edit" element={<ProductEditScreen />} />
              <Route path="userlist" element={<UserListScreen />} />
              <Route path="user/:id/edit" element={<UserEditScreen />} />
              <Route path="categorylist" element={<CategoryListScreen />} />
              <Route path="couponlist" element={<CouponListScreen />} />
              {/* 🚨🚨🚨 THIS IS THE CORRECTED ROUTE FOR CREATING COUPONS 🚨🚨🚨 */}
              <Route path="coupon/create" element={<CouponEditScreen />} />
              <Route path="coupon/:id/edit" element={<CouponEditScreen />} />
            </Route>

            {/* Catch-all for 404 - Should be the last route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  );
};

export default App;
