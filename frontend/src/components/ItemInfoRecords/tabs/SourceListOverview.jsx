import React, { useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  Typography,
  RadioGroup,
  FormControlLabel as MuiFormControlLabel,
  Radio,
  Box,
  Autocomplete
} from '@mui/material';
import axios from 'axios';

const SourceListOverview = ({ formData, setFormData }) => {
  const [existingRecords, setExistingRecords] = useState([]);
  const [availableSuppliers, setAvailableSuppliers] = useState([]);
  const server_Url = import.meta.env.VITE_API_SERVER_URL;

  const data = formData.sourceListOverview || {};
  const material = formData.purchOrgData1?.material;
  const materialPlant = formData.purchOrgData1?.plant;
  const selectedSupplier = formData.purchOrgData1?.supplier;

  useEffect(() => {
    if (!material) return;

    const fetchExistingRecords = async () => {
      try {
        const res = await axios.get(
          `${server_Url}/api/v1/item-info-records?material=${material}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setExistingRecords(res.data);

        const usedSuppliers = res.data.map(
          (rec) => rec.purchOrgData1?.supplier
        );

        const matDetails = await axios.get(
          `${server_Url}/api/v1/materials?material=${material}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        const allSuppliers = matDetails.data?.suppliers || [];
        const filtered = allSuppliers.filter(
          (s) => !usedSuppliers.includes(s) || s === selectedSupplier
        );
        setAvailableSuppliers(filtered);
      } catch (error) {
        console.error('Error loading records or suppliers:', error);
      }
    };

    fetchExistingRecords();
  }, [material]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      sourceListOverview: {
        ...prev.sourceListOverview,
        [name]: type === 'checkbox' ? checked : value,
      },
    }));
  };

  const handleFixChange = (e) => {
    const fixedId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      sourceListOverview: {
        ...prev.sourceListOverview,
        fixedItemInfoRecordId: fixedId,
      },
    }));
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Material"
            name="material"
            value={material || ''}
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Plant"
            name="plant"
            value={materialPlant || ''}
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Valid From"
            name="validFrom"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={data.validFrom || ''}
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

        <Grid item xs={12} sm={6} md={4}>
          <Autocomplete
            options={availableSuppliers}
            getOptionLabel={(option) => option}
            value={selectedSupplier || ''}
            onChange={(e, newValue) => {
              setFormData((prev) => ({
                ...prev,
                purchOrgData1: {
                  ...prev.purchOrgData1,
                  supplier: newValue || '',
                },
              }));
            }}
            renderInput={(params) => (
              <TextField {...params} label="Supplier (Vendor)" />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="POrg"
            name="pOrg"
            value={data.pOrg || ''}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="agmt"
                checked={data.agmt || false}
                onChange={handleChange}
              />
            }
            label="Agmt"
          />
        </Grid>
      </Grid>

      {/* Existing Records List with Fix Option */}
      {existingRecords.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Existing Item Info Records for this Material:
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              name="fixedItemInfoRecordId"
              value={data.fixedItemInfoRecordId || ''}
              onChange={handleFixChange}
            >
              {existingRecords.map((rec) => (
                <MuiFormControlLabel
                  key={rec._id}
                  value={rec._id}
                  control={<Radio />}
                  label={`Supplier: ${rec.purchOrgData1?.supplier || 'N/A'} | Plant: ${rec.purchOrgData1?.plant || 'N/A'} | Price: ${rec.purchOrgData1?.netPrice || 'N/A'}`}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      )}
    </Box>
  );
};

export default SourceListOverview;