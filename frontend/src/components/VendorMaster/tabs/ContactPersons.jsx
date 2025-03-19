import React from 'react';
import { TextField, Grid } from '@mui/material';

const ContactPersons = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      contactPersons: {
        ...formData.contactPersons,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: '20px' }}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          value={formData.contactPersons?.firstName || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          value={formData.contactPersons?.lastName || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Phone Number"
          name="phone"
          value={formData.contactPersons?.phone || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.contactPersons?.email || ''}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default ContactPersons;
