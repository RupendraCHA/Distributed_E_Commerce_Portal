import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Checkbox,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditGoodsReceipt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(
        `${
          import.meta.env.VITE_API_SERVER_URL
        }/api/v1/manufacture-goods-receipt/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => setForm(res.data))
      .catch((err) => console.error('Failed to fetch goods receipt:', err));
  }, [id]);

  const handleItemChange = (index, field, value) => {
    const updated = [...form.items];
    updated[index][field] = field === 'wOk' ? value.target.checked : value;
    setForm({ ...form, items: updated });
  };

  const handleAddItem = () => {
    setForm({
      ...form,
      items: [
        ...form.items,
        {
          lineNo: form.items.length + 1,
          material: '',
          shortText: '',
          quantity: 0,
          unit: '',
          storageLocation: '',
          stockSegment: '',
          batch: '',
          valuationType: '',
          movementType: '101',
          stockType: '+ Quality Insp.',
          plant: '',
          jitCallNo: '',
          wOk: false,
        },
      ],
    });
  };

  const handleRemoveItem = (index) => {
    const updated = form.items.filter((_, i) => i !== index);
    setForm({ ...form, items: updated });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${
          import.meta.env.VITE_API_SERVER_URL
        }/api/v1/manufacture-goods-receipt/${id}`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate('/manufacturing/goods-receipt');
    } catch (err) {
      console.error(err);
      alert('Failed to update Goods Receipt');
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <Container>
      <h2>Edit Goods Receipt</h2>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Order Number"
            value={form.orderNumber}
            disabled
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            type="date"
            label="Document Date"
            InputLabelProps={{ shrink: true }}
            value={form.documentDate?.substring(0, 10)}
            onChange={(e) => setForm({ ...form, documentDate: e.target.value })}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            type="date"
            label="Posting Date"
            InputLabelProps={{ shrink: true }}
            value={form.postingDate?.substring(0, 10)}
            onChange={(e) => setForm({ ...form, postingDate: e.target.value })}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Delivery Note"
            value={form.deliveryNote}
            onChange={(e) => setForm({ ...form, deliveryNote: e.target.value })}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Header Text"
            value={form.headerText}
            onChange={(e) => setForm({ ...form, headerText: e.target.value })}
          />
        </Grid>
      </Grid>

      <h3>Line Items</h3>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Line</TableCell>
            <TableCell>Material</TableCell>
            <TableCell>Short Text</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>SLoc</TableCell>
            <TableCell>Stock Segment</TableCell>
            <TableCell>Batch</TableCell>
            <TableCell>Val. Type</TableCell>
            <TableCell>Movement</TableCell>
            <TableCell>Stock Type</TableCell>
            <TableCell>Plant</TableCell>
            <TableCell>JIT Call No</TableCell>
            <TableCell>W/OK</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {form.items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.lineNo}</TableCell>
              <TableCell>
                <TextField
                  value={item.material}
                  onChange={(e) =>
                    handleItemChange(index, 'material', e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={item.shortText}
                  onChange={(e) =>
                    handleItemChange(index, 'shortText', e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, 'quantity', e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={item.unit}
                  onChange={(e) =>
                    handleItemChange(index, 'unit', e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={item.storageLocation}
                  onChange={(e) =>
                    handleItemChange(index, 'storageLocation', e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={item.stockSegment}
                  onChange={(e) =>
                    handleItemChange(index, 'stockSegment', e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={item.batch}
                  onChange={(e) =>
                    handleItemChange(index, 'batch', e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={item.valuationType}
                  onChange={(e) =>
                    handleItemChange(index, 'valuationType', e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={item.movementType}
                  onChange={(e) =>
                    handleItemChange(index, 'movementType', e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={item.stockType}
                  onChange={(e) =>
                    handleItemChange(index, 'stockType', e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={item.plant}
                  onChange={(e) =>
                    handleItemChange(index, 'plant', e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={item.jitCallNo}
                  onChange={(e) =>
                    handleItemChange(index, 'jitCallNo', e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <Checkbox
                  checked={item.wOk}
                  onChange={(e) => handleItemChange(index, 'wOk', e)}
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleRemoveItem(index)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button
        variant="outlined"
        startIcon={<Add />}
        onClick={handleAddItem}
        sx={{ my: 2 }}
      >
        Add Item
      </Button>
      <br />
      <Button variant="contained" onClick={handleSubmit}>
        Update
      </Button>
    </Container>
  );
};

export default EditGoodsReceipt;
