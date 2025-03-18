import React from 'react';
import { TextField, Grid2 } from '@mui/material';

const Note = ({ formData, setFormData }) => {
  return (
    <Grid2 container spacing={2} sx={{ marginTop: '20px' }}>
      <Grid2 item size={{ xs: 12 }}>
        <TextField
          label="Note"
          multiline
          rows={4}
          value={formData.note?.note}
          onChange={(e) =>
            setFormData({
              ...formData,
              note: {
                note: e.target.value,
              },
            })
          }
          fullWidth
        />
      </Grid2>
    </Grid2>
  );
};

export default Note;
