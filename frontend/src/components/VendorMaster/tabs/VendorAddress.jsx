import React from 'react';
import { TextField, Grid } from '@mui/material';

const VendorAddress = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      vendorAddress: {
        ...formData.vendorAddress,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: '20px' }}>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Id"
          name="supplierid"
          value={formData.vendorAddress?.supplierid || ''}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.vendorAddress?.title || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.vendorAddress?.name || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Search Term"
          name="searchTerm"
          value={formData.vendorAddress?.searchTerm || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Street Address"
          name="street"
          value={formData.vendorAddress?.street || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Postal Code/City"
          name="postalCity"
          value={formData.vendorAddress?.postalCity || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Country"
          name="country"
          value={formData.vendorAddress?.country || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Region"
          name="region"
          value={formData.vendorAddress?.region || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Time Zone"
          name="timeZone"
          value={formData.vendorAddress?.timeZone || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Language"
          name="language"
          value={formData.vendorAddress?.language || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Telephone"
          name="telephone"
          value={formData.vendorAddress?.telephone || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.vendorAddress?.email || ''}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default VendorAddress;
