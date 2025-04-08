import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Autocomplete,
  Grid,
} from '@mui/material';
import axios from 'axios';

const CreateProcessOrder = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const [materialOptions, setMaterialOptions] = useState([]);
  const [materialNumber, setMaterialNumber] = useState('');
  const [productionPlant, setProductionPlant] = useState('');
  const [planningPlant, setPlanningPlant] = useState('');
  const [processOrderType, setProcessOrderType] = useState('');
  const [processOrder, setProcessOrder] = useState('');
  const [copyFromOrder, setCopyFromOrder] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`${server_Url}/api/v1/materials`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMaterialOptions(res.data);
      })
      .catch((err) => {
        console.error('Error fetching material data:', err);
      });
  }, []);

  const handleCreateProcessOrder = () => {
    const token = localStorage.getItem('token');
    const payload = {
      materialNumber,
      productionPlant,
      planningPlant,
      processOrderType,
      processOrder,
      copyFromOrder,
    };

    axios
      .post(`${server_Url}/api/v1/process-orders`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert('Process Order created successfully');
        // You can redirect or reset form if needed
      })
      .catch((err) => {
        console.error('Error creating process order:', err);
      });
  };

  return (
    <Container maxWidth="md">
      <h2 style={{ marginTop: '20px', fontWeight: 'bold' }}>
        Create Process Order
      </h2>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Autocomplete
            options={materialOptions}
            getOptionLabel={(option) => option.materialName || option.materialNumber}
            onChange={(e, newValue) => setMaterialNumber(newValue?.materialNumber || '')}
            renderInput={(params) => (
              <TextField {...params} label="Material Number" fullWidth />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Production Plant"
            value={productionPlant}
            onChange={(e) => setProductionPlant(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Planning Plant"
            value={planningPlant}
            onChange={(e) => setPlanningPlant(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Process Order Type"
            value={processOrderType}
            onChange={(e) => setProcessOrderType(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Process Order"
            value={processOrder}
            onChange={(e) => setProcessOrder(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Copy From Process Order"
            value={copyFromOrder}
            onChange={(e) => setCopyFromOrder(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCreateProcessOrder}
            disabled={!materialNumber || !productionPlant || !planningPlant}
          >
            Create Process Order
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateProcessOrder;
