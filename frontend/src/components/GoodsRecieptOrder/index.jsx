import React, { useState, useEffect } from 'react';
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  Button,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoodsReceiptPOList = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const [goodsReceipts, setGoodsReceipts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get(`${server_Url}/api/v1/goods-receipts`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setGoodsReceipts(res.data));
  }, []);
  console.log({ goodsReceipts });
  return (
    <Container>
      <h2>Goods Receipt Purchase Orders</h2>

      <Button
        variant="contained"
        color="primary"
        style={{ float: 'right', marginBottom: '10px' }}
        onClick={() => navigate('/sourcing/goods-receipt-orders/create')}
      >
        Create
      </Button>

      <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
        <Table style={{ minWidth: '1800px' }}>
          <TableHead>
            <TableRow>
              {[
                'S.No',
                'Supplier',
                'Document Date',
                'Material ID',
                'Material Name',
                'Short Text',
                'Quantity',
                'Unit',
                'Plant',
                'Storage Location',
                'Movement Type',
                'Stock Type',
                'Goods Recipient',
                'Item OK',
                'Actions',
              ].map((header) => (
                <TableCell key={header} style={{ fontWeight: 'bold' }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {goodsReceipts.map((gr, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {gr.supplierName} ({gr.supplierId})
                </TableCell>
                <TableCell>{gr.documentDate}</TableCell>
                {gr?.items?.map((item) => (
                  <React.Fragment key={item.materialId}>
                    <TableCell>{item.materialId}</TableCell>
                    <TableCell>{item.materialName}</TableCell>
                    <TableCell>{item.shortText}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.plant}</TableCell>
                    <TableCell>{item.storageLocation}</TableCell>
                    <TableCell>{item.movementType}</TableCell>
                    <TableCell>{item.stockType}</TableCell>
                    <TableCell>{item.goodsRecipient}</TableCell>
                    <TableCell>{item.itemOK ? '✔' : '❌'}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton
                          color="primary"
                          onClick={() =>
                            navigate(
                              `/sourcing/goods-receipt-orders/edit/${gr._id}`
                            )
                          }
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </React.Fragment>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Container>
  );
};

export default GoodsReceiptPOList;
