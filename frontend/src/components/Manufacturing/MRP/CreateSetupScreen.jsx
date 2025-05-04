import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Autocomplete,
  Paper,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateSetupScreen = () => {
  const navigate = useNavigate();
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const [materials, setMaterials] = useState([]);
  const [form, setForm] = useState({
    materialId: '',
    materialName: '',
    mrpArea: '',
    plant: '',
    processingKey: '',
    purchaseReq: '',
    saScheduleLines: '',
    createMRPList: '',
    planningMode: '',
    scheduling: '',
    alsoPlanUnchanged: false,
    displayBeforeSave: false,
    displayMRPList: false,
    simulationMode: false,
  });

  useEffect(() => {
    axios
      .get(server_Url + '/api/v1/getMaterialIds', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => setMaterials(res.data))
      .catch((err) => console.error('Error fetching materials:', err));
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    // Store form in session/local storage or pass through navigation state
    navigate('/manufacturing/mrp/create/details', { state: form });
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ my: 2 }}>
        Single-Item, Multi-Level MRP
      </Typography>
      <Grid container spacing={2}>
        {/* Material Autocomplete */}
        <Grid item xs={4}>
          <Autocomplete
            options={materials}
            getOptionLabel={(opt) =>
              opt.materialId && opt.materialName
                ? `${opt.materialId} - ${opt.materialName}`
                : ''
            }
            onChange={(e, value) => {
              handleChange('materialId', value?.materialId || '');
              handleChange('materialName', value?.materialName || '');
              // Auto-fill plant and mrpArea if available
              handleChange('plant', value?.plant || '');
              handleChange('mrpArea', value?.mrpArea || '');
              // You can add more fields here if needed, e.g. storageLocation, purchasingGroup, etc.
            }}
            renderInput={(params) => (
              <TextField {...params} label="Material" fullWidth />
            )}
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

        {/* MRP Control Parameters */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">MRP Control Parameters</Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="Processing Key"
                  value={form.processingKey}
                  onChange={(e) =>
                    handleChange('processingKey', e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Create Purchase Req."
                  value={form.purchaseReq}
                  onChange={(e) => handleChange('purchaseReq', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="SA Deliv. Sched. Lines"
                  value={form.saScheduleLines}
                  onChange={(e) =>
                    handleChange('saScheduleLines', e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Create MRP List"
                  value={form.createMRPList}
                  onChange={(e) =>
                    handleChange('createMRPList', e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Planning Mode"
                  value={form.planningMode}
                  onChange={(e) => handleChange('planningMode', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Scheduling"
                  value={form.scheduling}
                  onChange={(e) => handleChange('scheduling', e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Process Control Parameters */}
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
          <Button variant="contained" color="primary" onClick={handleContinue}>
            Continue
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateSetupScreen;
