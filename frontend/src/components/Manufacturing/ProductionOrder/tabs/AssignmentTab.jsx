import React from 'react';
import { Grid, TextField } from '@mui/material';

const AssignmentTab = ({ form, onChange }) => (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <TextField
        label="MRP Controller"
        name="mrpController"
        value={form.mrpController || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Production Supervisor"
        name="productionSupervisor"
        value={form.productionSupervisor || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="MRP Area"
        name="mrpArea"
        value={form.mrpArea || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="WBS Element"
        name="wbsElement"
        value={form.wbsElement || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Sales Order"
        name="salesOrder"
        value={form.salesOrder || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Business Area"
        name="businessArea"
        value={form.businessArea || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Profit Center"
        name="profitCenter"
        value={form.profitCenter || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Object Class"
        name="objectClass"
        value={form.objectClass || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
  </Grid>
);

export default AssignmentTab;
