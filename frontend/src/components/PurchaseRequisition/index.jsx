// FRONTEND: React Component for Purchase Requisition List (With User Authentication)
// File: src/pages/PurchaseRequisitionList.jsx

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

const PurchaseRequisitionList = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const [requisitions, setRequisitions] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Retrieve user token

  useEffect(() => {
    axios
      .get(server_Url + '/api/v1/requisition', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setRequisitions(res.data));
  }, []);

  return (
    <Container>
      <h2>Purchase Requisitions</h2>
      <Button
        variant="contained"
        color="primary"
        style={{ float: 'right', marginBottom: '10px' }}
        onClick={() => navigate('/sourcing/create-requisition')}
      >
        Create
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell>Item No</TableCell>
            <TableCell>Material</TableCell>
            <TableCell>Short Text</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Delivery Date</TableCell>
            <TableCell>Material Group</TableCell>
            <TableCell>Plant</TableCell>
            <TableCell>Storage Location</TableCell>
            <TableCell>Purchasing Group</TableCell>
            <TableCell>Requisitioner</TableCell>
            <TableCell>Tracking No</TableCell>
            <TableCell>Vendor</TableCell>
            <TableCell>Fixed Vendor IS</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requisitions.map((req, index) =>
            req.materials.map((material, idx) => (
              <TableRow key={`${index}-${idx}`}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{material.itemNo || '-'}</TableCell>
                <TableCell>{material.materialName || '-'}</TableCell>
                <TableCell>{material.shortText || '-'}</TableCell>
                <TableCell>{material.quantity || '-'}</TableCell>
                <TableCell>{material.unit || '-'}</TableCell>
                <TableCell>{material.deliveryDate || '-'}</TableCell>
                <TableCell>{material.materialGroup || '-'}</TableCell>
                <TableCell>{material.plant || '-'}</TableCell>
                <TableCell>{material.storageLocation || '-'}</TableCell>
                <TableCell>{material.purchasingGroup || '-'}</TableCell>
                <TableCell>{material.requisitioner || '-'}</TableCell>
                <TableCell>{material.trackingNo || '-'}</TableCell>
                <TableCell>{material.vendor || '-'}</TableCell>
                <TableCell>{material.fixedVendorIS || '-'}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                      onClick={() =>
                        navigate(`/sourcing/edit-requisition/${req._id}`)
                      }
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default PurchaseRequisitionList;
