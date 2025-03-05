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
            <TableCell>Materials</TableCell>
            <TableCell>Delivery Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requisitions.map((req, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {req.materials.map((material, idx) => (
                  <div key={idx}>
                    {material.materialName} ({material.quantity})
                  </div>
                ))}
              </TableCell>
              <TableCell>
                {req.materials.map((material, idx) => (
                  <div key={idx}>{material.deliveryDate}</div>
                ))}
              </TableCell>
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
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default PurchaseRequisitionList;
