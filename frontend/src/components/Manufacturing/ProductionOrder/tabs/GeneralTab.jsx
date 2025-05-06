import React from 'react';
import { Grid, TextField } from '@mui/material';

const GeneralTab = ({ form, onChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Order Description"
          name="description"
          value={form.description || ''}
          onChange={onChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Order Type"
          name="type"
          value={form.type || ''}
          onChange={onChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="System Status"
          name="status"
          value={form.status || ''}
          onChange={onChange}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default GeneralTab;
