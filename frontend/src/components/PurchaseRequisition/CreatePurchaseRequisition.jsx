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
    {
      sNo: 1,
      status: '',
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
      purchasingGroup: '',
      requisitioner: '',
      trackingNo: '',
      vendor: '',
      fixedVendorIS: '',
      readVendorSPG: '',
      splitIndicator: '',
      purchasingOrg: '',
      agreement: '',
      itemInfoRecord: '',
      mpnMaterial: '',
    },
  ]);
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
        status: '',
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
        purchasingGroup: '',
        requisitioner: '',
        trackingNo: '',
        vendor: '',
        fixedVendorIS: '',
        readVendorSPG: '',
        splitIndicator: '',
        purchasingOrg: '',
        agreement: '',
        itemInfoRecord: '',
        mpnMaterial: '',
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
      <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
        <Table style={{ minWidth: '1800px' }}>
          <TableHead>
            <TableRow>
              {[
                'S.No',
                'Status',
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
                'Read Vendor SPG',
                'Split Indicator',
                'Purchasing Organization',
                'Agreement',
                'Item Info Record',
                'MPN Material',
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
                  <TextField
                    value={row.status}
                    onChange={(e) =>
                      handleChange(index, 'status', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
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
                      <TextField {...params} label="Material ID" fullWidth />
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
                {[
                  { key: 'quantity', type: 'number' },
                  { key: 'unit' },
                  { key: 'deliveryDate', type: 'date' },
                  { key: 'plant' },
                  { key: 'storageLocation' },
                  { key: 'purchasingGroup' },
                  { key: 'requisitioner' },
                  { key: 'trackingNo' },
                  { key: 'vendor' },
                  { key: 'fixedVendorIS' },
                  { key: 'readVendorSPG' },
                  { key: 'splitIndicator' },
                  { key: 'purchasingOrg' },
                  { key: 'agreement' },
                  { key: 'itemInfoRecord' },
                  { key: 'mpnMaterial' },
                ].map(({ key, type }) => (
                  <TableCell key={key}>
                    <TextField
                      type={type || 'text'}
                      value={row[key]}
                      onChange={(e) => handleChange(index, key, e.target.value)}
                      fullWidth
                    />
                  </TableCell>
                ))}
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

export default CreatePurchaseRequisition;
