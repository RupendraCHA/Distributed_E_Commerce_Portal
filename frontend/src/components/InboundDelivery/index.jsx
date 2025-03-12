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

const InboundDeliveryList = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const [inboundDeliveries, setInboundDeliveries] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get(`${server_Url}/api/v1/inbound-deliveries`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setInboundDeliveries(res.data))
      .catch((err) => console.error('Error fetching inbound deliveries:', err));
  }, []);

  return (
    <Container>
      <h2>Inbound Deliveries</h2>

      {/* Create New Inbound Delivery Button */}
      <Button
        variant="contained"
        color="primary"
        style={{ float: 'right', marginBottom: '10px' }}
        onClick={() => navigate('/sourcing/inbound-deliveries/create')}
      >
        Create
      </Button>

      {/* Inbound Deliveries Table */}
      <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
        <Table style={{ minWidth: '2200px' }}>
          <TableHead>
            <TableRow>
              {[
                'S.No',
                'Supplier',
                'Document Date',
                'Material ID',
                'Material Name',
                'Delivery Quantity',
                'Unit',
                'Storage Location',
                'Supplier Batch',
                'Gross Weight',
                'Volume',
                'Warehouse No',
                'Reference Document',
                'Putaway Quantity',
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
            {inboundDeliveries.map((delivery, index) =>
              delivery.items.map((item, itemIndex) => (
                <TableRow key={`${index}-${itemIndex}`}>
                  {itemIndex === 0 && (
                    <>
                      <TableCell rowSpan={delivery.items.length}>
                        {index + 1}
                      </TableCell>
                      <TableCell rowSpan={delivery.items.length}>
                        {delivery.supplierName} ({delivery.supplierId})
                      </TableCell>
                      <TableCell rowSpan={delivery.items.length}>
                        {delivery.documentDate}
                      </TableCell>
                    </>
                  )}
                  <TableCell>{item.materialId}</TableCell>
                  <TableCell>{item.materialName}</TableCell>
                  <TableCell>{item.deliveryQuantity}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.storageLocation || '-'}</TableCell>
                  <TableCell>{item.supplierBatch || '-'}</TableCell>
                  <TableCell>{item.grossWeight || '-'}</TableCell>
                  <TableCell>{item.volume || '-'}</TableCell>
                  <TableCell>{item.warehouseNo || '-'}</TableCell>
                  <TableCell>{item.referenceDocument || '-'}</TableCell>
                  <TableCell>{item.putawayQty || '-'}</TableCell>
                  {itemIndex === 0 && (
                    <TableCell rowSpan={delivery.items.length}>
                      <Tooltip title="Edit">
                        <IconButton
                          color="primary"
                          onClick={() =>
                            navigate(
                              `/sourcing/inbound-deliveries/edit/${delivery._id}`
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

export default InboundDeliveryList;
