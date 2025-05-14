import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import { Edit, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GLDocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_SERVER_URL}/api/v1/gldocuments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => setDocuments(res.data));
  }, []);

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">GL Documents</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/accounting/gldocuments/create')}
        >
          Create Document
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Company Code</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>Document Date</TableCell>
            <TableCell>Posting Date</TableCell>
            <TableCell>Reference</TableCell>
            <TableCell>Currency</TableCell>
            <TableCell>Total Debit</TableCell>
            <TableCell>Total Credit</TableCell>
            <TableCell># Items</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc._id}>
              <TableCell>{doc.companyCode}</TableCell>
              <TableCell>{doc.companyName}</TableCell>
              <TableCell>{doc.documentDate?.split('T')[0]}</TableCell>
              <TableCell>{doc.postingDate?.split('T')[0]}</TableCell>
              <TableCell>{doc.reference}</TableCell>
              <TableCell>{doc.currency}</TableCell>
              <TableCell>{doc.totalDebit}</TableCell>
              <TableCell>{doc.totalCredit}</TableCell>
              <TableCell>{doc.items?.length || 0}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() =>
                    navigate(`/accounting/gldocuments/edit/${doc._id}`)
                  }
                >
                  <Edit />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default GLDocumentList;
