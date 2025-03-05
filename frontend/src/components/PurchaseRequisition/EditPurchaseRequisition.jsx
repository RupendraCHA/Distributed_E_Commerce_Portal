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
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPurchaseRequisition = () => {
  const { id } = useParams();
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [requisition, setRequisition] = useState({ materials: [] });
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get(server_Url + '/api/v1/getMaterialIds', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMaterials(res.data));
    axios
      .get(`${server_Url}/api/v1/requisition/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setRequisition(res.data));
  }, [id]);

  const handleChange = (index, field, value) => {
    const updatedMaterials = [...requisition.materials];
    updatedMaterials[index][field] = value;

    if (field === 'materialId') {
      const selectedMaterial = materials.find((p) => p.materialId === value);
      updatedMaterials[index].materialName = selectedMaterial
        ? selectedMaterial.materialName
        : '';
    }

    setRequisition({ ...requisition, materials: updatedMaterials });
  };

  const addRow = () => {
    setRequisition({
      ...requisition,
      materials: [
        ...requisition.materials,
        { materialId: '', materialName: '', quantity: 1, deliveryDate: '' },
      ],
    });
  };

  const removeRow = (index) => {
    const updatedMaterials = requisition.materials.filter(
      (_, i) => i !== index
    );
    setRequisition({ ...requisition, materials: updatedMaterials });
  };

  const handleEditSave = () => {
    axios
      .put(`${server_Url}/api/v1/requisition/${id}`, requisition, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        navigate('/sourcing/purchase-requisitions');
      });
  };

  return (
    <Container>
      <h2>Edit Purchase Requisition</h2>
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
          {requisition.materials.map((material, index) => (
            <TableRow key={index}>
              <TableCell>
                <Autocomplete
                  options={materials.map((p) => p.materialId)}
                  value={material.materialId}
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
                <TextField value={material.materialName} disabled fullWidth />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value={material.quantity}
                  onChange={(e) =>
                    handleChange(index, 'quantity', e.target.value)
                  }
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="date"
                  value={material.deliveryDate}
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
                  disabled={requisition.materials.length === 1}
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

export default EditPurchaseRequisition;
