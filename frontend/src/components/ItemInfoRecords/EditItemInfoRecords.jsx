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
  const [isLoading, setIsLoading] = useState(false);


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

  const handleUpdate = async () => {
    const { material, supplier } = formData.purchOrgData1;
    if (!material || !supplier) {
      alert('Please select both Material and Supplier.');
      return;
    }

    setIsLoading(true);

    try {
      const checkRes = await axios.get(`${server_Url}/api/v1/item-info-records`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const duplicate = checkRes.data.find(
        (rec) =>
          rec._id !== id &&
          rec?.purchOrgData1?.material === material &&
          rec?.purchOrgData1?.supplier === supplier
      );

      if (duplicate) {
        alert('Another record with this Material and Supplier already exists.');
        setIsLoading(false);
        return;
      }

      await axios.put(`${server_Url}/api/v1/item-info-records/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      navigate('/sourcing/item-info-records');
    } catch (err) {
      console.error('Error updating item info record:', err);
    } finally {
      setIsLoading(false);
    }
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
        {isLoading ? 'Updating...' : 'Update Info Record'}
      </Button>
    </Container>
  );
};

export default EditItemInfoRecords;
