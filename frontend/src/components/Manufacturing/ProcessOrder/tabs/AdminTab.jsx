import React from 'react';
import { Grid, TextField } from '@mui/material';

const AdminTab = ({ formData, setFormData }) => {
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
          label="Created By"
          value={formData.createdBy || ''}
          onChange={handleChange('createdBy')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Created Date"
          type="date"
          value={formData.createdDate || ''}
          onChange={handleChange('createdDate')}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Created Time"
          type="time"
          value={formData.createdTime || ''}
          onChange={handleChange('createdTime')}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Changed By"
          value={formData.changedBy || ''}
          onChange={handleChange('changedBy')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Changed Date"
          type="date"
          value={formData.changedDate || ''}
          onChange={handleChange('changedDate')}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Changed Time"
          type="time"
          value={formData.changedTime || ''}
          onChange={handleChange('changedTime')}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );
};

export default AdminTab;
