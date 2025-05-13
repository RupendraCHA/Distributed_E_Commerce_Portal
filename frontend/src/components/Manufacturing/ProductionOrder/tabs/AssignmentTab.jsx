import React from 'react';
import { Grid, TextField } from '@mui/material';

const AssignmentTab = ({ form, onChange }) => (
  <Grid container spacing={2}>
    {/* Responsibility */}
    <Grid item xs={12} sm={6}>
      <TextField
        label="MRP Controller"
        name="mrpController"
        value={form.mrpController || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Production Supervisor"
        name="productionSupervisor"
        value={form.productionSupervisor || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>

    {/* Plants */}
    <Grid item xs={12} sm={6}>
      <TextField
        label="Production Plant"
        name="productionPlant"
        value={form.productionPlant || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Planning Plant"
        name="planningPlant"
        value={form.planningPlant || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="MRP Area"
        name="mrpArea"
        value={form.mrpArea || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>

    {/* Assignments */}
    <Grid item xs={12} sm={6}>
      <TextField
        label="WBS Element"
        name="wbsElement"
        value={form.wbsElement || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Sales Order"
        name="salesOrder"
        value={form.salesOrder || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="BOM Explosion Number"
        name="bomExplosionNumber"
        value={form.bomExplosionNumber || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Planned Order"
        name="plannedOrder"
        value={form.plannedOrder || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Production Version"
        name="productionVersion"
        value={form.productionVersion || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Business Area"
        name="businessArea"
        value={form.businessArea || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Profit Center"
        name="profitCenter"
        value={form.profitCenter || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Functional Area"
        name="functionalArea"
        value={form.functionalArea || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Object Class"
        name="objectClass"
        value={form.objectClass || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Inspection Lot"
        name="inspectionLot"
        value={form.inspectionLot || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Run Schedule Header"
        name="runScheduleHeader"
        value={form.runScheduleHeader || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Revision Level"
        name="revisionLevel"
        value={form.revisionLevel || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Kanban Indicator"
        name="kanbanIndicator"
        value={form.kanbanIndicator || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
  </Grid>
);

export default AssignmentTab;
