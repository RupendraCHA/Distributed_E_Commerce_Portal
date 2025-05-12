// src/components/recipes/tabs/MaterialsTab.jsx
import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  IconButton,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const MaterialsTab = ({ form, setForm }) => {
  const materialAssignments = form.materials?.componentAssignments || [];

  const handleAssignmentChange = (index, field, value) => {
    const updated = [...materialAssignments];
    updated[index][field] = value;

    setForm({
      ...form,
      materials: {
        ...(form.materials || {}),
        componentAssignments: updated,
      },
    });
  };

  const handleAddAssignment = () => {
    const newAssignment = {
      material: '',
      operation: '',
      description: '',
      quantity: '',
      unit: '',
      itemText: '',
      itemNumber: '',
      bom: '',
      path: '',
      validFrom: '',
    };

    setForm({
      ...form,
      materials: {
        ...(form.materials || {}),
        componentAssignments: [...materialAssignments, newAssignment],
      },
    });
  };

  const handleDeleteAssignment = (index) => {
    const updated = [...materialAssignments];
    updated.splice(index, 1);

    setForm({
      ...form,
      materials: {
        ...(form.materials || {}),
        componentAssignments: updated,
      },
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Material Component Assignments</Typography>
      </Grid>

      <Grid item xs={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Material</TableCell>
              <TableCell>Operation</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Item Text</TableCell>
              <TableCell>Item #</TableCell>
              <TableCell>BOM</TableCell>
              <TableCell>Path</TableCell>
              <TableCell>Valid From</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materialAssignments.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    value={item.material}
                    onChange={(e) =>
                      handleAssignmentChange(index, 'material', e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.operation}
                    onChange={(e) =>
                      handleAssignmentChange(index, 'operation', e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.description}
                    onChange={(e) =>
                      handleAssignmentChange(
                        index,
                        'description',
                        e.target.value
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.quantity}
                    onChange={(e) =>
                      handleAssignmentChange(index, 'quantity', e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.unit}
                    onChange={(e) =>
                      handleAssignmentChange(index, 'unit', e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.itemText}
                    onChange={(e) =>
                      handleAssignmentChange(index, 'itemText', e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.itemNumber}
                    onChange={(e) =>
                      handleAssignmentChange(
                        index,
                        'itemNumber',
                        e.target.value
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.bom}
                    onChange={(e) =>
                      handleAssignmentChange(index, 'bom', e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.path}
                    onChange={(e) =>
                      handleAssignmentChange(index, 'path', e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="date"
                    value={item.validFrom}
                    onChange={(e) =>
                      handleAssignmentChange(index, 'validFrom', e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteAssignment(index)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>

      <Grid item xs={12}>
        <Button
          startIcon={<Add />}
          onClick={handleAddAssignment}
          variant="outlined"
        >
          Add Component
        </Button>
      </Grid>
    </Grid>
  );
};

export default MaterialsTab;
