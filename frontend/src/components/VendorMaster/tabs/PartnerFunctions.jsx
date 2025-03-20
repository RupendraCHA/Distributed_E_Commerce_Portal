import React from 'react';
import { TextField, Grid } from '@mui/material';

const PartnerFunctions = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      partnerFunctions: {
        ...formData.partnerFunctions,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: '20px' }}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Partner Role"
          name="partnerRole"
          value={formData.partnerFunctions?.partnerRole || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Associated Vendor"
          name="associatedVendor"
          value={formData.partnerFunctions?.associatedVendor || ''}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default PartnerFunctions;
