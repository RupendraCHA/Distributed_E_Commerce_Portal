import React from 'react';
import { TextField, Grid, MenuItem } from '@mui/material';

const BasicData = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={2} sx={{ marginTop: '20px' }}>
      {/* Invoice Date */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Invoice Date"
          type="date"
          value={formData.basicData?.invoiceDate || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              basicData: {
                ...formData.basicData,
                invoiceDate: e.target.value,
              },
            })
          }
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      {/* Posting Date */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Posting Date"
          type="date"
          value={formData.basicData?.postingDate || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              basicData: {
                ...formData.basicData,
                postingDate: e.target.value,
              },
            })
          }
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      {/* Amount */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Amount"
          type="number"
          value={formData.basicData?.amount || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              basicData: {
                ...formData.basicData,
                amount: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* Reference */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Reference"
          value={formData.basicData?.reference || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              basicData: {
                ...formData.basicData,
                reference: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* Tax Amount */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Tax Amount"
          type="number"
          value={formData.basicData?.taxAmount || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              basicData: {
                ...formData.basicData,
                taxAmount: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* Tax Code Dropdown */}
      <Grid item xs={12} sm={6}>
        <TextField
          select
          label="Tax Code"
          value={formData.basicData?.taxCode || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              basicData: {
                ...formData.basicData,
                taxCode: e.target.value,
              },
            })
          }
          fullWidth
        >
          <MenuItem value="E1">E1 (Out Put Tax)</MenuItem>
          <MenuItem value="E2">E2 (Reduced Tax)</MenuItem>
        </TextField>
      </Grid>

      {/* Business Place / Section */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Business Place/Section"
          value={formData.basicData?.businessPlace || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              basicData: {
                ...formData.basicData,
                businessPlace: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* Text Field */}
      <Grid item xs={12}>
        <TextField
          label="Text"
          value={formData.basicData?.text || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              basicData: {
                ...formData.basicData,
                text: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* Baseline Date */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Baseline Date"
          type="date"
          value={formData.basicData?.baselineDate || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              basicData: {
                ...formData.basicData,
                baselineDate: e.target.value,
              },
            })
          }
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      {/* Company Code */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Company Code"
          value={formData.basicData?.companyCode || 'EC01 Eco store banglore'}
          disabled
          fullWidth
        />
      </Grid>

      {/* GST Partner */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="GST Partner"
          value={formData.basicData?.gstPartner || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              basicData: {
                ...formData.basicData,
                gstPartner: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* Place of Supply */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Place of Supply"
          value={formData.basicData?.placeOfSupply || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              basicData: {
                ...formData.basicData,
                placeOfSupply: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* Invoice Reference Number */}
      <Grid item xs={12}>
        <TextField
          label="Invoice Reference Number"
          value={formData.basicData?.invoiceRefNumber || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              basicData: {
                ...formData.basicData,
                invoiceRefNumber: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default BasicData;
