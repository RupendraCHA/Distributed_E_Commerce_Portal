import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Autocomplete,
  IconButton,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditGoodsReceiptPO = () => {
  const { id } = useParams();
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [goodsReceipt, setGoodsReceipt] = useState({
    supplierId: '',
    supplierName: '',
    documentDate: '',
    items: [],
  });
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get(server_Url + '/api/v1/getMaterialIds', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMaterials(res.data));

    axios
      .get(`${server_Url}/api/v1/goods-receipt/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setGoodsReceipt(res.data));
  }, [id]);

  const handleChange = (index, field, value) => {
    const updatedItems = [...goodsReceipt.items];
    updatedItems[index][field] = value;

    if (field === 'materialId') {
      const selectedMaterial = materials.find((p) => p.materialId === value);
      if (selectedMaterial) {
        updatedItems[index].materialName = selectedMaterial.materialName;
        updatedItems[index].shortText = selectedMaterial.shortText || '-';
        updatedItems[index].unit = selectedMaterial.unit || '-';
      }
    }

    setGoodsReceipt({ ...goodsReceipt, items: updatedItems });
  };

  const addRow = () => {
    setGoodsReceipt({
      ...goodsReceipt,
      items: [
        ...goodsReceipt.items,
        {
          sNo: goodsReceipt.items.length + 1,
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
      ],
    });
  };

  const removeRow = (index) => {
    const updatedItems = goodsReceipt.items.filter((_, i) => i !== index);
    setGoodsReceipt({
      ...goodsReceipt,
      items: updatedItems.map((item, i) => ({
        ...item,
        sNo: i + 1,
      })),
    });
  };

  const handleEditSave = () => {
    axios
      .put(`${server_Url}/api/v1/goods-receipt/${id}`, goodsReceipt, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        navigate('/sourcing/goods-receipt-orders');
      });
  };

  return (
    <Container>
      <h2>Edit Goods Receipt Purchase Order</h2>

      <TextField
        label="Supplier ID"
        value={goodsReceipt.supplierId}
        onChange={(e) =>
          setGoodsReceipt({ ...goodsReceipt, supplierId: e.target.value })
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Supplier Name"
        value={goodsReceipt.supplierName}
        onChange={(e) =>
          setGoodsReceipt({ ...goodsReceipt, supplierName: e.target.value })
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Document Date"
        type="date"
        value={goodsReceipt.documentDate}
        onChange={(e) =>
          setGoodsReceipt({ ...goodsReceipt, documentDate: e.target.value })
        }
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />

      {goodsReceipt.items.map((item, index) => (
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
          <TextField label="Unit" value={item.unit} fullWidth disabled />
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
        onClick={handleEditSave}
        variant="contained"
        color="primary"
        style={{ marginTop: '10px', marginLeft: '10px' }}
      >
        Save Changes
      </Button>
    </Container>
  );
};

export default EditGoodsReceiptPO;
