import React, { useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Autocomplete,
} from '@mui/material';
import axios from 'axios';

const PurchOrgData1 = ({ formData, setFormData }) => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;

  const [materialOptions, setMaterialOptions] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get(`${server_Url}/api/v1/getMaterialIds`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setMaterialOptions(res.data);
      } catch (err) {
        console.error('Error fetching material IDs:', err);
      }
    };
    fetchMaterials();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      purchOrgData1: {
        ...prev.purchOrgData1,
        [name]: type === 'checkbox' ? checked : value,
      },
    }));
  };

  const handleMaterialSelect = (e, newValue) => {
    if (!newValue) return;
    setFormData((prev) => ({
      ...prev,
      purchOrgData1: {
        ...prev.purchOrgData1,
        material: newValue.materialId,
        materialGroup: newValue.materialGroup,
        plant: newValue.plant,
        purchasingOrg: newValue.purchasingOrg,
      },
    }));
  };

  const data = formData.purchOrgData1 || {};

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Supplier"
          name="supplier"
          value={data.supplier || ''}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Autocomplete
          options={materialOptions}
          getOptionLabel={(option) =>
            option?.materialId
              ? `${option.materialId} - ${option.materialName}`
              : ''
          }
          value={
            materialOptions.find(
              (option) => option.materialId === data.material
            ) || null
          }
          onChange={handleMaterialSelect}
          renderInput={(params) => (
            <TextField {...params} label="Material" variant="outlined" />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Material Group"
          name="materialGroup"
          value={data.materialGroup || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Purchasing Org."
          name="purchasingOrg"
          value={data.purchasingOrg || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Plant"
          name="plant"
          value={data.plant || ''}
          onChange={handleChange}
        />
      </Grid>

      {/* Control Section */}
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="PL Deliv. Time (Days)"
          name="deliveryTime"
          value={data.deliveryTime || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Purch. Group"
          name="purchaseGroup"
          value={data.purchaseGroup || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Standard Qty"
          name="standardQty"
          value={data.standardQty || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Minimum Qty"
          name="minimumQty"
          value={data.minimumQty || ''}
          onChange={handleChange}
        />
      </Grid>

      {/* Checkboxes */}
      <Grid item xs={12} sm={6} md={4}>
        <FormControlLabel
          control={
            <Checkbox
              name="grBasedIV"
              checked={data.grBasedIV || false}
              onChange={handleChange}
            />
          }
          label="GR-Based IV"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="noERS"
              checked={data.noERS || false}
              onChange={handleChange}
            />
          }
          label="No ERS"
        />
      </Grid>

      {/* Shipping and Price Section */}
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Net Price"
          name="netPrice"
          value={data.netPrice || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Effective Price"
          name="effectivePrice"
          value={data.effectivePrice || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Valid To"
          name="validTo"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={data.validTo || ''}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default PurchOrgData1;
