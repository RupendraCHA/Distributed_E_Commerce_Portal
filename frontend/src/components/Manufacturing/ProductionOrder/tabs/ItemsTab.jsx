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

const ItemsTab = ({ form, setForm }) => {
  const handleItemChange = (index, field, value) => {
    const updated = [...(form.items || [])];
    updated[index][field] = value;
    setForm((prev) => ({ ...prev, items: updated }));
  };

  const handleAddRow = () => {
    const newItem = {
      material: '',
      description: '',
      originalQty: 0,
      quantity: 0,
      confirmedQty: 0,
      grQty: 0,
      unit: '',
    };
    setForm((prev) => ({ ...prev, items: [...(prev.items || []), newItem] }));
  };

  const handleDeleteRow = (index) => {
    const updated = [...form.items];
    updated.splice(index, 1);
    setForm((prev) => ({ ...prev, items: updated }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleAddRow}>
          Add Item
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Material</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Original Qty</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Confirmed Qty</TableCell>
              <TableCell>GR Qty</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(form.items || []).map((item, idx) => (
              <TableRow key={idx}>
                {[
                  'material',
                  'description',
                  'originalQty',
                  'quantity',
                  'confirmedQty',
                  'grQty',
                  'unit',
                ].map((field) => (
                  <TableCell key={field}>
                    <TextField
                      value={item[field] || ''}
                      onChange={(e) =>
                        handleItemChange(idx, field, e.target.value)
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

export default ItemsTab;
