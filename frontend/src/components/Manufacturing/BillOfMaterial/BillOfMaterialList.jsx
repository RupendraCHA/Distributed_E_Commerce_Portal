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
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BillOfMaterialList = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const token = localStorage.getItem('token');
  const [boms, setBoms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${server_Url}/api/v1/billofmaterial`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBoms(res.data))
      .catch((err) => console.error('Error fetching BOMs:', err));
  }, []);

  const headers = [
    'S.No',
    'Material Code',
    'Plant',
    'Alternative BOM',
    'BOM Usage',
    'Base Quantity',
    'Unit',
    'Validity Start',
    'Validity End',
    'Status',
    'Lot Size',
    'Revision Level',
    'Group',
    'Group Counter',
    'Component',
    'Component Description',
    'Quantity',
    'Comp Unit',
    'Operation',
    'Actions',
  ];

  return (
    <Container>
      <Typography variant="h5" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
        Bill of Materials
      </Typography>

      <Button
        variant="contained"
        color="primary"
        style={{ float: 'right', marginBottom: '20px' }}
        onClick={() => navigate('/manufacturing/bill-of-material/create')}
      >
        Create
      </Button>

      <TableContainer component={Paper} sx={{ mt: 2, maxHeight: 500 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header} sx={{ fontWeight: 'bold' }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {boms.map((bom, index) => (
              <TableRow key={bom._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{bom.materialCode}</TableCell>
                <TableCell>{bom.plant}</TableCell>
                <TableCell>{bom.alternativeBOM}</TableCell>
                <TableCell>{bom.bomUsage}</TableCell>
                <TableCell>{bom.baseQuantity}</TableCell>
                <TableCell>{bom.unit}</TableCell>
                <TableCell>{bom.validityStart}</TableCell>
                <TableCell>{bom.validityEnd}</TableCell>
                <TableCell>{bom.status}</TableCell>
                <TableCell>{bom.lotSize}</TableCell>
                <TableCell>{bom.revisionLevel}</TableCell>
                <TableCell>{bom.group}</TableCell>
                <TableCell>{bom.groupCounter}</TableCell>
                <TableCell>{bom.component}</TableCell>
                <TableCell>{bom.componentDescription}</TableCell>
                <TableCell>{bom.quantity}</TableCell>
                <TableCell>{bom.compUnit}</TableCell>
                <TableCell>{bom.operation}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                      onClick={() =>
                        navigate(
                          `/manufacturing/bill-of-material/edit/${bom._id}`
                        )
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

export default BillOfMaterialList;
