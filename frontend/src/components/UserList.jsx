import React from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  IconButton, Avatar, Card, CardContent, Typography, Grid 
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Visibility as ViewIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';

function UserList({ users, onDelete, onEdit, isLoading, isFetching }) {
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <ClipLoader color="#1976d2" size={50} />
      </div>
    );
  }

  return (
    <div>
      <Grid container spacing={3} style={{ marginBottom: '20px' }}>
        {users.map((user, index) => (
          <Grid item xs={12} sm={6} md={4} key={user._id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardContent>
                  <Avatar>{user.firstName[0]}{user.lastName[0]}</Avatar>
                  <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
                  <Typography color="textSecondary">{user.email}</Typography>
                  <Typography color="textSecondary">{user.department}</Typography>
                  <div>
                    <IconButton aria-label="view" color="primary">
                      <ViewIcon />
                    </IconButton>
                    <IconButton aria-label="edit" color="primary" onClick={() => onEdit(user)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" color="secondary" onClick={() => onDelete(user._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      {isFetching && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <ClipLoader color="#1976d2" size={30} />
        </div>
      )}
      <TableContainer component={Paper}>
        <Table aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <motion.tr
                key={user._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <TableCell>{user.firstName} {user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>
                  <IconButton aria-label="view" color="primary">
                    <ViewIcon />
                  </IconButton>
                  <IconButton aria-label="edit" color="primary" onClick={() => onEdit(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" color="secondary" onClick={() => onDelete(user._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserList;