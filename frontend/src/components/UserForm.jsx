// UserForm.jsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Paper } from '@mui/material';
import axios from 'axios';

function UserForm({ onSubmit, initialData, onSuccess }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    try {
      if (initialData) {
        await axios.put(`https://tacnique-assignment-backend.onrender.com/api/users/${initialData._id}`, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        await axios.post('https://tacnique-assignment-backend.onrender.com/api/users', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      setFormData({ firstName: '', lastName: '', email: '', department: '' });
      onSuccess();
    } catch (error) {
      console.error('Error during submission:', error.response?.data || error.message);
    }
  };

  return (
    <Paper style={{ padding: '1rem', marginBottom: '1rem' }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {initialData ? 'Update User' : 'Add User'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default UserForm;
