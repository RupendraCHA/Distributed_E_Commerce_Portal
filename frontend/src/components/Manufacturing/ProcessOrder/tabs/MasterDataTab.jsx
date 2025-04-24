import React from 'react';
import { Grid, TextField } from '@mui/material';

const MasterDataTab = ({ formData, setFormData }) => {
  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <TextField
          label="Production Version"
          value={formData.productionVersion || ''}
          onChange={handleChange('productionVersion')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Explosion Date"
          type="date"
          value={formData.explosionDate || ''}
          onChange={handleChange('explosionDate')}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Recipe Group"
          value={formData.recipeGroup || ''}
          onChange={handleChange('recipeGroup')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Recipe"
          value={formData.recipe || ''}
          onChange={handleChange('recipe')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Change Number (Recipe)"
          value={formData.changeNumberRecipe || ''}
          onChange={handleChange('changeNumberRecipe')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Valid From (Recipe)"
          type="date"
          value={formData.validFromRecipe || ''}
          onChange={handleChange('validFromRecipe')}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Planner Group"
          value={formData.plannerGroup || ''}
          onChange={handleChange('plannerGroup')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Bill of Material"
          value={formData.bom || ''}
          onChange={handleChange('bom')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Alternative"
          value={formData.alternative || ''}
          onChange={handleChange('alternative')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Change Number (BOM)"
          value={formData.changeNumberBom || ''}
          onChange={handleChange('changeNumberBom')}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Valid From (BOM)"
          type="date"
          value={formData.validFromBom || ''}
          onChange={handleChange('validFromBom')}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );
};

export default MasterDataTab;
