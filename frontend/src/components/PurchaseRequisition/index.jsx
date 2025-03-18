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
  TableContainer,
  Paper,
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
      <h1 style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '10px' }}>
        Purchase Requisitions
      </h1>

      {/* Create New Inbound Delivery Button */}
      <Button
        variant="contained"
        color="primary"
        style={{ float: 'right' }}
        onClick={() => navigate('/sourcing/create-requisition')}
      >
        Create
      </Button>

      {/* Scrollable Table Container */}
      <TableContainer
        component={Paper}
        style={{ maxHeight: '500px', overflowY: 'auto', marginTop: '50px' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Status</TableCell>
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
              <TableCell>Read Vendor SPG</TableCell>
              <TableCell>Split Indicator (SPIt)</TableCell>
              <TableCell>Purchasing Organization (POrg)</TableCell>
              <TableCell>Agreement</TableCell>
              <TableCell>Item Info Record</TableCell>
              <TableCell>MPN Material</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requisitions.map((req, index) => (
              <TableRow key={req._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{req.status || '-'}</TableCell>
                {[
                  { key: 'itemNo' },
                  { key: 'materialName' },
                  { key: 'shortText' },
                  { key: 'quantity' },
                  { key: 'unit', defaultValue: '-' },
                  { key: 'deliveryDate' },
                  { key: 'materialGroup' },
                  { key: 'plant', defaultValue: '-' },
                  { key: 'storageLocation', defaultValue: '-' },
                  { key: 'purchasingGroup', defaultValue: '-' },
                  { key: 'requisitioner', defaultValue: '-' },
                  { key: 'trackingNo', defaultValue: '-' },
                  { key: 'vendor', defaultValue: '-' },
                  { key: 'fixedVendorIS', defaultValue: '-' },
                  { key: 'readVendorSPG', defaultValue: '-' },
                  { key: 'splitIndicator', defaultValue: '-' },
                  { key: 'purchasingOrg', defaultValue: '-' },
                  { key: 'agreement', defaultValue: '-' },
                  { key: 'itemInfoRecord', defaultValue: '-' },
                  { key: 'mpnMaterial', defaultValue: '-' },
                ].map(({ key, defaultValue }) => (
                  <TableCell key={key}>
                    {req.materials.map((mat) => (
                      <div key={mat.materialId}>{mat[key] || defaultValue}</div>
                    ))}
                  </TableCell>
                ))}
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
      </TableContainer>
    </Container>
  );
};

export default PurchaseRequisitionList;
