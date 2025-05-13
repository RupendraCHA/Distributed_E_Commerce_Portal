import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Autocomplete,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateProductionPlanInitial = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const navigate = useNavigate();

  const [materialOptions, setMaterialOptions] = useState([]);
  const [materialId, setMaterialId] = useState('');
  const [materialName, setMaterialName] = useState('');
  const [plant, setPlant] = useState('');
  const [unit, setUnit] = useState('');
  const [version, setVersion] = useState('00');
  const [planningHorizonFrom, setPlanningHorizonFrom] = useState('');
  const [planningHorizonTo, setPlanningHorizonTo] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`${server_Url}/api/v1/getMaterialIds`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMaterialOptions(res.data))
      .catch((err) => console.error('Error fetching materials:', err));
  }, []);

  const handleContinue = () => {
    navigate('/manufacturing/production-plan/details', {
      state: {
        form: {
          material: materialId,
          materialName,
          plant,
          unit,
          version,
          planningHorizonFrom,
          planningHorizonTo,
          scheduleLines: [],
        },
        mode: 'create',
      },
    });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" sx={{ mt: 4, mb: 3, fontWeight: 'bold' }}>
        Create Production Plan – Initial Screen
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Autocomplete
            options={materialOptions}
            getOptionLabel={(option) =>
              `${option.materialName} (${option.materialId})`
            }
            value={
              materialOptions.find((opt) => opt.materialId === materialId) ||
              null
            }
            onChange={(e, newValue) => {
              setMaterialId(newValue?.materialId || '');
              setMaterialName(newValue?.materialName || '');
              setPlant(newValue?.plant || '');
              setUnit(newValue?.unit || '');
            }}
            renderInput={(params) => (
              <TextField {...params} label="Material" required fullWidth />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Plant"
            value={plant}
            onChange={(e) => setPlant(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Version"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="date"
            label="Planning Horizon From"
            InputLabelProps={{ shrink: true }}
            value={planningHorizonFrom}
            onChange={(e) => setPlanningHorizonFrom(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="date"
            label="Planning Horizon To"
            InputLabelProps={{ shrink: true }}
            value={planningHorizonTo}
            onChange={(e) => setPlanningHorizonTo(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleContinue}
            fullWidth
            sx={{ mt: 2 }}
            disabled={
              !materialId ||
              !plant ||
              !version ||
              !planningHorizonFrom ||
              !planningHorizonTo
            }
          >
            Continue
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateProductionPlanInitial;
