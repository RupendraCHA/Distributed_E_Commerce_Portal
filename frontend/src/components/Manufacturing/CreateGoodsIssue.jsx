import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Autocomplete,
  Grid,
} from '@mui/material';
import axios from 'axios';

const CreateGoodsIssue = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;

  const [materialOptions, setMaterialOptions] = useState([]);
  const [material, setMaterial] = useState('');
  const [quantity, setQuantity] = useState('');
  const [storageLocation, setStorageLocation] = useState('');
  const [postingDate, setPostingDate] = useState('');
  const [documentDate, setDocumentDate] = useState('');
  const [processOrder, setProcessOrder] = useState('');

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

  const handleCreateGoodsIssue = () => {
    const token = localStorage.getItem('token');
    const payload = {
      material,
      quantity,
      storageLocation,
      postingDate,
      documentDate,
      processOrder,
    };

    axios
      .post(`${server_Url}/api/v1/goods-issue`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert('Goods Issue created successfully');
      })
      .catch((err) => {
        console.error('Error creating Goods Issue:', err);
      });
  };

  return (
    <Container maxWidth="md">
      <h2 style={{ marginTop: '20px', fontWeight: 'bold' }}>
        Create Goods Issue for Process Order
      </h2>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Process Order"
            value={processOrder}
            onChange={(e) => setProcessOrder(e.target.value)}
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
            label="Posting Date"
            type="date"
            value={postingDate}
            onChange={(e) => setPostingDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>

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

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCreateGoodsIssue}
            disabled={!material || !quantity || !processOrder}
          >
            Create Goods Issue
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateGoodsIssue;
