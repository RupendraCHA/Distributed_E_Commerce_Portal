import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Autocomplete,
  IconButton,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateGoodsReceiptPO = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const [materials, setMaterials] = useState([]);
  const [rows, setRows] = useState([
    {
      sNo: 1,
      materialId: '',
      materialName: '',
      shortText: '',
      quantity: 1,
      unit: '',
      plant: '',
      storageLocation: '',
      movementType: '101',
      stockType: 'Unrestricted',
      goodsRecipient: '',
      itemOK: true,
    },
  ]);
  const [supplierId, setSupplierId] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [documentDate, setDocumentDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(server_Url + '/api/v1/getMaterialIds').then((res) => {
      setMaterials(res.data);
    });
  }, []);

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    if (field === 'materialId') {
      const selectedMaterial = materials.find((p) => p.materialId === value);
      if (selectedMaterial) {
        updatedRows[index].materialName = selectedMaterial.materialName;
        updatedRows[index].shortText = selectedMaterial.shortText || '-';
        updatedRows[index].unit = selectedMaterial.unit || '1';
      }
    }

    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        sNo: rows.length + 1,
        materialId: '',
        materialName: '',
        shortText: '',
        quantity: 1,
        unit: '',
        plant: '',
        storageLocation: '',
        movementType: '101',
        stockType: 'Unrestricted',
        goodsRecipient: '',
        itemOK: true,
      },
    ]);
  };

  const removeRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows.map((row, i) => ({ ...row, sNo: i + 1 })));
  };

  const handleSave = () => {
    const token = localStorage.getItem('token');
    axios
      .post(
        server_Url + '/api/v1/goods-receipt',
        { supplierId, supplierName, documentDate, items: rows },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        navigate('/sourcing/goods-receipt-orders');
      });
  };

  return (
    <Container>
      <h2>Create Goods Receipt Purchase Order</h2>

      <TextField
        label="Supplier ID"
        value={supplierId}
        onChange={(e) => setSupplierId(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Supplier Name"
        value={supplierName}
        onChange={(e) => setSupplierName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Document Date"
        type="date"
        value={documentDate}
        onChange={(e) => setDocumentDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />

      {rows.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <Autocomplete
            options={materials.map((p) => p.materialId)}
            value={item.materialId}
            onChange={(event, newValue) =>
              handleChange(index, 'materialId', newValue)
            }
            renderInput={(params) => (
              <TextField {...params} label="Material ID" fullWidth />
            )}
          />
          <TextField
            label="Material Name"
            value={item.materialName}
            fullWidth
            disabled
          />
          <TextField
            label="Short Text"
            value={item.shortText}
            fullWidth
            disabled
          />
          <TextField
            label="Quantity"
            type="number"
            value={item.quantity}
            onChange={(e) => handleChange(index, 'quantity', e.target.value)}
            fullWidth
          />
          <TextField
            label="Unit"
            value={item.unit}
            fullWidth
            onChange={(e) => handleChange(index, 'unit', e.target.value)}
          />
          <TextField
            label="Plant"
            value={item.plant}
            onChange={(e) => handleChange(index, 'plant', e.target.value)}
            fullWidth
          />
          <TextField
            label="Storage Location"
            value={item.storageLocation}
            onChange={(e) =>
              handleChange(index, 'storageLocation', e.target.value)
            }
            fullWidth
          />
          <TextField
            label="Movement Type"
            value={item.movementType}
            fullWidth
            disabled
          />
          <TextField
            label="Stock Type"
            value={item.stockType}
            fullWidth
            disabled
          />
          <TextField
            label="Goods Recipient"
            value={item.goodsRecipient}
            onChange={(e) =>
              handleChange(index, 'goodsRecipient', e.target.value)
            }
            fullWidth
          />
          <TextField
            label="Item OK"
            value={item.itemOK ? '✔' : '❌'}
            fullWidth
            disabled
          />
          <IconButton color="secondary" onClick={() => removeRow(index)}>
            <Delete />
          </IconButton>
        </div>
      ))}

      <Button
        startIcon={<Add />}
        onClick={addRow}
        variant="outlined"
        color="primary"
        style={{ marginTop: '10px' }}
      >
        Add Row
      </Button>
      <Button
        onClick={handleSave}
        variant="contained"
        color="primary"
        style={{ marginTop: '10px', marginLeft: '10px' }}
      >
        Save Goods Receipt
      </Button>
    </Container>
  );
};

export default CreateGoodsReceiptPO;
