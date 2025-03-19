import React, { useState } from 'react';
import { Container, Tabs, Tab, Button, Paper, Box } from '@mui/material';
import VendorAddress from './tabs/VendorAddress';
import VendorControl from './tabs/VendorControl';
import PaymentTransactions from './tabs/PaymentTransactions';
import ContactPersons from './tabs/ContactPersons';
import AccountingInformation from './tabs/AccountingInformation';
import PaymentTransactionAccounting from './tabs/PaymentTransactionAccounting';
import PurchaseData from './tabs/PurchaseData';
import PartnerFunctions from './tabs/PartnerFunctions';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateVendor = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = () => {
    axios
      .post(server_Url + '/api/v1/vendor-master', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(() => navigate('/sourcing/vendor-master'))
      .catch((err) => console.error('Error creating vendor:', err));
  };

  return (
    <Container>
      <h1 style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '10px' }}>
        Create Vendor
      </h1>

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
          <Tab label="Address" />
          <Tab label="Control" />
          <Tab label="Payment" />
          <Tab label="Contact" />
          <Tab label="Accounting" />
          <Tab label="Payment Transactions Accounting" />
          <Tab label="Purchasing Data" />
          <Tab label="Partner Functions" />
        </Tabs>

        <Box sx={{ marginTop: 2 }}>
          {tabIndex === 0 && (
            <VendorAddress formData={formData} setFormData={setFormData} />
          )}
          {tabIndex === 1 && (
            <VendorControl formData={formData} setFormData={setFormData} />
          )}
          {tabIndex === 2 && (
            <PaymentTransactions
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {tabIndex === 3 && (
            <ContactPersons formData={formData} setFormData={setFormData} />
          )}
          {tabIndex === 4 && (
            <AccountingInformation
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {tabIndex === 5 && (
            <PaymentTransactionAccounting
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {tabIndex === 6 && (
            <PurchaseData formData={formData} setFormData={setFormData} />
          )}
          {tabIndex === 7 && (
            <PartnerFunctions formData={formData} setFormData={setFormData} />
          )}
        </Box>
      </Paper>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ marginTop: 2 }}
      >
        Save Vendor
      </Button>
    </Container>
  );
};

export default CreateVendor;
