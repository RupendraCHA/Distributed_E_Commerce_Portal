import React from 'react';
import { TextField, Grid } from '@mui/material';

const PaymentTransactions = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      paymentTransactions: {
        ...formData.paymentTransactions,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: '20px' }}>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Bank Key"
          name="bankKey"
          value={formData.paymentTransactions?.bankKey || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Bank Account"
          name="bankAccount"
          value={formData.paymentTransactions?.bankAccount || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Account Holder"
          name="accountHolder"
          value={formData.paymentTransactions?.accountHolder || ''}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default PaymentTransactions;
