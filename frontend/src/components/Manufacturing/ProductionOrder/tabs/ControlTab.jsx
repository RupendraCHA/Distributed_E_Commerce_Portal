import React from 'react';
import { Grid, TextField } from '@mui/material';

const ControlTab = ({ form, onChange }) => (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Reference Order"
        name="referenceOrder"
        value={form.referenceOrder || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Reservation Type"
        name="reservationType"
        value={form.reservationType || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>

    <Grid item xs={12}>
      <TextField
        label="Planned Cost Calc"
        name="costing.plannedCostCalc"
        value={form.costing?.plannedCostCalc || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Costing Sheet"
        name="costing.costingSheet"
        value={form.costing?.costingSheet || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Overhead Key"
        name="costing.overheadKey"
        value={form.costing?.overheadKey || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Pln Cost Var"
        name="costing.plnCostVar"
        value={form.costing?.plnCostVar || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Act Cost Var"
        name="costing.actCostVar"
        value={form.costing?.actCostVar || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="RA Key"
        name="costing.raKey"
        value={form.costing?.raKey || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Variance Key"
        name="costing.varianceKey"
        value={form.costing?.varianceKey || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
  </Grid>
);

export default ControlTab;
