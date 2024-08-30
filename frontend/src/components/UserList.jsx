import React from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  IconButton, Avatar, Card, CardContent, Typography, Grid 
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Visibility as ViewIcon } from '@mui/icons-material';

function UserList({ users, onDelete, onEdit }) {
  return (
    <div>
      <Grid container spacing={3} style={{ marginBottom: '20px' }}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user._id}>
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
          </Grid>
        ))}
      </Grid>
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
              <TableRow key={user._id}>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserList;