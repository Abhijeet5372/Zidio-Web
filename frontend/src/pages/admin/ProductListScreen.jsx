// frontend/src/pages/admin/ProductListScreen.jsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../../redux/slices/productSlice';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';
import Pagination from '../../components/common/Pagination';
import CustomModal from '../../components/ui/CustomModal';
import { toast } from 'react-toastify';
import {
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
} from '@mui/material';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const ProductListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({ pageNumber });
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        toast.success('Product created successfully');
        refetch(); // Refetch products to update the list
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id).unwrap();
        toast.success('Product deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" component="h1" className="text-starnox-primary font-bold">
          Products
        </Typography>
        <Button
          variant="contained"
          className="btn-primary"
          startIcon={<FaPlus />}
          onClick={createProductHandler}
          sx={{ borderRadius: '8px', padding: '10px 20px', textTransform: 'none' }}
        >
          Create Product
        </Button>
      </div>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <TableContainer component={Paper} className="rounded-lg shadow-md overflow-hidden">
            <Table>
              <TableHead className="bg-starnox-dark">
                <TableRow>
                  <TableCell className="text-starnox-text-light font-semibold">ID</TableCell>
                  <TableCell className="text-starnox-text-light font-semibold">NAME</TableCell>
                  <TableCell className="text-starnox-text-light font-semibold">PRICE</TableCell>
                  <TableCell className="text-starnox-text-light font-semibold">CATEGORY</TableCell>
                  <TableCell className="text-starnox-text-light font-semibold">BRAND</TableCell>
                  <TableCell className="text-starnox-text-light font-semibold"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.products.map((product) => (
                  <TableRow key={product._id} className="even:bg-gray-50 hover:bg-gray-100 transition-colors duration-150">
                    <TableCell className="text-starnox-text-dark text-sm">{product._id}</TableCell>
                    <TableCell className="text-starnox-text-dark">{product.name}</TableCell>
                    <TableCell className="text-starnox-text-dark">${product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-starnox-text-dark">{product.category}</TableCell>
                    <TableCell className="text-starnox-text-dark">{product.brand}</TableCell>
                    <TableCell>
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <IconButton color="primary" sx={{ '&:hover': { color: '#6b46c1' } }}>
                          <FaEdit />
                        </IconButton>
                      </Link>
                      <IconButton color="error" onClick={() => deleteHandler(product._id)} sx={{ '&:hover': { color: '#c53030' } }}>
                        <FaTrash />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </div>
  );
};

export default ProductListScreen;