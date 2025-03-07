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
      itemNo: 'ITM001',
      materialId: '',
      materialName: '',
      shortText: '',
      materialGroup: '',
      quantity: 1,
      unit: '',
      deliveryDate: '',
      startDate: '',
      endDate: '',
      plant: '',
      storageLocation: '',
      batch: '',
      stockSegment: '',
      requestSegment: '',
      requirementNo: '',
      requisitioner: '',
      netPrice: '',
      currency: 'INR',
      taxCode: '',
      infoRecord: '',
      outlineAgreement: '',
      issuingStorageLocation: '',
      servicePerformer: '',
      revisionLevel: '',
      supplierMatNo: '',
      supplierSubrange: '',
      supplierBatch: '',
      commodityCode: '',
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
        updatedRows[index].unit = selectedMaterial.unit || '-';
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
        itemNo: `ITM${String(rows.length + 1).padStart(3, '0')}`,
        materialId: '',
        materialName: '',
        shortText: '',
        materialGroup: '',
        quantity: 1,
        unit: '',
        deliveryDate: '',
        startDate: '',
        endDate: '',
        plant: '',
        storageLocation: '',
        batch: '',
        stockSegment: '',
        requestSegment: '',
        requirementNo: '',
        requisitioner: '',
        netPrice: '',
        currency: 'INR',
        taxCode: '',
        infoRecord: '',
        outlineAgreement: '',
        issuingStorageLocation: '',
        servicePerformer: '',
        revisionLevel: '',
        supplierMatNo: '',
        supplierSubrange: '',
        supplierBatch: '',
        commodityCode: '',
      },
    ]);
  };

  const removeRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(
      updatedRows.map((row, i) => ({
        ...row,
        sNo: i + 1,
        itemNo: `ITM${String(i + 1).padStart(3, '0')}`,
      }))
    ); // Re-number sNo
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
        <Table style={{ minWidth: '2200px' }}>
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
                'Start Date',
                'End Date',
                'Plant',
                'Storage Location',
                'Batch',
                'Stock Segment',
                'Request Segment',
                'Requirement No',
                'Requisitioner',
                'Net Price',
                'Currency',
                'Tax Code',
                'Info Record',
                'Outline Agreement',
                'Issuing Storage Location',
                'Service Performer',
                'Revision Level',
                'Supplier Mat. No',
                'Supplier Subrange',
                'Supplier Batch',
                'Commodity Code',
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
            {rows.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.sNo}</TableCell>
                <TableCell>{item.itemNo}</TableCell>
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
                <TableCell key={item.materialName}>
                  <TextField
                    type={'text'}
                    value={item.materialName}
                    onChange={(e) =>
                      handleChange(index, 'materialName', e.target.value)
                    }
                    fullWidth
                    disabled
                  />
                </TableCell>
                <TableCell key={item.shortText}>
                  <TextField
                    type={'text'}
                    value={item.shortText}
                    onChange={(e) =>
                      handleChange(index, 'shortText', e.target.value)
                    }
                    fullWidth
                    disabled
                  />
                </TableCell>
                <TableCell key={item.materialGroup}>
                  <TextField
                    type={'text'}
                    value={item.materialGroup}
                    onChange={(e) =>
                      handleChange(index, 'materialGroup', e.target.value)
                    }
                    fullWidth
                    disabled
                  />
                </TableCell>
                {[
                  'quantity',
                  'unit',
                  'deliveryDate',
                  'startDate',
                  'endDate',
                  'plant',
                  'storageLocation',
                  'batch',
                  'stockSegment',
                  'requestSegment',
                  'requirementNo',
                  'requisitioner',
                  'netPrice',
                  'currency',
                  'taxCode',
                  'infoRecord',
                  'outlineAgreement',
                  'issuingStorageLocation',
                  'servicePerformer',
                  'revisionLevel',
                  'supplierMatNo',
                  'supplierSubrange',
                  'supplierBatch',
                  'commodityCode',
                ].map((field) => (
                  <TableCell key={field}>
                    <TextField
                      type={
                        field.includes('Date')
                          ? 'date'
                          : field.includes('quantity') ||
                            field.includes('netPrice')
                          ? 'number'
                          : 'text'
                      }
                      value={item[field]}
                      onChange={(e) =>
                        handleChange(index, field, e.target.value)
                      }
                      fullWidth
                    />
                  </TableCell>
                ))}
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
