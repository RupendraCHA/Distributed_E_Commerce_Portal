import React, { useEffect, useState } from 'react';
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Paper,
  TableContainer,
  IconButton,
  Tooltip,
  Button,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BillOfMaterialList = () => {
  const [boms, setBoms] = useState([]);
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${server_Url}/api/v1/billofmaterial`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBoms(res.data))
      .catch((err) => console.error('Failed to fetch BOMs:', err));
  }, []);

  const headers = [
    'S.No',
    'Material Code',
    'Plant',
    'Alternative BOM',
    'Component Count',
    'Actions',
  ];

  return (
    <Container>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mt: 2 }}>
        Bill of Materials
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ float: 'right', mb: 2 }}
        onClick={() => navigate('/manufacturing/bill-of-material/create')}
      >
        Create BOM
      </Button>

      <TableContainer component={Paper}>
        <Table>
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
                <TableCell>{bom.components?.length || 0}</TableCell>
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
