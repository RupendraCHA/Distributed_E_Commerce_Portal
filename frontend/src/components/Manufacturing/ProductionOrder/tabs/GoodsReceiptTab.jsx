import React from 'react';
import { Grid, TextField, Checkbox, FormControlLabel } from '@mui/material';

const GoodsReceiptTab = ({ form, onChange }) => (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Stock Type"
        name="stockType"
        value={form.stockType || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="GR Processing Time"
        name="grProcessingTime"
        value={form.grProcessingTime || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={6}>
      <FormControlLabel
        control={
          <Checkbox
            name="grNonValuated"
            checked={form.grNonValuated || false}
            onChange={(e) =>
              onChange({
                target: { name: 'grNonValuated', value: e.target.checked },
              })
            }
          />
        }
        label="GR Non-Valuated"
      />
    </Grid>
    <Grid item xs={6}>
      <FormControlLabel
        control={
          <Checkbox
            name="deliveryCompleted"
            checked={form.deliveryCompleted || false}
            onChange={(e) =>
              onChange({
                target: { name: 'deliveryCompleted', value: e.target.checked },
              })
            }
          />
        }
        label="Delivery Completed"
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Location"
        name="location"
        value={form.location || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Batch"
        name="batch"
        value={form.batch || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Stk Segment"
        name="stkSegment"
        value={form.stkSegment || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Goods Recipient"
        name="goodsRecipient"
        value={form.goodsRecipient || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        label="Unloading Point"
        name="unloadingPoint"
        value={form.unloadingPoint || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
  </Grid>
);

export default GoodsReceiptTab;
