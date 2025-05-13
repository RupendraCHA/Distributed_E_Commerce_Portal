// src/components/recipes/tabs/HeaderTab.jsx
import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';

const HeaderTab = ({ form, setForm }) => {
  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleNestedChange = (section, field, value) => {
    const updated = { ...form[section], [field]: value };
    setForm({ ...form, [section]: updated });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Header Information</Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Status"
          fullWidth
          value={form.status || ''}
          onChange={(e) => handleChange('status', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Usage"
          fullWidth
          value={form.usage || ''}
          onChange={(e) => handleChange('usage', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Planner Group"
          fullWidth
          value={form.plannerGroup || ''}
          onChange={(e) => handleChange('plannerGroup', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Resource Network"
          fullWidth
          value={form.resourceNetwork || ''}
          onChange={(e) => handleChange('resourceNetwork', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Network Plant"
          fullWidth
          value={form.networkPlant || ''}
          onChange={(e) => handleChange('networkPlant', e.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle1">Charge Quantity Range</Typography>
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="From"
          fullWidth
          value={form.chargeQuantityRange?.from || ''}
          onChange={(e) =>
            handleNestedChange('chargeQuantityRange', 'from', e.target.value)
          }
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="To"
          fullWidth
          value={form.chargeQuantityRange?.to || ''}
          onChange={(e) =>
            handleNestedChange('chargeQuantityRange', 'to', e.target.value)
          }
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Unit"
          fullWidth
          value={form.chargeQuantityRange?.unit || ''}
          onChange={(e) =>
            handleNestedChange('chargeQuantityRange', 'unit', e.target.value)
          }
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle1">Default Values</Typography>
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Base Quantity"
          fullWidth
          value={form.defaultValues?.baseQuantity || ''}
          onChange={(e) =>
            handleNestedChange('defaultValues', 'baseQuantity', e.target.value)
          }
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Unit"
          fullWidth
          value={form.defaultValues?.unit || ''}
          onChange={(e) =>
            handleNestedChange('defaultValues', 'unit', e.target.value)
          }
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Operation Quantity"
          fullWidth
          value={form.defaultValues?.operationQuantity || ''}
          onChange={(e) =>
            handleNestedChange(
              'defaultValues',
              'operationQuantity',
              e.target.value
            )
          }
        />
      </Grid>
    </Grid>
  );
};

export default HeaderTab;
