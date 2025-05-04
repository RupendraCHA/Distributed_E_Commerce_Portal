import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Grid,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Add, Delete } from '@mui/icons-material';
import axios from 'axios';

const EditGoodsIssueWithTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const server_Url = import.meta.env.VITE_API_SERVER_URL;

  const [processOrder, setProcessOrder] = useState('');
  const [documentDate, setDocumentDate] = useState('');
  const [postingDate, setPostingDate] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get(`${server_Url}/api/v1/goods-issue/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { processOrder, documentDate, postingDate, items } = res.data;
        setProcessOrder(processOrder);
        setDocumentDate(documentDate?.slice(0, 10));
        setPostingDate(postingDate?.slice(0, 10));
        setItems(items);
      });
  }, [id]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleAddRow = () => {
    setItems([
      ...items,
      {
        matShortText: '',
        quantity: '',
        eun: '',
        storageLocation: '',
        batch: '',
        valuationType: '',
        stockType: '',
        plant: '',
        stockSegment: '',
      },
    ]);
  };

  const handleRemoveRow = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleSubmit = () => {
    const token = localStorage.getItem('token');
    axios
      .put(
        `${server_Url}/api/v1/goods-issue/${id}`,
        {
          processOrder,
          documentDate,
          postingDate,
          items,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        navigate('/manufacturing/goods-issue');
      })
      .catch((err) => console.error('Update error', err));
  };

  return (
    <Container>
      <h2 style={{ fontSize: '15px', fontWeight: 'bold', margin: '10px 0px' }}>
        Edit Goods Issue
      </h2>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Process Order"
            value={processOrder}
            onChange={(e) => setProcessOrder(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Document Date"
            type="date"
            value={documentDate}
            required
            onChange={(e) => setDocumentDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Posting Date"
            type="date"
            required
            value={postingDate}
            onChange={(e) => setPostingDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
      </Grid>

      <h4 style={{ marginTop: '30px' }}>Line Items</h4>

      <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
        <Table style={{ minWidth: '1800px' }}>
          <TableHead>
            <TableRow>
              {[
                'Mat. Short Text',
                'Qty',
                'EUN',
                'Storage Loc',
                'Batch',
                'Val Type',
                'Stock Type',
                'Plant',
                'Stock Segment',
                'Action',
              ].map((header) => (
                <TableCell key={header} style={{ fontWeight: 'bold' }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    value={item.matShortText}
                    onChange={(e) =>
                      handleItemChange(index, 'matShortText', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, 'quantity', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.eun}
                    onChange={(e) =>
                      handleItemChange(index, 'eun', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.storageLocation}
                    onChange={(e) =>
                      handleItemChange(index, 'storageLocation', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.batch}
                    onChange={(e) =>
                      handleItemChange(index, 'batch', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.valuationType}
                    onChange={(e) =>
                      handleItemChange(index, 'valuationType', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.stockType}
                    onChange={(e) =>
                      handleItemChange(index, 'stockType', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.plant}
                    onChange={(e) =>
                      handleItemChange(index, 'plant', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.stockSegment}
                    onChange={(e) =>
                      handleItemChange(index, 'stockSegment', e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleRemoveRow(index)}
                    disabled={items.length === 1}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Button onClick={handleAddRow} startIcon={<Add />} sx={{ mb: 2 }}>
        Add Row
      </Button>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={!processOrder || items.length === 0}
      >
        Update Goods Issue
      </Button>
    </Container>
  );
};

export default EditGoodsIssueWithTable;
