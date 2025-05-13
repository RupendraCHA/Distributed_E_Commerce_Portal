// src/components/recipes/RecipeTabs.jsx
import React, { useState } from 'react';
import { Container, Tabs, Tab, Box, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import HeaderTab from './tabs/HeaderTab.jsx';
import OperationsTab from './tabs/OperationsTab.jsx';
import MaterialsTab from './tabs/MaterialsTab.jsx';
import AdminTab from './tabs/AdminTab.jsx';

const tabLabels = ['Header', 'Operations', 'Materials', 'Administrative'];

const RecipeTabs = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState(state?.form || {});
  const mode = state?.mode || 'create';
  const id = state?.id;
  const server_Url = import.meta.env.VITE_API_SERVER_URL;

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (mode === 'edit') {
        await axios.put(`${server_Url}/api/v1/recipes/${id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${server_Url}/api/v1/recipes`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate('/manufacturing/recipe');
    } catch (error) {
      console.error('Failed to save recipe:', error);
    }
  };

  const renderTab = () => {
    switch (tab) {
      case 0:
        return <HeaderTab form={form} setForm={setForm} />;
      case 1:
        return <OperationsTab form={form} setForm={setForm} />;
      case 2:
        return <MaterialsTab form={form} setForm={setForm} />;
      case 3:
        return <AdminTab form={form} setForm={setForm} />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <h2>Master Recipe: Details</h2>
      <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
        {tabLabels.map((label, i) => (
          <Tab label={label} key={i} />
        ))}
      </Tabs>
      <Box mt={2}>{renderTab()}</Box>
      <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
        <Button variant="contained" onClick={handleSave}>
          {mode === 'edit' ? 'Update' : 'Save'}
        </Button>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    </Container>
  );
};

export default RecipeTabs;
