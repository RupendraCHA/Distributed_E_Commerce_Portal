import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Tabs,
  Tab,
  Button,
  Typography,
  Grid,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Tab components
import GeneralDataTab from './tabs/GeneralDataTab';
import AssignmentTab from './tabs/AssignmentTab';
import GoodsReceiptTab from './tabs/GoodsReceiptTab';
import ControlTab from './tabs/ControlTab';
import DatesQuantitiesTab from './tabs/DatesQuantitiesTab';
import MasterDataTab from './tabs/MasterDataTab';
import AdminTab from './tabs/AdminTab';
import axios from 'axios';

const ProcessOrderDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState(location.state || {});
  // Carries data from the 'Continue' screen
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (e, newValue) => {
    setTabIndex(newValue);
  };
  const isEditMode = Boolean(formData._id); // Check if editing

  const handleSaveOrUpdate = async () => {
    const token = localStorage.getItem('token');

    try {
      if (isEditMode) {
        // UPDATE existing
        await axios.put(
          `${import.meta.env.VITE_API_SERVER_URL}/api/v1/receipt-orders/${
            formData._id
          }`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // CREATE new
        await axios.post(
          `${import.meta.env.VITE_API_SERVER_URL}/api/v1/receipt-orders`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      navigate('/manufacturing/process-orders');
    } catch (error) {
      console.error('Error saving/updating process order:', error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Header with Back Arrow */}
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Button
            onClick={() => {
              if (formData?._id) {
                navigate(`/manufacturing/process-orders/edit/${formData._id}`, {
                  state: formData,
                });
              } else {
                navigate('/manufacturing/process-orders/create', {
                  state: formData,
                });
              }
            }}
          >
            <ArrowBackIcon />
          </Button>
        </Grid>
        <Grid item>
          <Typography variant="h6" fontWeight={600}>
            Process Order Details
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Tabs */}
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="General Data" />
        <Tab label="Assignment" />
        <Tab label="Goods Receipt" />
        <Tab label="Control" />
        <Tab label="Dates/Quantities" />
        <Tab label="Master Data" />
        <Tab label="Administ." />
        {/* Add more if needed */}
      </Tabs>

      {/* Tab Panels */}
      <Box sx={{ mt: 3 }}>
        {tabIndex === 0 && (
          <GeneralDataTab formData={formData} setFormData={setFormData} />
        )}
        {tabIndex === 1 && (
          <AssignmentTab formData={formData} setFormData={setFormData} />
        )}
        {tabIndex === 2 && (
          <GoodsReceiptTab formData={formData} setFormData={setFormData} />
        )}
        {tabIndex === 3 && (
          <ControlTab formData={formData} setFormData={setFormData} />
        )}
        {tabIndex === 4 && (
          <DatesQuantitiesTab formData={formData} setFormData={setFormData} />
        )}
        {tabIndex === 5 && (
          <MasterDataTab formData={formData} setFormData={setFormData} />
        )}
        {tabIndex === 6 && (
          <AdminTab formData={formData} setFormData={setFormData} />
        )}
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveOrUpdate}
        sx={{ mt: 2 }}
      >
        {isEditMode ? 'Update' : 'Save'}
      </Button>
    </Box>
  );
};

export default ProcessOrderDetails;
