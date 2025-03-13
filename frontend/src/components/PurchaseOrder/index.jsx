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
      <h1 style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '10px' }}>
        Purchase Orders
      </h1>

      {/* Create New Inbound Delivery Button */}
      <Button
        variant="contained"
        color="primary"
        style={{ float: 'right' }}
        onClick={() => navigate('/sourcing/purchase-orders/create')}
      >
        Create
      </Button>

      {/* Purchase Orders Table */}
      <div style={{ overflowX: 'auto', maxWidth: '100%', marginTop: '50px' }}>
        <Table style={{ minWidth: '2200px' }}>
          <TableHead>
            <TableRow>
              {[
                'S.No',
                'Supplier',
                'Document Date',
                'Material ID',
                'Material Name',
                'Short Text',
                'Material Group',
                'Quantity',
                'Unit',
                'Delivery Date',
                'Start Date',
                'End Date',
                'Plant',
                'Storage Location',
                'Batch',
                'Stock Segment',
                'Request Segment',
                'Requirement No',
                'Requisitioner',
                'Net Price',
                'Currency',
                'Tax Code',
                'Info Record',
                'Outline Agreement',
                'Issuing Storage Location',
                'Service Performer',
                'Revision Level',
                'Supplier Mat. No',
                'Supplier Subrange',
                'Supplier Batch',
                'Commodity Code',
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
                        {po.supplierName} ({po.supplierId})
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
                  <TableCell>{item.startDate || '-'}</TableCell>
                  <TableCell>{item.endDate || '-'}</TableCell>
                  <TableCell>{item.plant}</TableCell>
                  <TableCell>{item.storageLocation}</TableCell>
                  <TableCell>{item.batch || '-'}</TableCell>
                  <TableCell>{item.stockSegment || '-'}</TableCell>
                  <TableCell>{item.requestSegment || '-'}</TableCell>
                  <TableCell>{item.requirementNo || '-'}</TableCell>
                  <TableCell>{item.requisitioner || '-'}</TableCell>
                  <TableCell>{item.netPrice}</TableCell>
                  <TableCell>{item.currency}</TableCell>
                  <TableCell>{item.taxCode}</TableCell>
                  <TableCell>{item.infoRecord || '-'}</TableCell>
                  <TableCell>{item.outlineAgreement || '-'}</TableCell>
                  <TableCell>{item.issuingStorageLocation || '-'}</TableCell>
                  <TableCell>{item.servicePerformer || '-'}</TableCell>
                  <TableCell>{item.revisionLevel || '-'}</TableCell>
                  <TableCell>{item.supplierMatNo || '-'}</TableCell>
                  <TableCell>{item.supplierSubrange || '-'}</TableCell>
                  <TableCell>{item.supplierBatch || '-'}</TableCell>
                  <TableCell>{item.commodityCode || '-'}</TableCell>
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
