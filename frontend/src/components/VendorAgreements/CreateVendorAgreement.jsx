import React, { useState } from 'react';
import { Container, Tabs, Tab, Paper, Box, Button } from '@mui/material';
import InitialTab from './tabs/InitialTab';
import HeaderTab from './tabs/HeaderTab';
import ContractTab from './tabs/ContractTab';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateVendorAgreement = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleSave = () => {
    axios
      .post(`${server_Url}/api/v1/vendor-agreements`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(() => navigate('/sourcing/vendor-agreements'))
      .catch((err) => console.error('Error saving agreement:', err));
  };

  return (
    <Container>
      <h1 style={{ marginTop: 10, fontWeight: 'bold' }}>
        Create Vendor Agreement
      </h1>

      <Paper elevation={3} sx={{ padding: 2, marginTop: 2, borderRadius: 2 }}>
        <Tabs
          value={tabIndex}
          onChange={(_, newIndex) => setTabIndex(newIndex)}
          variant="fullWidth"
          sx={{
            '& .Mui-selected': { fontWeight: 'bold' },
            '& .MuiTabs-indicator': { backgroundColor: '#1976d2' },
          }}
        >
          <Tab label="Initial" />
          <Tab label="Header" />
          <Tab label="Contract" />
        </Tabs>

        <Box sx={{ mt: 2 }}>
          {tabIndex === 0 && (
            <InitialTab formData={formData} setFormData={setFormData} />
          )}
          {tabIndex === 1 && (
            <HeaderTab formData={formData} setFormData={setFormData} />
          )}
          {tabIndex === 2 && (
            <ContractTab formData={formData} setFormData={setFormData} />
          )}
        </Box>
      </Paper>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleSave}
      >
        Save Agreement
      </Button>
    </Container>
  );
};

export default CreateVendorAgreement;
