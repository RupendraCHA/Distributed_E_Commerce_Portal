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

const CreateInboundDelivery = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const [materials, setMaterials] = useState([]);
  const token = localStorage.getItem('token');

  const [rows, setRows] = useState([
    {
      sNo: 1,
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
  ]);
  const [supplierId, setSupplierId] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [documentDate, setDocumentDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(server_Url + '/api/v1/getMaterialIds', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const sortedMaterials = res.data.sort((a, b) => a.sNo - b.sNo);
        setMaterials(sortedMaterials);
      })
      .catch((err) => console.error('Error fetching materials:', err));
  }, []);

  const handleChange = async (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    if (field === 'materialId') {
      const selectedMaterial = materials.find((p) => p.materialId === value);

      if (selectedMaterial) {
        updatedRows[index].materialName = selectedMaterial.materialName;
        updatedRows[index].unit = selectedMaterial.unit || '';

        // 🧠 Fetch fixed vendor
        try {
          const res = await axios.get(
            `${server_Url}/api/v1/item-info-records?material=${value}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const fixedRecord = res.data.find(
            (rec) => rec.sourceListOverview?.fixedItemInfoRecordId === rec._id
          );

          if (fixedRecord) {
            const supplierId = fixedRecord.purchOrgData1?.supplier;

            if (supplierId) {
              try {
                const vendorRes = await axios.get(
                  `${server_Url}/api/v1/vendor-name/${supplierId}`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );

                setSupplierId(supplierId);
                setSupplierName(vendorRes.data.name || supplierId);
              } catch (err) {
                console.error('Error fetching vendor name:', err);
                setSupplierId(supplierId);
                setSupplierName(supplierId); // fallback
              }
            } else {
              setSupplierId('');
              setSupplierName('');
            }
          } else {
            setSupplierId('');
            setSupplierName('');
          }
        } catch (err) {
          console.error('Error fetching fixed vendor:', err);
        }
      }
    }

    setRows(updatedRows);
  };


  const addRow = () => {
    setRows([
      ...rows,
      {
        sNo: rows.length + 1,
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
    ]);
  };

  const removeRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows.map((row, i) => ({ ...row, sNo: i + 1 })));
  };

  const handleSave = () => {
    const token = localStorage.getItem('token');
    axios
      .post(
        `${server_Url}/api/v1/inbound-deliveries`,
        { supplierId, supplierName, documentDate, items: rows },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        navigate('/sourcing/inbound-deliveries');
      })
      .catch((err) => console.error('Error saving inbound delivery:', err));
  };

  return (
    <Container>
      <h2>Create Inbound Delivery</h2>

      {/* Supplier and Document Date Inputs */}
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
            {rows.map((item, index) => (
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
        Save Inbound Delivery
      </Button>
    </Container>
  );
};

export default CreateInboundDelivery;
