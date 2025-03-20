import React from 'react';
import { TextField, Grid } from '@mui/material';

const PaymentTransactionsAccounting = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      paymentTransactionsAccounting: {
        ...formData.paymentTransactionsAccounting,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: '20px' }}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Payment Terms"
          name="paymentTerms"
          value={formData.paymentTransactionsAccounting?.paymentTerms || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Bank Exchange Limit"
          name="bankExchangeLimit"
          value={
            formData.paymentTransactionsAccounting?.bankExchangeLimit || ''
          }
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default PaymentTransactionsAccounting;
