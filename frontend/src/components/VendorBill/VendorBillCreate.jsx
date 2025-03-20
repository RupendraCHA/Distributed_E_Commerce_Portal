import React, { useEffect, useState } from 'react';
import { Container, Tabs, Tab, Button, Paper, Box } from '@mui/material';
import BasicData from './tabs/BasicData';
import Payment from './tabs/Payment';
import Details from './tabs/Details';
import Tax from './tabs/Tax';
import Contacts from './tabs/Contacts';
import Note from './tabs/Note';
import POReference from './tabs/POReference';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VendorBillCreate = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState({
    basicData: {},
    payment: {},
    details: {},
    tax: {},
    contacts: {},
    note: {},
  });
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(server_Url + '/api/v1/purchase-orders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => setPurchaseOrders(res.data))
      .catch((err) => console.error('Error fetching POs:', err));
  }, []);

  const handleSubmit = () => {
    axios
      .post(server_Url + '/api/v1/vendor-bill', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(() => navigate('/sourcing/vendor-bills'))
      .catch((err) => console.error('Error creating vendor bill:', err));
  };
  console.log({ formData });

  return (
    <Container>
      <h1 style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '10px' }}>
        Create Vendor Bill
      </h1>

      {/* Paper wraps tabs to keep them behind the content */}
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2, borderRadius: 2 }}>
        <Tabs
          value={tabIndex}
          onChange={(_, newIndex) => setTabIndex(newIndex)}
          variant="fullWidth"
          textColor="inherit"
          // TabIndicatorProps={{ style: { background: '#000' } }}
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
          <Tab label="Basic Data" />
          <Tab label="Payment" />
          <Tab label="Details" />
          <Tab label="Tax" />
          <Tab label="Contacts" />
          <Tab label="Note" />
        </Tabs>

        {/* Content Box */}
        <Box sx={{ marginTop: 2 }}>
          {tabIndex === 0 && (
            <BasicData formData={formData} setFormData={setFormData} />
          )}
          {tabIndex === 1 && (
            <Payment formData={formData} setFormData={setFormData} />
          )}
          {tabIndex === 2 && (
            <Details formData={formData} setFormData={setFormData} />
          )}
          {tabIndex === 3 && (
            <Tax formData={formData} setFormData={setFormData} />
          )}
          {tabIndex === 4 && (
            <Contacts formData={formData} setFormData={setFormData} />
          )}
          {tabIndex === 5 && (
            <Note formData={formData} setFormData={setFormData} />
          )}
        </Box>
      </Paper>

      {/* PO Reference Section */}
      <POReference
        formData={formData}
        setFormData={setFormData}
        purchaseOrders={purchaseOrders}
      />

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ marginTop: 2 }}
      >
        Save Vendor Bill
      </Button>
    </Container>
  );
};

export default VendorBillCreate;
