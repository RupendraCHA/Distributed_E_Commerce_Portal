import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Box,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBillOfMaterial = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const server_Url = import.meta.env.VITE_API_SERVER_URL;

  const [form, setForm] = useState({
    materialCode: '',
    plant: '',
    alternativeBOM: '',
    components: [],
  });

  useEffect(() => {
    axios
      .get(`${server_Url}/api/v1/billofmaterial/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setForm(res.data))
      .catch((err) => console.error('Error fetching BOM:', err));
  }, [id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
      .put(`${server_Url}/api/v1/billofmaterial/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => navigate('/manufacturing/bill-of-material'))
      .catch((err) => console.error('Error updating BOM:', err));
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 2 }}>
        Edit Bill of Material
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="materialCode"
            label="Material Code"
            value={form.materialCode}
            fullWidth
            disabled
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
        Update BOM
      </Button>
    </Container>
  );
};

export default EditBillOfMaterial;
