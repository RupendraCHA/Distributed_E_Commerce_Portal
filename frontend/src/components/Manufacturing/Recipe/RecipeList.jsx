// src/components/recipes/RecipeList.jsx
import React, { useEffect, useState } from 'react';
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const server_Url = import.meta.env.VITE_API_SERVER_URL;

  const fetchRecipes = async () => {
    try {
      const res = await axios.get(`${server_Url}/api/v1/recipes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setRecipes(res.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${server_Url}/api/v1/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchRecipes();
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={2}
      >
        <h2>Master Recipes</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/manufacturing/recipe/create')}
        >
          Create Recipe
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Material</TableCell>
            <TableCell>Plant</TableCell>
            <TableCell>Version</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recipes.map((recipe) => (
            <TableRow key={recipe._id}>
              <TableCell>{recipe.material}</TableCell>
              <TableCell>{recipe.plant}</TableCell>
              <TableCell>{recipe.prodVersion}</TableCell>
              <TableCell>{recipe.status}</TableCell>
              <TableCell>
                <Box display="flex" gap={1}>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      navigate(`/manufacturing/recipe/edit/${recipe._id}`)
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(recipe._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default RecipeList;
