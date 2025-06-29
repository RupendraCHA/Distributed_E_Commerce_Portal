import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Box,
  Alert,
} from '@mui/material';
import axios from 'axios';

const AccountPayableList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          `${import.meta.env.VITE_API_SERVER_URL}/api/v1/accounts-payable`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTransactions(res.data || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load payable transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const totalAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Accounts Payable Entries
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={`${tx.transactionId}-${tx.itemIndex}`}>
                <TableCell>{tx.name}</TableCell>
                <TableCell>{tx.transactionId}</TableCell>
                <TableCell>{tx.product}</TableCell>
                <TableCell>{tx.quantity}</TableCell>
                <TableCell>${tx.price.toFixed(2)}</TableCell>
                <TableCell>${tx.amount.toFixed(2)}</TableCell>
                <TableCell>{tx.date}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={5} align="right">
                <strong>Total Payable</strong>
              </TableCell>
              <TableCell>
                <strong>${totalAmount.toFixed(2)}</strong>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

export default AccountPayableList;