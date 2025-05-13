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

const ProductionOrderList = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const server_Url = import.meta.env.VITE_API_SERVER_URL;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${server_Url}/api/v1/production-orders`);
      setOrders(res.data);
    } catch (error) {
      console.error('Error fetching production orders:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${server_Url}/api/v1/production-orders/${id}`);
      fetchOrders(); // Refresh the list
    } catch (error) {
      console.error('Error deleting production order:', error);
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
            <TableCell>Status</TableCell>
            <TableCell>Start</TableCell>
            <TableCell>End</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order.order}</TableCell>
              <TableCell>{order.material}</TableCell>
              <TableCell>{order.productionPlant}</TableCell>
              <TableCell>{order.planningPlant}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.basicDates?.start}</TableCell>
              <TableCell>{order.basicDates?.end}</TableCell>
              <TableCell>
                <Box display="flex" gap={1}>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      navigate(
                        `/manufacturing/product-orders/edit/${order._id}`
                      )
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(order._id)}
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

export default ProductionOrderList;
