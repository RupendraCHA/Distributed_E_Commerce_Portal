import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Autocomplete,
  Grid,
} from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const CreateReceiptOrder = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const navigate = useNavigate();

  const [materialOptions, setMaterialOptions] = useState([]);
  const [materialId, setMaterialId] = useState('');
  const [materialName, setMaterialName] = useState('');
  const [plant, setPlant] = useState('');
  const [storageLocation, setStorageLocation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [processOrderType, setProcessOrderType] = useState('');
  const [processOrder, setProcessOrder] = useState('');
  const location = useLocation();
  useEffect(() => {
    console.log('Location state:', location.state);
    if (location.state) {
      const {
        materialId = '',
        plant = '',
        storageLocation = '',
        quantity = '',
        unit = '',
        processOrderType = '',
        processOrder = '',
      } = location.state;
      setMaterialId(materialId);
      setPlant(plant);
      setStorageLocation(storageLocation);
      setQuantity(quantity);
      setUnit(unit);
      setProcessOrderType(processOrderType);
      setProcessOrder(processOrder);
    }
  }, [location.state]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`${server_Url}/api/v1/getMaterialIds`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMaterialOptions(res.data))
      .catch((err) => console.error('Error fetching materials:', err));
  }, []);

  const handleCreateReceipt = () => {
    const token = localStorage.getItem('token');
    const payload = {
      materialId,
      plant,
      storageLocation,
      quantity,
      unit,
      processOrderType,
      processOrder,
    };

    axios
      .post(`${server_Url}/api/v1/receipt-orders`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        navigate('/manufacturing/process-orders');
      })
      .catch((err) => {
        console.error('Error creating receipt order:', err);
      });
  };

  return (
    <Container maxWidth="md">
      <h2 style={{ margin: '20px 0px', fontWeight: 'bold' }}>
        Create Process Order
      </h2>

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
              setMaterialName(newValue?.materialName || ''); // Add this line to set materialName
              setPlant(newValue?.plant || '');
              setStorageLocation(newValue?.storageLocation || '');
              setUnit(newValue?.unit || '');
            }}
            renderInput={(params) => (
              <TextField {...params} label="Material" fullWidth />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Plant"
            value={plant}
            onChange={(e) => setPlant(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Storage Location"
            value={storageLocation}
            onChange={(e) => setStorageLocation(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
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
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() =>
              navigate('/manufacturing/process-orders/create/details', {
                state: {
                  materialId,
                  materialName,
                  plant,
                  storageLocation,
                  quantity,
                  unit,
                  processOrderType,
                  processOrder,
                },
              })
            }
            disabled={!materialId || !plant || !storageLocation || !quantity}
          >
            Continue
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateReceiptOrder;
