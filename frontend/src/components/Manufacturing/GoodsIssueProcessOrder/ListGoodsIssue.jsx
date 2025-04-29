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
        <h2
          style={{ fontSize: '15px', fontWeight: 'bold', margin: '10px 0px' }}
        >
          Goods Issue Records
        </h2>
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
            <TableCell>Mat. Short Text</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Storage Location</TableCell>
            <TableCell>Posting Date</TableCell>
            <TableCell>Document Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {goodsIssues.map((issue) =>
            issue.items.map((item, index) => (
              <TableRow key={`${issue._id}-${index}`}>
                <TableCell>{issue.processOrder}</TableCell>
                <TableCell>{item.matShortText}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.storageLocation}</TableCell>
                <TableCell>
                  {new Date(issue.postingDate).toISOString().slice(0, 10)}
                </TableCell>
                <TableCell>
                  {new Date(issue.documentDate).toISOString().slice(0, 10)}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      navigate(`/manufacturing/goods-issue/edit/${issue._id}`)
                    }
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ListGoodsIssue;
