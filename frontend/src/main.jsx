// // // frontend/src/main.jsx
// // import React from 'react';
// // import ReactDOM from 'react-dom/client';
// // import { BrowserRouter } from 'react-router-dom';
// // import { Provider } from 'react-redux';
// // import { HelmetProvider } from 'react-helmet-async';
// // import App from './App.jsx';
// // import store from './redux/store.js'; // Ensure this path is correct
// // import './index.css'; // Your global Tailwind CSS

// // ReactDOM.createRoot(document.getElementById('root')).render(
// //   <React.StrictMode>
// //     <HelmetProvider>
// //       <Provider store={store}>
// //         <BrowserRouter>
// //           <App />
// //         </BrowserRouter>
// //       </Provider>
// //     </HelmetProvider>
// //   </React.StrictMode>,
// // );

// // frontend/src/main.jsx
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import store from './redux/store.js';
// import App from './App.jsx';
// import './index.css';
// import { PayPalScriptProvider } from '@paypal/react-paypal-js';
// import { ThemeProvider, createTheme } from '@mui/material/styles'; // Import ThemeProvider and createTheme

// // Define your custom Material UI theme (optional, but good for consistency)
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#6b46c1', // starnox-primary from tailwind.config.js
//     },
//     secondary: {
//       main: '#805ad5', // starnox-secondary
//     },
//     // You can define other colors here to match your Tailwind palette
//     starnox: {
//       dark: '#2d3748',
//       textLight: '#f7fafc',
//       textDark: '#4a5568',
//       background: '#f8f8f8',
//       primary: '#6b46c1',
//       secondary: '#805ad5',
//     },
//   },
//   typography: {
//     fontFamily: ['Inter', 'sans-serif'].join(','),
//     h1: {
//       fontSize: '2.5rem',
//       fontWeight: 700,
//     },
//     h4: {
//       fontSize: '1.75rem',
//       fontWeight: 600,
//     },
//     // Define other typography variants as needed
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: '8px',
//           textTransform: 'none',
//         },
//         containedPrimary: {
//           backgroundColor: '#6b46c1', // Match starnox-primary
//           '&:hover': {
//             backgroundColor: '#805ad5', // Match starnox-secondary
//           },
//         },
//         outlinedPrimary: {
//           borderColor: '#6b46c1',
//           color: '#6b46c1',
//           '&:hover': {
//             backgroundColor: '#6b46c1',
//             color: '#fff',
//           },
//         },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           '& label.Mui-focused': {
//             color: '#6b46c1', // Focus color for labels
//           },
//           '& .MuiOutlinedInput-root': {
//             '& fieldset': {
//               borderColor: '#e2e8f0', // Default border color
//             },
//             '&:hover fieldset': {
//               borderColor: '#cbd5e0', // Hover border color
//             },
//             '&.Mui-focused fieldset': {
//               borderColor: '#6b46c1', // Focused border color
//             },
//           },
//         },
//       },
//     },
//     MuiSelect: {
//       styleOverrides: {
//         root: {
//           '& .MuiOutlinedInput-notchedOutline': {
//             borderColor: '#e2e8f0',
//           },
//           '&:hover .MuiOutlinedInput-notchedOutline': {
//             borderColor: '#cbd5e0',
//           },
//           '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//             borderColor: '#6b46c1',
//           },
//         },
//       },
//     },
//     MuiRadio: {
//       styleOverrides: {
//         root: {
//           color: '#6b46c1', // Default radio color
//           '&.Mui-checked': {
//             color: '#6b46c1', // Checked radio color
//           },
//         },
//       },
//     },
//     MuiChip: {
//       styleOverrides: {
//         root: {
//           borderRadius: '6px',
//         },
//       },
//     },
//     // Add other component overrides as needed
//   },
// });

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <PayPalScriptProvider deferLoading={true}>
//         <ThemeProvider theme={theme}>
//           <App />
//         </ThemeProvider>
//       </PayPalScriptProvider>
//     </Provider>
//   </React.StrictMode>
// );

// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import App from './App.jsx';
import './index.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { HelmetProvider } from 'react-helmet-async'; // Import HelmetProvider

// Define your custom Material UI theme (optional, but good for consistency)
const theme = createTheme({
  palette: {
    primary: {
      main: '#6b46c1', // starnox-primary from tailwind.config.js
    },
    secondary: {
      main: '#805ad5', // starnox-secondary
    },
    starnox: { // Custom palette for easier access to theme colors
      dark: '#2d3748',
      textLight: '#f7fafc',
      textDark: '#4a5568',
      background: '#f8f8f8',
      primary: '#6b46c1',
      secondary: '#805ad5',
    },
  },
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
        },
        containedPrimary: {
          backgroundColor: '#6b46c1', // Match starnox-primary
          '&:hover': {
            backgroundColor: '#805ad5', // Match starnox-secondary
          },
        },
        outlinedPrimary: {
          borderColor: '#6b46c1',
          color: '#6b46c1',
          '&:hover': {
            backgroundColor: '#6b46c1',
            color: '#fff',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#6b46c1',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#e2e8f0',
            },
            '&:hover fieldset': {
              borderColor: '#cbd5e0',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#6b46c1',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e2e8f0',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#cbd5e0',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#6b46c1',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#6b46c1',
          '&.Mui-checked': {
            color: '#6b46c1',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap the entire application with HelmetProvider */}
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);