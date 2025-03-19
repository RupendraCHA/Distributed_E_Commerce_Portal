import React from 'react';
import { TextField, Grid2 } from '@mui/material';

const Contacts = ({ formData, setFormData }) => {
  return (
    <Grid2 container spacing={2} sx={{ marginTop: '20px' }}>
      <Grid2 item xs={12}>
        <TextField
          label="IR Processor"
          value={formData.contacts?.irProcessor}
          onChange={(e) =>
            setFormData({
              ...formData,
              contacts: {
                ...formData.contacts,
                irProcessor: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid2>
    </Grid2>
  );
};

export default Contacts;
