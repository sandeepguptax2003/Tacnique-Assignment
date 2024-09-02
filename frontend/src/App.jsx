import React, { useState } from 'react';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Paper, useMediaQuery } from '@mui/material';
import { QueryClient, QueryClientProvider, useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { motion } from 'framer-motion';
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

const queryClient = new QueryClient();

function App() {
  const [editingUser, setEditingUser] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetching,
  } = useInfiniteQuery(
    'users',
    ({ pageParam = 1 }) => getUsers(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 0) return undefined;
        return pages.length + 1;
      },
    }
  );

  const handleCreateUser = async (userData) => {
    try {
      await createUser(userData);
      queryClient.invalidateQueries('users');
    } catch (err) {
      console.error('Failed to create user:', err);
    }
  };

  const handleUpdateUser = async (id, userData) => {
    try {
      await updateUser(id, userData);
      queryClient.invalidateQueries('users');
      setEditingUser(null);
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      queryClient.invalidateQueries('users');
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header isMobile={isMobile} />
        <ScrollableContent>
          <Box sx={{ p: { xs: 1, sm: 2 }, width: '100%' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FullWidthPaper elevation={3}>
                <h1 style={{ fontSize: isMobile ? '1.5rem' : '2rem' }}>User Management Form</h1>
                {isError && <ErrorMessage message={error.message} />}
                <UserForm 
                  onSubmit={editingUser ? handleUpdateUser : handleCreateUser} 
                  initialData={editingUser}
                  onSuccess={() => queryClient.invalidateQueries('users')}
                  isMobile={isMobile}
                />
              </FullWidthPaper>
            </motion.div>
            <FullWidthPaper elevation={3}>
              <InfiniteScroll
                dataLength={data ? data.pages.flatMap(page => page).length : 0}
                next={fetchNextPage}
                hasMore={hasNextPage}
                loader={<h4>Loading...</h4>}
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                <UserList 
                  users={data ? data.pages.flatMap(page => page) : []}
                  onDelete={handleDeleteUser} 
                  onEdit={setEditingUser}
                  isMobile={isMobile}
                  isLoading={isLoading}
                  isFetching={isFetching}
                />
              </InfiniteScroll>
            </FullWidthPaper>
          </Box>
        </ScrollableContent>
      </Box>
    </ThemeProvider>
  );
}

function WrappedApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

export default WrappedApp;