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
      .then((res) => {
        const sortedMaterials = res.data.sort((a, b) => a.sNo - b.sNo);
        setMaterials(sortedMaterials);
      });

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
        updatedItems[index].unit = selectedMaterial1;
        updatedItems[index].itemNo = selectedMaterial.itemNo || '-';
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
          itemNo: `-`,
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
      <h1 style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '10px' }}>
        Edit Purchase Order
      </h1>

      {/* Supplier and Document Date Inputs */}
      <TextField
        label="Supplier ID"
        value={purchaseOrder.supplierId}
        onChange={(e) =>
          setPurchaseOrder({ ...purchaseOrder, supplierId: e.target.value })
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Supplier Name"
        value={purchaseOrder.supplierName}
        onChange={(e) =>
          setPurchaseOrder({ ...purchaseOrder, supplierName: e.target.value })
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
            {purchaseOrder.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell key={item.sNo}>
                  <TextField
                    type={'text'}
                    value={item.sNo}
                    onChange={(e) => handleChange(index, 'sNo', e.target.value)}
                    fullWidth
                    disabled
                  />
                </TableCell>
                <TableCell key={item.itemNo}>
                  <TextField
                    type={'text'}
                    value={item.itemNo}
                    onChange={(e) =>
                      handleChange(index, 'itemNo', e.target.value)
                    }
                    fullWidth
                    disabled
                  />
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
                      handleChange(index, 'shortText', e.target.value)
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
                      disabled={field === 'currency'}
                    />
                  </TableCell>
                ))}
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

export default EditPurchaseOrder;
