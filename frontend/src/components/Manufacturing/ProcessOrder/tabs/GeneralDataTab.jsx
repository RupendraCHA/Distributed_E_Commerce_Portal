import React from 'react';
import { Grid, TextField } from '@mui/material';

const GeneralDataTab = ({ formData, setFormData }) => {
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
          label="Material"
          value={formData.materialId || ''}
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Process Order"
          value={formData.processOrder || ''}
          onChange={handleChange('processOrder')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Material Name"
          value={formData.materialName || ''}
          onChange={handleChange('materialName')}
          fullWidth
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="System Status"
          value={formData.systemStatus || ''}
          onChange={handleChange('systemStatus')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Type"
          value={formData.processOrderType || ''}
          onChange={handleChange('processOrderType')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Plant"
          value={formData.plant || ''}
          onChange={handleChange('plant')}
          fullWidth
        />
      </Grid>

      {/* Quantities */}
      <Grid item xs={4}>
        <TextField
          label="Total Qty"
          value={formData.quantity || ''}
          onChange={handleChange('quantity')}
          type="number"
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Unit"
          value={formData.unit || ''}
          onChange={handleChange('unit')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Delivered Qty"
          value={formData.delivered || ''}
          onChange={handleChange('delivered')}
          type="number"
          fullWidth
        />
      </Grid>

      {/* Dates */}
      <Grid item xs={4}>
        <TextField
          label="Start Date"
          type="datetime-local"
          value={formData.startDate || ''}
          onChange={handleChange('startDate')}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="End Date"
          type="datetime-local"
          value={formData.endDate || ''}
          onChange={handleChange('endDate')}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Release Date"
          type="date"
          value={formData.releaseDate || ''}
          onChange={handleChange('releaseDate')}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      {/* Scheduled */}
      <Grid item xs={4}>
        <TextField
          label="Scheduled Start"
          type="time"
          value={formData.scheduledStart || ''}
          onChange={handleChange('scheduledStart')}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Scheduled End"
          type="time"
          value={formData.scheduledEnd || ''}
          onChange={handleChange('scheduledEnd')}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      {/* Confirmed */}
      <Grid item xs={4}>
        <TextField
          label="Confirmed Start"
          type="time"
          value={formData.confirmedStart || ''}
          onChange={handleChange('confirmedStart')}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Confirmed End"
          type="time"
          value={formData.confirmedEnd || ''}
          onChange={handleChange('confirmedEnd')}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );
};

export default GeneralDataTab;
