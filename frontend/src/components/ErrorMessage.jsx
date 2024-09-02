import React from 'react';
import { Alert } from '@mui/material';
import { motion } from 'framer-motion';

function ErrorMessage({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Alert severity="error" style={{ marginBottom: '1rem' }}>
        {message}
      </Alert>
    </motion.div>
  );
}

export default ErrorMessage;