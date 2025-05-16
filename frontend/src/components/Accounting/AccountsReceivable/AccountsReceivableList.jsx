import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from '@mui/material';
import axios from 'axios';

const AccountReceivableList = () => {
  const [documents, setDocuments] = useState([]);

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
      <Box mb={2}>
        <Typography variant="h5">Account Receivable Entries</Typography>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Company Code</TableCell>
            <TableCell>Item</TableCell>
            <TableCell>Key</TableCell>
            <TableCell>GL Account</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Currency</TableCell>
            <TableCell>Tx</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.map((doc) =>
            doc.items
              ?.filter((item) => item.debitCreditIndicator === 'D')
              .map((item, index) => (
                <TableRow key={`${doc._id}-${index}`}>
                  <TableCell>{doc.companyCode}</TableCell>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.debitCreditIndicator}</TableCell>
                  <TableCell>{item.glAccount}</TableCell>
                  <TableCell>{item.shortText}</TableCell>
                  <TableCell>{item.amountInDocCurrency}</TableCell>
                  <TableCell>{doc.currency}</TableCell>
                  <TableCell>{item.taxJurisdictionCode || '—'}</TableCell>
                </TableRow>
              ))
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AccountReceivableList;
