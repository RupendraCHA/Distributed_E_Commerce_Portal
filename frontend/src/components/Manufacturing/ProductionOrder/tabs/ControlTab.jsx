import React from 'react';
import { Grid, TextField, Checkbox, FormControlLabel } from '@mui/material';

const ControlTab = ({ form, onChange }) => {
  const costing = form.costing || {};

  const handleCheckboxChange = (name) => (e) => {
    onChange({ target: { name, value: e.target.checked } });
  };

  return (
    <Grid container spacing={2}>
      {/* Order Section */}
      <Grid item xs={12}>
        <h4>Order</h4>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Reference Order"
          name="referenceOrder"
          value={form.referenceOrder || ''}
          onChange={onChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Reservation Type"
          name="reservationType"
          value={form.reservationType || ''}
          onChange={onChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={form.deliveryFlag || false}
              onChange={handleCheckboxChange('deliveryFlag')}
            />
          }
          label="Del. Flag"
        />
      </Grid>

      {/* Costing Section */}
      <Grid item xs={12}>
        <h4>Costing</h4>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Pln Cost Var"
          name="costing.plnCostVar"
          value={costing.plnCostVar || ''}
          onChange={onChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Act Cost Var"
          name="costing.actCostVar"
          value={costing.actCostVar || ''}
          onChange={onChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Costing Sheet"
          name="costing.costingSheet"
          value={costing.costingSheet || ''}
          onChange={onChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Overhead Key"
          name="costing.overheadKey"
          value={costing.overheadKey || ''}
          onChange={onChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="RA Key"
          name="costing.raKey"
          value={costing.raKey || ''}
          onChange={onChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Variance Key"
          name="costing.varianceKey"
          value={costing.varianceKey || ''}
          onChange={onChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Planned Cost Calc"
          name="costing.plannedCostCalc"
          value={costing.plannedCostCalc || ''}
          onChange={onChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControlLabel
          control={
            <Checkbox
              checked={form.eventBasedPosting || false}
              onChange={handleCheckboxChange('eventBasedPosting')}
            />
          }
          label="Event-Based Posting"
        />
      </Grid>

      {/* Scheduling Section */}
      <Grid item xs={12}>
        <h4>Scheduling</h4>
      </Grid>
      <Grid item xs={12} sm={3}>
        <FormControlLabel
          control={
            <Checkbox
              checked={form.capCapacityReqs || false}
              onChange={handleCheckboxChange('capCapacityReqs')}
            />
          }
          label="Cap. Cap. Reqs."
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <FormControlLabel
          control={
            <Checkbox
              checked={form.exactBreaks || false}
              onChange={handleCheckboxChange('exactBreaks')}
            />
          }
          label="Exact Breaks"
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <FormControlLabel
          control={
            <Checkbox
              checked={form.automaticScheduling || false}
              onChange={handleCheckboxChange('automaticScheduling')}
            />
          }
          label="Automatically"
        />
      </Grid>

      {/* Production Scheduling Profile */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Production Scheduling Profile"
          name="schedulingProfile"
          value={form.schedulingProfile || ''}
          onChange={onChange}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default ControlTab;
