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
      unit: 1,
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
  const [vendors, setVendors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get(server_Url + '/api/v1/getMaterialIds', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMaterials(res.data);
      });
  }, []);
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(server_Url + '/api/v1/vendors-list', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setVendors(res.data))
      .catch((err) => console.error('Error fetching vendors:', err));
  }, []);

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    if (field === 'materialId') {
      const selectedMaterial = materials.find((p) => p.materialId === value);
      console.log({ selectedMaterial });

      if (selectedMaterial) {
        updatedRows[index].itemNo =
          selectedMaterial.itemNo || `ITM${String(index + 1).padStart(3, '0')}`;
        updatedRows[index].materialName = selectedMaterial.materialName || '';
        updatedRows[index].shortText = selectedMaterial.shortText || '';
        updatedRows[index].materialGroup = selectedMaterial.materialGroup || '';
        updatedRows[index].plant = selectedMaterial.plant || '';
        updatedRows[index].storageLocation =
          selectedMaterial.storageLocation || '';
        updatedRows[index].purchasingGroup =
          selectedMaterial.purchasingGroup || '';
        updatedRows[index].requisitioner = selectedMaterial.requisitioner || '';
        updatedRows[index].trackingNo = selectedMaterial.trackingNo || '';
        updatedRows[index].splitIndicator =
          selectedMaterial.splitIndicator || '';
        updatedRows[index].purchasingOrg = selectedMaterial.purchasingOrg || '';
        updatedRows[index].agreement = selectedMaterial.agreement || '';
        updatedRows[index].itemInfoRecord =
          selectedMaterial.itemInfoRecord || '';
        updatedRows[index].mpnMaterial = selectedMaterial.mpnMaterial || '';
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
                'Item No',
                'Material ID',
                'Material Name',
                'Vendor',
                'Quantity',
                'Unit',
                'Status',
                'Delivery Date',
                'Fixed Vendor IS',
                'Read Vendor SPG',
                'Split Indicator',
                'Short Text',
                'Material Group',
                'Plant',
                'Storage Location',
                'Purchasing Group',
                'Requisitioner',
                'Tracking No',
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
                <TableCell key="vendor">
                  <Autocomplete
                    options={vendors}
                    getOptionLabel={(option) => option.name}
                    value={vendors.find((v) => v.id === row.vendor) || null}
                    onChange={(event, newValue) =>
                      handleChange(index, 'vendor', newValue ? newValue.id : '')
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Vendor" fullWidth />
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                  />
                </TableCell>

                {[
                  { key: 'quantity', type: 'number' },
                  { key: 'unit' },
                  { key: 'status' },
                  { key: 'deliveryDate', type: 'date' },
                  { key: 'fixedVendorIS' },
                  { key: 'readVendorSPG' },
                  { key: 'splitIndicator' },
                  { key: 'shortText', disabled: true },
                  { key: 'materialGroup', disabled: true },
                  { key: 'plant', disabled: true },
                  { key: 'storageLocation', disabled: true },
                  { key: 'purchasingGroup', disabled: true },
                  { key: 'requisitioner', disabled: true },
                  { key: 'trackingNo', disabled: true },
                  { key: 'purchasingOrg', disabled: true },
                  { key: 'agreement', disabled: true },
                  { key: 'itemInfoRecord', disabled: true },
                  { key: 'mpnMaterial', disabled: true },
                ].map(({ key, type, disabled }) => (
                  <TableCell key={key}>
                    <TextField
                      type={type || 'text'}
                      value={row[key]}
                      onChange={(e) => handleChange(index, key, e.target.value)}
                      fullWidth
                      disabled={disabled}
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
