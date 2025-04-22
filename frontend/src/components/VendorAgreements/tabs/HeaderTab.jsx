import React from 'react';
import { TextField, Grid } from '@mui/material';

const HeaderTab = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      header: {
        ...formData.header,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {/* Administrative Fields */}
      <Grid item xs={12} sm={4}>
        <TextField
          label="Company Code"
          name="companyCode"
          value={formData.header?.companyCode || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Purchasing Group"
          name="purchasingGroup"
          value={formData.header?.purchasingGroup || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Purchasing Organization"
          name="purchasingOrganization"
          value={formData.header?.purchasingOrganization || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Item Number Interval"
          name="itemNumberInterval"
          value={formData.header?.itemNumberInterval || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Subitem Interval"
          name="subitemInterval"
          value={formData.header?.subitemInterval || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Validity Start"
          type="date"
          name="validityStart"
          InputLabelProps={{ shrink: true }}
          value={formData.header?.validityStart || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Validity End"
          type="date"
          name="validityEnd"
          InputLabelProps={{ shrink: true }}
          value={formData.header?.validityEnd || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      {/* Terms of Delivery and Payment */}
      <Grid item xs={12} sm={4}>
        <TextField
          label="Payment Terms"
          name="paymentTerms"
          value={formData.header?.paymentTerms || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Target Value"
          name="targetValue"
          value={formData.header?.targetValue || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Exchange Rate"
          name="exchangeRate"
          value={formData.header?.exchangeRate || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Incoterms"
          name="incoterms"
          value={formData.header?.incoterms || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Incoterms Location 1"
          name="incotermsLocation1"
          value={formData.header?.incotermsLocation1 || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Deviating Location"
          name="deviatingLocation"
          value={formData.header?.deviatingLocation || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      {/* Reference Data */}
      <Grid item xs={12} sm={4}>
        <TextField
          label="Quotation Date"
          name="quotationDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.header?.quotationDate || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Your Reference"
          name="yourReference"
          value={formData.header?.yourReference || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Our Reference"
          name="ourReference"
          value={formData.header?.ourReference || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Salesperson"
          name="salesperson"
          value={formData.header?.salesperson || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Telephone"
          name="telephone"
          value={formData.header?.telephone || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Invoicing Party"
          name="invoicingParty"
          value={formData.header?.invoicingParty || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default HeaderTab;
