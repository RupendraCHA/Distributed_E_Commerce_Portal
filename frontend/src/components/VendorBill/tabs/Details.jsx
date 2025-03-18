import React from 'react';
import { TextField, Grid, MenuItem } from '@mui/material';

const Details = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={2} sx={{ marginTop: '20px' }}>
      {/* Unplanned Delivery Costs */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Unplanned Delivery Costs"
          type="number"
          value={formData.details?.unplannedDeliveryCosts || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              details: {
                ...formData.details,
                unplannedDeliveryCosts: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* Currency */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Currency"
          value={formData.details?.currency || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              details: {
                ...formData.details,
                currency: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* Exchange Rate */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Exchange Rate"
          type="number"
          value={formData.details?.exchangeRate || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              details: {
                ...formData.details,
                exchangeRate: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* Document Type Dropdown */}
      <Grid item xs={12} sm={6}>
        <TextField
          select
          label="Document Type"
          value={formData.details?.documentType || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              details: {
                ...formData.details,
                documentType: e.target.value,
              },
            })
          }
          fullWidth
        >
          <MenuItem value="RE Invoice - Gross">RE Invoice - Gross</MenuItem>
          <MenuItem value="RE Invoice - Net">RE Invoice - Net</MenuItem>
        </TextField>
      </Grid>

      {/* Invoice Party */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Invoice Party"
          value={formData.details?.invoiceParty || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              details: {
                ...formData.details,
                invoiceParty: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* Business Area */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Business Area"
          value={formData.details?.businessArea || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              details: {
                ...formData.details,
                businessArea: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* Assignment */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Assignment"
          value={formData.details?.assignment || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              details: {
                ...formData.details,
                assignment: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* G/L Account */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="G/L Account"
          value={formData.details?.glAccount || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              details: {
                ...formData.details,
                glAccount: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* Header Text */}
      <Grid item xs={12}>
        <TextField
          label="Header Text"
          value={formData.details?.headerText || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              details: {
                ...formData.details,
                headerText: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* SCB Indicator */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="SCB Indicator"
          value={formData.details?.scbIndicator || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              details: {
                ...formData.details,
                scbIndicator: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* Supply C/R */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Supply C/R"
          value={formData.details?.supplyCR || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              details: {
                ...formData.details,
                supplyCR: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* Service Indicator */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Service Indicator"
          value={formData.details?.serviceIndicator || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              details: {
                ...formData.details,
                serviceIndicator: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>

      {/* Collective Invoice */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Collective Invoice"
          value={formData.details?.collectiveInvoice || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              details: {
                ...formData.details,
                collectiveInvoice: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default Details;
