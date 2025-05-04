import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Autocomplete,
  Box,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBillOfMaterial = () => {
  const [form, setForm] = useState({
    materialCode: '',
    plant: '',
    alternativeBOM: '',
    components: [],
  });

  const [materialOptions, setMaterialOptions] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const server_Url = import.meta.env.VITE_API_SERVER_URL;

  useEffect(() => {
    axios
      .get(`${server_Url}/api/v1/getMaterialIds`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMaterialOptions(res.data))
      .catch((err) => console.error('Error fetching materials:', err));
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMaterialSelect = (value) => {
    if (!value) return;
    setForm({
      ...form,
      materialCode: value.materialId,
      plant: value.plant || '',
    });
  };

  const handleAddComponent = () => {
    const today = new Date().toISOString().split('T')[0];
    setForm((prev) => ({
      ...prev,
      components: [
        ...prev.components,
        {
          item: '',
          ict: '',
          component: '',
          componentDescription: '',
          quantity: '',
          unit: '',
          validFrom: today,
          validTo: today,
          changeNumber: '',
          sortString: '',
          itemId: '',
          changeNoTo: '',
        },
      ],
    }));
  };

  const handleComponentChange = (index, field, value) => {
    const updated = [...form.components];
    updated[index][field] = value;
    setForm({ ...form, components: updated });
  };

  const handleRemoveComponent = (index) => {
    const updated = form.components.filter((_, i) => i !== index);
    setForm({ ...form, components: updated });
  };

  const handleSubmit = () => {
    axios
      .post(`${server_Url}/api/v1/billofmaterial`, form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => navigate('/manufacturing/bill-of-material'))
      .catch((err) => console.error('Error creating BOM:', err));
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
            onChange={(e, value) => handleMaterialSelect(value)}
            renderInput={(params) => (
              <TextField {...params} label="Material ID" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="plant"
            label="Plant"
            value={form.plant}
            onChange={handleFormChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="alternativeBOM"
            label="Alternative BOM"
            value={form.alternativeBOM}
            onChange={handleFormChange}
            fullWidth
          />
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Components
      </Typography>

      <Button
        startIcon={<Add />}
        onClick={handleAddComponent}
        variant="outlined"
        sx={{ mb: 2 }}
      >
        Add Component
      </Button>
      <Box sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                'Item',
                'ICT',
                'Component',
                'Component Description',
                'Quantity',
                'Unit',
                'Valid From',
                'Valid To',
                'Change No.',
                'Sort String',
                'Item ID',
                'Chg No. To',
                'Action',
              ].map((header) => (
                <TableCell key={header} sx={{ fontWeight: 'bold' }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {form.components.map((comp, index) => (
              <TableRow key={index}>
                {[
                  'item',
                  'ict',
                  'component',
                  'componentDescription',
                  'quantity',
                  'unit',
                  'validFrom',
                  'validTo',
                  'changeNumber',
                  'sortString',
                  'itemId',
                  'changeNoTo',
                ].map((field) => (
                  <TableCell key={field}>
                    <TextField
                      fullWidth
                      sx={{ minWidth: '140px' }}
                      type={
                        field === 'validFrom' || field === 'validTo'
                          ? 'date'
                          : 'text'
                      }
                      value={comp[field]}
                      onChange={(e) =>
                        handleComponentChange(index, field, e.target.value)
                      }
                      InputLabelProps={
                        field === 'validFrom' || field === 'validTo'
                          ? { shrink: true }
                          : {}
                      }
                    />
                  </TableCell>
                ))}
                <TableCell>
                  <IconButton
                    onClick={() => handleRemoveComponent(index)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={handleSubmit}
      >
        Submit BOM
      </Button>
    </Container>
  );
};

export default CreateBillOfMaterial;
