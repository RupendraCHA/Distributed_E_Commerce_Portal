import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProductionOrderSettlement = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    orderNumber: '',
    category: '',
    settlementReceiver: '',
    receiverShortText: '',
    percentage: '',
    equivalenceNumber: '',
    ruleNumber: '',
    fromS: '',
    toS: '',
    toFiscalYear: '',
    firstUsedDate: '',
    lastUsedDate: '',
  });

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_SERVER_URL}/api/v1/settlements`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      navigate('/manufacturing/production-order-settlement');
    } catch (err) {
      console.error('Creation failed:', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" sx={{ mt: 4, mb: 3 }}>
        Create Settlement Rule
      </Typography>
      <Grid container spacing={2}>
        {Object.keys(form).map((field) => (
          <Grid item xs={12} sm={field.includes('Date') ? 6 : 12} key={field}>
            <TextField
              label={field}
              type={field.includes('Date') ? 'date' : 'text'}
              InputLabelProps={field.includes('Date') ? { shrink: true } : {}}
              value={form[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              fullWidth
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateProductionOrderSettlement;
