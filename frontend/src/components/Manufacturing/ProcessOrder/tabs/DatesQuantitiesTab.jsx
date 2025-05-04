import React from 'react';
import { Grid, TextField } from '@mui/material';

const DatesQuantitiesTab = ({ formData, setFormData }) => {
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
          label="Planned Order"
          value={formData.plannedOrder || ''}
          onChange={handleChange('plannedOrder')}
          fullWidth
        />
      </Grid>
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
      <Grid item xs={4}>
        <TextField
          label="Total Commitment"
          value={formData.totalCommitment || ''}
          onChange={handleChange('totalCommitment')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Actual Finish Date"
          type="date"
          value={formData.actualFinishDate || ''}
          onChange={handleChange('actualFinishDate')}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );
};

export default DatesQuantitiesTab;
