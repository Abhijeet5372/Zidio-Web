// frontend/src/pages/ProductScreen.jsx
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import Rating from '../components/common/Rating';
import Meta from '../components/common/Meta';
import CustomModal from '../components/ui/CustomModal'; // For review submission
import { toast } from 'react-toastify';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Button,
  FormControl,
  Select,
  MenuItem,
  Divider,
  TextField,
  Box,
  InputLabel, // <--- ADD THIS IMPORT: Import InputLabel from @mui/material
} from '@mui/material';
import defaultProductImage from '../assets/images/default_product.png'; // Default image fallback

const ProductScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingReview }] = useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success('Product added to cart!');
    navigate('/cart');
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch(); // Refetch product details to show new review
      toast.success('Review submitted successfully');
      setRating(0);
      setComment('');
      setShowReviewModal(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = defaultProductImage;
  };

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-starnox-primary hover:underline inline-block mb-4">
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />
          <Grid container spacing={4} className="mb-8">
            <Grid item md={6}>
              <img
                src={product.image || defaultProductImage}
                alt={product.name}
                onError={handleImageError}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </Grid>
            <Grid item md={3}>
              <Card className="rounded-lg shadow-md p-4 bg-white">
                <CardContent>
                  <List>
                    <ListItem className="py-2">
                      <ListItemText
                        primary={
                          <Typography variant="h5" component="h1" className="text-starnox-dark font-bold">
                            {product.name}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <Divider />
                    <ListItem className="py-2">
                      <ListItemText
                        primary={
                          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        }
                      />
                    </ListItem>
                    <Divider />
                    <ListItem className="py-2">
                      <ListItemText
                        primary={
                          <Typography variant="h6" className="text-starnox-primary font-bold">
                            Price: ${product.price.toFixed(2)}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <Divider />
                    <ListItem className="py-2">
                      <ListItemText
                        primary={
                          <Typography variant="body1" className="text-starnox-text-dark">
                            Description: {product.description}
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={3}>
              <Card className="rounded-lg shadow-md p-4 bg-white">
                <CardContent>
                  <List>
                    <ListItem className="py-2">
                      <ListItemText primary={<Typography variant="body1">Price:</Typography>} />
                      <Typography variant="body1" className="font-bold">${product.price.toFixed(2)}</Typography>
                    </ListItem>
                    <Divider />
                    <ListItem className="py-2">
                      <ListItemText primary={<Typography variant="body1">Status:</Typography>} />
                      <Typography variant="body1">
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Typography>
                    </ListItem>
                    <Divider />
                    {product.countInStock > 0 && (
                      <ListItem className="py-2">
                        <ListItemText primary={<Typography variant="body1">Qty</Typography>} />
                        <FormControl variant="outlined" size="small" sx={{ minWidth: 80 }}>
                          {/* InputLabel is used here for the Quantity select */}
                          <InputLabel id="qty-select-label">Qty</InputLabel>
                          <Select
                            labelId="qty-select-label"
                            id="qty-select"
                            value={qty}
                            label="Qty" // Important for OutlinedInput variant
                            onChange={(e) => setQty(Number(e.target.value))}
                            className="rounded-md border border-gray-300"
                          >
                            {[...Array(product.countInStock).keys()].map((x) => (
                              <MenuItem key={x + 1} value={x + 1}>
                                {x + 1}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </ListItem>
                    )}
                    <ListItem className="py-2">
                      <Button
                        variant="contained"
                        fullWidth
                        className="btn-primary"
                        sx={{ borderRadius: '8px', padding: '10px', textTransform: 'none' }}
                        disabled={product.countInStock === 0}
                        onClick={addToCartHandler}
                      >
                        Add To Cart
                      </Button>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Reviews Section */}
          <div className="mt-8">
            <Typography variant="h5" component="h2" className="text-starnox-dark font-bold mb-4 border-b pb-2">
              Reviews
            </Typography>
            {product.reviews.length === 0 && <Message variant="info">No Reviews</Message>}
            <List className="bg-white rounded-lg shadow-md p-4">
              {product.reviews.map((review) => (
                <div key={review._id}>
                  <ListItem className="flex-col items-start py-3">
                    <div className="w-full flex justify-between items-center mb-1">
                      <Typography variant="subtitle1" className="font-semibold text-starnox-dark">
                        {review.name}
                      </Typography>
                      <Rating value={review.rating} />
                    </div>
                    <Typography variant="body2" className="text-gray-600 mb-2">
                      {review.createdAt.substring(0, 10)}
                    </Typography>
                    <Typography variant="body1" className="text-starnox-text-dark">
                      {review.comment}
                    </Typography>
                  </ListItem>
                  <Divider component="li" className="my-2" />
                </div>
              ))}
            </List>

            <div className="mt-6">
              <Typography variant="h6" component="h3" className="text-starnox-dark font-bold mb-3">
                Write a Customer Review
              </Typography>
              {loadingReview && <Loader />}
              {userInfo ? (
                <Button
                  variant="contained"
                  className="btn-primary"
                  sx={{ borderRadius: '8px', padding: '10px 20px', textTransform: 'none' }}
                  onClick={() => setShowReviewModal(true)}
                >
                  Add Review
                </Button>
              ) : (
                <Message variant="info">
                  Please <Link to="/login" className="text-starnox-primary hover:underline">sign in</Link> to write a review
                </Message>
              )}
            </div>
          </div>

          {/* Review Submission Modal */}
          <CustomModal isOpen={showReviewModal} onClose={() => setShowReviewModal(false)} title="Submit Review">
            <Box component="form" onSubmit={submitReviewHandler} sx={{ mt: 2 }}>
              <FormControl fullWidth margin="normal" required sx={{
                '& label.Mui-focused': { color: '#6b46c1' },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#6b46c1' },
                },
              }}>
                {/* InputLabel is used here for the Rating select */}
                <InputLabel id="rating-label">Rating</InputLabel>
                <Select
                  labelId="rating-label"
                  id="rating"
                  value={rating}
                  label="Rating" // Important for OutlinedInput variant
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  <MenuItem value={0}>Select...</MenuItem>
                  <MenuItem value={1}>1 - Poor</MenuItem>
                  <MenuItem value={2}>2 - Fair</MenuItem>
                  <MenuItem value={3}>3 - Good</MenuItem>
                  <MenuItem value={4}>4 - Very Good</MenuItem>
                  <MenuItem value={5}>5 - Excellent</MenuItem>
                </Select>
              </FormControl>
              <TextField
                margin="normal"
                required
                fullWidth
                id="comment"
                label="Comment"
                name="comment"
                multiline
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
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
                disabled={loadingReview}
              >
                {loadingReview ? <Loader /> : 'Submit'}
              </Button>
            </Box>
          </CustomModal>
        </>
      )}
    </div>
  );
};

export default ProductScreen;