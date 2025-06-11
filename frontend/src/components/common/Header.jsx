// // // frontend/src/components/common/Header.jsx
// // import React, { useState } from 'react';
// // import { FaShoppingCart, FaUser, FaHeart, FaStar, FaTshirt, FaUsers, FaClipboardList, FaTags, FaBars, FaTimes } from 'react-icons/fa';
// // import { MdDashboard } from 'react-icons/md';
// // import { Link, useNavigate } from 'react-router-dom'; // Using Link directly from react-router-dom
// // import { useDispatch, useSelector } from 'react-redux';
// // import { useLogoutMutation } from '../../redux/slices/usersApiSlice';
// // import { logout } from '../../redux/slices/authSlice';
// // import SearchBox from './SearchBox'; // Assuming SearchBox exists

// // // Place your logo here: frontend/src/assets/logos/starnox_logo.png
// // import starnoxLogo from '../../assets/logos/starnox_logo.png';

// // const Header = () => {
// //   const { cartItems } = useSelector((state) => state.cart);
// //   const { userInfo } = useSelector((state) => state.auth);

// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const [logoutApiCall] = useLogoutMutation();
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// //   const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
// //   const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);

// //   const logoutHandler = async () => {
// //     try {
// //       await logoutApiCall().unwrap();
// //       dispatch(logout());
// //       navigate('/login');
// //       setIsUserDropdownOpen(false); // Close dropdown on logout
// //       setIsMobileMenuOpen(false); // Close mobile menu
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   const toggleMobileMenu = () => {
// //     setIsMobileMenuOpen(!isMobileMenuOpen);
// //   };

// //   const closeMobileMenu = () => {
// //     setIsMobileMenuOpen(false);
// //   };

// //   return (
// //     <header className="bg-starnox-dark text-starnox-text-light py-3 shadow-lg">
// //       <div className="container mx-auto px-4 flex justify-between items-center relative">
// //         {/* Logo and Brand */}
// //         <Link to="/" className="flex items-center space-x-2">
// //           <img src={starnoxLogo} alt="StarNox Logo" className="h-10 w-auto" />
// //           <span className="font-hero text-3xl text-starnox-secondary tracking-wider">StarNox</span>
// //         </Link>

// //         {/* Mobile Menu Toggle */}
// //         <div className="md:hidden">
// //           <button onClick={toggleMobileMenu} className="text-starnox-text-light text-2xl focus:outline-none">
// //             {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
// //           </button>
// //         </div>

// //         {/* Desktop Navigation */}
// //         <nav className="hidden md:flex items-center space-x-6">
// //           <SearchBox />

// //           <Link to="/cart" className="flex items-center hover:text-starnox-secondary transition-colors duration-200">
// //             <FaShoppingCart className="mr-1" /> Cart
// //             {cartItems.length > 0 && (
// //               <span className="ml-1 px-2 py-0.5 text-xs font-bold text-white bg-starnox-primary rounded-full">
// //                 {cartItems.reduce((acc, item) => acc + item.qty, 0)}
// //               </span>
// //             )}
// //           </Link>

// //           <Link to="/wishlist" className="flex items-center hover:text-starnox-secondary transition-colors duration-200">
// //             <FaHeart className="mr-1" /> Wishlist
// //           </Link>

// //           {userInfo ? (
// //             <div className="relative">
// //               <button
// //                 onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
// //                 className="flex items-center capitalize hover:text-starnox-secondary focus:outline-none transition-colors duration-200"
// //               >
// //                 <FaUser className="mr-1" /> {userInfo.name.split(' ')[0]}
// //               </button>
// //               {isUserDropdownOpen && (
// //                 <div className="absolute right-0 mt-2 w-48 bg-starnox-dark rounded-md shadow-lg py-1 z-20 border border-starnox-primary">
// //                   <Link to="/profile" className="block px-4 py-2 text-sm text-starnox-text-light hover:bg-starnox-primary/50" onClick={() => setIsUserDropdownOpen(false)}>Profile</Link>
// //                   <button onClick={logoutHandler} className="block w-full text-left px-4 py-2 text-sm text-starnox-text-light hover:bg-starnox-primary/50">Logout</button>
// //                 </div>
// //               )}
// //             </div>
// //           ) : (
// //             <Link to="/login" className="flex items-center hover:text-starnox-secondary transition-colors duration-200">
// //               <FaUser className="mr-1" /> Sign In
// //             </Link>
// //           )}

// //           {userInfo && userInfo.isAdmin && (
// //             <div className="relative">
// //               <button
// //                 onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
// //                 className="flex items-center capitalize hover:text-starnox-secondary focus:outline-none transition-colors duration-200"
// //               >
// //                 <MdDashboard className="mr-1" /> Admin
// //               </button>
// //               {isAdminDropdownOpen && (
// //                 <div className="absolute right-0 mt-2 w-48 bg-starnox-dark rounded-md shadow-lg py-1 z-20 border border-starnox-primary">
// //                   <Link to="/admin/productlist" className="block px-4 py-2 text-sm text-starnox-text-light hover:bg-starnox-primary/50" onClick={() => setIsAdminDropdownOpen(false)}>
// //                     <FaTshirt className="inline-block mr-2" /> Products
// //                   </Link>
// //                   <Link to="/admin/userlist" className="block px-4 py-2 text-sm text-starnox-text-light hover:bg-starnox-primary/50" onClick={() => setIsAdminDropdownOpen(false)}>
// //                     <FaUsers className="inline-block mr-2" /> Users
// //                   </Link>
// //                   <Link to="/admin/orderlist" className="block px-4 py-2 text-sm text-starnox-text-light hover:bg-starnox-primary/50" onClick={() => setIsAdminDropdownOpen(false)}>
// //                     <FaClipboardList className="inline-block mr-2" /> Orders
// //                   </Link>
// //                   <Link to="/admin/categorylist" className="block px-4 py-2 text-sm text-starnox-text-light hover:bg-starnox-primary/50" onClick={() => setIsAdminDropdownOpen(false)}>
// //                     <FaStar className="inline-block mr-2" /> Categories
// //                   </Link>
// //                   <Link to="/admin/couponlist" className="block px-4 py-2 text-sm text-starnox-text-light hover:bg-starnox-primary/50" onClick={() => setIsAdminDropdownOpen(false)}>
// //                     <FaTags className="inline-block mr-2" /> Coupons
// //                   </Link>
// //                 </div>
// //               )}
// //             </div>
// //           )}
// //         </nav>

// //         {/* Mobile Navigation */}
// //         {isMobileMenuOpen && (
// //           <div className="absolute top-full left-0 w-full bg-starnox-dark border-t border-starnox-primary z-10 p-4 md:hidden">
// //             <nav className="flex flex-col space-y-4">
// //               <SearchBox onSearchSubmit={closeMobileMenu} /> {/* Pass a prop to close menu on search */}

// //               <Link to="/cart" className="flex items-center hover:text-starnox-secondary transition-colors duration-200" onClick={closeMobileMenu}>
// //                 <FaShoppingCart className="mr-2" /> Cart
// //                 {cartItems.length > 0 && (
// //                   <span className="ml-1 px-2 py-0.5 text-xs font-bold text-white bg-starnox-primary rounded-full">
// //                     {cartItems.reduce((acc, item) => acc + item.qty, 0)}
// //                   </span>
// //                 )}
// //               </Link>

// //               <Link to="/wishlist" className="flex items-center hover:text-starnox-secondary transition-colors duration-200" onClick={closeMobileMenu}>
// //                 <FaHeart className="mr-2" /> Wishlist
// //               </Link>

// //               {userInfo ? (
// //                 <>
// //                   <Link to="/profile" className="flex items-center hover:text-starnox-secondary transition-colors duration-200" onClick={closeMobileMenu}>
// //                     <FaUser className="mr-2" /> Profile
// //                   </Link>
// //                   <button onClick={logoutHandler} className="flex items-center text-left hover:text-starnox-secondary transition-colors duration-200">
// //                     Logout
// //                   </button>
// //                 </>
// //               ) : (
// //                 <Link to="/login" className="flex items-center hover:text-starnox-secondary transition-colors duration-200" onClick={closeMobileMenu}>
// //                   <FaUser className="mr-2" /> Sign In
// //                 </Link>
// //               )}

// //               {userInfo && userInfo.isAdmin && (
// //                 <>
// //                   <div className="border-t border-starnox-primary pt-4 mt-4">
// //                     <span className="flex items-center text-starnox-secondary font-semibold mb-2">
// //                       <MdDashboard className="mr-2" /> Admin Panel
// //                     </span>
// //                     <ul className="pl-4 space-y-2">
// //                       <li>
// //                         <Link to="/admin/productlist" className="block text-starnox-text-light hover:text-starnox-secondary" onClick={closeMobileMenu}>
// //                           <FaTshirt className="inline-block mr-2" /> Products
// //                         </Link>
// //                       </li>
// //                       <li>
// //                         <Link to="/admin/userlist" className="block text-starnox-text-light hover:text-starnox-secondary" onClick={closeMobileMenu}>
// //                           <FaUsers className="inline-block mr-2" /> Users
// //                         </Link>
// //                       </li>
// //                       <li>
// //                         <Link to="/admin/orderlist" className="block text-starnox-text-light hover:text-starnox-secondary" onClick={closeMobileMenu}>
// //                           <FaClipboardList className="inline-block mr-2" /> Orders
// //                         </Link>
// //                       </li>
// //                       <li>
// //                         <Link to="/admin/categorylist" className="block text-starnox-text-light hover:text-starnox-secondary" onClick={closeMobileMenu}>
// //                           <FaStar className="inline-block mr-2" /> Categories
// //                         </Link>
// //                       </li>
// //                       <li>
// //                         <Link to="/admin/couponlist" className="block text-starnox-text-light hover:text-starnox-secondary" onClick={closeMobileMenu}>
// //                           <FaTags className="inline-block mr-2" /> Coupons
// //                         </Link>
// //                       </li>
// //                     </ul>
// //                   </div>
// //                 </>
// //               )}
// //             </nav>
// //           </div>
// //         )}
// //       </div>
// //     </header>
// //   );
// // };

// // export default Header;

// // frontend/src/components/common/Header.jsx
// import React, { useState, useRef, useEffect } from 'react';
// import { FaShoppingCart, FaUser, FaHeart, FaStar, FaTshirt, FaUsers, FaClipboardList, FaTags, FaBars, FaTimes } from 'react-icons/fa';
// import { MdDashboard } from 'react-icons/md';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useLogoutMutation } from '../../redux/slices/usersApiSlice';
// import { logout } from '../../redux/slices/authSlice';
// import SearchBox from './SearchBox'; // Assuming SearchBox exists

// // Place your logo here: frontend/src/assets/logos/starnox_logo.png
// import starnoxLogo from '../../assets/logos/starnox_logo.png';

// const Header = () => {
//   const { cartItems } = useSelector((state) => state.cart);
//   const { userInfo } = useSelector((state) => state.auth);
//   // Assuming wishlistItems exists in your Redux store, similar to cartItems
//   const { wishlistItems } = useSelector((state) => state.wishlist || { wishlistItems: [] }); // Add wishlistItems state

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [logoutApiCall] = useLogoutMutation();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
//   const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);

//   // Refs for dropdowns to detect clicks outside
//   const userDropdownRef = useRef(null);
//   const adminDropdownRef = useRef(null);
//   const mobileMenuRef = useRef(null); // Ref for mobile menu

//   // Close dropdowns/mobile menu on click outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
//         setIsUserDropdownOpen(false);
//       }
//       if (adminDropdownRef.current && !adminDropdownRef.current.contains(event.target)) {
//         setIsAdminDropdownOpen(false);
//       }
//       if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
//         // Only close if the click is outside the button that toggles it too
//         if (!event.target.closest('.mobile-menu-toggle')) {
//           setIsMobileMenuOpen(false);
//         }
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const logoutHandler = async () => {
//     try {
//       await logoutApiCall().unwrap();
//       dispatch(logout());
//       navigate('/login');
//       // Using toast for user feedback
//       import('react-toastify').then(({ toast }) => {
//         toast.success('Logged out successfully');
//       });
//       setIsUserDropdownOpen(false); // Close dropdown on logout
//       setIsMobileMenuOpen(false); // Close mobile menu
//     } catch (err) {
//       console.error(err);
//       // Using toast for error feedback
//       import('react-toastify').then(({ toast }) => {
//         toast.error(err?.data?.message || 'Failed to logout');
//       });
//     }
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//     // Close dropdowns when mobile menu is toggled
//     setIsUserDropdownOpen(false);
//     setIsAdminDropdownOpen(false);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <header className="bg-starnox-dark text-starnox-text-light py-3 shadow-lg">
//       <div className="container mx-auto px-4 flex justify-between items-center relative">
//         {/* Logo and Brand */}
//         <Link to="/" className="flex items-center space-x-2">
//           <img src={starnoxLogo} alt="StarNox Logo" className="h-10 w-auto" />
//           <span className="font-hero text-3xl text-starnox-secondary tracking-wider">StarNox</span>
//         </Link>

//         {/* Mobile Menu Toggle */}
//         <div className="md:hidden">
//           <button onClick={toggleMobileMenu} className="text-starnox-text-light text-2xl focus:outline-none mobile-menu-toggle">
//             {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center space-x-6">
//           {/* SearchBox - Desktop Version */}
//           {/* Enhanced styling for the SearchBox container */}
//           <div className="relative w-64 max-w-sm"> {/* Increased width and max-width for desktop */}
//             <SearchBox />
//           </div>

//           <Link to="/cart" className="flex items-center hover:text-starnox-secondary transition-colors duration-200">
//             <FaShoppingCart className="mr-1" /> Cart
//             {cartItems.length > 0 && (
//               <span className="ml-1 px-2 py-0.5 text-xs font-bold text-white bg-starnox-primary rounded-full">
//                 {cartItems.reduce((acc, item) => acc + item.qty, 0)}
//               </span>
//             )}
//           </Link>

//           <Link to="/wishlist" className="flex items-center hover:text-starnox-secondary transition-colors duration-200">
//             <FaHeart className="mr-1" /> Wishlist
//             {/* Wishlist count re-added */}
//             {wishlistItems.length > 0 && (
//               <span className="ml-1 px-2 py-0.5 text-xs font-bold text-white bg-starnox-primary rounded-full">
//                 {wishlistItems.length}
//               </span>
//             )}
//           </Link>

//           {userInfo ? (
//             <div className="relative" ref={userDropdownRef}>
//               <button
//                 onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
//                 className="flex items-center capitalize hover:text-starnox-secondary focus:outline-none transition-colors duration-200"
//               >
//                 <FaUser className="mr-1" /> {userInfo.name.split(' ')[0]} {/* Profile name reverted */}
//               </button>
//               {isUserDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-starnox-dark rounded-md shadow-lg py-1 z-20 border border-starnox-primary">
//                   <Link to="/profile" className="block px-4 py-2 text-sm text-starnox-text-light hover:bg-starnox-primary/50" onClick={() => setIsUserDropdownOpen(false)}>Profile</Link>
//                   <button onClick={logoutHandler} className="block w-full text-left px-4 py-2 text-sm text-starnox-text-light hover:bg-starnox-primary/50">Logout</button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link to="/login" className="flex items-center hover:text-starnox-secondary transition-colors duration-200">
//               <FaUser className="mr-1" /> Sign In
//             </Link>
//           )}

//           {userInfo && userInfo.isAdmin && (
//             <div className="relative" ref={adminDropdownRef}>
//               <button
//                 onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
//                 className="flex items-center capitalize hover:text-starnox-secondary focus:outline-none transition-colors duration-200"
//               >
//                 <MdDashboard className="mr-1" /> Admin
//               </button>
//               {isAdminDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-starnox-dark rounded-md shadow-lg py-1 z-20 border border-starnox-primary">
//                   <Link to="/admin/productlist" className="block px-4 py-2 text-sm text-starnox-text-light hover:bg-starnox-primary/50" onClick={() => setIsAdminDropdownOpen(false)}>
//                     <FaTshirt className="inline-block mr-2" /> Products
//                   </Link>
//                   <Link to="/admin/userlist" className="block px-4 py-2 text-sm text-starnox-text-light hover:bg-starnox-primary/50" onClick={() => setIsAdminDropdownOpen(false)}>
//                     <FaUsers className="inline-block mr-2" /> Users
//                   </Link>
//                   <Link to="/admin/orderlist" className="block px-4 py-2 text-sm text-starnox-text-light hover:bg-starnox-primary/50" onClick={() => setIsAdminDropdownOpen(false)}>
//                     <FaClipboardList className="inline-block mr-2" /> Orders
//                   </Link>
//                   <Link to="/admin/categorylist" className="block px-4 py-2 text-sm text-starnox-text-light hover:bg-starnox-primary/50" onClick={() => setIsAdminDropdownOpen(false)}>
//                     <FaStar className="inline-block mr-2" /> Categories
//                   </Link>
//                   <Link to="/admin/couponlist" className="block px-4 py-2 text-sm text-starnox-text-light hover:bg-starnox-primary/50" onClick={() => setIsAdminDropdownOpen(false)}>
//                     <FaTags className="inline-block mr-2" /> Coupons
//                   </Link>
//                 </div>
//               )}
//             </div>
//           )}
//         </nav>

//         {/* Mobile Navigation */}
//         {isMobileMenuOpen && (
//           <div ref={mobileMenuRef} className="absolute top-full left-0 w-full bg-starnox-dark border-t border-starnox-primary z-10 p-4 md:hidden animate-slide-down">
//             <nav className="flex flex-col space-y-4">
//               {/* SearchBox for Mobile - Also styled for better appearance */}
//               <div className="relative w-full mb-4"> {/* Added margin-bottom for spacing */}
//                 <SearchBox onSearchSubmit={closeMobileMenu} />
//               </div>

//               <Link to="/cart" className="flex items-center hover:text-starnox-secondary transition-colors duration-200" onClick={closeMobileMenu}>
//                 <FaShoppingCart className="mr-2" /> Cart
//                 {cartItems.length > 0 && (
//                   <span className="ml-1 px-2 py-0.5 text-xs font-bold text-white bg-starnox-primary rounded-full">
//                     {cartItems.reduce((acc, item) => acc + item.qty, 0)}
//                   </span>
//                 )}
//               </Link>

//               <Link to="/wishlist" className="flex items-center hover:text-starnox-secondary transition-colors duration-200" onClick={closeMobileMenu}>
//                 <FaHeart className="mr-2" /> Wishlist
//                 {/* Wishlist count re-added for mobile */}
//                 {wishlistItems.length > 0 && (
//                   <span className="ml-1 px-2 py-0.5 text-xs font-bold text-white bg-starnox-primary rounded-full">
//                     {wishlistItems.length}
//                   </span>
//                 )}
//               </Link>

//               {userInfo ? (
//                 <>
//                   <Link to="/profile" className="flex items-center hover:text-starnox-secondary transition-colors duration-200" onClick={closeMobileMenu}>
//                     <FaUser className="mr-2" /> Profile
//                   </Link>
//                   <button onClick={logoutHandler} className="flex items-center text-left hover:text-starnox-secondary transition-colors duration-200">
//                     Logout
//                   </button>
//                 </>
//               ) : (
//                 <Link to="/login" className="flex items-center hover:text-starnox-secondary transition-colors duration-200" onClick={closeMobileMenu}>
//                   <FaUser className="mr-2" /> Sign In
//                 </Link>
//               )}

//               {userInfo && userInfo.isAdmin && (
//                 <>
//                   <div className="border-t border-starnox-primary pt-4 mt-4">
//                     <span className="flex items-center text-starnox-secondary font-semibold mb-2">
//                       <MdDashboard className="mr-2" /> Admin Panel
//                     </span>
//                     <ul className="pl-4 space-y-2">
//                       <li>
//                         <Link to="/admin/productlist" className="block text-starnox-text-light hover:text-starnox-secondary" onClick={closeMobileMenu}>
//                           <FaTshirt className="inline-block mr-2" /> Products
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to="/admin/userlist" className="block text-starnox-text-light hover:text-starnox-secondary" onClick={closeMobileMenu}>
//                           <FaUsers className="inline-block mr-2" /> Users
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to="/admin/orderlist" className="block text-starnox-text-light hover:text-starnox-secondary" onClick={closeMobileMenu}>
//                           <FaClipboardList className="inline-block mr-2" /> Orders
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to="/admin/categorylist" className="block text-starnox-text-light hover:text-starnox-secondary" onClick={closeMobileMenu}>
//                           <FaStar className="inline-block mr-2" /> Categories
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to="/admin/couponlist" className="block text-starnox-text-light hover:text-starnox-secondary" onClick={closeMobileMenu}>
//                           <FaTags className="inline-block mr-2" /> Coupons
//                         </Link>
//                       </li>
//                     </ul>
//                   </div>
//                 </>
//               )}
//             </nav>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;
// frontend/src/components/common/Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FaShoppingCart, FaUser, FaHeart, FaStar, FaTshirt, FaUsers, FaClipboardList, FaTags, FaBars, FaTimes } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../../redux/slices/usersApiSlice';
import { logout } from '../../redux/slices/authSlice';
import SearchBox from './SearchBox'; // Assuming SearchBox exists

// Place your logo here: frontend/src/assets/logos/starnox_logo.png
import starnoxLogo from '../../assets/logos/starnox_logo.png';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  // Assuming wishlistItems exists in your Redux store, similar to cartItems
  const { wishlistItems } = useSelector((state) => state.wishlist || { wishlistItems: [] }); // Add wishlistItems state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);

  // Refs for dropdowns to detect clicks outside
  const userDropdownRef = useRef(null);
  const adminDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null); // Ref for mobile menu

  // Close dropdowns/mobile menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
      if (adminDropdownRef.current && !adminDropdownRef.current.contains(event.target)) {
        setIsAdminDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        // Only close if the click is outside the button that toggles it too
        if (!event.target.closest('.mobile-menu-toggle')) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
      // Using toast for user feedback
      import('react-toastify').then(({ toast }) => {
        toast.success('Logged out successfully');
      });
      setIsUserDropdownOpen(false); // Close dropdown on logout
      setIsMobileMenuOpen(false); // Close mobile menu
    } catch (err) {
      console.error(err);
      // Using toast for error feedback
      import('react-toastify').then(({ toast }) => {
        toast.error(err?.data?.message || 'Failed to logout');
      });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close dropdowns when mobile menu is toggled
    setIsUserDropdownOpen(false);
    setIsAdminDropdownOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-starnox-dark text-starnox-text-light py-3 shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center relative">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={starnoxLogo} alt="StarNox Logo" className="h-10 w-auto" />
          <span className="font-hero text-3xl text-starnox-secondary tracking-wider">StarNox</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-starnox-text-light text-2xl focus:outline-none mobile-menu-toggle">
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {/* SearchBox - Desktop Version */}
          {/* Enhanced styling for the SearchBox container */}
          <div className="relative w-64 max-w-sm"> {/* Increased width and max-width for desktop */}
            <SearchBox />
          </div>

          <Link to="/cart" className="flex items-center hover:text-starnox-secondary transition-colors duration-200">
            <FaShoppingCart className="mr-1" /> Cart
            {cartItems.length > 0 && (
              <span className="ml-1 px-2 py-0.5 text-xs font-bold text-white bg-starnox-primary rounded-full">
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </span>
            )}
          </Link>

          <Link to="/wishlist" className="flex items-center hover:text-starnox-secondary transition-colors duration-200">
            <FaHeart className="mr-1" /> Wishlist
            {/* Wishlist count re-added */}
            {wishlistItems.length > 0 && (
              <span className="ml-1 px-2 py-0.5 text-xs font-bold text-white bg-starnox-primary rounded-full">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {userInfo ? (
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center capitalize hover:text-starnox-secondary focus:outline-none transition-colors duration-200"
              >
                <FaUser className="mr-1" /> {userInfo.name?.split(' ')[0] || 'User'} {/* 🚨 FIX APPLIED HERE */}
              </button>
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-starnox-dark rounded-md shadow-lg py-1 z-20 border border-starnox-primary">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-starnox-text-light hover:bg-starnox-primary/50" onClick={() => setIsUserDropdownOpen(false)}>Profile</Link>
                  <button onClick={logoutHandler} className="block w-full text-left px-4 py-2 text-sm text-starnox-text-light hover:bg-starnox-primary/50">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex items-center hover:text-starnox-secondary transition-colors duration-200">
              <FaUser className="mr-1" /> Sign In
            </Link>
          )}

          {userInfo && userInfo.isAdmin && (
            <div className="relative" ref={adminDropdownRef}>
              <button
                onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                className="flex items-center capitalize hover:text-starnox-secondary focus:outline-none transition-colors duration-200"
              >
                <MdDashboard className="mr-1" /> Admin
              </button>
              {isAdminDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-starnox-dark rounded-md shadow-lg py-1 z-20 border border-starnox-primary">
                  <Link to="/admin/productlist" className="block px-4 py-2 text-sm text-starnox-text-light hover:bg-starnox-primary/50" onClick={() => setIsAdminDropdownOpen(false)}>
                    <FaTshirt className="inline-block mr-2" /> Products
                  </Link>
                  <Link to="/admin/userlist" className="block px-4 py-2 text-sm text-starnox-text-light hover:bg-starnox-primary/50" onClick={() => setIsAdminDropdownOpen(false)}>
                    <FaUsers className="inline-block mr-2" /> Users
                  </Link>
                  <Link to="/admin/orderlist" className="block px-4 py-2 text-sm text-starnox-text-light hover:bg-starnox-primary/50" onClick={() => setIsAdminDropdownOpen(false)}>
                    <FaClipboardList className="inline-block mr-2" /> Orders
                  </Link>
                  <Link to="/admin/categorylist" className="block px-4 py-2 text-sm text-starnox-text-light hover:bg-starnox-primary/50" onClick={() => setIsAdminDropdownOpen(false)}>
                    <FaStar className="inline-block mr-2" /> Categories
                  </Link>
                  <Link to="/admin/couponlist" className="block px-4 py-2 text-sm text-starnox-text-light hover:bg-starnox-primary/50" onClick={() => setIsAdminDropdownOpen(false)}>
                    <FaTags className="inline-block mr-2" /> Coupons
                  </Link>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div ref={mobileMenuRef} className="absolute top-full left-0 w-full bg-starnox-dark border-t border-starnox-primary z-10 p-4 md:hidden animate-slide-down">
            <nav className="flex flex-col space-y-4">
              {/* SearchBox for Mobile - Also styled for better appearance */}
              <div className="relative w-full mb-4"> {/* Added margin-bottom for spacing */}
                <SearchBox onSearchSubmit={closeMobileMenu} />
              </div>

              <Link to="/cart" className="flex items-center hover:text-starnox-secondary transition-colors duration-200" onClick={closeMobileMenu}>
                <FaShoppingCart className="mr-2" /> Cart
                {cartItems.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 text-xs font-bold text-white bg-starnox-primary rounded-full">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </span>
                )}
              </Link>

              <Link to="/wishlist" className="flex items-center hover:text-starnox-secondary transition-colors duration-200" onClick={closeMobileMenu}>
                <FaHeart className="mr-2" /> Wishlist
                {/* Wishlist count re-added for mobile */}
                {wishlistItems.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 text-xs font-bold text-white bg-starnox-primary rounded-full">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {userInfo ? (
                <>
                  <Link to="/profile" className="flex items-center hover:text-starnox-secondary transition-colors duration-200" onClick={closeMobileMenu}>
                    <FaUser className="mr-2" /> Profile
                  </Link>
                  <button onClick={logoutHandler} className="flex items-center text-left hover:text-starnox-secondary transition-colors duration-200">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="flex items-center hover:text-starnox-secondary transition-colors duration-200" onClick={closeMobileMenu}>
                  <FaUser className="mr-2" /> Sign In
                </Link>
              )}

              {userInfo && userInfo.isAdmin && (
                <>
                  <div className="border-t border-starnox-primary pt-4 mt-4">
                    <span className="flex items-center text-starnox-secondary font-semibold mb-2">
                      <MdDashboard className="mr-2" /> Admin Panel
                    </span>
                    <ul className="pl-4 space-y-2">
                      <li>
                        <Link to="/admin/productlist" className="block text-starnox-text-light hover:text-starnox-secondary" onClick={closeMobileMenu}>
                          <FaTshirt className="inline-block mr-2" /> Products
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/userlist" className="block text-starnox-text-light hover:text-starnox-secondary" onClick={closeMobileMenu}>
                          <FaUsers className="inline-block mr-2" /> Users
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/orderlist" className="block text-starnox-text-light hover:text-starnox-secondary" onClick={closeMobileMenu}>
                          <FaClipboardList className="inline-block mr-2" /> Orders
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/categorylist" className="block text-starnox-text-light hover:text-starnox-secondary" onClick={closeMobileMenu}>
                          <FaStar className="inline-block mr-2" /> Categories
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/couponlist" className="block text-starnox-text-light hover:text-starnox-secondary" onClick={closeMobileMenu}>
                          <FaTags className="inline-block mr-2" /> Coupons
                        </Link>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
