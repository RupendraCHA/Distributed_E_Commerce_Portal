import React from 'react';
import { Grid, TextField, Checkbox, FormControlLabel } from '@mui/material';

const GoodsReceiptTab = ({ form, onChange }) => (
  <Grid container spacing={2}>
    {/* Control Section */}
    <Grid item xs={12}>
      <h4>Control</h4>
    </Grid>
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
        label="GR Processing Time (Workdays)"
        name="grProcessingTime"
        value={form.grProcessingTime || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={4}>
      <FormControlLabel
        control={
          <Checkbox
            name="goodsReceipt"
            checked={form.goodsReceipt || false}
            onChange={(e) =>
              onChange({
                target: { name: 'goodsReceipt', value: e.target.checked },
              })
            }
          />
        }
        label="Goods Receipt"
      />
    </Grid>
    <Grid item xs={4}>
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
    <Grid item xs={4}>
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

    {/* Tolerances Section */}
    <Grid item xs={12}>
      <h4>Tolerances</h4>
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        label="Underdelivery (%)"
        name="underdelivery"
        value={form.underdelivery || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        label="Overdelivery (%)"
        name="overdelivery"
        value={form.overdelivery || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <FormControlLabel
        control={
          <Checkbox
            name="unlimitedOverdelivery"
            checked={form.unlimitedOverdelivery || false}
            onChange={(e) =>
              onChange({
                target: {
                  name: 'unlimitedOverdelivery',
                  value: e.target.checked,
                },
              })
            }
          />
        }
        label="Unlimited Overdelivery"
      />
    </Grid>

    {/* Receipt Section */}
    <Grid item xs={12}>
      <h4>Receipt</h4>
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        label="Location"
        name="location"
        value={form.location || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        label="Batch"
        name="batch"
        value={form.batch || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={4}>
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
        label="Distribution"
        name="distribution"
        value={form.distribution || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>

    {/* Inbound Delivery Section */}
    <Grid item xs={12}>
      <h4>Inbound Delivery</h4>
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
    <Grid item xs={12} sm={6}>
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
