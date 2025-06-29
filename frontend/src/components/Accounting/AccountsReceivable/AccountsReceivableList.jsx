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
  Button,
} from '@mui/material';
import axios from 'axios';

const AccountReceivableList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [clearing, setClearing] = useState({}); // To track which transaction is being cleared

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(
        `${import.meta.env.VITE_API_SERVER_URL}/api/v1/accounts-receivable`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTransactions(res.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load receivable transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleClearAR = async (transactionId) => {
    try {
      setClearing((prev) => ({ ...prev, [transactionId]: true }));

      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_API_SERVER_URL}/api/v1/accounts-receivable/clear`,
        { orderId: transactionId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Refresh data after clearing
      fetchTransactions();
    } catch (err) {
      console.error("Error clearing AR:", err);
      alert("Failed to clear AR for this order.");
    } finally {
      setClearing((prev) => ({ ...prev, [transactionId]: false }));
    }
  };

  const totalAmount = transactions.reduce((sum, tx) => {
    const amount = typeof tx.amount === "string" ? parseFloat(tx.amount.replace("$", "")) : tx.amount || 0;
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Accounts Receivable Entries
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
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((tx) => (
              // <TableRow key={`${tx.transactionId}-${tx.itemIndex}`}>
              // <TableRow key={`${tx.transactionId || tx.orderId || 'unknown'}-${tx.itemIndex}`}>
              <TableRow key={`${tx.transactionId || tx.orderId || 'row'}-${tx.itemIndex}`}>


                <TableCell>{tx.name}</TableCell>
                <TableCell>{tx.transactionId}</TableCell>
                <TableCell>{tx.product}</TableCell>
                <TableCell>{tx.quantity}</TableCell>
                <TableCell>{tx.price || "$0.00"}</TableCell>
                <TableCell>{tx.amount || "$0.00"}</TableCell>
                <TableCell>{tx.date}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    disabled={clearing[tx.transactionId]}
                    // onClick={() => handleClearAR(tx.transactionId)}
                    onClick={() => handleClearAR(tx.orderId)}

                  >
                    {clearing[tx.transactionId] ? "Clearing..." : "Clear AR"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={5} align="right">
                <strong>Total Receivable</strong>
              </TableCell>
              <TableCell>
                <strong>${totalAmount.toFixed(2)}</strong>
              </TableCell>
              <TableCell colSpan={2} />
            </TableRow>
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

export default AccountReceivableList;
