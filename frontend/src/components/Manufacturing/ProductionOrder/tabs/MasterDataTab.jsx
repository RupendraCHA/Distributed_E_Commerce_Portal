import React from 'react';
import { Grid, TextField } from '@mui/material';

const MasterDataTab = ({ form, onChange }) => (
  <Grid container spacing={2}>
    {/* Production Version */}
    <Grid item xs={12}>
      <h4>Production Version</h4>
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

    {/* Routing Section */}
    <Grid item xs={12}>
      <h4>Routing</h4>
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Group"
        name="routing.group"
        value={form.routing?.group || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Group Counter"
        name="routing.groupCounter"
        value={form.routing?.groupCounter || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="TL Type"
        name="routing.tlType"
        value={form.routing?.tlType || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Planner Group"
        name="routing.plannerGroup"
        value={form.routing?.plannerGroup || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Valid From"
        name="routing.validFrom"
        value={form.routing?.validFrom || ''}
        onChange={onChange}
        type="date"
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Valid To"
        name="routing.validTo"
        value={form.routing?.validTo || ''}
        onChange={onChange}
        type="date"
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Lot Size From"
        name="routing.lotSizeFrom"
        value={form.routing?.lotSizeFrom || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Lot Size To"
        name="routing.lotSizeTo"
        value={form.routing?.lotSizeTo || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Explosion Date"
        name="routing.explosionDate"
        value={form.routing?.explosionDate || ''}
        onChange={onChange}
        type="date"
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Change No."
        name="routing.changeNumber"
        value={form.routing?.changeNumber || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Line Hierarchy"
        name="routing.lineHierarchy"
        value={form.routing?.lineHierarchy || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="TL UoM"
        name="routing.tlUom"
        value={form.routing?.tlUom || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>

    {/* SAP ME Routing Section */}
    <Grid item xs={12}>
      <h4>SAP ME Routing</h4>
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        label="Production Site"
        name="sapMe.productionSite"
        value={form.sapMe?.productionSite || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        label="Routing"
        name="sapMe.routing"
        value={form.sapMe?.routing || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        label="Version"
        name="sapMe.version"
        value={form.sapMe?.version || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>

    {/* Bill of Material Section (just heading as per screenshot) */}
    <Grid item xs={12}>
      <h4>Bill of Material</h4>
    </Grid>
  </Grid>
);

export default MasterDataTab;
