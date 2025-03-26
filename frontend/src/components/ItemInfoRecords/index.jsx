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

const ItemInfoRecords = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${server_Url}/api/v1/item-info-records`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => setRecords(res.data))
      .catch((err) => console.error('Error fetching item info records:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <Typography
        variant="h4"
        style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '10px' }}
      >
        Item Info Records
      </Typography>

      <Button
        variant="contained"
        color="primary"
        style={{ float: 'right', marginBottom: '10px' }}
        onClick={() => navigate('/sourcing/item-info-records/create')}
      >
        Create
      </Button>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        {loading ? (
          <Typography variant="h6" align="center" style={{ padding: '20px' }}>
            Loading records...
          </Typography>
        ) : records.length === 0 ? (
          <Typography variant="h6" align="center" style={{ padding: '20px' }}>
            No item info records available.
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell>Material</TableCell>
                <TableCell>Plant</TableCell>
                <TableCell>Purch. Org.</TableCell>
                <TableCell>Standard Qty</TableCell>
                <TableCell>Net Price</TableCell>
                <TableCell>Valid To</TableCell>
                <TableCell>Fixed</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((rec, index) => (
                <TableRow key={rec._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{rec.purchOrgData1?.supplier || 'N/A'}</TableCell>
                  <TableCell>{rec.purchOrgData1?.material || 'N/A'}</TableCell>
                  <TableCell>{rec.purchOrgData1?.plant || 'N/A'}</TableCell>
                  <TableCell>
                    {rec.purchOrgData1?.purchasingOrg || 'N/A'}
                  </TableCell>
                  <TableCell>
                    {rec.purchOrgData1?.standardQty || 'N/A'}
                  </TableCell>
                  <TableCell>{rec.purchOrgData1?.netPrice || 'N/A'}</TableCell>
                  <TableCell>{rec.purchOrgData1?.validTo || 'N/A'}</TableCell>
                  <TableCell>
                    {rec.sourceListOverview?.fixedItemInfoRecordId === rec._id
                      ? 'Yes'
                      : 'No'}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        navigate(`/sourcing/item-info-records/edit/${rec._id}`)
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

export default ItemInfoRecords;
