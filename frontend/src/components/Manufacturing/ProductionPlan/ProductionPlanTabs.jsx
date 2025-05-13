import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Grid,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const ProductionPlanTabs = ({ form, setForm, disabledMaterial = false }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_, newValue) => setTabIndex(newValue);

  const handleLineChange = (index, field, value) => {
    const updated = [...form.scheduleLines];
    updated[index][field] = value;
    setForm({ ...form, scheduleLines: updated });
  };

  const handleAddLine = () => {
    const newLine = {
      requirementDate: '',
      plannedQty: '',
      valueINR: '',
      pricePerUnit: '',
    };
    setForm({
      ...form,
      scheduleLines: [...(form.scheduleLines || []), newLine],
    });
  };

  const handleRemoveLine = (index) => {
    const updated = [...form.scheduleLines];
    updated.splice(index, 1);
    setForm({ ...form, scheduleLines: updated });
  };

  return (
    <>
      <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="General Info" />
        <Tab label="Item Details" />
        <Tab label="Schedule Lines" />
      </Tabs>

      {/* Tab 1: General Info */}
      {tabIndex === 0 && (
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Material"
                value={`${form.materialName || ''} (${form.material || ''})`}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Plant"
                value={form.plant}
                onChange={(e) => setForm({ ...form, plant: e.target.value })}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Version"
                value={form.version}
                onChange={(e) => setForm({ ...form, version: e.target.value })}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                type="date"
                label="Planning From"
                InputLabelProps={{ shrink: true }}
                value={form.planningHorizonFrom}
                onChange={(e) =>
                  setForm({ ...form, planningHorizonFrom: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                type="date"
                label="Planning To"
                InputLabelProps={{ shrink: true }}
                value={form.planningHorizonTo}
                onChange={(e) =>
                  setForm({ ...form, planningHorizonTo: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Tab 2: Item Details */}
      {tabIndex === 1 && (
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Short Text"
                value={form.shortText || ''}
                onChange={(e) =>
                  setForm({ ...form, shortText: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="MRP Type"
                value={form.mrpType || ''}
                onChange={(e) => setForm({ ...form, mrpType: e.target.value })}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Strategy Group"
                value={form.strategyGroup || ''}
                onChange={(e) =>
                  setForm({ ...form, strategyGroup: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Plan Qty"
                value={form.planQty || ''}
                onChange={(e) => setForm({ ...form, planQty: e.target.value })}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Unit"
                value={form.unit || ''}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Requirement Type"
                value={form.requirementType || ''}
                onChange={(e) =>
                  setForm({ ...form, requirementType: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Tab 3: Schedule Lines */}
      {tabIndex === 2 && (
        <Box>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Requirement Date</TableCell>
                <TableCell>Planned Qty</TableCell>
                <TableCell>Value (INR)</TableCell>
                <TableCell>Price Per Unit</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {form.scheduleLines?.map((line, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      value={line.requirementDate}
                      onChange={(e) =>
                        handleLineChange(
                          index,
                          'requirementDate',
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={line.plannedQty}
                      onChange={(e) =>
                        handleLineChange(index, 'plannedQty', e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={line.valueINR}
                      onChange={(e) =>
                        handleLineChange(index, 'valueINR', e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={line.pricePerUnit}
                      onChange={(e) =>
                        handleLineChange(index, 'pricePerUnit', e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRemoveLine(index)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button startIcon={<Add />} onClick={handleAddLine} sx={{ mt: 2 }}>
            Add Line
          </Button>
        </Box>
      )}
    </>
  );
};

export default ProductionPlanTabs;
