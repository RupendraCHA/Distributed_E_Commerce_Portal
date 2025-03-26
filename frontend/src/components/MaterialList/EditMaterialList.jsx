import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Grid } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditMaterialList = () => {
  const { id } = useParams();
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [material, setMaterial] = useState(null);

  useEffect(() => {
    axios
      .get(`${server_Url}/api/v1/materials/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMaterial(res.data))
      .catch((err) => console.error('Error loading material:', err));
  }, [id]);

  const handleChange = (e) => {
    setMaterial({ ...material, [e.target.name]: e.target.value });
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
        {Object.keys(material).map((key) => (
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
              disabled={key === 'itemNo' || key === 'sNo' || key === '_id'}
            />
          </Grid>
        ))}
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
