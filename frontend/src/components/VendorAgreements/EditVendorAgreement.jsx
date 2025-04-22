import React, { useEffect, useState } from 'react';
import { Container, Tabs, Tab, Paper, Box, Button } from '@mui/material';
import InitialTab from './tabs/InitialTab';
import HeaderTab from './tabs/HeaderTab';
import ContractTab from './tabs/ContractTab';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditVendorAgreement = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const { id } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${server_Url}/api/v1/vendor-agreements/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => setFormData(res.data));
  }, [id]);

  const handleUpdate = () => {
    axios
      .put(`${server_Url}/api/v1/vendor-agreements/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(() => navigate('/sourcing/vendor-agreements'));
  };

  return (
    <Container>
      <h1 style={{ marginTop: 10, fontWeight: 'bold' }}>
        Edit Vendor Agreement
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
        onClick={handleUpdate}
      >
        Update Agreement
      </Button>
    </Container>
  );
};

export default EditVendorAgreement;
