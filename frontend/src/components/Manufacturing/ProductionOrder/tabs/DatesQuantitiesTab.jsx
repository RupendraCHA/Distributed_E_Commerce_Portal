import React from 'react';
import { Grid, TextField } from '@mui/material';

const DatesQuantitiesTab = ({ form, onChange }) => (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Release Date"
        name="basicDates.release"
        value={form.basicDates?.release || ''}
        onChange={onChange}
        fullWidth
        type="date"
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Start Date"
        name="basicDates.start"
        value={form.basicDates?.start || ''}
        onChange={onChange}
        fullWidth
        type="date"
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="End Date"
        name="basicDates.end"
        value={form.basicDates?.end || ''}
        onChange={onChange}
        fullWidth
        type="date"
        InputLabelProps={{ shrink: true }}
      />
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField
        label="Scheduled Date"
        name="scheduledDate"
        value={form.scheduledDate || ''}
        onChange={onChange}
        fullWidth
        type="date"
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Confirmed Date"
        name="confirmedDate"
        value={form.confirmedDate || ''}
        onChange={onChange}
        fullWidth
        type="date"
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Committed Date"
        name="committedDate"
        value={form.committedDate || ''}
        onChange={onChange}
        fullWidth
        type="date"
        InputLabelProps={{ shrink: true }}
      />
    </Grid>

    <Grid item xs={6}>
      <TextField
        label="Planned Qty"
        name="quantities.planned"
        value={form.quantities?.planned || ''}
        onChange={onChange}
        type="number"
        fullWidth
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Order Qty"
        name="quantities.order"
        value={form.quantities?.order || ''}
        onChange={onChange}
        type="number"
        fullWidth
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Delivered Qty"
        name="quantities.delivered"
        value={form.quantities?.delivered || ''}
        onChange={onChange}
        type="number"
        fullWidth
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Committed Qty"
        name="quantities.committed"
        value={form.quantities?.committed || ''}
        onChange={onChange}
        type="number"
        fullWidth
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Unit"
        name="quantities.unit"
        value={form.quantities?.unit || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Scrap Qty"
        name="quantities.scrap"
        value={form.quantities?.scrap || ''}
        onChange={onChange}
        type="number"
        fullWidth
      />
    </Grid>
  </Grid>
);

export default DatesQuantitiesTab;
