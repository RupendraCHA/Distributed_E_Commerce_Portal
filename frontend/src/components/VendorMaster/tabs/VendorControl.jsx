import React from 'react';
import { TextField, Grid } from '@mui/material';

const VendorControl = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      vendorControl: {
        ...formData.vendorControl,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: '20px' }}>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Customer"
          name="customer"
          value={formData.vendorControl?.customer || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Authorization"
          name="authorization"
          value={formData.vendorControl?.authorization || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Trading Partner"
          name="tradingPartner"
          value={formData.vendorControl?.tradingPartner || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Group Key"
          name="groupKey"
          value={formData.vendorControl?.groupKey || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Tax Number 1"
          name="taxNumber1"
          value={formData.vendorControl?.taxNumber1 || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Tax Number 2"
          name="taxNumber2"
          value={formData.vendorControl?.taxNumber2 || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="VAT Reg. No."
          name="vatRegNo"
          value={formData.vendorControl?.vatRegNo || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Tax Office"
          name="taxOffice"
          value={formData.vendorControl?.taxOffice || ''}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default VendorControl;
