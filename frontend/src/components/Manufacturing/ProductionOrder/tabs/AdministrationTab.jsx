import React from 'react';
import { Grid, TextField } from '@mui/material';

const AdministrationTab = ({ form, onChange }) => (
  <Grid container spacing={2}>
    {/* Creation/Change Data Section */}
    <Grid item xs={12}>
      <h4>Creation/Change Data</h4>
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Created By"
        name="createdBy"
        value={form.createdBy || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>

    <Grid item xs={12} sm={3}>
      <TextField
        label="Created At (DateTime)"
        name="createdAt"
        value={form.createdAt || ''}
        onChange={onChange}
        type="datetime-local"
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
    </Grid>

    <Grid item xs={12} sm={3}>
      <TextField
        label="Change Time"
        name="changeTime"
        value={form.changeTime || ''}
        onChange={onChange}
        type="time"
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
    </Grid>

    {/* Order Change Management Section */}
    <Grid item xs={12}>
      <h4>Order Change Management</h4>
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Change Indicator"
        name="changeIndicator"
        value={form.changeIndicator || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField
        label="Change Process Type"
        name="changeProcessType"
        value={form.changeProcessType || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
  </Grid>
);

export default AdministrationTab;
