import React from 'react';
import { Grid, TextField } from '@mui/material';

const AssignmentTab = ({ formData, setFormData }) => {
  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <TextField
          label="MRP Controller"
          value={formData.mrpController || ''}
          onChange={handleChange('mrpController')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Prod. Supervisor"
          value={formData.prodSupervisor || ''}
          onChange={handleChange('prodSupervisor')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Prod. Sched. Profile"
          value={formData.prodSchedProfile || ''}
          onChange={handleChange('prodSchedProfile')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Planning Plant"
          value={formData.planningPlant || formData.plant || ''}
          onChange={handleChange('planningPlant')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="MRP Area"
          value={formData.mrpArea || ''}
          onChange={handleChange('mrpArea')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Profit Center"
          value={formData.profitCenter || ''}
          onChange={handleChange('profitCenter')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Business Area"
          value={formData.businessArea || ''}
          onChange={handleChange('businessArea')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Revision Level"
          value={formData.revisionLevel || ''}
          onChange={handleChange('revisionLevel')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Reservation"
          value={formData.reservation || ''}
          onChange={handleChange('reservation')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Inspection Lot"
          value={formData.inspectionLot || ''}
          onChange={handleChange('inspectionLot')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Object Class"
          value={formData.objectClass || ''}
          onChange={handleChange('objectClass')}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default AssignmentTab;
