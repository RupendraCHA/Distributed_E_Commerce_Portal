import React from 'react';
import { TextField, Grid } from '@mui/material';

const AccountingInformation = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      accountingInformation: {
        ...formData.accountingInformation,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: '20px' }}>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Recon. Account"
          name="reconAccount"
          value={formData.accountingInformation?.reconAccount || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Tax Code"
          name="taxCode"
          value={formData.accountingInformation?.taxCode || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Exemption Number"
          name="exemptionNumber"
          value={formData.accountingInformation?.exemptionNumber || ''}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default AccountingInformation;
