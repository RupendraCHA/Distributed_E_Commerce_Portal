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
      .then((res) => {
        const updatedMaterials = res.data.materials.map((material, index) => ({
          ...material,
          sNo: index + 1,
          itemNo: `ITM${String(index + 1).padStart(3, '0')}`,
        }));
        setRequisition({ ...res.data, materials: updatedMaterials });
      });
  }, [id]);

  const handleChange = (index, field, value) => {
    const updatedMaterials = [...requisition.materials];
    updatedMaterials[index][field] = value;

    if (field === 'materialId') {
      const selectedMaterial = materials.find((p) => p.materialId === value);
      if (selectedMaterial) {
        updatedMaterials[index].materialName = selectedMaterial.materialName;
        updatedMaterials[index].shortText = selectedMaterial.shortText || '-';
        updatedMaterials[index].materialGroup =
          selectedMaterial.materialGroup || '-';
        updatedMaterials[index].itemNo = `ITM${String(index + 1).padStart(
          3,
          '0'
        )}`;
      }
    }

    setRequisition({ ...requisition, materials: updatedMaterials });
  };

  const addRow = () => {
    setRequisition({
      ...requisition,
      materials: [
        ...requisition.materials,
        {
          sNo: requisition.materials.length + 1,
          itemNo: `ITM${String(requisition.materials.length + 1).padStart(
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
          purchasingGroup: '',
          requisitioner: '',
          trackingNo: '',
          vendor: '',
          fixedVendorIS: '',
        },
      ],
    });
  };

  const removeRow = (index) => {
    const updatedMaterials = requisition.materials.filter(
      (_, i) => i !== index
    );
    setRequisition({
      ...requisition,
      materials: updatedMaterials.map((material, i) => ({
        ...material,
        sNo: i + 1,
        itemNo: `ITM${String(i + 1).padStart(3, '0')}`,
      })),
    });
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
                'Purchasing Group',
                'Requisitioner',
                'Tracking No',
                'Vendor',
                'Fixed Vendor IS',
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
            {requisition.materials.map((material, index) => (
              <TableRow key={index}>
                <TableCell>{material.sNo}</TableCell>
                <TableCell>
                  <TextField value={material.itemNo} disabled fullWidth />
                </TableCell>
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
                        fullWidth
                      />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <TextField value={material.materialName} disabled fullWidth />
                </TableCell>
                <TableCell>
                  <TextField value={material.shortText} disabled fullWidth />
                </TableCell>
                <TableCell>
                  <TextField
                    value={material.materialGroup}
                    disabled
                    fullWidth
                  />
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
                    value={material.unit}
                    onChange={(e) =>
                      handleChange(index, 'unit', e.target.value)
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
                  <TextField
                    value={material.plant}
                    onChange={(e) =>
                      handleChange(index, 'plant', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={material.storageLocation}
                    onChange={(e) =>
                      handleChange(index, 'storageLocation', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={material.purchasingGroup}
                    onChange={(e) =>
                      handleChange(index, 'purchasingGroup', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={material.requisitioner}
                    onChange={(e) =>
                      handleChange(index, 'requisitioner', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={material.trackingNo}
                    onChange={(e) =>
                      handleChange(index, 'trackingNo', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={material.vendor}
                    onChange={(e) =>
                      handleChange(index, 'vendor', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={material.fixedVendorIS}
                    onChange={(e) =>
                      handleChange(index, 'fixedVendorIS', e.target.value)
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

export default EditPurchaseRequisition;
