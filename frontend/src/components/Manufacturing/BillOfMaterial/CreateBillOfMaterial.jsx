import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  Autocomplete,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
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
    components: [],
  });

  const [materialOptions, setMaterialOptions] = useState([]);
  const [materials, setMaterials] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const server_Url = import.meta.env.VITE_API_SERVER_URL;

  useEffect(() => {
    axios
      .get(`${server_Url}/api/v1/getMaterialIds`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMaterialOptions(res.data);
        setMaterials(res.data);
      })
      .catch((err) => console.error('Error fetching materials:', err));
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddComponent = () => {
    setForm((prev) => ({
      ...prev,
      components: [
        ...prev.components,
        {
          component: '',
          componentDescription: '',
          quantity: '',
          compUnit: '',
          itemText: '',
          scrap: '',
          operation: '',
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

  const handleMaterialSelect = (value) => {
    if (!value) return;
    setForm((prev) => ({
      ...prev,
      materialCode: value.materialId,
      plant: value.plant || '',
      unit: value.unit || '',
    }));
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
            onChange={(e, value) => handleMaterialSelect(value)}
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
        ].map((key) => (
          <Grid item xs={12} sm={6} key={key}>
            <TextField
              name={key}
              label={key.replace(/([A-Z])/g, ' $1')}
              value={form[key]}
              onChange={handleFormChange}
              fullWidth
              type={key.toLowerCase().includes('date') ? 'date' : 'text'}
              InputLabelProps={
                key.toLowerCase().includes('date') ? { shrink: true } : {}
              }
            />
          </Grid>
        ))}
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

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Component</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Item Text</TableCell>
            <TableCell>Scrap</TableCell>
            <TableCell>Operation</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {form.components.map((comp, index) => (
            <TableRow key={index}>
              {[
                'component',
                'componentDescription',
                'quantity',
                'compUnit',
                'itemText',
                'scrap',
                'operation',
              ].map((field) => (
                <TableCell key={field}>
                  <TextField
                    fullWidth
                    value={comp[field]}
                    onChange={(e) =>
                      handleComponentChange(index, field, e.target.value)
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

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={handleSubmit}
      >
        Create BOM
      </Button>
    </Container>
  );
};

export default CreateBillOfMaterial;
