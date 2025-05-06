import React from 'react';
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

const mockOrders = [
  {
    id: 1,
    material: '942',
    productionPlant: 'IB01',
    planningPlant: 'IB01',
    orderType: 'pp01',
    order: '100001',
  },
  // ...add more mock orders as needed
];

const ProductionOrder = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={2}
      >
        <h2>Production Orders</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/manufacturing/product-orders/create')}
        >
          Create Production Order
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order</TableCell>
            <TableCell>Material</TableCell>
            <TableCell>Production Plant</TableCell>
            <TableCell>Planning Plant</TableCell>
            <TableCell>Order Type</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.order}</TableCell>
              <TableCell>{order.material}</TableCell>
              <TableCell>{order.productionPlant}</TableCell>
              <TableCell>{order.planningPlant}</TableCell>
              <TableCell>{order.orderType}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  onClick={() =>
                    navigate(`/manufacturing/product-orders/edit/${order.id}`)
                  }
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

export default ProductionOrder;
