import React from 'react';
import { TextField, Grid } from '@mui/material';

const PurchasingData = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      purchasingData: {
        ...formData.purchasingData,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: '20px' }}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Order Currency"
          name="orderCurrency"
          value={formData.purchasingData?.orderCurrency || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Purchasing Group"
          name="purchasingGroup"
          value={formData.purchasingData?.purchasingGroup || ''}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default PurchasingData;
