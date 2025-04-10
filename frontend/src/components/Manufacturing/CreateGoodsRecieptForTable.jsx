import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Grid,
  Button,
  Autocomplete,
} from '@mui/material';
import axios from 'axios';

const GoodsReceiptTable = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;

  const [materialOptions, setMaterialOptions] = useState([]);
  const [material, setMaterial] = useState('');
  const [quantity, setQuantity] = useState('');
  const [storageLocation, setStorageLocation] = useState('');
  const [documentDate, setDocumentDate] = useState('');
  const [postingDate, setPostingDate] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');
  const [docHeaderText, setDocHeaderText] = useState('');
  const [batch, setBatch] = useState('');
  const [valuationType, setValuationType] = useState('');
  const [movementType, setMovementType] = useState('101');
  const [stockType, setStockType] = useState('');
  const [plant, setPlant] = useState('');
  const [stockSegment, setStockSegment] = useState('');

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
        console.error('Error fetching materials:', err);
      });
  }, []);

  const handleSubmit = () => {
    const token = localStorage.getItem('token');
    const payload = {
      material,
      quantity,
      storageLocation,
      documentDate,
      postingDate,
      deliveryNote,
      docHeaderText,
      batch,
      valuationType,
      movementType,
      stockType,
      plant,
      stockSegment,
    };

    axios
      .post(`${server_Url}/api/v1/goods-receipt`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert('Goods Receipt created successfully');
      })
      .catch((err) => {
        console.error('Error creating Goods Receipt:', err);
      });
  };

  return (
    <Container maxWidth="md">
      <h2 style={{ marginTop: '20px', fontWeight: 'bold' }}>
        Create Goods Receipt
      </h2>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Document Date"
            type="date"
            value={documentDate}
            onChange={(e) => setDocumentDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Posting Date"
            type="date"
            value={postingDate}
            onChange={(e) => setPostingDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Delivery Note"
            value={deliveryNote}
            onChange={(e) => setDeliveryNote(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Doc Header Text"
            value={docHeaderText}
            onChange={(e) => setDocHeaderText(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            options={materialOptions}
            getOptionLabel={(option) => option.materialName || option.materialNumber}
            onChange={(e, newValue) => setMaterial(newValue?.materialNumber || '')}
            renderInput={(params) => (
              <TextField {...params} label="Material" fullWidth />
            )}
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
            label="Storage Location"
            value={storageLocation}
            onChange={(e) => setStorageLocation(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Batch"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Valuation Type"
            value={valuationType}
            onChange={(e) => setValuationType(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Movement Type"
            value={movementType}
            onChange={(e) => setMovementType(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Stock Type"
            value={stockType}
            onChange={(e) => setStockType(e.target.value)}
            fullWidth
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
            label="Stock Segment"
            value={stockSegment}
            onChange={(e) => setStockSegment(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={!material || !quantity || !plant}
          >
            Create Goods Receipt
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GoodsReceiptTable;
