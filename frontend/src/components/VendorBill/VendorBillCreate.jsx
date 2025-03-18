import React, { useEffect, useState } from 'react';
import { Container, Tabs, Tab, Button } from '@mui/material';
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
  const [purchaseOrders, setPurchaseOrders] = useState([]); // Store PO data
  const navigate = useNavigate();

  // Fetch POs when the component mounts
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

  // Submit the vendor bill
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

      {/* MUI Tabs */}
      <Tabs
        value={tabIndex}
        onChange={(_, newIndex) => setTabIndex(newIndex)}
        style={{ marginTop: '20px' }}
      >
        <Tab label="Basic Data" />
        <Tab label="Payment" />
        <Tab label="Details" />
        <Tab label="Tax" />
        <Tab label="Contacts" />
        <Tab label="Note" />
      </Tabs>

      {/* Render tabs conditionally */}
      {tabIndex === 0 && (
        <BasicData formData={formData} setFormData={setFormData} />
      )}
      {tabIndex === 1 && (
        <Payment formData={formData} setFormData={setFormData} />
      )}
      {tabIndex === 2 && (
        <Details formData={formData} setFormData={setFormData} />
      )}
      {tabIndex === 3 && <Tax formData={formData} setFormData={setFormData} />}
      {tabIndex === 4 && (
        <Contacts formData={formData} setFormData={setFormData} />
      )}
      {tabIndex === 5 && <Note formData={formData} setFormData={setFormData} />}

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
        style={{ marginTop: '20px' }}
      >
        Save Vendor Bill
      </Button>
    </Container>
  );
};

export default VendorBillCreate;
