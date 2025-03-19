import React, { useState } from 'react';
import {
  Container,
  Autocomplete,
  TextField,
  Grid,
  Typography,
} from '@mui/material';

const POReference = ({ formData, setFormData, purchaseOrders, isEdit }) => {
  const [selectedPO, setSelectedPO] = useState(null);

  const handlePOChange = (event, newValue) => {
    if (newValue) {
      setSelectedPO(newValue);
      setFormData({
        ...formData,
        poReference: newValue._id,
        supplierId: newValue.supplierId,
        supplierName: newValue.supplierName,
        documentDate: newValue.documentDate,
        poItems: newValue.items,
      });
    }
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Purchase Order Reference
      </Typography>

      <Grid container spacing={2}>
        {/* Select PO */}
        <Grid item xs={12}>
          <Autocomplete
            options={purchaseOrders}
            getOptionLabel={(po) => `PO: ${po._id} - ${po.supplierName}`}
            value={selectedPO}
            onChange={handlePOChange}
            renderInput={(params) => (
              <TextField {...params} label="Select Purchase Order" fullWidth />
            )}
            disabled={isEdit}
          />
        </Grid>

        {/* Supplier Name */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Supplier Name"
            value={formData.supplierName || ''}
            disabled
            fullWidth
          />
        </Grid>

        {/* Supplier ID */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Supplier ID"
            value={formData.supplierId || ''}
            disabled
            fullWidth
          />
        </Grid>

        {/* Document Date */}
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Document Date"
            value={formData.documentDate || ''}
            disabled
            fullWidth
          />
        </Grid>

        {/* Items List */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Purchase Order Items
          </Typography>
          {formData.poItems && formData.poItems.length > 0 ? (
            formData.poItems.map((item, index) => (
              <Grid
                container
                spacing={2}
                key={index}
                style={{ marginBottom: '10px' }}
              >
                <Grid item xs={3}>
                  <TextField
                    label="Item No"
                    value={item.itemNo || ''}
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Material Name"
                    value={item.materialName || ''}
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Quantity"
                    value={item.quantity || ''}
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Net Price"
                    value={item.netPrice || ''}
                    disabled
                    fullWidth
                  />
                </Grid>
              </Grid>
            ))
          ) : (
            <Typography variant="body2">
              No items available for this PO.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default POReference;
