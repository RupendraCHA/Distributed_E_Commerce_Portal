import React from 'react';
import { Grid, TextField, FormControlLabel, Checkbox } from '@mui/material';

const PurchOrgData2 = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      purchOrgData2: {
        ...prev.purchOrgData2,
        [name]: type === 'checkbox' ? checked : value,
      },
    }));
  };

  const data = formData.purchOrgData2 || {};

  return (
    <Grid container spacing={2}>
      {/* References */}
      {/* <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Quotation"
          name="quotation"
          value={data.quotation || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Quotation From"
          name="quotationFrom"
          value={data.quotationFrom || ''}
          onChange={handleChange}
        />
      </Grid> */}
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Document Date"
          name="documentDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={data.documentDate || ''}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Purchasing Doc."
          name="purchasingDoc"
          value={data.purchasingDoc || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="RFQ"
          name="rfq"
          value={data.rfq || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              name="rfqRequired"
              checked={data.rfqRequired || false}
              onChange={handleChange}
            />
          }
          label="Req. Ind."
        />
      </Grid>

      {/* Settlement */}
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Sett. Group 1"
          name="settGroup1"
          value={data.settGroup1 || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Sett. Group 2"
          name="settGroup2"
          value={data.settGroup2 || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Sett. Group 3"
          name="settGroup3"
          value={data.settGroup3 || ''}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              name="noSubsequentSettlement"
              checked={data.noSubsequentSettlement || false}
              onChange={handleChange}
            />
          }
          label="No Subsequent Sett."
        />
      </Grid>
    </Grid>
  );
};

export default PurchOrgData2;
