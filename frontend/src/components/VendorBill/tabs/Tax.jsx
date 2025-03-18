import React from 'react';
import { TextField, Grid2 } from '@mui/material';

const Tax = ({ formData, setFormData }) => {
  return (
    <Grid2 container spacing={2} sx={{ marginTop: '20px' }}>
      <Grid2 item size={{ xs: 12, sm: 6 }}>
        <TextField
          label="Tax Code"
          value={formData.tax?.taxCode}
          onChange={(e) =>
            setFormData({
              ...formData,
              tax: {
                ...formData.tax,
                taxCode: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 6 }}>
        <TextField
          label="Tax Amount"
          type="number"
          value={formData.tax?.taxAmount}
          onChange={(e) =>
            setFormData({
              ...formData,
              tax: {
                ...formData.tax,
                taxAmount: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid2>
    </Grid2>
  );
};

export default Tax;
