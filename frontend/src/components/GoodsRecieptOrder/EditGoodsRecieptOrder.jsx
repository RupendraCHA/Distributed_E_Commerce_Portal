import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditGoodsReceipt = () => {
  const { id } = useParams();
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const navigate = useNavigate();
  const [goodsReceipt, setGoodsReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    let isMounted = true;

    const fetchGoodsReceipt = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${server_Url}/api/v1/goods-receipt/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (isMounted) setGoodsReceipt(response.data);
      } catch (err) {
        if (isMounted)
          setError('Failed to fetch Goods Receipt. Please try again.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchGoodsReceipt();
    return () => {
      isMounted = false;
    }; // Cleanup function
  }, [id]);

  const handleChange = (index, field, value) => {
    setGoodsReceipt((prevState) => ({
      ...prevState,
      items: prevState.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addRow = () => {
    setGoodsReceipt((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items,
        {
          sNo: prevState.items.length + 1,
          materialId: '',
          materialName: '',
          quantityOrdered: '',
          quantityReceived: '',
          unit: '',
          batch: '',
          stockSegment: '',
          storageLocation: '',
          plant: '',
          deliveryNote: '',
          movementType: '101',
          stockType: 'Unrestricted-Use',
          goodsRecipient: '',
          unloadingPoint: '',
          valuationType: '',
          extendedAmount: '',
          taxCode: '',
          currency: 'INR',
        },
      ],
    }));
  };

  const removeRow = (index) => {
    setGoodsReceipt((prevState) => ({
      ...prevState,
      items: prevState.items
        .filter((_, i) => i !== index)
        .map((item, i) => ({ ...item, sNo: i + 1 })),
    }));
  };

  const handleEditSave = async () => {
    setSaving(true);
    setError('');

    try {
      await axios.put(
        `${server_Url}/api/v1/goods-receipt/${id}`,
        goodsReceipt,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate('/sourcing/goods-receipt-orders');
    } catch (err) {
      setError('Failed to update Goods Receipt. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
        <p>Loading Goods Receipt...</p>
      </Container>
    );
  }

  if (!goodsReceipt) {
    return (
      <Container>
        <Alert severity="error">{error || 'No Goods Receipt found.'}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h2>Edit Goods Receipt</h2>

      {error && <Alert severity="error">{error}</Alert>}

      {/* Document Date */}
      <TextField
        label="Supplier ID"
        value={goodsReceipt.supplierId}
        fullWidth
        margin="normal"
        disabled
      />

      <TextField
        label="Supplier Name"
        value={goodsReceipt.supplierName}
        fullWidth
        margin="normal"
        disabled
      />

      <TextField
        label="Document Date"
        type="date"
        value={goodsReceipt.documentDate}
        onChange={(e) =>
          setGoodsReceipt((prevState) => ({
            ...prevState,
            documentDate: e.target.value,
          }))
        }
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />

      {/* Scrollable Table */}
      <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
        <Table style={{ minWidth: '1800px' }}>
          <TableHead>
            <TableRow>
              {[
                'S.No',
                'Material ID',
                'Material Name',
                'Ordered Qty',
                'Received Qty',
                'Unit',
                'Batch',
                'Stock Segment',
                'Storage Location',
                'Plant',
                'Delivery Note',
                'Movement Type',
                'Stock Type',
                'Goods Recipient',
                'Unloading Point',
                'Valuation Type',
                'Extended Amount',
                'Tax Code',
                'Currency',
                'Action',
              ].map((header) => (
                <TableCell
                  key={header}
                  style={{ minWidth: '120px', fontWeight: 'bold' }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {goodsReceipt.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.sNo}</TableCell>
                <TableCell>{item.materialId}</TableCell>
                <TableCell>{item.materialName}</TableCell>
                <TableCell>{item.quantityOrdered}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={item.quantityReceived}
                    onChange={(e) =>
                      handleChange(index, 'quantityReceived', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={item.unit}
                    onChange={(e) =>
                      handleChange(index, 'unit', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    value={item.batch}
                    onChange={(e) =>
                      handleChange(index, 'batch', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    value={item.stockSegment}
                    onChange={(e) =>
                      handleChange(index, 'stockSegment', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    value={item.storageLocation}
                    onChange={(e) =>
                      handleChange(index, 'storageLocation', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    value={item.plant}
                    onChange={(e) =>
                      handleChange(index, 'plant', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    value={item.deliveryNote}
                    onChange={(e) =>
                      handleChange(index, 'deliveryNote', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    value={item.movementType}
                    onChange={(e) =>
                      handleChange(index, 'movementType', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    value={item.stockType}
                    onChange={(e) =>
                      handleChange(index, 'stockType', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    value={item.goodsRecipient}
                    onChange={(e) =>
                      handleChange(index, 'goodsRecipient', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    value={item.unloadingPoint}
                    onChange={(e) =>
                      handleChange(index, 'unloadingPoint', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    value={item.valuationType}
                    onChange={(e) =>
                      handleChange(index, 'valuationType', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={item.extendedAmount}
                    onChange={(e) =>
                      handleChange(index, 'extendedAmount', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    value={item.taxCode}
                    onChange={(e) =>
                      handleChange(index, 'taxCode', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    value={item.currency}
                    onChange={(e) =>
                      handleChange(index, 'currency', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => removeRow(index)}
                    disabled={goodsReceipt.items.length === 1}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Button startIcon={<Add />} onClick={addRow} variant="outlined">
        Add Row
      </Button>
      <Button
        onClick={handleEditSave}
        variant="contained"
        color="primary"
        disabled={saving}
      >
        {saving ? <CircularProgress size={24} /> : 'Save Changes'}
      </Button>
    </Container>
  );
};

export default EditGoodsReceipt;
