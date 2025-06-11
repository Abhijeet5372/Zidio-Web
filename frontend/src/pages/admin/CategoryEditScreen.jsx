// frontend/src/pages/admin/CategoryEditScreen.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useGetCategoryDetailsQuery,
  useUpdateCategoryMutation,
} from '../../redux/slices/categorySlice';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';
import FormContainer from '../../components/common/FormContainer';
import { toast } from 'react-toastify';
import {
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';

const CategoryEditScreen = () => {
  const { id: categoryId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const {
    data: category,
    isLoading,
    error,
    refetch,
  } = useGetCategoryDetailsQuery(categoryId);

  const [updateCategory, { isLoading: loadingUpdate }] = useUpdateCategoryMutation();

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
    }
  }, [category]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Category name cannot be empty.');
      return;
    }
    try {
      await updateCategory({
        categoryId,
        name,
        description,
      }).unwrap();
      toast.success('Category updated successfully');
      refetch();
      navigate('/admin/categorylist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <Link to="/admin/categorylist" className="text-starnox-primary hover:underline mb-4 inline-block">
        Go Back
      </Link>
      <Typography variant="h4" component="h1" className="text-starnox-primary font-bold mb-6 text-center">
        Edit Category
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
            label="Category Name"
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
            fullWidth
            id="description"
            label="Description"
            name="description"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            disabled={loadingUpdate}
          >
            {loadingUpdate ? <Loader /> : 'Update'}
          </Button>
        </Box>
      )}
    </FormContainer>
  );
};

export default CategoryEditScreen;