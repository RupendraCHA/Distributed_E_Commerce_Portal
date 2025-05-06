import React from 'react';
import { Grid, TextField } from '@mui/material';

const MasterDataTab = ({ form, onChange }) => (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Production Version"
        name="productionVersion"
        value={form.productionVersion || ''}
        onChange={onChange}
        fullWidth
      />
    </Grid>

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
    <Grid item xs={12}>
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
  </Grid>
);

export default MasterDataTab;
