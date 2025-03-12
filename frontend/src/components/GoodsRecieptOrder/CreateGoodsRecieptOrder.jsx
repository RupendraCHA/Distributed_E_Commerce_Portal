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
  Autocomplete,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateGoodsReceipt = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [selectedPO, setSelectedPO] = useState(null);
  const [rows, setRows] = useState([]);
  const [documentDate, setDocumentDate] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch Purchase Orders
  useEffect(() => {
    let isMounted = true;
    const fetchPOs = async () => {
      try {
        const response = await axios.get(
          `${server_Url}/api/v1/purchase-orders`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (isMounted) setPurchaseOrders(response.data);
      } catch (err) {
        if (isMounted)
          setError('Failed to fetch purchase orders. Please try again.');
      }
    };

    fetchPOs();
    return () => {
      isMounted = false;
    }; // Cleanup function
  }, []);

  // Handle Purchase Order Selection
  const handlePOSelect = (poId) => {
    const po = purchaseOrders.find((p) => p._id === poId);
    setSelectedPO(po);

    if (po) {
      setSupplierId(po.supplierId);
      setSupplierName(po.supplierName);
      setRows(
        po.items.map((item, index) => ({
          sNo: index + 1,
          materialId: item.materialId,
          materialName: item.materialName,
          quantityOrdered: item.quantity,
          quantityReceived: item.quantity, // Default full receipt
          unit: item.unit,
          batch: '',
          stockSegment: item.stockSegment || '',
          storageLocation: item.storageLocation || '',
          plant: item.plant || '',
          deliveryNote: '',
          movementType: '101', // Default movement type
          stockType: 'Unrestricted-Use',
          goodsRecipient: '',
          unloadingPoint: '',
          valuationType: '',
          extendedAmount: '',
          taxCode: item.taxCode || '',
          currency: item.currency || 'INR',
        }))
      );
    } else {
      setSupplierId('');
      setSupplierName('');
      setRows([]); // Clear rows if no PO is selected
    }
  };
  console.log(rows);
  // Handle Row Updates
  const handleChange = (index, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  // Add Row
  const addRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        sNo: prevRows.length + 1,
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
    ]);
  };

  // Remove Row
  const removeRow = (index) => {
    setRows((prevRows) =>
      prevRows
        .filter((_, i) => i !== index)
        .map((item, i) => ({ ...item, sNo: i + 1 }))
    );
  };

  // Save Goods Receipt
  const handleSave = async () => {
    if (
      !selectedPO ||
      !documentDate ||
      !supplierId ||
      !supplierName ||
      rows.length === 0
    ) {
      setError('Please select a Purchase Order and provide required details.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${server_Url}/api/v1/goods-receipt`,
        {
          purchaseOrderId: selectedPO?._id,
          documentDate,
          supplierId,
          supplierName,
          items: rows,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate('/sourcing/goods-receipt-orders');
    } catch (err) {
      setError('Failed to create Goods Receipt. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2>Create Goods Receipt</h2>

      {error && <Alert severity="error">{error}</Alert>}

      {/* Purchase Order Selection */}
      <Autocomplete
        options={purchaseOrders.map((po) => ({
          label: `${po._id} - ${po.supplierName}`,
          value: po._id,
        }))}
        onChange={(event, newValue) =>
          handlePOSelect(newValue ? newValue.value : null)
        }
        renderInput={(params) => (
          <TextField {...params} label="Select Purchase Order" fullWidth />
        )}
      />

      {/* Document Date */}
      <TextField
        label="Supplier ID"
        value={supplierId}
        fullWidth
        margin="normal"
        disabled
      />
      <TextField
        label="Supplier Name"
        value={supplierName}
        fullWidth
        margin="normal"
        disabled
      />

      {/* Document Date */}
      <TextField
        label="Document Date"
        type="date"
        value={documentDate}
        onChange={(e) => setDocumentDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />

      {/* Goods Receipt Table */}
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
            {rows.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.sNo}</TableCell>
                <TableCell>
                  <TextField value={item.materialId} fullWidth />
                </TableCell>
                <TableCell>
                  <TextField value={item.materialName} fullWidth />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={item.quantityOrdered}
                    fullWidth
                  />
                </TableCell>
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
                <TableCell>{item.unit}</TableCell>
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
                    type="text"
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
      <Button onClick={handleSave} variant="contained" color="primary">
        Save Goods Receipt
      </Button>
    </Container>
  );
};

export default CreateGoodsReceipt;
