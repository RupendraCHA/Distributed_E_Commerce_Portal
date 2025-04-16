import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Autocomplete,
  Grid,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditReceiptOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const server_Url = import.meta.env.VITE_API_SERVER_URL;

  const [materialOptions, setMaterialOptions] = useState([]);
  const [form, setForm] = useState({
    materialId: '',
    plant: '',
    storageLocation: '',
    quantity: '',
    unit: '',
    purchaseOrderRef: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Fetch all material options
    axios
      .get(`${server_Url}/api/v1/getMaterialIds`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMaterialOptions(res.data));

    // Fetch receipt order by ID
    axios
      .get(`${server_Url}/api/v1/receipt-orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setForm(res.data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    const token = localStorage.getItem('token');

    axios
      .put(`${server_Url}/api/v1/receipt-orders/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        navigate('/manufacturing/receipt-orders');
      })
      .catch((err) => {
        console.error('Error updating receipt order:', err);
      });
  };

  return (
    <Container maxWidth="md">
      <h2 style={{ margin: '20px 0px', fontWeight: 'bold' }}>
        Edit Receipt Order
      </h2>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Autocomplete
            options={materialOptions}
            getOptionLabel={(opt) => `${opt.materialName} (${opt.materialId})`}
            value={
              materialOptions.find(
                (opt) => opt.materialId === form.materialId
              ) || null
            }
            onChange={(e, newValue) => {
              setForm({
                ...form,
                materialId: newValue?.materialId || '',
                plant: newValue?.plant || '',
                storageLocation: newValue?.storageLocation || '',
                unit: newValue?.unit || '',
              });
            }}
            renderInput={(params) => (
              <TextField {...params} label="Material" fullWidth />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Plant"
            name="plant"
            value={form.plant}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Storage Location"
            name="storageLocation"
            value={form.storageLocation}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Unit"
            name="unit"
            value={form.unit}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Purchase Order Reference"
            name="purchaseOrderRef"
            value={form.purchaseOrderRef}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleUpdate}
            disabled={
              !form.materialId ||
              !form.plant ||
              !form.storageLocation ||
              !form.quantity
            }
          >
            Update Receipt Order
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditReceiptOrder;
