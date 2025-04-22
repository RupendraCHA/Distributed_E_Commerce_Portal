import React from 'react';
import { TextField, Grid } from '@mui/material';

const ContractTab = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      contract: {
        ...formData.contract,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Material"
          name="material"
          value={formData.contract?.material || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          label="Short Text"
          name="shortText"
          value={formData.contract?.shortText || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          label="Target Quantity"
          name="targetQty"
          value={formData.contract?.targetQty || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          label="Net Price"
          name="netPrice"
          value={formData.contract?.netPrice || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          label="Price Unit (Per)"
          name="priceUnit"
          value={formData.contract?.priceUnit || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          label="Order Unit"
          name="orderUnit"
          value={formData.contract?.orderUnit || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          label="Material Group"
          name="materialGroup"
          value={formData.contract?.materialGroup || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          label="Plant"
          name="plant"
          value={formData.contract?.plant || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          label="Storage Location"
          name="storageLocation"
          value={formData.contract?.storageLocation || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          label="Stock Segment"
          name="stockSegment"
          value={formData.contract?.stockSegment || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default ContractTab;
