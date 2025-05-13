// src/components/recipes/EditRecipeInitial.jsx
import React, { useEffect, useState } from 'react';
import { Container, Grid, TextField, Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditRecipeInitial = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [materialName, setMaterialName] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_SERVER_URL}/api/v1/recipes/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setForm(res.data);
        fetchMaterialName(res.data.material);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    const fetchMaterialName = async (materialId) => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_SERVER_URL}/api/v1/getMaterialIds`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        const match = res.data.find((m) => m.materialId === materialId);
        setMaterialName(`${match.materialName} (${match.materialId})`);
      } catch (err) {
        console.error('Error fetching material name', err);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    navigate('/manufacturing/recipe/details', {
      state: { form, mode: 'edit', id },
    });
  };

  if (!form) return <div>Loading...</div>;

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" sx={{ mt: 4, mb: 3 }}>
        Edit Master Recipe
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Material" value={materialName} fullWidth disabled />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Plant"
            name="plant"
            value={form.plant}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Production Version"
            name="prodVersion"
            value={form.prodVersion}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Profile"
            name="profile"
            value={form.profile}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Key Date"
            type="date"
            name="keyDate"
            value={form.keyDate?.split('T')[0]}
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" fullWidth onClick={handleContinue}>
            Continue
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditRecipeInitial;
