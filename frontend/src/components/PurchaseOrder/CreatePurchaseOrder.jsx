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
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePurchaseOrder = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const [materials, setMaterials] = useState([]);
  const [requisitions, setRequisitions] = useState([]);
  const [selectedRequisition, setSelectedRequisition] = useState(null);
  const [rows, setRows] = useState([]);
  const [supplierId, setSupplierId] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [documentDate, setDocumentDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(server_Url + '/api/v1/getMaterialIds', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const sortedMaterials = res.data.sort((a, b) => a.sNo - b.sNo);
        setMaterials(sortedMaterials);
      });

    axios
      .get(server_Url + '/api/v1/requisition', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setRequisitions(res.data);
      })
      .catch((err) => console.error('Failed to fetch requisitions', err));
  }, []);

  useEffect(() => {
    if (selectedRequisition) {
      const materialsFromReq = selectedRequisition.materials || [];

      const formattedRows = materialsFromReq.map((item, index) => ({
        sNo: index + 1,
        itemNo: item.itemNo || `ITM${String(index + 1).padStart(3, '0')}`,
        materialId: item.materialId || '',
        materialName: item.materialName || '',
        shortText: item.shortText || '',
        materialGroup: item.materialGroup || '',
        quantity: item.quantity || 1,
        unit: item.unit || '',
        deliveryDate: item.deliveryDate || '',
        startDate: item.startDate || '',
        endDate: item.endDate || '',
        plant: item.plant || '',
        storageLocation: item.storageLocation || '',
        batch: item.batch || '',
        stockSegment: item.stockSegment || '',
        requestSegment: item.requestSegment || '',
        requirementNo: item.trackingNo || '',
        requisitioner: item.requisitioner || '',
        netPrice: '',
        currency: 'INR',
        taxCode: '',
        infoRecord: item.itemInfoRecord || '',
        outlineAgreement: item.agreement || '',
        issuingStorageLocation: '',
        servicePerformer: '',
        revisionLevel: '',
        supplierMatNo: '',
        supplierSubrange: '',
        supplierBatch: '',
        commodityCode: '',
      }));
      setRows(formattedRows);

      // ✅ Fetch Supplier ID and Name via API
      const vendorName = materialsFromReq[0]?.vendor;
      setSupplierName(vendorName || '');

      if (vendorName) {
        const token = localStorage.getItem('token');

        axios
          .get(`${server_Url}/api/v1/supplier-id/${vendorName}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setSupplierId(res.data.supplierId || '');
          })
          .catch((err) => {
            console.error('Failed to fetch supplier ID:', err);
            setSupplierId('');
          });
      } else {
        setSupplierId('');
      }
    }
  }, [selectedRequisition]);


  const handleSave = () => {
    const token = localStorage.getItem('token');
    axios
      .post(
        server_Url + '/api/v1/purchase-order',
        { supplierId, supplierName, documentDate, items: rows },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        navigate('/sourcing/purchase-orders');
      });
  };

  return (
    <Container>
      <h1 style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '10px' }}>
        Create Purchase Order
      </h1>

      <Autocomplete
        options={requisitions}
        getOptionLabel={(option) => {
          const firstItem = option.materials?.[0] || {};
          return `REQ-${option._id?.slice(-5)} | ${firstItem.materialName || 'Material'} | ${firstItem.vendor || 'Vendor'} | ${firstItem.shortText || 'Short Text'} | Item No: ${firstItem.itemNo || 'N/A'}`;
        }}
        onChange={(event, newValue) => setSelectedRequisition(newValue)}
        renderOption={(props, option) => {
          const firstItem = option.materials?.[0] || {};
          return (
            <li {...props}>
              <div>
                <strong>{`REQ-${option._id?.slice(-5)}`}</strong> | {firstItem.materialName || 'Material'} | {firstItem.vendor || 'Vendor'}<br />
                {firstItem.shortText || 'Short Text'} | Item No: {firstItem.itemNo || 'N/A'}
              </div>
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Purchase Requisition"
            margin="normal"
            fullWidth
          />
        )}
      />



      <TextField
        label="Supplier ID"
        value={supplierId}
        onChange={(e) => setSupplierId(e.target.value)}
        fullWidth
        margin="normal"
        disabled
      />
      <TextField
        label="Supplier Name"
        value={supplierName}
        onChange={(e) => setSupplierName(e.target.value)}
        fullWidth
        margin="normal"
        disabled
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
                    disabled
                    options={materials.map((p) => p.materialId)}
                    value={item.materialId}
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
                {[
                  'materialName',
                  'shortText',
                  'materialGroup',
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
                      onChange={(e) => {
                        const updatedRows = [...rows];
                        updatedRows[index][field] = e.target.value;
                        setRows(updatedRows);
                      }}
                      fullWidth
                      disabled={item[field] !== undefined && item[field] !== ''}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Button
        onClick={handleSave}
        variant="contained"
        color="primary"
        style={{ marginTop: '10px' }}
        disabled={!selectedRequisition}
      >
        Save Purchase Order
      </Button>
    </Container>
  );
};

export default CreatePurchaseOrder;
