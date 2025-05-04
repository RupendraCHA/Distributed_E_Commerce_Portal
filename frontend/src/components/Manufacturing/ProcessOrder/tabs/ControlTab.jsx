import React from 'react';
import { Grid, TextField } from '@mui/material';

const ControlTab = ({ formData, setFormData }) => {
  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <TextField
          label="Reference Order"
          value={formData.referenceOrder || ''}
          onChange={handleChange('referenceOrder')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Reservation/Purch. Req."
          value={formData.reservationPurchReq || ''}
          onChange={handleChange('reservationPurchReq')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Costing Variant Planned"
          value={formData.costingVariantPlanned || ''}
          onChange={handleChange('costingVariantPlanned')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Actual Costing Variant"
          value={formData.actualCostingVariant || ''}
          onChange={handleChange('actualCostingVariant')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Costing Sheet"
          value={formData.costingSheet || ''}
          onChange={handleChange('costingSheet')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Results Analysis Key"
          value={formData.resultsAnalysisKey || ''}
          onChange={handleChange('resultsAnalysisKey')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Variance Key"
          value={formData.varianceKey || ''}
          onChange={handleChange('varianceKey')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Apportionment Struct."
          value={formData.apportionmentStruct || ''}
          onChange={handleChange('apportionmentStruct')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Planned Cost Calc."
          value={formData.plannedCostCalc || ''}
          onChange={handleChange('plannedCostCalc')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Functional Area"
          value={formData.functionalArea || ''}
          onChange={handleChange('functionalArea')}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default ControlTab;
