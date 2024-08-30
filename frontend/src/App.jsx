import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Paper, useMediaQuery } from '@mui/material';
import Header from './components/Header';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import ErrorMessage from './components/ErrorMessage';
import { getUsers, createUser, updateUser, deleteUser } from './services/api';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f0f2f5',
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
});

const FullWidthPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  width: '100%',
}));

const ScrollableContent = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 64px)',
  overflowY: 'auto',
  overflowX: 'hidden',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  },
  [theme.breakpoints.down('sm')]: {
    height: 'calc(100vh - 56px)',
  },
}));

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setError(`Failed to fetch users: ${err.message}`);
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      const newUser = await createUser(userData);
      setUsers([...users, newUser]);
      setError('');
    } catch (err) {
      setError(`Failed to create user: ${err.message}`);
    }
  };

  const handleUpdateUser = async (id, userData) => {
    try {
      const updatedUser = await updateUser(id, userData);
      setUsers(users.map(user => user._id === id ? updatedUser : user));
      setEditingUser(null);
      setError('');
    } catch (err) {
      setError(`Failed to update user: ${err.message}`);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user._id !== id));
      setError('');
    } catch (err) {
      setError(`Failed to delete user: ${err.message}`);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header isMobile={isMobile} />
        <ScrollableContent>
          <Box sx={{ p: { xs: 1, sm: 2 }, width: '100%' }}>
            <FullWidthPaper elevation={3}>
              <h1 style={{ fontSize: isMobile ? '1.5rem' : '2rem' }}>User Management Form</h1>
              {error && <ErrorMessage message={error} />}
              <UserForm 
                onSubmit={editingUser ? handleUpdateUser : handleCreateUser} 
                initialData={editingUser}
                onSuccess={fetchUsers}
                isMobile={isMobile}
              />
            </FullWidthPaper>
            <FullWidthPaper elevation={3}>
              <UserList 
                users={users} 
                onDelete={handleDeleteUser} 
                onEdit={setEditingUser}
                isMobile={isMobile}
              />
            </FullWidthPaper>
          </Box>
        </ScrollableContent>
      </Box>
    </ThemeProvider>
  );
}

export default App;