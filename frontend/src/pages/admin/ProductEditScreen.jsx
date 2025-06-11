// frontend/src/pages/admin/ProductEditScreen.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../redux/slices/productSlice';
import { useGetCategoriesQuery } from '../../redux/slices/categorySlice'; // To get categories for dropdown
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';
import FormContainer from '../../components/common/FormContainer';
import { toast } from 'react-toastify';
import {
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { FaUpload } from 'react-icons/fa';
import defaultProductImage from '../../assets/images/default_product.png'; // Default image fallback

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState(''); // Stores category ID
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId, {
    skip: !productId, // Skip query if no productId (for create mode)
  });

  const { data: categories, isLoading: loadingCategories, error: categoriesError } = useGetCategoriesQuery();

  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category); // Assuming category is stored as ID in product model
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name.trim() || price <= 0 || !image.trim() || !brand.trim() || !category.trim() || countInStock < 0 || !description.trim()) {
      toast.error('Please fill in all required fields and ensure price/stock are valid.');
      return;
    }

    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      }).unwrap();
      toast.success('Product updated successfully');
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        const res = await uploadProductImage(formData).unwrap();
        toast.success(res.message);
        setImage(res.image); // Set the image URL returned from the backend
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = defaultProductImage;
  };

  return (
    <FormContainer>
      <Link to="/admin/productlist" className="text-starnox-primary hover:underline mb-4 inline-block">
        Go Back
      </Link>
      <Typography variant="h4" component="h1" className="text-starnox-primary font-bold mb-6 text-center">
        {productId ? 'Edit Product' : 'Create Product'}
      </Typography>

      {(isLoading || loadingUpdate || loadingUpload || loadingCategories) && <Loader />}
      {error ? (
        <Message variant="error">{error?.data?.message || error.error}</Message>
      ) : categoriesError ? (
        <Message variant="error">{categoriesError?.data?.message || categoriesError.error}</Message>
      ) : (
        <Box component="form" onSubmit={submitHandler} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Product Name"
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
            id="price"
            label="Price"
            name="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            inputProps={{ min: 0, step: 0.01 }}
            sx={{
              '& label.Mui-focused': { color: '#6b46c1' },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': { borderColor: '#6b46c1' },
              },
            }}
          />

          {/* Image Upload */}
          <div className="mb-4">
            <TextField
              margin="normal"
              required
              fullWidth
              id="image"
              label="Image URL"
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              sx={{
                '& label.Mui-focused': { color: '#6b46c1' },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#6b46c1' },
                },
              }}
            />
            <input
              type="file"
              id="image-file"
              label="Choose File"
              onChange={uploadFileHandler}
              className="hidden" // Hide default input
            />
            <label htmlFor="image-file" className="block mt-2">
              <Button
                variant="outlined"
                component="span" // Makes the button act as a label for the input
                startIcon={loadingUpload ? <CircularProgress size={20} /> : <FaUpload />}
                className="btn-outline-primary"
                sx={{ borderRadius: '8px', textTransform: 'none', borderColor: '#6b46c1', color: '#6b46c1', '&:hover': { backgroundColor: '#6b46c11a' } }}
                disabled={loadingUpload}
              >
                {loadingUpload ? 'Uploading...' : 'Upload Image'}
              </Button>
            </label>
            {image && (
              <img
                src={image}
                alt="Product Preview"
                className="mt-4 w-32 h-32 object-cover rounded-md shadow-md"
                onError={handleImageError}
              />
            )}
          </div>

          <TextField
            margin="normal"
            required
            fullWidth
            id="brand"
            label="Brand"
            name="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            sx={{
              '& label.Mui-focused': { color: '#6b46c1' },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': { borderColor: '#6b46c1' },
              },
            }}
          />

          <FormControl fullWidth margin="normal" required sx={{
            '& label.Mui-focused': { color: '#6b46c1' },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': { borderColor: '#6b46c1' },
            },
          }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories && categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            required
            fullWidth
            id="countInStock"
            label="Count In Stock"
            name="countInStock"
            type="number"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            inputProps={{ min: 0 }}
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
            id="description"
            label="Description"
            name="description"
            multiline
            rows={4}
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
            disabled={loadingUpdate || loadingUpload}
          >
            {(loadingUpdate || loadingUpload) ? <Loader /> : (productId ? 'Update' : 'Create')}
          </Button>
        </Box>
      )}
    </FormContainer>
  );
};

export default ProductEditScreen;