import React from 'react';
import {
  TextField,
  Grid,
  Autocomplete,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

const vendorOptions = [
  { label: '200155 - Tecnics Enterprises', value: '200155' },
  { label: '200156 - Orion Supplies', value: '200156' },
];

const InitialTab = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      initial: {
        ...formData.initial,
        [name]: type === 'checkbox' ? checked : value,
      },
    });
  };

  const handleVendorChange = (_, selectedOption) => {
    setFormData({
      ...formData,
      initial: {
        ...formData.initial,
        supplier: selectedOption?.value || '',
      },
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          options={vendorOptions}
          value={
            vendorOptions.find(
              (opt) => opt.value === formData.initial?.supplier
            ) || null
          }
          onChange={handleVendorChange}
          renderInput={(params) => (
            <TextField {...params} label="Supplier" fullWidth />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Agreement Type"
          name="agreementType"
          value={formData.initial?.agreementType || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Agreement Date"
          name="agreementDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.initial?.agreementDate || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Purchasing Organization"
          name="purchasingOrganization"
          value={formData.initial?.purchasingOrganization || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Purchasing Group"
          name="purchasingGroup"
          value={formData.initial?.purchasingGroup || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Item Category"
          name="itemCategory"
          value={formData.initial?.itemCategory || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Account Assignment Category"
          name="accountAssignmentCategory"
          value={formData.initial?.accountAssignmentCategory || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Plant"
          name="plant"
          value={formData.initial?.plant || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Storage Location"
          name="storageLocation"
          value={formData.initial?.storageLocation || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Material Group"
          name="materialGroup"
          value={formData.initial?.materialGroup || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Req. Tracking Number"
          name="reqTrackingNumber"
          value={formData.initial?.reqTrackingNumber || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Supplier Subrange"
          name="supplierSubrange"
          value={formData.initial?.supplierSubrange || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.initial?.acknowledgmentRequired || false}
              onChange={handleChange}
              name="acknowledgmentRequired"
            />
          }
          label="Acknowledgment Required"
        />
      </Grid>
    </Grid>
  );
};

export default InitialTab;
