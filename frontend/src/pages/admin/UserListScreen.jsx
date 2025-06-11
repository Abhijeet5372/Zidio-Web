// frontend/src/pages/admin/UserListScreen.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../../redux/slices/usersApiSlice';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';
import CustomModal from '../../components/ui/CustomModal'; // Re-using CustomModal for confirmation
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
  Chip,
} from '@mui/material';
import { FaTimes, FaCheck, FaEdit, FaTrash } from 'react-icons/fa';

const UserListScreen = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    // Using a simple window.confirm for quick implementation,
    // but CustomModal can be used for a more styled confirmation dialog.
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id).unwrap();
        toast.success('User deleted successfully');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" component="h1" className="text-starnox-primary font-bold mb-6 text-center">
        Users
      </Typography>

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
                <TableCell className="text-starnox-text-light font-semibold">EMAIL</TableCell>
                <TableCell className="text-starnox-text-light font-semibold">ADMIN</TableCell>
                <TableCell className="text-starnox-text-light font-semibold"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} className="even:bg-gray-50 hover:bg-gray-100 transition-colors duration-150">
                  <TableCell className="text-starnox-text-dark text-sm">{user._id}</TableCell>
                  <TableCell className="text-starnox-text-dark">{user.name}</TableCell>
                  <TableCell className="text-starnox-text-dark">
                    <a href={`mailto:${user.email}`} className="text-starnox-primary hover:underline">
                      {user.email}
                    </a>
                  </TableCell>
                  <TableCell className="text-starnox-text-dark">
                    {user.isAdmin ? (
                      <Chip label="Yes" color="success" size="small" sx={{ borderRadius: '6px' }} />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <IconButton color="primary" sx={{ '&:hover': { color: '#6b46c1' } }}>
                        <FaEdit />
                      </IconButton>
                    </Link>
                    <IconButton color="error" onClick={() => deleteHandler(user._id)} sx={{ '&:hover': { color: '#c53030' } }}>
                      <FaTrash />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default UserListScreen;