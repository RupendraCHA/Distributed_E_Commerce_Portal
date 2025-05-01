import React, { useState } from 'react';
import { Container, TextField, Button, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateProductionOrder = () => {
  const [form, setForm] = useState({
    material: '',
    productionPlant: '',
    planningPlant: '',
    orderType: '',
    order: '',
    copyFromOrder: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    navigate('/manufacturing/product-orders');
  };

  return (
    <Container maxWidth="md">
      <h2 style={{ margin: '20px 0px', fontWeight: 'bold' }}>
        Create Production Order
      </h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Material"
              name="material"
              value={form.material}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Production Plant"
              name="productionPlant"
              value={form.productionPlant}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Planning Plant"
              name="planningPlant"
              value={form.planningPlant}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Order Type"
              name="orderType"
              value={form.orderType}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Order"
              name="order"
              value={form.order}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Copy from Order"
              name="copyFromOrder"
              value={form.copyFromOrder}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              <Button type="submit" variant="contained" color="primary">
                Create
              </Button>
              <Button
                type="button"
                variant="outlined"
                onClick={() => navigate('/manufacturing/product-orders')}
              >
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateProductionOrder;
