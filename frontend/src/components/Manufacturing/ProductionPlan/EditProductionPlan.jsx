import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import ProductionPlanTabs from './ProductionPlanTabs';

const EditProductionPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [step, setStep] = useState(1); // Step 1 = Initial, Step 2 = Tabs

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_SERVER_URL}/api/v1/production-plans/${id}`
        );
        const data = await res.json();

        // Format dates to YYYY-MM-DD
        const formattedData = {
          ...data,
          planningHorizonFrom: data.planningHorizonFrom
            ? new Date(data.planningHorizonFrom).toISOString().split('T')[0]
            : '',
          planningHorizonTo: data.planningHorizonTo
            ? new Date(data.planningHorizonTo).toISOString().split('T')[0]
            : '',
        };

        setForm(formattedData);
      } catch (err) {
        console.error('Failed to load production plan:', err);
      }
    };
    fetchPlan();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await fetch(
        `${import.meta.env.VITE_API_SERVER_URL}/api/v1/production-plans/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(form),
        }
      );
      navigate('/manufacturing/production-plan');
    } catch (err) {
      console.error('Failed to update production plan:', err);
    }
  };

  if (!form)
    return (
      <Container>
        <CircularProgress />
      </Container>
    );

  return (
    <Container>
      {step === 1 ? (
        <>
          <Typography variant="h5" sx={{ mt: 4, mb: 3, fontWeight: 'bold' }}>
            Edit Production Plan – Initial Screen
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Material"
                fullWidth
                disabled
                value={`${form.materialName || ''} (${form.material || ''})`}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Plant"
                fullWidth
                value={form.plant}
                onChange={(e) => setForm({ ...form, plant: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Version"
                fullWidth
                value={form.version}
                onChange={(e) => setForm({ ...form, version: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Planning Horizon From"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={form.planningHorizonFrom}
                onChange={(e) =>
                  setForm({ ...form, planningHorizonFrom: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Planning Horizon To"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={form.planningHorizonTo}
                onChange={(e) =>
                  setForm({ ...form, planningHorizonTo: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
            Edit Production Plan – Details
          </Typography>
          <ProductionPlanTabs form={form} setForm={setForm} disabledMaterial />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item>
              <Button variant="outlined" onClick={() => setStep(1)}>
                Back
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleUpdate}>
                Update
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default EditProductionPlan;
