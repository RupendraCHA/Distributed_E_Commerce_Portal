import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditMRPSetupScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const server_Url = import.meta.env.VITE_API_SERVER_URL;

  useEffect(() => {
    axios
      .get(`${server_Url}/api/v1/mrp/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setForm(res.data);
      });
  }, [id]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    navigate(`/manufacturing/mrp/edit/${id}/details`, { state: form });
  };

  if (!form) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h5" sx={{ my: 2 }}>
        Edit MRP Setup
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            label="Material"
            value={form.material}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="MRP Area"
            value={form.mrpArea}
            onChange={(e) => handleChange('mrpArea', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Plant"
            value={form.plant}
            onChange={(e) => handleChange('plant', e.target.value)}
            fullWidth
          />
        </Grid>

        {/* You can optionally show other fields like processingKey, etc., if they're stored */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">
              Process Control Parameters
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.alsoPlanUnchanged}
                  onChange={(e) =>
                    handleChange('alsoPlanUnchanged', e.target.checked)
                  }
                />
              }
              label="Also Plan Unchanged Components"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.displayBeforeSave}
                  onChange={(e) =>
                    handleChange('displayBeforeSave', e.target.checked)
                  }
                />
              }
              label="Display Results Prior to Saving"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.displayMRPList}
                  onChange={(e) =>
                    handleChange('displayMRPList', e.target.checked)
                  }
                />
              }
              label="Display MRP list"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.simulationMode}
                  onChange={(e) =>
                    handleChange('simulationMode', e.target.checked)
                  }
                />
              }
              label="Simulation Mode"
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={handleContinue}>
            Continue
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditMRPSetupScreen;
