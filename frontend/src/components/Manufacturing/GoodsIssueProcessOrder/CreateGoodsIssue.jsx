import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Autocomplete,
  Grid,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateGoodsIssue = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const navigate = useNavigate();

  const [receiptOrders, setReceiptOrders] = useState([]);
  const [materialOptions, setMaterialOptions] = useState([]);
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
      .get(`${server_Url}/api/v1/receipt-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setReceiptOrders(res.data));

    axios
      .get(`${server_Url}/api/v1/getMaterialIds`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMaterialOptions(res.data));
  }, []);

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    const token = localStorage.getItem('token');
    axios
      .post(`${server_Url}/api/v1/goods-issue`, form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        navigate('/manufacturing/goods-issue');
      })
      .catch((err) => {
        console.error('Error creating Goods Issue:', err);
      });
  };

  return (
    <Container maxWidth="md">
      <h2 style={{ margin: '20px 0px', fontWeight: 'bold' }}>
        Create Goods Issue for Process Order
      </h2>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12}>
          <Autocomplete
            options={receiptOrders}
            getOptionLabel={(order) =>
              `${order.materialId} (${order.purchaseOrderRef || 'N/A'})`
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
            disabled
            options={materialOptions}
            getOptionLabel={(opt) => opt.materialName || opt.materialNumber}
            value={
              materialOptions.find(
                (opt) =>
                  opt.materialId === form.material ||
                  opt.materialNumber === form.material
              ) || null
            }
            onChange={(e, newValue) => {
              // Only allow material selection if no receiptOrder is selected
              if (!form.receiptOrderId) {
                setForm({ ...form, material: newValue?.materialNumber || '' });
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Material"
                fullWidth
                disabled={!!form.receiptOrderId} // 🔒 Lock after selecting Receipt Order
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
            value={form.postingDate}
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
            value={form.documentDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleCreate}
            disabled={!form.material || !form.quantity || !form.processOrder}
          >
            Create Goods Issue
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateGoodsIssue;
