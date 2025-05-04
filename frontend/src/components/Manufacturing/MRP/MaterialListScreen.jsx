import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import axios from 'axios';

const MaterialListScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const server_Url = import.meta.env.VITE_API_SERVER_URL;

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (state?.items) {
      setRows(state.items);
    }
  }, [state]);

  const handleRowChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        materialName: '',
        mrpCn: '',
        ne: true,
        stckDS: '',
        firstRDS: '',
        secondR: '',
        plantStock: '',
        bun: '',
        safetyStock: '',
        reorderPoint: '',
        mtype: '',
        pt: '',
        sp: '',
        abcIndicator: '',
        mrpGroup: '',
        mt: '',
        cde: '',
      },
    ]);
  };

  const removeRow = (index) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated);
  };

  const handleSubmit = async () => {
    const payload = { ...state, items: rows };

    try {
      if (payload._id) {
        await axios.put(`${server_Url}/api/v1/mrp/${payload._id}`, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      } else {
        await axios.post(`${server_Url}/api/v1/mrp`, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      }
      navigate('/manufacturing/mrp');
    } catch (error) {
      console.error('Failed to save MRP', error);
    }
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ my: 2 }}>
        Planning Result: Material List
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            label="Material"
            value={state?.materialName || ''}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="MRP Area"
            value={state?.mrpArea || ''}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Plant"
            value={state?.plant || ''}
            fullWidth
            disabled
          />
        </Grid>
      </Grid>

      <Button variant="contained" onClick={addRow} sx={{ my: 2 }}>
        Add Row
      </Button>

      <Paper sx={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 1500 }}>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  'Material',
                  'MRP Cn',
                  'NE',
                  'StckDS',
                  '1st RDS',
                  '2nd R',
                  'Plant stock',
                  'BUn',
                  'Safety Stock',
                  'Reorder Point',
                  'MType',
                  'PT',
                  'SP',
                  'ABC',
                  'MRP Group',
                  'MT',
                  'Cde',
                  '',
                ].map((h) => (
                  <TableCell key={h}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i}>
                  {[
                    'materialName',
                    'mrpCn',
                    'ne',
                    'stckDS',
                    'firstRDS',
                    'secondR',
                    'plantStock',
                    'bun',
                    'safetyStock',
                    'reorderPoint',
                    'mtype',
                    'pt',
                    'sp',
                    'abcIndicator',
                    'mrpGroup',
                    'mt',
                    'cde',
                  ].map((field) => (
                    <TableCell key={field}>
                      <TextField
                        value={row[field]}
                        onChange={(e) =>
                          handleRowChange(i, field, e.target.value)
                        }
                        variant="outlined"
                        sx={{ width: '100%', minWidth: '100px' }}
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    <IconButton onClick={() => removeRow(i)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Paper>

      <Button
        variant="contained"
        color="success"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        {state?._id ? 'Update MRP' : 'Save MRP'}
      </Button>
    </Container>
  );
};

export default MaterialListScreen;
