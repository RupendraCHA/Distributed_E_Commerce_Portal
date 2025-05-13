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
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Edit } from '@mui/icons-material';
import axios from 'axios';

const ListGoodsReceipt = () => {
  const [goodsReceipts, setGoodsReceipts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_SERVER_URL
          }/api/v1/manufacture-goods-receipt`
        );
        setGoodsReceipts(res.data);
      } catch (err) {
        console.error('Error fetching goods receipts:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={2}
      >
        <h1
          style={{
            fontSize: '22px',
            fontWeight: 'bold',
            margin: '10px 0px 20px 0px',
          }}
        >
          Goods Receipt Records
        </h1>
        <Button
          variant="contained"
          onClick={() => navigate('/manufacturing/goods-receipt/create')}
        >
          Create New
        </Button>
      </Box>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Order Number</TableCell>
            <TableCell>Document Date</TableCell>
            <TableCell>Posting Date</TableCell>
            <TableCell>Delivery Note</TableCell>
            <TableCell>Header Text</TableCell>
            <TableCell>Total Items</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {goodsReceipts.map((receipt, index) => (
            <TableRow key={receipt._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{receipt.orderNumber}</TableCell>
              <TableCell>{receipt.documentDate?.substring(0, 10)}</TableCell>
              <TableCell>{receipt.postingDate?.substring(0, 10)}</TableCell>
              <TableCell>{receipt.deliveryNote}</TableCell>
              <TableCell>{receipt.headerText}</TableCell>
              <TableCell>{receipt.items?.length}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() =>
                    navigate(`/manufacturing/goods-receipt/edit/${receipt._id}`)
                  }
                >
                  <Edit />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ListGoodsReceipt;
