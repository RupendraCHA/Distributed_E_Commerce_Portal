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

const GoodsReceiptList = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const [goodsReceipts, setGoodsReceipts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${server_Url}/api/v1/goods-receipts`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setGoodsReceipts(response.data);
      } catch (error) {
        console.error('Error fetching Goods Receipts:', error);
      }
    };

    fetchData();
  }, [server_Url, token]);

  return (
    <Container>
      <h2>Goods Receipt Orders</h2>

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
                'Purchase Order ID',
                'Supplier',
                'Document Date',
                'Material ID',
                'Material Name',
                'Ordered Qty',
                'Received Qty',
                'Unit',
                'Batch',
                'Stock Segment',
                'Storage Location',
                'Plant',
                'Movement Type',
                'Stock Type',
                'Goods Recipient',
                'Unloading Point',
                'Valuation Type',
                'Extended Amount',
                'Currency',
                'Actions',
              ].map((header) => (
                <TableCell
                  key={header}
                  style={{ minWidth: '120px', fontWeight: 'bold' }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {goodsReceipts.map((gr, index) =>
              gr.items.map((item, itemIndex) => (
                <TableRow key={`${gr._id}-${itemIndex}`}>
                  {itemIndex === 0 && (
                    <>
                      <TableCell rowSpan={gr.items.length}>
                        {index + 1}
                      </TableCell>
                      <TableCell rowSpan={gr.items.length}>
                        {gr.purchaseOrderId}
                      </TableCell>
                      <TableCell rowSpan={gr.items.length}>
                        {gr.supplierName} ({gr.supplierId})
                      </TableCell>
                      <TableCell rowSpan={gr.items.length}>
                        {gr.documentDate}
                      </TableCell>
                    </>
                  )}
                  <TableCell>{item.materialId}</TableCell>
                  <TableCell>{item.materialName}</TableCell>
                  <TableCell>{item.quantityOrdered}</TableCell>
                  <TableCell>{item.quantityReceived}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.batch || '-'}</TableCell>
                  <TableCell>{item.stockSegment || '-'}</TableCell>
                  <TableCell>{item.storageLocation || '-'}</TableCell>
                  <TableCell>{item.plant || '-'}</TableCell>
                  <TableCell>{item.movementType}</TableCell>
                  <TableCell>{item.stockType}</TableCell>
                  <TableCell>{item.goodsRecipient || '-'}</TableCell>
                  <TableCell>{item.unloadingPoint || '-'}</TableCell>
                  <TableCell>{item.valuationType || '-'}</TableCell>
                  <TableCell>{item.extendedAmount || '-'}</TableCell>
                  <TableCell>{item.currency}</TableCell>
                  {itemIndex === 0 && (
                    <TableCell rowSpan={gr.items.length}>
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
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Container>
  );
};

export default GoodsReceiptList;
