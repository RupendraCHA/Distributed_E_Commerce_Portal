import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';

const ConsumerAccounts = () => {
  const [consumers, setConsumers] = useState([]);
  const [selectedConsumerId, setSelectedConsumerId] = useState('');
  const [selectedConsumer, setSelectedConsumer] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchConsumers = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in to view consumers.');
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/api/consumers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const contentType = response.headers.get('content-type');
        if (!response.ok || !contentType.includes('application/json')) {
          const text = await response.text();
          throw new Error('Invalid response: ' + text);
        }

        const data = await response.json();
        setConsumers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConsumers();
  }, []);

  useEffect(() => {
    if (!selectedConsumerId) return;

    const fetchTransactions = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in to view transactions.');
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_SERVER_URL}/api/transactions/${selectedConsumerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const contentType = response.headers.get('content-type');
        if (!response.ok || !contentType.includes('application/json')) {
          const text = await response.text();
          throw new Error('Invalid response: ' + text);
        }

        const data = await response.json();

        const transformed = data.flatMap((tx) =>
          tx.items.map((item, index) => ({
            userId: tx.userId,
            transactionId: tx._id,
            productName: item.name,
            quantity: item.quantity,
            price: parseFloat(item.price.replace('$', '')),
            amount: item.quantity * parseFloat(item.price.replace('$', '')),
            date: new Date(tx.createdAt).toISOString().split('T')[0],
            itemIndex: index,
          }))
        );

        setTransactions(transformed);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [selectedConsumerId]);

  const handleConsumerChange = (event) => {
    const selectedId = event.target.value;
    const consumer = consumers.find((c) => c._id === selectedId);
    setSelectedConsumerId(selectedId);
    setSelectedConsumer(consumer || null);
    setTransactions([]);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Customers
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="consumer-select-label">Select Customer</InputLabel>
        <Select
          labelId="consumer-select-label"
          value={selectedConsumerId}
          label="Select Customer"
          onChange={handleConsumerChange}
          disabled={loading || consumers.length === 0}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {consumers.map((consumer) => (
            <MenuItem key={consumer._id} value={consumer._id}>
              {consumer.name || consumer.email}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedConsumer && (
        <Typography variant="h6" sx={{ mb: 2 }}>
          Showing transactions for: <strong>{selectedConsumer.name}</strong>
        </Typography>
      )}

      {loading && (
        <Box display="flex" justifyContent="center" sx={{ my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && selectedConsumerId && transactions.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Unit Price</TableCell>
                <TableCell align="right">Total Amount</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={`${tx.transactionId}-${tx.itemIndex}`}>
                  <TableCell>{tx.userId}</TableCell>
                  <TableCell>{tx.transactionId}</TableCell>
                  <TableCell>{tx.productName}</TableCell>
                  <TableCell align="right">{tx.quantity}</TableCell>
                  <TableCell align="right">${tx.price.toFixed(2)}</TableCell>
                  <TableCell align="right">${tx.amount.toFixed(2)}</TableCell>
                  <TableCell>{tx.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {!loading && selectedConsumerId && transactions.length === 0 && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No transactions found for this consumer.
        </Typography>
      )}
    </Container>
  );
};

export default ConsumerAccounts;
