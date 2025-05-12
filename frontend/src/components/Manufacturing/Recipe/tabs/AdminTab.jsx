// src/components/recipes/tabs/AdminTab.jsx
import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';

const AdminTab = ({ form, setForm }) => {
  const adminData = form.adminData || {};
  const validity = adminData.validity || {};
  const userData = adminData.userData || {};

  const handleNestedChange = (section, field, value) => {
    const updated = { ...form.adminData?.[section], [field]: value };
    setForm({
      ...form,
      adminData: {
        ...form.adminData,
        [section]: updated,
      },
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Administrative Data</Typography>
      </Grid>

      {/* Validity Section */}
      <Grid item xs={12}>
        <Typography variant="subtitle1">Validity</Typography>
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Change Number"
          value={validity.changeNumber || ''}
          onChange={(e) =>
            handleNestedChange('validity', 'changeNumber', e.target.value)
          }
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Valid From"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={validity.validFrom || ''}
          onChange={(e) =>
            handleNestedChange('validity', 'validFrom', e.target.value)
          }
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Valid To"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={validity.validTo || ''}
          onChange={(e) =>
            handleNestedChange('validity', 'validTo', e.target.value)
          }
          fullWidth
        />
      </Grid>

      {/* User Data Section */}
      <Grid item xs={12}>
        <Typography variant="subtitle1">User Data</Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Created On"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={userData.createdOn || ''}
          onChange={(e) =>
            handleNestedChange('userData', 'createdOn', e.target.value)
          }
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Created By"
          value={userData.createdBy || ''}
          onChange={(e) =>
            handleNestedChange('userData', 'createdBy', e.target.value)
          }
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Changed On"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={userData.changedOn || ''}
          onChange={(e) =>
            handleNestedChange('userData', 'changedOn', e.target.value)
          }
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Changed By"
          value={userData.changedBy || ''}
          onChange={(e) =>
            handleNestedChange('userData', 'changedBy', e.target.value)
          }
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default AdminTab;
