import React from 'react';
import { Grid, TextField } from '@mui/material';

const GeneralTab = ({ form, onChange }) => {
  const quantities = form.quantities || {};
  const basicDates = form.basicDates || {};
  const scheduledDates = form.scheduledDates || {};
  const confirmedDates = form.confirmedDates || {};
  const floats = form.floats || {};
  const scheduling = form.scheduling || {};

  const handleNestedChange = (section, field, value) => {
    const updated = { ...form[section], [field]: value };
    onChange({ target: { name: section, value: updated } });
  };

  return (
    <Grid container spacing={2}>
      {/* Quantities */}
      <Grid item xs={12}>
        <h4>Quantities</h4>
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          label="Total Qty"
          value={quantities.order || ''}
          onChange={(e) =>
            handleNestedChange('quantities', 'order', e.target.value)
          }
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          label="Scrap Portion (%)"
          value={quantities.scrap || ''}
          onChange={(e) =>
            handleNestedChange('quantities', 'scrap', e.target.value)
          }
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          label="Delivered"
          value={quantities.delivered || ''}
          onChange={(e) =>
            handleNestedChange('quantities', 'delivered', e.target.value)
          }
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          label="Short/Exc. Rcpt"
          value={quantities.shortExcRcpt || ''}
          onChange={(e) =>
            handleNestedChange('quantities', 'shortExcRcpt', e.target.value)
          }
          fullWidth
        />
      </Grid>

      {/* Dates/Times */}
      <Grid item xs={12}>
        <h4>Dates/Times</h4>
      </Grid>
      {['release', 'start', 'end'].map((field) => (
        <Grid item xs={12} sm={4} key={field}>
          <TextField
            label={`Basic Date - ${
              field.charAt(0).toUpperCase() + field.slice(1)
            }`}
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            value={basicDates[field] || ''}
            onChange={(e) =>
              handleNestedChange('basicDates', field, e.target.value)
            }
            fullWidth
          />
        </Grid>
      ))}
      {['start', 'end'].map((field) => (
        <Grid item xs={12} sm={6} key={`scheduled-${field}`}>
          <TextField
            label={`Scheduled ${
              field.charAt(0).toUpperCase() + field.slice(1)
            }`}
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            value={scheduledDates[field] || ''}
            onChange={(e) =>
              handleNestedChange('scheduledDates', field, e.target.value)
            }
            fullWidth
          />
        </Grid>
      ))}
      {['start', 'end'].map((field) => (
        <Grid item xs={12} sm={6} key={`confirmed-${field}`}>
          <TextField
            label={`Confirmed ${
              field.charAt(0).toUpperCase() + field.slice(1)
            }`}
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            value={confirmedDates[field] || ''}
            onChange={(e) =>
              handleNestedChange('confirmedDates', field, e.target.value)
            }
            fullWidth
          />
        </Grid>
      ))}

      {/* Scheduling */}
      <Grid item xs={12}>
        <h4>Scheduling</h4>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Type"
          value={scheduling.type || ''}
          onChange={(e) =>
            handleNestedChange('scheduling', 'type', e.target.value)
          }
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Reduction"
          value={scheduling.reduction || ''}
          onChange={(e) =>
            handleNestedChange('scheduling', 'reduction', e.target.value)
          }
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Priority"
          value={scheduling.priority || ''}
          onChange={(e) =>
            handleNestedChange('scheduling', 'priority', e.target.value)
          }
          fullWidth
        />
      </Grid>

      {/* Floats */}
      <Grid item xs={12}>
        <h4>Floats</h4>
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          label="Sched. Margin Key"
          value={floats.schedMarginKey || ''}
          onChange={(e) =>
            handleNestedChange('floats', 'schedMarginKey', e.target.value)
          }
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          label="Float Before Production"
          value={floats.floatBefProdn || ''}
          onChange={(e) =>
            handleNestedChange('floats', 'floatBefProdn', e.target.value)
          }
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          label="Float After Production"
          value={floats.floatAftProdn || ''}
          onChange={(e) =>
            handleNestedChange('floats', 'floatAftProdn', e.target.value)
          }
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          label="Release Period"
          value={floats.releasePeriod || ''}
          onChange={(e) =>
            handleNestedChange('floats', 'releasePeriod', e.target.value)
          }
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default GeneralTab;
