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

const ListGoodsIssue = () => {
  const [goodsIssues, setGoodsIssues] = useState([]);
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`${server_Url}/api/v1/goods-issue`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setGoodsIssues(res.data));
  }, []);

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={2}
      >
        <h2>Goods Issue Records</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/manufacturing/goods-issue/create')}
        >
          Create New
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Process Order</TableCell>
            <TableCell>Material</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Storage Location</TableCell>
            <TableCell>Posting Date</TableCell>
            <TableCell>Document Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {goodsIssues.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.processOrder}</TableCell>
              <TableCell>{row.material}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.storageLocation}</TableCell>
              <TableCell>{row.postingDate?.slice(0, 10)}</TableCell>
              <TableCell>{row.documentDate?.slice(0, 10)}</TableCell>
              <TableCell>
                <Button
                  onClick={() =>
                    navigate(`/manufacturing/goods-issue/edit/${row._id}`)
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

export default ListGoodsIssue;
