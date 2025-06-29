import React, { useEffect, useState } from 'react';
import { Container, Tabs, Tab, Button, Paper } from '@mui/material';
import BasicData from './tabs/BasicData'; // Updated path
import Payment from './tabs/Payment'; // Updated path
import Details from './tabs/Details'; // Updated path
import Tax from './tabs/Tax'; // Updated path
import Contacts from './tabs/Contacts'; // Updated path
import Note from './tabs/Note'; // Updated path
import POReference from './tabs/POReference'; // Updated path
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

// Helper function to update or create a GL document based on vendor bill data
const updateGLDocumentForVendorBill = async (vendorBillData, token) => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;

  // Extract relevant data from the vendor bill
  const { _id, basicData, details, payment } = vendorBillData;
  const amount = parseFloat(basicData?.amount) || 0;
  const taxAmount = parseFloat(basicData?.taxAmount) || 0;
  const totalAmount = amount + taxAmount;

  // Construct GL document
  const glDocument = {
    documentDate: basicData?.documentDate || new Date().toISOString().split('T')[0],
    postingDate: basicData?.postingDate || new Date().toISOString().split('T')[0],
    currency: details?.currency || 'INR',
    reference: `VB_${_id}`, // Link GL document to vendor bill via reference
    documentHeaderText: 'Auto-generated from Vendor Bill',
    crossCCNumber: '',
    companyCode: basicData?.companyCode || 'EC01',
    companyName: 'Eco store banglore',
    totalDebit: totalAmount,
    totalCredit: totalAmount,
    items: [
      {
        glAccount: details?.glAccount || 'EXPENSE_DEFAULT',
        shortText: 'Vendor Bill Expense',
        debitCreditIndicator: 'D',
        amountInDocCurrency: totalAmount,
        localCurrencyAmount: totalAmount,
        taxJurisdictionCode: '',
        assignment: '',
      },
      {
        glAccount: 'ACCOUNTS_PAYABLE',
        shortText: 'Vendor Bill Payable',
        debitCreditIndicator: 'C',
        amountInDocCurrency: totalAmount,
        localCurrencyAmount: totalAmount,
        taxJurisdictionCode: '',
        assignment: '',
      },
    ],
  };

  try {
    // Check if a GL document already exists for this vendor bill
    const glResponse = await axios.get(
      `${server_Url}/api/v1/gldocuments?reference=VB_${_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (glResponse.data && glResponse.data.length > 0) {
      // Update existing GL document
      const glDocId = glResponse.data[0]._id;
      await axios.put(
        `${server_Url}/api/v1/gldocuments/${glDocId}`,
        glDocument,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      // Create new GL document
      await axios.post(
        `${server_Url}/api/v1/gldocuments`,
        glDocument,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  } catch (err) {
    console.error('Error updating/creating GL document:', err);
    throw err;
  }
};

const VendorBillEdit = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const { id } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(server_Url + `/api/v1/vendor-bill/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => setFormData(res.data));
  }, [id]);

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      // Step 1: Update the Vendor Bill
      await axios.put(
        server_Url + `/api/v1/vendor-bill/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Step 2: Update or create the corresponding GL Document
      await updateGLDocumentForVendorBill(formData, token);

      // Step 3: Navigate back to the Vendor Bill list
      navigate('/sourcing/vendor-bills');
    } catch (err) {
      console.error('Error updating vendor bill or GL document:', err);
    }
  };

  return (
    <Container>
      <h1 style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '10px' }}>
        Edit Vendor Bill
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
      </Paper>
      <POReference
        formData={formData}
        setFormData={setFormData}
        isEdit={true}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: '20px' }}
      >
        Update Vendor Bill
      </Button>
    </Container>
  );
};

export default VendorBillEdit;