import React, { useEffect, useState } from 'react';
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VendorAgreementList = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const [agreements, setAgreements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${server_Url}/api/v1/vendor-agreements`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => setAgreements(res.data));
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 2 }}>
        Vendor Agreements
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ float: 'right', mb: 2 }}
        onClick={() => navigate('/sourcing/vendor-agreements/create')}
      >
        Create Agreement
      </Button>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>S.No</strong>
              </TableCell>
              <TableCell>
                <strong>Supplier</strong>
              </TableCell>
              <TableCell>
                <strong>Agreement Type</strong>
              </TableCell>
              <TableCell>
                <strong>Agreement Date</strong>
              </TableCell>
              <TableCell>
                <strong>Company Code</strong>
              </TableCell>
              <TableCell>
                <strong>Validity</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agreements.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.initial?.supplier}</TableCell>
                <TableCell>{item.initial?.agreementType}</TableCell>
                <TableCell>{item.initial?.agreementDate}</TableCell>
                <TableCell>{item.header?.companyCode}</TableCell>
                <TableCell>
                  {item.header?.validityStart} to {item.header?.validityEnd}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() =>
                      navigate(`/sourcing/vendor-agreements/edit/${item._id}`)
                    }
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default VendorAgreementList;
