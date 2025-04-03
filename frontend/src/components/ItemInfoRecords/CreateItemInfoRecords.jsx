import React, { useState } from 'react';
import { Container, Tabs, Tab, Paper, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PurchOrgData1 from './tabs/PurchOrgData1';
import PurchOrgData2 from './tabs/PurchOrgData2';
import SourceListOverview from './tabs/SourceListOverview';

const CreateItemInfoRecords = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState({
    purchOrgData1: {},
    purchOrgData2: {},
    sourceListOverview: {},
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const { material, supplier } = formData.purchOrgData1;
    if (!material || !supplier) {
      alert('Please select both Material and Supplier.');
      return;
    }

    setIsLoading(true);

    try {
      const checkRes = await axios.get(`${server_Url}/api/v1/item-info-records?material=${material}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const duplicate = checkRes.data.find(
        (rec) =>
          rec?.purchOrgData1?.material === material &&
          rec?.purchOrgData1?.supplier === supplier
      );

      if (duplicate) {
        alert('An Item Info Record with this Material and Supplier already exists.');
        setIsLoading(false);
        return;
      }

      // If it's the first record for this material, we'll make it fixed
      const isFirstRecord = checkRes.data.length === 0;

      const postRes = await axios.post(`${server_Url}/api/v1/item-info-records`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });


      const createdId = postRes.data._id;

      // Update the record to make it fixed if it's the first one
      if (isFirstRecord) {
        await axios.put(
          `${server_Url}/api/v1/item-info-records/${createdId}`,
          {
            sourceListOverview: {
              ...formData.sourceListOverview,
              fixedItemInfoRecordId: createdId,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
      }

      navigate('/sourcing/item-info-records');
    } catch (err) {
      console.error('Error creating item info record:', err);
    } finally {
      setIsLoading(false);
    }
  };




  return (
    <Container>
      <h1 style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '10px' }}>
        Create Item Info Record
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
          <Tab label="Source List" />
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
        onClick={handleSubmit}
        sx={{ marginTop: 2 }}
      >
        {isLoading ? 'Saving...' : 'Save Info Record'}
      </Button>
    </Container>
  );
};

export default CreateItemInfoRecords;
