import React, { useEffect, useState } from 'react';
import { Container, Grid, TextField, Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditProductionOrderInitial = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const [form, setForm] = useState(null);
  const [materialName, setMaterialName] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `${server_Url}/api/v1/production-orders/${id}`
        );
        setForm(res.data);
        fetchMaterialName(res.data.material);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };
    fetchOrder();
  }, [id]);

  const fetchMaterialName = async (materialId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${server_Url}/api/v1/getMaterialIds`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const found = res.data.find((m) => m.materialId === materialId);
      if (found) {
        setMaterialName(`${found.materialName} (${found.materialId})`);
      }
    } catch (err) {
      console.error('Failed to fetch material name', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    navigate('/manufacturing/product-orders/details', {
      state: { form, mode: 'edit', id },
    });
  };

  if (!form) return <div>Loading...</div>;

  return (
    <Container maxWidth="md">
      <Typography variant="h5" sx={{ mt: 4, mb: 3, fontWeight: 'bold' }}>
        Edit Production Order – Initial Screen
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Material"
            value={materialName || form.material}
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Production Plant"
            name="productionPlant"
            value={form.productionPlant}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Planning Plant"
            name="planningPlant"
            value={form.planningPlant}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Order Type"
            name="orderType"
            value={form.orderType}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Order" value={form.order} disabled fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Copy From Order (Optional)"
            name="copyFromOrder"
            value={form.copyFromOrder}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleContinue}
            fullWidth
            sx={{ mt: 2 }}
          >
            Continue
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditProductionOrderInitial;
