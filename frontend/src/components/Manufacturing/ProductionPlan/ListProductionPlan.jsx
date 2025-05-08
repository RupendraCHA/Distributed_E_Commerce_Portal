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
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductionPlanList = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_SERVER_URL}/api/v1/production-plans`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setPlans(res.data);
      } catch (err) {
        console.error('Failed to fetch production plans:', err);
      }
    };

    fetchPlans();
  }, []);

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={2}
      >
        <h2>Production Plan</h2>
        <Button
          component={Link}
          to="/manufacturing/production-plan/create"
          variant="contained"
          sx={{ mb: 2 }}
        >
          Create Production Plan
        </Button>
      </Box>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Material</TableCell>
            <TableCell>Plant</TableCell>
            <TableCell>Plan Qty</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Version</TableCell>
            <TableCell>Planning From</TableCell>
            <TableCell>Planning To</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {plans.map((plan) => (
            <TableRow key={plan._id}>
              <TableCell>{plan.material}</TableCell>
              <TableCell>{plan.plant}</TableCell>
              <TableCell>{plan.planQty}</TableCell>
              <TableCell>{plan.unit}</TableCell>
              <TableCell>{plan.version}</TableCell>
              <TableCell>{plan.planningHorizonFrom?.slice(0, 10)}</TableCell>
              <TableCell>{plan.planningHorizonTo?.slice(0, 10)}</TableCell>
              <TableCell>
                <Button
                  component={Link}
                  to={`/manufacturing/production-plan/edit/${plan._id}`}
                  variant="outlined"
                  size="small"
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ProductionPlanList;
