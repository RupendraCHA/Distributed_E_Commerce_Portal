// src/components/recipes/CreateRecipeInitial.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Autocomplete,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateRecipeInitial = () => {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [form, setForm] = useState({
    material: '',
    plant: '',
    prodVersion: '',
    profile: '',
    keyDate: '',
  });

  useEffect(() => {
    const fetchMaterials = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_SERVER_URL}/api/v1/getMaterialIds`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setMaterials(res.data);
    };
    fetchMaterials();
  }, []);

  const handleContinue = () => {
    navigate('/manufacturing/recipe/details', {
      state: { form, mode: 'create' },
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" sx={{ mt: 4, mb: 3 }}>
        Create Master Recipe
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Autocomplete
            options={materials}
            getOptionLabel={(m) => `${m.materialName} (${m.materialId})`}
            onChange={(e, val) =>
              setForm({
                ...form,
                material: val?.materialId || '',
                plant: val?.plant || '',
              })
            }
            renderInput={(params) => (
              <TextField {...params} label="Material" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Plant" fullWidth value={form.plant} disabled />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Production Version"
            fullWidth
            value={form.prodVersion}
            onChange={(e) => setForm({ ...form, prodVersion: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Profile"
            fullWidth
            value={form.profile}
            onChange={(e) => setForm({ ...form, profile: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Key Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            onChange={(e) => setForm({ ...form, keyDate: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleContinue}
            fullWidth
            disabled={!form.material}
          >
            Continue
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateRecipeInitial;
