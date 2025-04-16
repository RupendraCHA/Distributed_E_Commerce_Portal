import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Autocomplete,
  Grid,
} from '@mui/material';
import axios from 'axios';

const EditGoodsIssue = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const server_Url = import.meta.env.VITE_API_SERVER_URL;

  const [materialOptions, setMaterialOptions] = useState([]);
  const [receiptOrders, setReceiptOrders] = useState([]);
  const [form, setForm] = useState({
    processOrder: '',
    receiptOrderId: '',
    material: '',
    quantity: '',
    storageLocation: '',
    postingDate: '',
    documentDate: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get(`${server_Url}/api/v1/materials`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMaterialOptions(res.data));

    axios
      .get(`${server_Url}/api/v1/receipt-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setReceiptOrders(res.data));

    axios
      .get(`${server_Url}/api/v1/goods-issue/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setForm(res.data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReceiptSelect = (receiptOrder) => {
    if (!receiptOrder) return;
    setForm({
      ...form,
      receiptOrderId: receiptOrder._id,
      material: receiptOrder.materialId,
      quantity: receiptOrder.quantity,
      storageLocation: receiptOrder.storageLocation,
      processOrder: `PO-${receiptOrder._id}`,
    });
  };

  const handleUpdate = () => {
    const token = localStorage.getItem('token');
    axios
      .put(`${server_Url}/api/v1/goods-issue/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        navigate('/manufacturing/goods-issue');
      })
      .catch((err) => {
        console.error('Error updating Goods Issue:', err);
      });
  };

  return (
    <Container maxWidth="md">
      <h2 style={{ margin: '20px 0px', fontWeight: 'bold' }}>
        Edit Goods Issue
      </h2>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Autocomplete
            options={receiptOrders}
            getOptionLabel={(order) =>
              `${order.materialId} (${order.purchaseOrderRef || 'N/A'})`
            }
            value={
              receiptOrders.find(
                (order) => order._id === form.receiptOrderId
              ) || null
            }
            onChange={(e, value) => handleReceiptSelect(value)}
            renderInput={(params) => (
              <TextField {...params} label="Select Receipt Order" fullWidth />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Process Order"
            name="processOrder"
            value={form.processOrder}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            options={materialOptions}
            getOptionLabel={(opt) => opt.materialName || opt.materialNumber}
            value={
              materialOptions.find(
                (opt) => opt.materialNumber === form.material
              ) || null
            }
            onChange={(e, newValue) => {
              if (!form.receiptOrderId) {
                setForm({ ...form, material: newValue?.materialNumber || '' });
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Material"
                fullWidth
                disabled={!!form.receiptOrderId} // lock if receipt order exists
              />
            )}
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
            label="Storage Location"
            name="storageLocation"
            value={form.storageLocation}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Posting Date"
            name="postingDate"
            type="date"
            value={form.postingDate?.slice(0, 10)}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Document Date"
            name="documentDate"
            type="date"
            value={form.documentDate?.slice(0, 10)}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleUpdate}
          >
            Update Goods Issue
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditGoodsIssue;
