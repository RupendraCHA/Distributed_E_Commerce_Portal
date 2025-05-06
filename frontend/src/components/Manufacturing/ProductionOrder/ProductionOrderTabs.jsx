import React, { useState } from 'react';
import { Container, Tabs, Tab, Box, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import GeneralTab from './tabs/GeneralTab';
import AssignmentTab from './tabs/AssignmentTab';
import GoodsReceiptTab from './tabs/GoodsReceiptTab';
import ControlTab from './tabs/ControlTab';
import DatesQuantitiesTab from './tabs/DatesQuantitiesTab';
import MasterDataTab from './tabs/MasterDataTab';
import AdministrationTab from './tabs/AdministrationTab';
import ItemsTab from './tabs/ItemsTab';
import FastEntryTab from './tabs/FastEntryTab';

const tabLabels = [
  'General',
  'Assignment',
  'Goods Receipt',
  'Control',
  'Dates/Quantities',
  'Master Data',
  'Administration',
  'Items',
  'Fast Entry',
];

const ProductionOrderTabs = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState(state?.form || {});
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const mode = state?.mode || 'create';
  const id = state?.id;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (mode === 'edit') {
        await axios.put(`${server_Url}/api/v1/production-orders/${id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${server_Url}/api/v1/production-orders`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate('/manufacturing/product-orders');
    } catch (error) {
      console.error('Failed to save production order:', error);
    }
  };

  const renderTab = () => {
    switch (tab) {
      case 0:
        return <GeneralTab form={form} onChange={handleChange} />;
      case 1:
        return <AssignmentTab form={form} onChange={handleChange} />;
      case 2:
        return <GoodsReceiptTab form={form} onChange={handleChange} />;
      case 3:
        return <ControlTab form={form} onChange={handleChange} />;
      case 4:
        return <DatesQuantitiesTab form={form} onChange={handleChange} />;
      case 5:
        return <MasterDataTab form={form} onChange={handleChange} />;
      case 6:
        return <AdministrationTab form={form} onChange={handleChange} />;
      case 7:
        return <ItemsTab form={form} setForm={setForm} />;
      case 8:
        return <FastEntryTab form={form} setForm={setForm} />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <h2>Production Order: Detail Entry</h2>
      <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)}>
        {tabLabels.map((label, idx) => (
          <Tab label={label} key={idx} />
        ))}
      </Tabs>
      <Box mt={2}>{renderTab()}</Box>
      <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
        <Button variant="contained" onClick={handleSave}>
          {mode === 'edit' ? 'Update' : 'Save'}
        </Button>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    </Container>
  );
};

export default ProductionOrderTabs;
