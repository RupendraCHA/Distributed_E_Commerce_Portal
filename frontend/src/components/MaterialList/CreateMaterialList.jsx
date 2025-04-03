import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Grid,
  IconButton,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const defaultMaterialFields = {
  materialName: '',
  shortText: '',
  materialGroup: '',
  category: '',
  brand: '',
  price: '',
  description: '',
  weight: '',
  stock: 0,
  expirationDate: '',
  unit: '',
  image: '',
  status: '',
  plant: '',
  storageLocation: '',
  purchasingGroup: '',
  requisitioner: '',
  trackingNo: '',
  splitIndicator: '',
  purchasingOrg: '',
  agreement: '',
  itemInfoRecord: '',
  mpnMaterial: '',
  suppliers: [],
};

const CreateMaterialList = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [materials, setMaterials] = useState([]);
  const [lastSNo, setLastSNo] = useState(0);
  const [supplierOptions, setSupplierOptions] = useState([]);

  useEffect(() => {
    // Fetch last sNo
    axios
      .get(`${server_Url}/api/v1/materials/last`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const latest = res.data?.lastSNo || 0;
        setLastSNo(latest);
        setMaterials([generateNewMaterial(latest + 1)]);
      })
      .catch((err) => console.error('Failed to fetch last serial number:', err));

    // Fetch supplier list
    axios
      .get(`${server_Url}/api/v1/vendor-master`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const supplierIds = res.data.map((v) => v.vendorAddress?.supplierid);
        setSupplierOptions(supplierIds);
      })
      .catch((err) => console.error('Failed to fetch suppliers:', err));
  }, []);

  const generateNewMaterial = (nextSNo) => ({
    ...defaultMaterialFields,
    sNo: nextSNo,
    itemNo: `ITM${String(nextSNo).padStart(3, '0')}`,
    materialId: `MAT${String(nextSNo).padStart(3, '0')}`,
  });

  const handleChange = (index, field, value) => {
    const updated = [...materials];
    updated[index][field] = value;
    setMaterials(updated);
  };

  const addRow = () => {
    const nextSNo = lastSNo + materials.length + 1;
    setMaterials([...materials, generateNewMaterial(nextSNo)]);
  };

  const removeRow = (index) => {
    const updated = materials.filter((_, i) => i !== index);
    setMaterials(updated);
  };

  const handleSave = () => {
    axios
      .post(
        `${server_Url}/api/v1/materials/bulk`,
        { materials },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => navigate('/sourcing/materialMaster'))
      .catch((err) => console.error('Error saving materials:', err));
  };

  return (
    <Container>
      <h1 style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '10px' }}>
        Create Material Master
      </h1>
      {materials.map((material, index) => (
        <div
          key={index}
          style={{
            border: '1px solid #ddd',
            padding: 16,
            marginBottom: 16,
            borderRadius: 8,
          }}
        >
          <Typography variant="subtitle1">Material #{index + 1}</Typography>
          <Grid container spacing={2}>
            {Object.keys(material).map((key) => (
              key !== 'suppliers' && (
                <Grid item xs={12} sm={6} key={key}>
                  <TextField
                    fullWidth
                    name={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={material[key]}
                    onChange={(e) => handleChange(index, key, e.target.value)}
                    type={
                      key === 'stock'
                        ? 'number'
                        : key.includes('Date')
                          ? 'date'
                          : 'text'
                    }
                    InputLabelProps={key.includes('Date') ? { shrink: true } : {}}
                    disabled={['sNo', 'itemNo', 'materialId'].includes(key)}
                  />
                </Grid>
              )
            ))}

            {/* Multi-select Suppliers */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Vendors</InputLabel>
                <Select
                  multiple
                  value={material.suppliers}
                  onChange={(e) => handleChange(index, 'suppliers', e.target.value)}
                  input={<OutlinedInput label="Vendors" />}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {supplierOptions.map((supplierId) => (
                    <MenuItem key={supplierId} value={supplierId}>
                      <Checkbox checked={material.suppliers.includes(supplierId)} />
                      <ListItemText primary={supplierId} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <IconButton
                onClick={() => removeRow(index)}
                disabled={materials.length === 1}
                color="error"
              >
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      ))}
      <Button startIcon={<Add />} onClick={addRow} variant="outlined" sx={{ mb: 2 }}>
        Add Another Material
      </Button>
      <Button
        onClick={handleSave}
        variant="contained"
        color="primary"
        sx={{ mb: 2, ml: 2 }}
      >
        Save All Materials
      </Button>
    </Container>
  );
};

export default CreateMaterialList;