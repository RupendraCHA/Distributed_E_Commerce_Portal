import React, { useEffect, useState } from 'react';
import { Container, Tabs, Tab, Button, Paper, Box } from '@mui/material';
import BasicData from './tabs/BasicData'; // Updated path
import Payment from './tabs/Payment'; // Updated path
import Details from './tabs/Details'; // Updated path
import Tax from './tabs/Tax'; // Updated path
import Contacts from './tabs/Contacts'; // Updated path
import Note from './tabs/Note'; // Updated path
import POReference from './tabs/POReference'; // Updated path
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Helper function to create a GL document based on vendor bill data
const createGLDocumentFromVendorBill = async (vendorBillData, token) => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;

  // Extract relevant data from the vendor bill
  const { basicData, details, payment } = vendorBillData;
  const amount = parseFloat(basicData?.amount) || 0;
  const taxAmount = parseFloat(basicData?.taxAmount) || 0;
  const totalAmount = amount + taxAmount;

  // Construct GL document
  const glDocument = {
    documentDate: basicData?.documentDate || new Date().toISOString().split('T')[0],
    postingDate: basicData?.postingDate || new Date().toISOString().split('T')[0],
    currency: details?.currency || 'INR',
    reference: basicData?.reference || '',
    documentHeaderText: 'Auto-generated from Vendor Bill',
    crossCCNumber: '',
    companyCode: basicData?.companyCode || 'EC01',
    companyName: 'Eco store banglore',
    totalDebit: totalAmount,
    totalCredit: totalAmount,
    items: [
      // Debit: Expense Account (using the GL Account specified in Details)
      {
        glAccount: details?.glAccount || 'EXPENSE_DEFAULT', // Fallback to a default GL account
        shortText: 'Vendor Bill Expense',
        debitCreditIndicator: 'D', // Debit
        amountInDocCurrency: totalAmount,
        localCurrencyAmount: totalAmount, // Assuming same currency for simplicity
        taxJurisdictionCode: '',
        assignment: '',
      },
      // Credit: Accounts Payable
      {
        glAccount: 'ACCOUNTS_PAYABLE', // Hardcoded for demo; should come from config
        shortText: 'Vendor Bill Payable',
        debitCreditIndicator: 'C', // Credit
        amountInDocCurrency: totalAmount,
        localCurrencyAmount: totalAmount,
        taxJurisdictionCode: '',
        assignment: '',
      },
    ],
  };

  try {
    const response = await axios.post(
      `${server_Url}/api/v1/gldocuments`,
      glDocument,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error('Error creating GL document:', err);
    throw err;
  }
};

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

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      // Step 1: Save the Vendor Bill
      const vendorBillResponse = await axios.post(
        server_Url + '/api/v1/vendor-bill',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Step 2: Create the corresponding GL Document
      await createGLDocumentFromVendorBill(formData, token);

      // Step 3: Navigate back to the Vendor Bill list
      navigate('/sourcing/vendor-bills');
    } catch (err) {
      console.error('Error creating vendor bill or GL document:', err);
    }
  };

  return (
    <Container>
      <h1 style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '10px' }}>
        Create Vendor Bill
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
          <Tab label="Basic Data" />
          <Tab label="Payment" />
          <Tab label="Details" />
          <Tab label="Tax" />
          <Tab label="Contacts" />
          <Tab label="Note" />
        </Tabs>

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

      <POReference
        formData={formData}
        setFormData={setFormData}
        purchaseOrders={purchaseOrders}
      />

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