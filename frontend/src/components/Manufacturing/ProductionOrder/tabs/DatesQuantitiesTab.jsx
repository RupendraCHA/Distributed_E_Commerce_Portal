import React from 'react';
import { Grid, TextField } from '@mui/material';

const DatesQuantitiesTab = ({ form, onChange }) => (
  <Grid container spacing={2}>
    {/* Dates/Times Section */}
    <Grid item xs={12}>
      <h4>Dates/Times</h4>
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        label="Planned Order Date"
        name="plannedOrderDate"
        value={form.plannedOrderDate || ''}
        onChange={onChange}
        type="date"
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        label="Basic Release Date"
        name="basicDates.release"
        value={form.basicDates?.release || ''}
        onChange={onChange}
        type="date"
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        label="Basic Start Date"
        name="basicDates.start"
        value={form.basicDates?.start || ''}
        onChange={onChange}
        type="date"
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        label="Basic End Date"
        name="basicDates.end"
        value={form.basicDates?.end || ''}
        onChange={onChange}
        type="date"
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        label="Scheduled Date"
        name="scheduledDate"
        value={form.scheduledDate || ''}
        onChange={onChange}
        type="date"
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        label="Confirmed Date"
        name="confirmedDate"
        value={form.confirmedDate || ''}
        onChange={onChange}
        type="date"
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        label="Committed Date"
        name="committedDate"
        value={form.committedDate || ''}
        onChange={onChange}
        type="date"
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
    </Grid>

    {/* Quantities Section */}
    <Grid item xs={12}>
      <h4>Quantities</h4>
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Planned Order Quantity"
        name="quantities.plannedOrder"
        value={form.quantities?.plannedOrder || ''}
        onChange={onChange}
        type="number"
        fullWidth
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Order Quantity"
        name="quantities.order"
        value={form.quantities?.order || ''}
        onChange={onChange}
        type="number"
        fullWidth
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Delivered Quantity"
        name="quantities.delivered"
        value={form.quantities?.delivered || ''}
        onChange={onChange}
        type="number"
        fullWidth
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Committed Quantity"
        name="quantities.committed"
        value={form.quantities?.committed || ''}
        onChange={onChange}
        type="number"
        fullWidth
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Scrap Quantity"
        name="quantities.scrap"
        value={form.quantities?.scrap || ''}
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
  </Grid>
);

export default DatesQuantitiesTab;
