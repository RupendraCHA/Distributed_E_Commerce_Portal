import React, { useEffect, useState } from 'react';
import { Container, Grid, TextField, Button, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProductionOrderSettlement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_SERVER_URL}/api/v1/settlements/${id}`
        );
        setForm(res.data);
      } catch (err) {
        console.error('Failed to load settlement:', err);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_SERVER_URL}/api/v1/settlements/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      navigate('/manufacturing/production-order-settlement');
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" sx={{ mt: 4, mb: 3 }}>
        Edit Settlement Rule
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(form).map(([field, value]) => (
          <Grid item xs={12} sm={field.includes('Date') ? 6 : 12} key={field}>
            <TextField
              label={field}
              type={field.includes('Date') ? 'date' : 'text'}
              InputLabelProps={field.includes('Date') ? { shrink: true } : {}}
              value={value}
              onChange={(e) => handleChange(field, e.target.value)}
              fullWidth
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" fullWidth onClick={handleUpdate}>
            Update
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditProductionOrderSettlement;
