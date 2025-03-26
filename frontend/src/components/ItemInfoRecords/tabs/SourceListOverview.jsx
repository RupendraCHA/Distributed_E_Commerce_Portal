import React, { useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  RadioGroup,
  FormControl,
  FormControlLabel as MuiFormControlLabel,
  Radio,
  Box,
} from '@mui/material';
import axios from 'axios';

const SourceListOverview = ({ formData, setFormData }) => {
  const [existingRecords, setExistingRecords] = useState([]);
  const server_Url = import.meta.env.VITE_API_SERVER_URL;

  const data = formData.sourceListOverview || {};
  const materialId = formData.purchOrgData1?.material;

  useEffect(() => {
    if (!materialId) return;

    axios
      .get(`${server_Url}/api/v1/item-info-records?material=${materialId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => setExistingRecords(res.data))
      .catch((err) => console.error('Error fetching item info records:', err));
  }, [materialId]);

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
            value={data.material || ''}
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
          <TextField
            fullWidth
            label="Supplier"
            name="supplier"
            value={data.supplier || ''}
            onChange={handleChange}
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
                  label={`Supplier: ${
                    rec.purchOrgData1?.supplier || 'N/A'
                  } | Plant: ${rec.purchOrgData1?.plant || 'N/A'} | Price: ${
                    rec.purchOrgData1?.netPrice || 'N/A'
                  }`}
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
