// src/components/recipes/tabs/OperationsTab.jsx
import React from 'react';
import {
  Grid,
  TextField,
  IconButton,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const OperationsTab = ({ form, setForm }) => {
  const operations = form.operations || [];

  const handleOperationChange = (index, field, value) => {
    const updated = [...operations];
    updated[index][field] = value;
    setForm({ ...form, operations: updated });
  };

  const handleAddOperation = () => {
    const newOp = {
      operation: '',
      subOperation: '',
      resource: '',
      controlKey: '',
      description: '',
      baseQuantity: '',
      unit: '',
      validFrom: '',
      validTo: '',
      changeNumber: '',
    };
    setForm({ ...form, operations: [...operations, newOp] });
  };

  const handleDeleteOperation = (index) => {
    const updated = [...operations];
    updated.splice(index, 1);
    setForm({ ...form, operations: updated });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Operations</Typography>
      </Grid>

      <Grid item xs={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Operation</TableCell>
              <TableCell>Sub</TableCell>
              <TableCell>Resource</TableCell>
              <TableCell>Control Key</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Base Qty</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Valid From</TableCell>
              <TableCell>Valid To</TableCell>
              <TableCell>Change No.</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {operations.map((op, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    value={op.operation}
                    onChange={(e) =>
                      handleOperationChange(index, 'operation', e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={op.subOperation}
                    onChange={(e) =>
                      handleOperationChange(
                        index,
                        'subOperation',
                        e.target.value
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={op.resource}
                    onChange={(e) =>
                      handleOperationChange(index, 'resource', e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={op.controlKey}
                    onChange={(e) =>
                      handleOperationChange(index, 'controlKey', e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={op.description}
                    onChange={(e) =>
                      handleOperationChange(
                        index,
                        'description',
                        e.target.value
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={op.baseQuantity}
                    onChange={(e) =>
                      handleOperationChange(
                        index,
                        'baseQuantity',
                        e.target.value
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={op.unit}
                    onChange={(e) =>
                      handleOperationChange(index, 'unit', e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="date"
                    value={op.validFrom}
                    onChange={(e) =>
                      handleOperationChange(index, 'validFrom', e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="date"
                    value={op.validTo}
                    onChange={(e) =>
                      handleOperationChange(index, 'validTo', e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={op.changeNumber}
                    onChange={(e) =>
                      handleOperationChange(
                        index,
                        'changeNumber',
                        e.target.value
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteOperation(index)}
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
          onClick={handleAddOperation}
          variant="outlined"
        >
          Add Operation
        </Button>
      </Grid>
    </Grid>
  );
};

export default OperationsTab;
