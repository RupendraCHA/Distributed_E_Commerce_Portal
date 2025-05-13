// CreateProductionPlanDetails.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Button } from '@mui/material';
import axios from 'axios';
import ProductionPlanTabs from './ProductionPlanTabs';

const CreateProductionPlanDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(state?.form || {});
  const mode = state?.mode || 'create';

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_API_SERVER_URL}/api/v1/production-plans`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate('/manufacturing/production-plan');
    } catch (error) {
      console.error('Error saving production plan:', error);
    }
  };

  return (
    <Container>
      <h2>Create Production Plan – Details</h2>
      <ProductionPlanTabs form={form} setForm={setForm} disabledMaterial />
      <Button onClick={handleSave} variant="contained" sx={{ mt: 2 }}>
        Save
      </Button>
    </Container>
  );
};

export default CreateProductionPlanDetails;
