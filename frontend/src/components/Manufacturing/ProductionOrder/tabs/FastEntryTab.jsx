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
} from '@mui/material';

const FastEntryTab = ({ form, setForm }) => {
  const handleComponentChange = (index, field, value) => {
    const updated = [...(form.components || [])];
    updated[index][field] = value;
    setForm((prev) => ({ ...prev, components: updated }));
  };

  const handleAddRow = () => {
    const newComponent = {
      material: '',
      totalQty: 0,
      unit: '',
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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleAddRow}>
          Add Component
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Material</TableCell>
              <TableCell>Total Qty</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Plant</TableCell>
              <TableCell>Batch</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(form.components || []).map((comp, idx) => (
              <TableRow key={idx}>
                {['material', 'totalQty', 'unit', 'plant', 'batch'].map(
                  (field) => (
                    <TableCell key={field}>
                      <TextField
                        value={comp[field] || ''}
                        onChange={(e) =>
                          handleComponentChange(idx, field, e.target.value)
                        }
                        size="small"
                      />
                    </TableCell>
                  )
                )}
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
