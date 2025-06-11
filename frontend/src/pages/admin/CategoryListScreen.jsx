// // frontend/src/pages/admin/CategoryListScreen.jsx
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   useGetCategoriesQuery,
//   useCreateCategoryMutation,
//   useDeleteCategoryMutation,
// } from '../../redux/slices/categorySlice';
// import Loader from '../../components/ui/Loader';
// import Message from '../../components/ui/Message';
// import CustomModal from '../../components/ui/CustomModal';
// import { toast } from 'react-toastify';
// import {
//   Typography,
//   Button,
//   TableContainer,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Paper,
//   IconButton,
//   TextField,
//   Box,
// } from '@mui/material';
// import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

// const CategoryListScreen = () => {
//   const { data: categories, isLoading, error, refetch } = useGetCategoriesQuery();
//   const [createCategory, { isLoading: loadingCreate }] = useCreateCategoryMutation();
//   const [deleteCategory, { isLoading: loadingDelete }] = useDeleteCategoryMutation();

//   const [showModal, setShowModal] = useState(false);
//   const [newCategoryName, setNewCategoryName] = useState('');
//   const [newCategoryDescription, setNewCategoryDescription] = useState('');

//   const createCategoryHandler = async () => {
//     if (!newCategoryName.trim()) {
//       toast.error('Category name cannot be empty.');
//       return;
//     }
//     try {
//       await createCategory({ name: newCategoryName, description: newCategoryDescription }).unwrap();
//       toast.success('Category created successfully');
//       setNewCategoryName('');
//       setNewCategoryDescription('');
//       setShowModal(false);
//       refetch(); // Refetch categories to update the list
//     } catch (err) {
//       toast.error(err?.data?.message || err.error);
//     }
//   };

//   const deleteHandler = async (id) => {
//     if (window.confirm('Are you sure you want to delete this category?')) {
//       try {
//         await deleteCategory(id).unwrap();
//         toast.success('Category deleted successfully');
//         refetch(); // Refetch categories to update the list
//       } catch (err) {
//         toast.error(err?.data?.message || err.error);
//       }
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <Typography variant="h4" component="h1" className="text-starnox-primary font-bold">
//           Categories
//         </Typography>
//         <Button
//           variant="contained"
//           className="btn-primary"
//           startIcon={<FaPlus />}
//           onClick={() => setShowModal(true)}
//           sx={{ borderRadius: '8px', padding: '10px 20px', textTransform: 'none' }}
//         >
//           Create Category
//         </Button>
//       </div>

//       {loadingCreate && <Loader />}
//       {loadingDelete && <Loader />}
//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="error">{error?.data?.message || error.error}</Message>
//       ) : (
//         <TableContainer component={Paper} className="rounded-lg shadow-md overflow-hidden">
//           <Table>
//             <TableHead className="bg-starnox-dark">
//               <TableRow>
//                 <TableCell className="text-starnox-text-light font-semibold">ID</TableCell>
//                 <TableCell className="text-starnox-text-light font-semibold">NAME</TableCell>
//                 <TableCell className="text-starnox-text-light font-semibold">DESCRIPTION</TableCell>
//                 <TableCell className="text-starnox-text-light font-semibold"></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {categories.map((category) => (
//                 <TableRow key={category._id} className="even:bg-gray-50 hover:bg-gray-100 transition-colors duration-150">
//                   <TableCell className="text-starnox-text-dark">{category._id}</TableCell>
//                   <TableCell className="text-starnox-text-dark">{category.name}</TableCell>
//                   <TableCell className="text-starnox-text-dark">{category.description}</TableCell>
//                   <TableCell>
//                     <Link to={`/admin/category/${category._id}/edit`}>
//                       <IconButton color="primary" sx={{ '&:hover': { color: '#6b46c1' } }}>
//                         <FaEdit />
//                       </IconButton>
//                     </Link>
//                     <IconButton color="error" onClick={() => deleteHandler(category._id)} sx={{ '&:hover': { color: '#c53030' } }}>
//                       <FaTrash />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {/* Create Category Modal */}
//       <CustomModal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Category">
//         <Box component="form" onSubmit={(e) => { e.preventDefault(); createCategoryHandler(); }} sx={{ mt: 2 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="name"
//             label="Category Name"
//             name="name"
//             value={newCategoryName}
//             onChange={(e) => setNewCategoryName(e.target.value)}
//             sx={{
//               '& label.Mui-focused': { color: '#6b46c1' },
//               '& .MuiOutlinedInput-root': {
//                 '&.Mui-focused fieldset': { borderColor: '#6b46c1' },
//               },
//             }}
//           />
//           <TextField
//             margin="normal"
//             fullWidth
//             id="description"
//             label="Description"
//             name="description"
//             multiline
//             rows={3}
//             value={newCategoryDescription}
//             onChange={(e) => setNewCategoryDescription(e.target.value)}
//             sx={{
//               '& label.Mui-focused': { color: '#6b46c1' },
//               '& .MuiOutlinedInput-root': {
//                 '&.Mui-focused fieldset': { borderColor: '#6b46c1' },
//               },
//             }}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             className="btn-primary"
//             sx={{ mt: 3, mb: 2, padding: '10px', borderRadius: '8px' }}
//             disabled={loadingCreate}
//           >
//             {loadingCreate ? <Loader /> : 'Create'}
//           </Button>
//         </Box>
//       </CustomModal>
//     </div>
//   );
// };

// export default CategoryListScreen;

// frontend/src/pages/admin/CategoryListScreen.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} from '../../redux/slices/categorySlice';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';
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
  TextField,
  Box,
} from '@mui/material';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const CategoryListScreen = () => {
  const { data: categories, isLoading, error, refetch } = useGetCategoriesQuery();
  const [createCategory, { isLoading: loadingCreate }] = useCreateCategoryMutation();
  const [deleteCategory, { isLoading: loadingDelete }] = useDeleteCategoryMutation();

  const [showModal, setShowModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');

  const createCategoryHandler = async () => {
    if (!newCategoryName.trim()) {
      toast.error('Category name cannot be empty.');
      return;
    }
    try {
      // This call is now correct because categorySlice.js's createCategory
      // mutation expects an object as its argument.
      await createCategory({ name: newCategoryName, description: newCategoryDescription }).unwrap();
      toast.success('Category created successfully');
      setNewCategoryName('');
      setNewCategoryDescription('');
      setShowModal(false);
      refetch(); // Refetch categories to update the list
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id).unwrap();
        toast.success('Category deleted successfully');
        refetch(); // Refetch categories to update the list
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" component="h1" className="text-starnox-primary font-bold">
          Categories
        </Typography>
        <Button
          variant="contained"
          className="btn-primary"
          startIcon={<FaPlus />}
          onClick={() => setShowModal(true)}
          sx={{ borderRadius: '8px', padding: '10px 20px', textTransform: 'none' }}
        >
          Create Category
        </Button>
      </div>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error?.data?.message || error.error}</Message>
      ) : (
        <TableContainer component={Paper} className="rounded-lg shadow-md overflow-hidden">
          <Table>
            <TableHead className="bg-starnox-dark">
              <TableRow>
                <TableCell className="text-starnox-text-light font-semibold">ID</TableCell>
                <TableCell className="text-starnox-text-light font-semibold">NAME</TableCell>
                <TableCell className="text-starnox-text-light font-semibold">DESCRIPTION</TableCell>
                <TableCell className="text-starnox-text-light font-semibold"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category._id} className="even:bg-gray-50 hover:bg-gray-100 transition-colors duration-150">
                  <TableCell className="text-starnox-text-dark">{category._id}</TableCell>
                  <TableCell className="text-starnox-text-dark">{category.name}</TableCell>
                  <TableCell className="text-starnox-text-dark">{category.description}</TableCell>
                  <TableCell>
                    <Link to={`/admin/category/${category._id}/edit`}>
                      <IconButton color="primary" sx={{ '&:hover': { color: '#6b46c1' } }}>
                        <FaEdit />
                      </IconButton>
                    </Link>
                    <IconButton color="error" onClick={() => deleteHandler(category._id)} sx={{ '&:hover': { color: '#c53030' } }}>
                      <FaTrash />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Create Category Modal */}
      <CustomModal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Category">
        <Box component="form" onSubmit={(e) => { e.preventDefault(); createCategoryHandler(); }} sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Category Name"
            name="name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
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
            value={newCategoryDescription}
            onChange={(e) => setNewCategoryDescription(e.target.value)}
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
            disabled={loadingCreate}
          >
            {loadingCreate ? <Loader /> : 'Create'}
          </Button>
        </Box>
      </CustomModal>
    </div>
  );
};

export default CategoryListScreen;