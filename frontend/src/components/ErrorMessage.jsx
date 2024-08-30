import React from 'react';
import { Alert } from '@mui/material';

function ErrorMessage({ message }) {
  return (
    <Alert severity="error" style={{ marginBottom: '1rem' }}>
      {message}
    </Alert>
  );
}

export default ErrorMessage;