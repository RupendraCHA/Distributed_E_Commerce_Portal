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
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePurchaseOrder = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const [materials, setMaterials] = useState([]);
  const [rows, setRows] = useState([
    {
      sNo: 1,
      itemNo: '',
      materialId: '',
      materialName: '',
      shortText: '',
      materialGroup: '',
      quantity: 1,
      unit: '',
      deliveryDate: '',
      plant: '',
      storageLocation: '',
      netPrice: '',
      currency: 'INR',
      taxCode: '',
    },
  ]);
  const [vendorId, setVendorId] = useState('');
  const [vendorName, setVendorName] = useState('');
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
        updatedRows[index].materialGroup =
          selectedMaterial.materialGroup || '-';
        updatedRows[index].itemNo = `ITM${String(index + 1).padStart(3, '0')}`;
      }
    }

    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        sNo: rows.length + 1,
        itemNo: '',
        materialId: '',
        materialName: '',
        shortText: '',
        materialGroup: '',
        quantity: 1,
        unit: '',
        deliveryDate: '',
        plant: '',
        storageLocation: '',
        netPrice: '',
        currency: 'INR',
        taxCode: '',
      },
    ]);
  };

  const removeRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows.map((row, i) => ({ ...row, sNo: i + 1 }))); // Re-number sNo
  };

  const handleSave = () => {
    const token = localStorage.getItem('token');
    axios
      .post(
        server_Url + '/api/v1/purchase-order',
        { vendorId, vendorName, documentDate, items: rows },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        navigate('/sourcing/purchase-orders');
      });
  };

  return (
    <Container>
      <h2>Create Purchase Order</h2>

      {/* Vendor and Document Date Inputs */}
      <TextField
        label="Vendor ID"
        value={vendorId}
        onChange={(e) => setVendorId(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Vendor Name"
        value={vendorName}
        onChange={(e) => setVendorName(e.target.value)}
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

      {/* Scrollable Table */}
      <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
        <Table style={{ minWidth: '1500px' }}>
          <TableHead>
            <TableRow>
              {[
                'S.No',
                'Item No',
                'Material ID',
                'Material Name',
                'Short Text',
                'Material Group',
                'Quantity',
                'Unit',
                'Delivery Date',
                'Plant',
                'Storage Location',
                'Net Price',
                'Currency',
                'Tax Code',
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
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.sNo}</TableCell>
                <TableCell>
                  <TextField value={row.itemNo} disabled fullWidth />
                </TableCell>
                <TableCell>
                  <Autocomplete
                    options={materials.map((p) => p.materialId)}
                    value={row.materialId}
                    onChange={(event, newValue) =>
                      handleChange(index, 'materialId', newValue)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Material ID"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <TextField value={row.materialName} disabled fullWidth />
                </TableCell>
                <TableCell>
                  <TextField value={row.shortText} disabled fullWidth />
                </TableCell>
                <TableCell>
                  <TextField value={row.materialGroup} disabled fullWidth />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={row.quantity}
                    onChange={(e) =>
                      handleChange(index, 'quantity', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={row.unit}
                    onChange={(e) =>
                      handleChange(index, 'unit', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="date"
                    value={row.deliveryDate}
                    onChange={(e) =>
                      handleChange(index, 'deliveryDate', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={row.plant}
                    onChange={(e) =>
                      handleChange(index, 'plant', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={row.storageLocation}
                    onChange={(e) =>
                      handleChange(index, 'storageLocation', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={row.netPrice}
                    onChange={(e) =>
                      handleChange(index, 'netPrice', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField value={row.currency} disabled fullWidth />
                </TableCell>
                <TableCell>
                  <TextField
                    value={row.taxCode}
                    onChange={(e) =>
                      handleChange(index, 'taxCode', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => removeRow(index)}
                    disabled={rows.length === 1}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Action Buttons */}
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
        Save Purchase Order
      </Button>
    </Container>
  );
};

export default CreatePurchaseOrder;
