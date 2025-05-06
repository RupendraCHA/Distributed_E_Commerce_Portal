import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Autocomplete,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateProductionOrderInitial = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const navigate = useNavigate();

  const [materialOptions, setMaterialOptions] = useState([]);
  const [materialId, setMaterialId] = useState('');
  const [materialName, setMaterialName] = useState('');
  const [productionPlant, setProductionPlant] = useState('');
  const [planningPlant, setPlanningPlant] = useState('');
  const [orderType, setOrderType] = useState('');
  const [order, setOrder] = useState('');
  const [copyFromOrder, setCopyFromOrder] = useState('');
  const [unit, setUnit] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`${server_Url}/api/v1/getMaterialIds`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMaterialOptions(res.data))
      .catch((err) => console.error('Error fetching materials:', err));
  }, []);

  const handleContinue = () => {
    navigate('/manufacturing/product-orders/details', {
      state: {
        form: {
          material: materialId,
          materialName,
          productionPlant,
          planningPlant,
          orderType,
          order,
          copyFromOrder,
          unit,
        },
        mode: 'create',
      },
    });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" sx={{ mt: 4, mb: 3, fontWeight: 'bold' }}>
        Create Production Order – Initial Screen
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Autocomplete
            options={materialOptions}
            getOptionLabel={(option) =>
              `${option.materialName} (${option.materialId})`
            }
            value={
              materialOptions.find((opt) => opt.materialId === materialId) ||
              null
            }
            onChange={(e, newValue) => {
              setMaterialId(newValue?.materialId || '');
              setMaterialName(newValue?.materialName || '');
              setProductionPlant(newValue?.plant || '');
              setPlanningPlant(newValue?.plant || '');
              setUnit(newValue?.unit || '');
            }}
            renderInput={(params) => (
              <TextField {...params} label="Material" required fullWidth />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Production Plant"
            value={productionPlant}
            onChange={(e) => setProductionPlant(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Planning Plant"
            value={planningPlant}
            onChange={(e) => setPlanningPlant(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Order Type"
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Order (Optional)"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Copy From Order (Optional)"
            value={copyFromOrder}
            onChange={(e) => setCopyFromOrder(e.target.value)}
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
            disabled={
              !materialId || !productionPlant || !planningPlant || !orderType
            }
          >
            Continue
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateProductionOrderInitial;
