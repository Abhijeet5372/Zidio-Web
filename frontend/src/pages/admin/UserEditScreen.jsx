// frontend/src/pages/admin/UserEditScreen.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../redux/slices/usersApiSlice';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';
import FormContainer from '../../components/common/FormContainer';
import { toast } from 'react-toastify';
import {
  Typography,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error('Name and Email cannot be empty.');
      return;
    }
    try {
      await updateUser({ userId, name, email, isAdmin }).unwrap();
      toast.success('User updated successfully');
      refetch();
      navigate('/admin/userlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <Link to="/admin/userlist" className="text-starnox-primary hover:underline mb-4 inline-block">
        Go Back
      </Link>
      <Typography variant="h4" component="h1" className="text-starnox-primary font-bold mb-6 text-center">
        Edit User
      </Typography>

      {loadingUpdate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error?.data?.message || error.error}</Message>
      ) : (
        <Box component="form" onSubmit={submitHandler} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              '& label.Mui-focused': { color: '#6b46c1' },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': { borderColor: '#6b46c1' },
              },
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                name="isAdmin"
                sx={{
                  color: '#6b46c1', // Custom color for unchecked state
                  '&.Mui-checked': {
                    color: '#6b46c1', // Custom color for checked state
                  },
                }}
              />
            }
            label="Is Admin"
            className="text-starnox-text-dark"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="btn-primary"
            sx={{ mt: 3, mb: 2, padding: '10px', borderRadius: '8px' }}
            disabled={loadingUpdate}
          >
            {loadingUpdate ? <Loader /> : 'Update'}
          </Button>
        </Box>
      )}
    </FormContainer>
  );
};

export default UserEditScreen;