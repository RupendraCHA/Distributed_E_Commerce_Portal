import React from 'react';
import { Grid, TextField } from '@mui/material';

const DatesQuantitiesTab = ({ form, onChange }) => {
  const getNested = (parent, child) => form[parent]?.[child] || '';

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Release Date"
          name="basicDates.release"
          value={getNested('basicDates', 'release')}
          onChange={onChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Start Date"
          name="basicDates.start"
          value={getNested('basicDates', 'start')}
          onChange={onChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="End Date"
          name="basicDates.end"
          value={getNested('basicDates', 'end')}
          onChange={onChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Planned Quantity"
          name="quantities.planned"
          value={form.quantities?.planned || ''}
          onChange={onChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Confirmed Quantity"
          name="quantities.committed"
          value={form.quantities?.committed || ''}
          onChange={onChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Unit"
          name="quantities.unit"
          value={form.quantities?.unit || ''}
          onChange={onChange}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default DatesQuantitiesTab;
