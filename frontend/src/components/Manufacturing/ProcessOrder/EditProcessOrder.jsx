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
import { useLocation } from 'react-router-dom';

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
    processOrderType: '',
    processOrder: '',
  });

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setForm((prev) => ({
        ...prev,
        ...location.state,
      }));
    } else {
      // fallback to fetch
      const token = localStorage.getItem('token');
      axios
        .get(`${server_Url}/api/v1/receipt-orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setForm(res.data));
    }
  }, [id, location.state]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get(`${server_Url}/api/v1/getMaterialIds`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMaterialOptions(res.data));

    axios
      .get(`${server_Url}/api/v1/receipt-orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setForm(res.data));
  }, [id]);

  return (
    <Container maxWidth="md">
      <h2 style={{ margin: '20px 0px', fontWeight: 'bold' }}>
        Edit Process Order
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

        {/* Just show fields for reference */}
        <Grid item xs={6}>
          <TextField label="Plant" value={form.plant} fullWidth disabled />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Storage Location"
            value={form.storageLocation}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Quantity"
            value={form.quantity}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Unit" value={form.unit} fullWidth disabled />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Process Order Type"
            value={form.processOrderType}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Process Order"
            value={form.processOrder}
            fullWidth
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() =>
              navigate('/manufacturing/process-orders/create/details', {
                state: form,
              })
            }
          >
            Continue
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditReceiptOrder;
