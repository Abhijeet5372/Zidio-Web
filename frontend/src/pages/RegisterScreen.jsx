// frontend/src/pages/RegisterScreen.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../redux/slices/usersApiSlice';
import { setCredentials } from '../redux/slices/authSlice';
import FormContainer from '../components/common/FormContainer';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import { toast } from 'react-toastify';
import {
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <Typography variant="h4" component="h1" className="text-starnox-primary font-bold mb-6 text-center">
        Register
      </Typography>
      <Box component="form" onSubmit={submitHandler} sx={{ width: '100%' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            '& label.Mui-focused': { color: '#6b46c1' },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': { borderColor: '#6b46c1' },
            },
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            '& label.Mui-focused': { color: '#6b46c1' },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': { borderColor: '#6b46c1' },
            },
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            '& label.Mui-focused': { color: '#6b46c1' },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': { borderColor: '#6b46c1' },
            },
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{
            '& label.Mui-focused': { color: '#6b46c1' },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': { borderColor: '#6b46c1' },
            },
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="btn-primary"
          sx={{ mt: 3, mb: 2, padding: '10px', borderRadius: '8px' }}
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : 'Register'}
        </Button>
      </Box>

      <div className="flex justify-center mt-4">
        <Typography variant="body2" className="text-starnox-text-dark">
          Have an Account?{' '}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : '/login'}
            className="text-starnox-primary hover:underline"
          >
            Login
          </Link>
        </Typography>
      </div>
    </FormContainer>
  );
};

export default RegisterScreen;