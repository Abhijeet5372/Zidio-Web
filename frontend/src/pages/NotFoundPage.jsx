// frontend/src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
      <FaExclamationTriangle className="text-starnox-secondary text-6xl mb-4" />
      <Typography variant="h3" component="h1" className="text-starnox-dark font-bold mb-4">
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" className="text-starnox-text-dark mb-6">
        The page you are looking for does not exist.
      </Typography>
      <Link to="/">
        <Button
          variant="contained"
          className="btn-primary"
          sx={{ borderRadius: '8px', padding: '10px 20px', textTransform: 'none' }}
        >
          Go to Homepage
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;