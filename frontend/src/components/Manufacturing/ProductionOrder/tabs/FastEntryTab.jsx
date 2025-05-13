import React from 'react';
import {
  Grid,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
} from '@mui/material';

const FastEntryTab = ({ form, setForm }) => {
  const handleComponentChange = (index, field, value) => {
    const updated = [...(form.components || [])];
    updated[index][field] = value;
    setForm((prev) => ({ ...prev, components: updated }));
  };

  const handleAddRow = () => {
    const newComponent = {
      order: '',
      material: '',
      quantity: 0,
      unit: '',
      baseQuantity: 0,
      grQuantity: 0,
      salesOrder: '',
      salesOrderItem: '',
      sequence: '',
      plant: '',
      batch: '',
    };
    setForm((prev) => ({
      ...prev,
      components: [...(prev.components || []), newComponent],
    }));
  };

  const handleDeleteRow = (index) => {
    const updated = [...form.components];
    updated.splice(index, 1);
    setForm((prev) => ({ ...prev, components: updated }));
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Grid container spacing={2}>
      {/* Propagation Mode Dropdown */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Propagation Mode"
          name="propagationMode"
          value={form.propagationMode || ''}
          onChange={handleFieldChange}
          select
          fullWidth
        >
          <MenuItem value="MAN_PROP_022">
            MAN_PROP_022 Manual propagation of batch
          </MenuItem>
          <MenuItem value="AUTO_PROP">AUTO_PROP Automatic propagation</MenuItem>
        </TextField>
      </Grid>

      {/* Add Button */}
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleAddRow}>
          Add Component
        </Button>
      </Grid>

      {/* Table */}
      <Grid item xs={12}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Material</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Base Quantity</TableCell>
              <TableCell>GR Quantity</TableCell>
              <TableCell>Sales Order</TableCell>
              <TableCell>Sales Order Item</TableCell>
              <TableCell>Sequence</TableCell>
              <TableCell>Plant</TableCell>
              <TableCell>Batch</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(form.components || []).map((comp, idx) => (
              <TableRow key={idx}>
                {[
                  'order',
                  'material',
                  'quantity',
                  'unit',
                  'baseQuantity',
                  'grQuantity',
                  'salesOrder',
                  'salesOrderItem',
                  'sequence',
                  'plant',
                  'batch',
                ].map((field) => (
                  <TableCell key={field}>
                    <TextField
                      value={comp[field] || ''}
                      onChange={(e) =>
                        handleComponentChange(idx, field, e.target.value)
                      }
                      size="small"
                    />
                  </TableCell>
                ))}
                <TableCell>
                  <Button color="error" onClick={() => handleDeleteRow(idx)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default FastEntryTab;
