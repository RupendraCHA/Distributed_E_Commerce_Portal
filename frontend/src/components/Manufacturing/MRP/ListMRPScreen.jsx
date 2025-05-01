import React, { useEffect, useState } from 'react';
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListMRPScreen = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const server_Url = import.meta.env.VITE_API_SERVER_URL;

  const fetchMRP = async () => {
    const res = await axios.get(`${server_Url}/api/v1/mrp`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setData(res.data);
  };

  useEffect(() => {
    fetchMRP();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${server_Url}/api/v1/mrp/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchMRP();
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ my: 2 }}>
        MRP Records
      </Typography>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => navigate('/manufacturing/mrp/create')}
      >
        Create New
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Material</TableCell>
            <TableCell>MRP Area</TableCell>
            <TableCell>Plant</TableCell>
            <TableCell>Items Count</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.materialName}</TableCell>
              <TableCell>{row.mrpArea}</TableCell>
              <TableCell>{row.plant}</TableCell>
              <TableCell>{row.items.length}</TableCell>
              <TableCell>
                <Button
                  onClick={() => navigate(`/manufacturing/mrp/edit/${row._id}`)}
                >
                  Edit
                </Button>
                <Button onClick={() => handleDelete(row._id)} color="error">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ListMRPScreen;
