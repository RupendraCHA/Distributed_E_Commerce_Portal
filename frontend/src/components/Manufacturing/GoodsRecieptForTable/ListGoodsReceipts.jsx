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

const ListGoodsReceipts = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const server_Url = import.meta.env.VITE_API_SERVER_URL;

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`${server_Url}/api/v1/manufacture-goods-receipt`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setData(res.data));
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" my={2}>
        <h2>Goods Receipts</h2>
        <Button
          variant="contained"
          onClick={() => navigate('/manufacturing/goods-receipt/create')}
        >
          Create New
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Material</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Plant</TableCell>
            <TableCell>Posting Date</TableCell>
            <TableCell>Document Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.material}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.plant}</TableCell>
              <TableCell>{row.postingDate?.slice(0, 10)}</TableCell>
              <TableCell>{row.documentDate?.slice(0, 10)}</TableCell>
              <TableCell>
                <Button
                  onClick={() =>
                    navigate(`/manufacturing/goods-receipt/edit/${row._id}`)
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

export default ListGoodsReceipts;
