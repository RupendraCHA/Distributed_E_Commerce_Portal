import React, { useEffect, useState } from 'react';
import {
  TextField,
  Grid,
  Autocomplete,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import axios from 'axios';

const agreementOptions = [
  { code: 'MK', label: 'Quantity Contract' },
  { code: 'WK', label: 'Value Contract' },
];

const InitialTab = ({ formData, setFormData }) => {
  const [vendorOptions, setVendorOptions] = useState([]);
  const server_Url = import.meta.env.VITE_API_SERVER_URL;

  // Fetch vendor master list
  useEffect(() => {
    axios
      .get(`${server_Url}/api/v1/vendor-master`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        const options = res.data.map((v) => ({
          id: v._id,
          label: `${v.vendorAddress?.supplierid} - ${v.vendorAddress?.name}`,
          data: v,
        }));
        setVendorOptions(options);
      })
      .catch((err) => console.error('Failed to load vendors:', err));
  }, []);

  // Generic handler
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

  // Agreement type selector
  const handleAgreementChange = (e) => {
    setFormData({
      ...formData,
      initial: {
        ...formData.initial,
        agreementType: e.target.value,
      },
    });
  };

  // When user selects a supplier
  const handleVendorSelect = (_, selectedOption) => {
    if (!selectedOption) return;

    const vendor = selectedOption.data;

    const fullName =
      (vendor.contactPersons?.firstName || '') +
      ' ' +
      (vendor.contactPersons?.lastName || '');

    setFormData({
      ...formData,
      initial: {
        ...formData.initial,
        supplier: vendor.vendorAddress?.supplierid || '',
        plant: vendor.purchasingData?.plant || '',
        storageLocation: vendor.purchasingData?.storageLocation || '',
        purchasingOrganization:
          vendor.purchasingData?.purchasingOrganization || '',
        purchasingGroup: vendor.purchasingData?.purchasingGroup || '',
        materialGroup: vendor.purchasingData?.materialGroup || '',
      },
      header: {
        ...formData.header,
        companyCode: vendor.purchasingData?.companyCode || '',
        purchasingGroup: vendor.purchasingData?.purchasingGroup || '',
        purchasingOrganization:
          vendor.purchasingData?.purchasingOrganization || '',
        paymentTerms: vendor.paymentTransactionsAccounting?.paymentTerms || '',
        telephone: vendor.vendorAddress?.telephone || '',
        invoicingParty: vendor.partnerFunctions?.associatedVendor || '',
        salesperson: fullName.trim(),
      },
      contract: {
        ...formData.contract,
        plant: vendor.purchasingData?.plant || '',
        storageLocation: vendor.purchasingData?.storageLocation || '',
        materialGroup: vendor.purchasingData?.materialGroup || '',
      },
      autoFilledVendorData: vendor,
    });
  };

  return (
    <Grid container spacing={2}>
      {/* Supplier Dropdown */}
      <Grid item xs={12} sm={6}>
        <Autocomplete
          options={vendorOptions}
          value={
            vendorOptions.find(
              (opt) =>
                opt.data.vendorAddress?.supplierid ===
                formData.initial?.supplier
            ) || null
          }
          onChange={handleVendorSelect}
          renderInput={(params) => (
            <TextField {...params} label="Supplier" fullWidth />
          )}
        />
      </Grid>

      {/* Agreement Type Dropdown */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="agreement-type-label">Agreement Type</InputLabel>
          <Select
            labelId="agreement-type-label"
            name="agreementType"
            value={formData.initial?.agreementType || ''}
            onChange={handleAgreementChange}
            label="Agreement Type"
          >
            {agreementOptions.map((option) => (
              <MenuItem key={option.code} value={option.code}>
                {option.code} - {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Agreement Date */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Agreement Date"
          name="agreementDate"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={formData.initial?.agreementDate || ''}
          onChange={handleChange}
        />
      </Grid>

      {/* Auto-Filled Fields */}
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

      {/* Optional */}
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
