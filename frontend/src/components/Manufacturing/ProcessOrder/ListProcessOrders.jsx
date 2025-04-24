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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListReceiptOrders = () => {
  const [orders, setOrders] = useState([]);
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`${server_Url}/api/v1/receipt-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data));
  }, []);

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={2}
      >
        <h2>Process Orders</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/manufacturing/process-orders/create')}
        >
          Create New
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Material ID</TableCell>
            <TableCell>Plant</TableCell>
            <TableCell>Storage Location</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Process Order Type</TableCell>
            <TableCell>Process Order</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.materialId}</TableCell>
              <TableCell>{row.plant}</TableCell>
              <TableCell>{row.storageLocation}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.unit}</TableCell>
              <TableCell>{row.processOrderType}</TableCell>
              <TableCell>{row.processOrder}</TableCell>
              <TableCell>
                <Button
                  onClick={() =>
                    navigate(`/manufacturing/process-orders/edit/${row._id}`)
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

export default ListReceiptOrders;
