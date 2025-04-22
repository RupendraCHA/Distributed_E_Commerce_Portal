// File: CreateBillOfMaterial.jsx
import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  Autocomplete,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBillOfMaterial = () => {
  const [form, setForm] = useState({
    materialCode: '',
    plant: '',
    alternativeBOM: '',
    bomUsage: '',
    baseQuantity: '',
    unit: '',
    validityStart: '',
    validityEnd: '',
    status: '',
    lotSize: '',
    revisionLevel: '',
    headerText: '',
    group: '',
    groupCounter: '',
    itemCategory: '',
    component: '',
    componentDescription: '',
    quantity: '',
    compUnit: '',
    itemText: '',
    scrap: '',
    operation: '',
  });
  const [materialOptions, setMaterialOptions] = useState([]);
  const token = localStorage.getItem('token');
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${server_Url}/api/v1/getMaterialIds`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMaterialOptions(res.data))
      .catch((err) => console.error('Error fetching materials:', err));
  }, []);

  const handleAutoFill = (value) => {
    if (!value) return;
    setForm({
      ...form,
      materialCode: value.materialId,
      plant: value.plant || '',
      unit: value.unit || '',
      componentDescription: value.description || '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    axios
      .post(`${server_Url}/api/v1/billofmaterial`, form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => navigate('/manufacturing/bill-of-material'))
      .catch((err) => console.error(err));
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 2 }}>
        Create Bill of Material
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={materialOptions}
            getOptionLabel={(option) =>
              `${option.materialId} - ${option.materialName}`
            }
            onChange={(e, value) => handleAutoFill(value)}
            renderInput={(params) => (
              <TextField {...params} label="Material ID" fullWidth />
            )}
          />
        </Grid>
        {[
          'plant',
          'alternativeBOM',
          'bomUsage',
          'baseQuantity',
          'unit',
          'validityStart',
          'validityEnd',
          'status',
          'lotSize',
          'revisionLevel',
          'headerText',
          'group',
          'groupCounter',
          'itemCategory',
          'component',
          'componentDescription',
          'quantity',
          'compUnit',
          'itemText',
          'scrap',
          'operation',
        ].map((key) => (
          <Grid item xs={12} sm={6} key={key}>
            <TextField
              name={key}
              label={key
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str) => str.toUpperCase())}
              value={form[key]}
              onChange={handleChange}
              fullWidth
              type={key.toLowerCase().includes('date') ? 'date' : 'text'}
              InputLabelProps={
                key.toLowerCase().includes('date') ? { shrink: true } : {}
              }
            />
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={handleSubmit}
      >
        Create BOM
      </Button>
    </Container>
  );
};

export default CreateBillOfMaterial;
