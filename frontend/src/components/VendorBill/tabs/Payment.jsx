import React from 'react';
import { TextField, Grid, MenuItem } from '@mui/material';

const Payment = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={2} sx={{ marginTop: '20px' }}>
      {/* Baseline Date */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Baseline Date"
          type="date"
          value={formData.payment?.baselineDate || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              payment: {
                ...formData.payment,
                baselineDate: e.target.value,
              },
            })
          }
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      {/* Due On */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Due On"
          value={formData.payment?.dueOn || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              payment: {
                ...formData.payment,
                dueOn: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* Cash Discount (CD) */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Cash Discount (CD)"
          value={formData.payment?.cashDiscount || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              payment: {
                ...formData.payment,
                cashDiscount: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* Payment Terms */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Payment Terms"
          value={formData.payment?.paymentTerms || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              payment: {
                ...formData.payment,
                paymentTerms: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* Days */}
      <Grid item xs={12} sm={4}>
        <TextField
          label="Days"
          type="number"
          value={formData.payment?.days || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              payment: {
                ...formData.payment,
                days: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* Days % */}
      <Grid item xs={12} sm={4}>
        <TextField
          label="Days %"
          type="number"
          value={formData.payment?.daysPercentage || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              payment: {
                ...formData.payment,
                daysPercentage: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* Days Net */}
      <Grid item xs={12} sm={4}>
        <TextField
          label="Days Net"
          type="number"
          value={formData.payment?.daysNet || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              payment: {
                ...formData.payment,
                daysNet: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* Fixed Payment */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Fixed Payment"
          value={formData.payment?.fixedPayment || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              payment: {
                ...formData.payment,
                fixedPayment: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* Payment Block Dropdown */}
      <Grid item xs={12} sm={6}>
        <TextField
          select
          label="Payment Block"
          value={formData.payment?.paymentBlock || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              payment: {
                ...formData.payment,
                paymentBlock: e.target.value,
              },
            })
          }
          fullWidth
        >
          <MenuItem value="Free for payment">Free for payment</MenuItem>
          <MenuItem value="Blocked for review">Blocked for review</MenuItem>
        </TextField>
      </Grid>

      {/* Payment Method */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Payment Method"
          value={formData.payment?.paymentMethod || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              payment: {
                ...formData.payment,
                paymentMethod: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* House Bank */}
      <Grid item xs={12} sm={3}>
        <TextField
          label="House Bank"
          value={formData.payment?.houseBank || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              payment: {
                ...formData.payment,
                houseBank: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* Partner Bank */}
      <Grid item xs={12} sm={3}>
        <TextField
          label="Partner Bank"
          value={formData.payment?.partnerBank || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              payment: {
                ...formData.payment,
                partnerBank: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* Payment Reference */}
      <Grid item xs={12}>
        <TextField
          label="Payment Reference"
          value={formData.payment?.paymentReference || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              payment: {
                ...formData.payment,
                paymentReference: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default Payment;
