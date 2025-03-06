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

const PurchaseOrderList = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get(server_Url + '/api/v1/purchase-orders', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPurchaseOrders(res.data));
  }, []);

  return (
    <Container>
      <h2>Purchase Orders</h2>

      {/* Create New Purchase Order Button */}
      <Button
        variant="contained"
        color="primary"
        style={{ float: 'right', marginBottom: '10px' }}
        onClick={() => navigate('/sourcing/purchase-orders/create')}
      >
        Create
      </Button>

      {/* Purchase Orders Table */}
      <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
        <Table style={{ minWidth: '1800px' }}>
          <TableHead>
            <TableRow>
              {[
                'S.No',
                'Vendor',
                'Document Date',
                'Material ID',
                'Material Name',
                'Short Text',
                'Material Group',
                'Quantity',
                'Unit',
                'Delivery Date',
                'Plant',
                'Storage Location',
                'Net Price',
                'Currency',
                'Tax Code',
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
            {purchaseOrders.map((po, index) =>
              po.items.map((item, itemIndex) => (
                <TableRow key={`${index}-${itemIndex}`}>
                  {itemIndex === 0 && (
                    <>
                      <TableCell rowSpan={po.items.length}>
                        {index + 1}
                      </TableCell>
                      <TableCell rowSpan={po.items.length}>
                        {po.vendorName} ({po.vendorId})
                      </TableCell>
                      <TableCell rowSpan={po.items.length}>
                        {po.documentDate}
                      </TableCell>
                    </>
                  )}
                  <TableCell>{item.materialId}</TableCell>
                  <TableCell>{item.materialName}</TableCell>
                  <TableCell>{item.shortText}</TableCell>
                  <TableCell>{item.materialGroup}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.deliveryDate}</TableCell>
                  <TableCell>{item.plant}</TableCell>
                  <TableCell>{item.storageLocation}</TableCell>
                  <TableCell>{item.netPrice}</TableCell>
                  <TableCell>{item.currency}</TableCell>
                  <TableCell>{item.taxCode}</TableCell>
                  {itemIndex === 0 && (
                    <TableCell rowSpan={po.items.length}>
                      <Tooltip title="Edit">
                        <IconButton
                          color="primary"
                          onClick={() =>
                            navigate(`/sourcing/purchase-orders/edit/${po._id}`)
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

export default PurchaseOrderList;
