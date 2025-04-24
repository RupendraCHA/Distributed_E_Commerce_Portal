import React from 'react';
import { Grid, TextField } from '@mui/material';

const GoodsReceiptTab = ({ formData, setFormData }) => {
  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <TextField
          label="Stock Type"
          value={formData.stockType || ''}
          onChange={handleChange('stockType')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="GR Proc. Time"
          value={formData.grProcTime || ''}
          onChange={handleChange('grProcTime')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Under Delivery (%)"
          value={formData.underDelivery || ''}
          onChange={handleChange('underDelivery')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Over Delivery (%)"
          value={formData.overDelivery || ''}
          onChange={handleChange('overDelivery')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Location"
          value={formData.location || ''}
          onChange={handleChange('location')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Batch"
          value={formData.batch || ''}
          onChange={handleChange('batch')}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default GoodsReceiptTab;
