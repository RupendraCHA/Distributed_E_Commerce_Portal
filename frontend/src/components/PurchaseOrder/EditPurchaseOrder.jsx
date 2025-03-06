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

const EditPurchaseOrder = () => {
  const { id } = useParams();
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [purchaseOrder, setPurchaseOrder] = useState({
    vendorId: '',
    vendorName: '',
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
      .get(`${server_Url}/api/v1/purchase-order/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPurchaseOrder(res.data));
  }, [id]);

  const handleChange = (index, field, value) => {
    const updatedItems = [...purchaseOrder.items];
    updatedItems[index][field] = value;

    if (field === 'materialId') {
      const selectedMaterial = materials.find((p) => p.materialId === value);
      if (selectedMaterial) {
        updatedItems[index].materialName = selectedMaterial.materialName;
        updatedItems[index].shortText = selectedMaterial.shortText || '-';
        updatedItems[index].materialGroup =
          selectedMaterial.materialGroup || '-';
        updatedItems[index].itemNo = `ITM${String(index + 1).padStart(3, '0')}`;
      }
    }

    setPurchaseOrder({ ...purchaseOrder, items: updatedItems });
  };

  const addRow = () => {
    setPurchaseOrder({
      ...purchaseOrder,
      items: [
        ...purchaseOrder.items,
        {
          sNo: purchaseOrder.items.length + 1,
          itemNo: `ITM${String(purchaseOrder.items.length + 1).padStart(
            3,
            '0'
          )}`,
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
      ],
    });
  };

  const removeRow = (index) => {
    const updatedItems = purchaseOrder.items.filter((_, i) => i !== index);
    setPurchaseOrder({
      ...purchaseOrder,
      items: updatedItems.map((item, i) => ({
        ...item,
        sNo: i + 1,
        itemNo: `ITM${String(i + 1).padStart(3, '0')}`,
      })),
    });
  };

  const handleEditSave = () => {
    axios
      .put(`${server_Url}/api/v1/purchase-order/${id}`, purchaseOrder, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        navigate('/sourcing/purchase-orders');
      });
  };

  return (
    <Container>
      <h2>Edit Purchase Order</h2>

      {/* Vendor and Document Date Inputs */}
      <TextField
        label="Vendor ID"
        value={purchaseOrder.vendorId}
        onChange={(e) =>
          setPurchaseOrder({ ...purchaseOrder, vendorId: e.target.value })
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Vendor Name"
        value={purchaseOrder.vendorName}
        onChange={(e) =>
          setPurchaseOrder({ ...purchaseOrder, vendorName: e.target.value })
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Document Date"
        type="date"
        value={purchaseOrder.documentDate}
        onChange={(e) =>
          setPurchaseOrder({ ...purchaseOrder, documentDate: e.target.value })
        }
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
            {purchaseOrder.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.sNo}</TableCell>
                <TableCell>
                  <TextField value={item.itemNo} disabled fullWidth />
                </TableCell>
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
                  <TextField value={item.materialName} disabled fullWidth />
                </TableCell>
                <TableCell>
                  <TextField value={item.shortText} disabled fullWidth />
                </TableCell>
                <TableCell>
                  <TextField value={item.materialGroup} disabled fullWidth />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleChange(index, 'quantity', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.unit}
                    onChange={(e) =>
                      handleChange(index, 'unit', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="date"
                    value={item.deliveryDate}
                    onChange={(e) =>
                      handleChange(index, 'deliveryDate', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.plant}
                    onChange={(e) =>
                      handleChange(index, 'plant', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.storageLocation}
                    onChange={(e) =>
                      handleChange(index, 'storageLocation', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={item.netPrice}
                    onChange={(e) =>
                      handleChange(index, 'netPrice', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField value={item.currency} disabled fullWidth />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.taxCode}
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
                    disabled={purchaseOrder.items.length === 1}
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

export default EditPurchaseOrder;
