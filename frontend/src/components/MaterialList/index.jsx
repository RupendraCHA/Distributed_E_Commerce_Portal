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

const MaterialList = () => {
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const token = localStorage.getItem('token');
  const [materials, setMaterials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${server_Url}/api/v1/getMaterialIds`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMaterials(res.data))
      .catch((err) => console.error('Error fetching materials:', err));
  }, []);

  const headers = [
    'S.No',
    'Item No',
    'Material ID',
    'Material Name',
    'Vendors',
    'Short Text',
    'Material Group',
    'Plant',
    'Storage Location',
    'Purchasing Group',
    'Requisitioner',
    'Tracking No',
    'Purchasing Org',
    'Agreement',
    'Item Info Record',
    'MPN Material',
    'Actions', // Added action column
  ];
  console.log({ materials })
  return (
    <Container>
      <Typography variant="h5" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
        Material Master
      </Typography>

      {/* Create Material Button */}
      <Button
        variant="contained"
        color="primary"
        style={{ float: 'right', marginBottom: '20px' }}
        onClick={() => navigate('/sourcing/materialMaster/create')}
      >
        Create
      </Button>

      <TableContainer component={Paper} sx={{ mt: 2, maxHeight: 500 }}>
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
            {materials.map((mat, index) => (
              <TableRow key={mat.materialId}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{mat.itemNo || '-'}</TableCell>
                <TableCell>{mat.materialId}</TableCell>
                <TableCell>{mat.materialName || '-'}</TableCell>
                <TableCell>
                  {Array.isArray(mat.suppliers) && mat.suppliers.length > 0
                    ? mat.suppliers.join(', ')
                    : '-'}
                </TableCell>
                <TableCell>{mat.shortText || '-'}</TableCell>
                <TableCell>{mat.materialGroup || '-'}</TableCell>
                <TableCell>{mat.plant || '-'}</TableCell>
                <TableCell>{mat.storageLocation || '-'}</TableCell>
                <TableCell>{mat.purchasingGroup || '-'}</TableCell>
                <TableCell>{mat.requisitioner || '-'}</TableCell>
                <TableCell>{mat.trackingNo || '-'}</TableCell>
                <TableCell>{mat.purchasingOrg || '-'}</TableCell>
                <TableCell>{mat.agreement || '-'}</TableCell>
                <TableCell>{mat.itemInfoRecord || '-'}</TableCell>
                <TableCell>{mat.mpnMaterial || '-'}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                      onClick={() =>
                        navigate(`/sourcing/materialMaster/edit/${mat._id}`)
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

export default MaterialList;
