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

const ProductionOrderSettlementList = () => {
  const [settlements, setSettlements] = useState([]);
  const navigate = useNavigate();
  const server_Url = import.meta.env.VITE_API_SERVER_URL;

  const fetchSettlements = async () => {
    try {
      const res = await axios.get(`${server_Url}/api/v1/settlements`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSettlements(res.data);
    } catch (err) {
      console.error('Failed to fetch settlements:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${server_Url}/api/v1/settlements/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchSettlements();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  useEffect(() => {
    fetchSettlements();
  }, []);

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={2}
      >
        <h2>Settlement Rules</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            navigate('/manufacturing/production-order-settlement/create')
          }
        >
          Create Settlement
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order</TableCell>
            <TableCell>Receiver</TableCell>
            <TableCell>%</TableCell>
            <TableCell>Equiv. No</TableCell>
            <TableCell>First Used</TableCell>
            <TableCell>Last Used</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {settlements.map((s) => (
            <TableRow key={s._id}>
              <TableCell>{s.orderNumber}</TableCell>
              <TableCell>{s.settlementReceiver}</TableCell>
              <TableCell>{s.percentage}</TableCell>
              <TableCell>{s.equivalenceNumber}</TableCell>
              <TableCell>{s.firstUsedDate?.slice(0, 10)}</TableCell>
              <TableCell>{s.lastUsedDate?.slice(0, 10)}</TableCell>
              <TableCell>
                <Box display="flex" gap={1}>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      navigate(
                        `/manufacturing/production-order-settlement/edit/${s._id}`
                      )
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(s._id)}
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

export default ProductionOrderSettlementList;
