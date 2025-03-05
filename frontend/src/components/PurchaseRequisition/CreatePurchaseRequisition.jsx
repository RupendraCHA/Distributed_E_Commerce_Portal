// FRONTEND: Create Purchase Requisition (Excel-like Table)
// File: src/pages/CreatePurchaseRequisition.jsx

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

const CreatePurchaseRequisition = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const [materials, setMaterials] = useState([]);
  const [rows, setRows] = useState([
    { materialId: '', materialName: '', quantity: 1, deliveryDate: '' },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(server_Url + '/api/v1/getMaterialIds')
      .then((res) => setMaterials(res.data));
  }, []);

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    if (field === 'materialId') {
      const selectedMaterials = materials.find((p) => p.materialId === value);
      updatedRows[index].materialName = selectedMaterials
        ? selectedMaterials.materialName
        : '';
    }

    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      { materialId: '', materialName: '', quantity: 1, deliveryDate: '' },
    ]);
  };

  const removeRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleSave = () => {
    const token = localStorage.getItem('token');
    axios
      .post(
        server_Url + '/api/v1/requisition',
        { materials: rows },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        navigate('/sourcing/purchase-requisitions');
      });
  };

  return (
    <Container>
      <h2>Create Purchase Requisition</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Material ID</TableCell>
            <TableCell>Material Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Delivery Date</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
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
                    />
                  )}
                />
              </TableCell>
              <TableCell>
                <TextField value={row.materialName} disabled fullWidth />
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
                  type="date"
                  value={row.deliveryDate}
                  onChange={(e) =>
                    handleChange(index, 'deliveryDate', e.target.value)
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
        Save
      </Button>
    </Container>
  );
};

export default CreatePurchaseRequisition;
