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

const EditInboundDelivery = () => {
  const { id } = useParams();
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [inboundDelivery, setInboundDelivery] = useState({
    supplierId: '',
    supplierName: '',
    documentDate: '',
    items: [],
  });
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get(`${server_Url}/api/v1/getMaterialIds`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const sortedMaterials = res.data.sort((a, b) => a.sNo - b.sNo);
        setMaterials(sortedMaterials);
      })
      .catch((err) => console.error('Error fetching materials:', err));

    axios
      .get(`${server_Url}/api/v1/inbound-deliveries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setInboundDelivery(res.data))
      .catch((err) => console.error('Error fetching inbound delivery:', err));
  }, [id]);

  const handleChange = (index, field, value) => {
    const updatedItems = [...inboundDelivery.items];
    updatedItems[index][field] = value;

    if (field === 'materialId') {
      const selectedMaterial = materials.find((p) => p.materialId === value);
      if (selectedMaterial) {
        updatedItems[index].materialName = selectedMaterial.materialName;
        updatedItems[index].unit = selectedMaterial.unit || 1;
      }
    }

    setInboundDelivery({ ...inboundDelivery, items: updatedItems });
  };

  const addRow = () => {
    setInboundDelivery({
      ...inboundDelivery,
      items: [
        ...inboundDelivery.items,
        {
          sNo: inboundDelivery.items.length + 1,
          materialId: '',
          materialName: '',
          deliveryQuantity: 1,
          unit: '',
          storageLocation: '',
          supplierBatch: '',
          grossWeight: '',
          volume: '',
          warehouseNo: '',
          referenceDocument: '',
          putawayQty: '',
        },
      ],
    });
  };

  const removeRow = (index) => {
    const updatedItems = inboundDelivery.items.filter((_, i) => i !== index);
    setInboundDelivery({
      ...inboundDelivery,
      items: updatedItems.map((item, i) => ({ ...item, sNo: i + 1 })),
    });
  };

  const handleEditSave = () => {
    axios
      .put(`${server_Url}/api/v1/inbound-deliveries/${id}`, inboundDelivery, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        navigate('/sourcing/inbound-deliveries');
      })
      .catch((err) => console.error('Error updating inbound delivery:', err));
  };

  return (
    <Container>
      <h2>Edit Inbound Delivery</h2>

      {/* Supplier and Document Date Inputs */}
      <TextField
        label="Supplier ID"
        value={inboundDelivery.supplierId}
        onChange={(e) =>
          setInboundDelivery({ ...inboundDelivery, supplierId: e.target.value })
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Supplier Name"
        value={inboundDelivery.supplierName}
        onChange={(e) =>
          setInboundDelivery({
            ...inboundDelivery,
            supplierName: e.target.value,
          })
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Document Date"
        type="date"
        value={inboundDelivery.documentDate}
        onChange={(e) =>
          setInboundDelivery({
            ...inboundDelivery,
            documentDate: e.target.value,
          })
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
                'Delivery Quantity',
                'Unit',
                'Storage Location',
                'Supplier Batch',
                'Gross Weight',
                'Volume',
                'Warehouse No',
                'Reference Document',
                'Putaway Quantity',
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
            {inboundDelivery.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.sNo}</TableCell>
                <TableCell>
                  <Autocomplete
                    options={materials.map((p) => p.materialId)}
                    value={item.materialId}
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
                  <TextField
                    type="text"
                    value={item.materialName}
                    fullWidth
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={item.deliveryQuantity}
                    onChange={(e) =>
                      handleChange(index, 'deliveryQuantity', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField type="text" value={item.unit} fullWidth disabled />
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
                    value={item.supplierBatch}
                    onChange={(e) =>
                      handleChange(index, 'supplierBatch', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    value={item.grossWeight}
                    onChange={(e) =>
                      handleChange(index, 'grossWeight', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    value={item.volume}
                    onChange={(e) =>
                      handleChange(index, 'volume', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    value={item.warehouseNo}
                    onChange={(e) =>
                      handleChange(index, 'warehouseNo', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    value={item.referenceDocument}
                    onChange={(e) =>
                      handleChange(index, 'referenceDocument', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={item.putawayQty}
                    onChange={(e) =>
                      handleChange(index, 'putawayQty', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => removeRow(index)}
                    disabled={inboundDelivery.items.length === 1}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Button
        onClick={handleEditSave}
        variant="contained"
        color="primary"
        style={{ marginTop: '10px' }}
      >
        Save Changes
      </Button>
    </Container>
  );
};

export default EditInboundDelivery;
