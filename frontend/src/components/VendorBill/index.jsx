import React, { useEffect, useState } from 'react';
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  Paper,
  TableContainer,
  Typography,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VendorBillList = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const [vendorBills, setVendorBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${server_Url}/api/v1/vendor-bills`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setVendorBills(res.data);
      })
      .catch((err) => console.error('Error fetching vendor bills:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <Typography
        variant="h4"
        style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '10px' }}
      >
        Vendor Bills
      </Typography>

      <Button
        variant="contained"
        color="primary"
        style={{ float: 'right', marginBottom: '10px' }}
        onClick={() => navigate('/sourcing/vendor-bills/create')}
      >
        Create
      </Button>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        {loading ? (
          <Typography variant="h6" align="center" style={{ padding: '20px' }}>
            Loading vendor bills...
          </Typography>
        ) : vendorBills.length === 0 ? (
          <Typography variant="h6" align="center" style={{ padding: '20px' }}>
            No vendor bills available.
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Supplier Name</TableCell>
                <TableCell>Supplier ID</TableCell>
                <TableCell>Document Date</TableCell>
                <TableCell>Invoice Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Currency</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Tax Amount</TableCell>
                <TableCell>Reference</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendorBills.map((bill, index) => (
                <TableRow key={bill._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{bill.supplierName || 'N/A'}</TableCell>
                  <TableCell>{bill.supplierId || 'N/A'}</TableCell>
                  <TableCell>{bill.documentDate || 'N/A'}</TableCell>
                  <TableCell>{bill.basicData?.invoiceDate || 'N/A'}</TableCell>
                  <TableCell>{bill.basicData?.amount || 'N/A'}</TableCell>
                  <TableCell>{bill.details?.currency || 'N/A'}</TableCell>
                  <TableCell>{bill.payment?.paymentMethod || 'N/A'}</TableCell>
                  <TableCell>{bill.basicData?.taxAmount || 'N/A'}</TableCell>
                  <TableCell>{bill.basicData?.reference || 'N/A'}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        navigate(`/sourcing/vendor-bills/edit/${bill._id}`)
                      }
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Container>
  );
};

export default VendorBillList;
