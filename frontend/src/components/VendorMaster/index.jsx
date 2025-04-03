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

const VendorList = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${server_Url}/api/v1/vendor-master`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => setVendors(res.data))
      .catch((err) => console.error('Error fetching vendors:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 2 }}>
        Vendor Master
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ float: 'right', mb: 2 }}
        onClick={() => navigate('/sourcing/vendor-master/create')}
      >
        Create Vendor
      </Button>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        {loading ? (
          <Typography variant="h6" align="center" sx={{ p: 3 }}>
            Loading vendors...
          </Typography>
        ) : vendors.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ p: 3 }}>
            No vendors available.
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>S.No</strong>
                </TableCell>
                <TableCell>
                  <strong>Id</strong>
                </TableCell>
                <TableCell>
                  <strong>Vendor Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Country</strong>
                </TableCell>
                <TableCell>
                  <strong>City</strong>
                </TableCell>
                <TableCell>
                  <strong>Phone Number</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendors.map((vendor, index) => (
                <TableRow key={vendor._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{vendor.vendorAddress?.supplierid || 'N/A'}</TableCell>
                  <TableCell>{vendor.vendorAddress?.name || 'N/A'}</TableCell>
                  <TableCell>
                    {vendor.vendorAddress?.country || 'N/A'}
                  </TableCell>
                  <TableCell>{vendor.vendorAddress?.city || 'N/A'}</TableCell>
                  <TableCell>{vendor.contactPersons?.phone || 'N/A'}</TableCell>
                  <TableCell>{vendor.contactPersons?.email || 'N/A'}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        navigate(`/sourcing/vendor-master/edit/${vendor._id}`)
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

export default VendorList;
