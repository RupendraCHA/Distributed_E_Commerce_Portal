import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Tabs, Tab, Paper, Box, Button } from '@mui/material';
import axios from 'axios';
import PurchOrgData1 from './tabs/PurchOrgData1';
import PurchOrgData2 from './tabs/PurchOrgData2';
import SourceListOverview from './tabs/SourceListOverview';

const EditItemInfoRecords = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState({
    purchOrgData1: {},
    purchOrgData2: {},
    sourceListOverview: {},
  });

  useEffect(() => {
    axios
      .get(`${server_Url}/api/v1/item-info-records/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => setFormData(res.data))
      .catch((err) => console.error('Error fetching item info record:', err));
  }, [id]);

  const handleUpdate = () => {
    axios
      .put(`${server_Url}/api/v1/item-info-records/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(() => navigate('/sourcing/item-info-records'))
      .catch((err) => console.error('Error updating item info record:', err));
  };

  return (
    <Container>
      <h1 style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '10px' }}>
        Edit Item Info Record
      </h1>

      <Paper elevation={3} sx={{ padding: 2, marginTop: 2, borderRadius: 2 }}>
        <Tabs
          value={tabIndex}
          onChange={(_, newIndex) => setTabIndex(newIndex)}
          variant="fullWidth"
          textColor="inherit"
          sx={{
            '& .Mui-selected': {
              borderRadius: '8px',
              fontWeight: 'bold',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#1976d2',
            },
          }}
        >
          <Tab label="Purch. Org. Data 1" />
          <Tab label="Purch. Org. Data 2" />
          <Tab label="Source List Overview" />
        </Tabs>

        <Box sx={{ marginTop: 2 }}>
          {tabIndex === 0 && (
            <PurchOrgData1 formData={formData} setFormData={setFormData} />
          )}
          {tabIndex === 1 && (
            <PurchOrgData2 formData={formData} setFormData={setFormData} />
          )}
          {tabIndex === 2 && (
            <SourceListOverview formData={formData} setFormData={setFormData} />
          )}
        </Box>
      </Paper>

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdate}
        sx={{ marginTop: 2 }}
      >
        Update Info Record
      </Button>
    </Container>
  );
};

export default EditItemInfoRecords;
