import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditMaterialList = () => {
  const { id } = useParams();
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [material, setMaterial] = useState(null);
  const [supplierOptions, setSupplierOptions] = useState([]);

  useEffect(() => {
    // Load material
    axios
      .get(`${server_Url}/api/v1/materials/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMaterial(res.data))
      .catch((err) => console.error('Error loading material:', err));

    // Load vendors
    axios
      .get(`${server_Url}/api/v1/vendor-master`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) =>
        setSupplierOptions(
          res.data.map((v) => v.vendorAddress?.supplierid).filter(Boolean)
        )
      )
      .catch((err) => console.error('Error loading vendors:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaterial({ ...material, [name]: value });
  };

  const handleUpdate = () => {
    axios
      .put(`${server_Url}/api/v1/materials/${id}`, material, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => navigate('/sourcing/materialMaster'))
      .catch((err) => console.error('Error updating material:', err));
  };

  if (!material) return <div>Loading...</div>;

  return (
    <Container>
      <h1 style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '10px' }}>
        Edit Material
      </h1>
      <Grid container spacing={2}>
        {Object.keys(material).map((key) => {
          if (key === 'suppliers') {
            return (
              <Grid item xs={12} sm={6} key={key}>
                <FormControl fullWidth>
                  <InputLabel>Vendors</InputLabel>
                  <Select
                    multiple
                    name="suppliers"
                    value={material.suppliers || []}
                    onChange={handleChange}
                    input={<OutlinedInput label="Vendors" />}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {supplierOptions.map((supplierId) => (
                      <MenuItem key={supplierId} value={supplierId}>
                        <Checkbox
                          checked={
                            material.suppliers?.includes(supplierId) || false
                          }
                        />
                        <ListItemText primary={supplierId} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            );
          }

          return (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                fullWidth
                name={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={material[key]}
                onChange={handleChange}
                type={
                  key === 'stock'
                    ? 'number'
                    : key.includes('Date')
                      ? 'date'
                      : 'text'
                }
                InputLabelProps={key.includes('Date') ? { shrink: true } : {}}
                disabled={['itemNo', 'sNo', '_id'].includes(key)}
              />
            </Grid>
          );
        })}
      </Grid>
      <Button
        onClick={handleUpdate}
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Save Changes
      </Button>
    </Container>
  );
};

export default EditMaterialList;
