import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Grid,
  Button,
  Autocomplete,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditGoodsReceipt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const server_Url = import.meta.env.VITE_API_SERVER_URL;

  const [materialOptions, setMaterialOptions] = useState([]);
  const [form, setForm] = useState({
    material: '',
    quantity: '',
    storageLocation: '',
    documentDate: '',
    postingDate: '',
    deliveryNote: '',
    docHeaderText: '',
    batch: '',
    valuationType: '',
    movementType: '101',
    stockType: '',
    plant: '',
    stockSegment: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`${server_Url}/api/v1/getMaterialIds`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMaterialOptions(res.data));

    axios
      .get(`${server_Url}/api/v1/manufacture-goods-receipt/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        setForm({
          ...data,
          documentDate: data.documentDate?.slice(0, 10) || '',
          postingDate: data.postingDate?.slice(0, 10) || '',
        });
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    const token = localStorage.getItem('token');
    axios
      .put(`${server_Url}/api/v1/manufacture-goods-receipt/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        navigate('/manufacturing/goods-receipt');
      })
      .catch((err) => console.error('Error updating:', err));
  };

  return (
    <Container maxWidth="md">
      <h2 style={{ margin: '20px 0px', fontWeight: 'bold' }}>
        Edit Goods Receipt
      </h2>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Autocomplete
            options={materialOptions}
            getOptionLabel={(option) =>
              `${option.materialName} (${option.materialId})`
            }
            value={
              materialOptions.find((opt) => opt.materialId === form.material) ||
              null
            }
            onChange={(e, newValue) => {
              setForm({
                ...form,
                material: newValue?.materialId || '',
                plant: newValue?.plant || '',
                storageLocation: newValue?.storageLocation || '',
                valuationType: newValue?.valuationType || '',
              });
            }}
            renderInput={(params) => (
              <TextField {...params} label="Material" fullWidth />
            )}
          />
        </Grid>

        {[
          ['Document Date', 'documentDate', 'date'],
          ['Posting Date', 'postingDate', 'date'],
          ['Delivery Note', 'deliveryNote'],
          ['Doc Header Text', 'docHeaderText'],
          ['Quantity', 'quantity', 'number'],
          ['Storage Location', 'storageLocation'],
          ['Batch', 'batch'],
          ['Valuation Type', 'valuationType'],
          ['Movement Type', 'movementType'],
          ['Stock Type', 'stockType'],
          ['Plant', 'plant'],
          ['Stock Segment', 'stockSegment'],
        ].map(([label, name, type = 'text']) => (
          <Grid item xs={6} key={name}>
            <TextField
              label={label}
              name={name}
              value={form[name]}
              type={type}
              onChange={handleChange}
              InputLabelProps={type === 'date' ? { shrink: true } : {}}
              fullWidth
            />
          </Grid>
        ))}

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleUpdate}
            disabled={!form.material || !form.quantity || !form.plant}
          >
            Update Goods Receipt
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditGoodsReceipt;
