import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Grid,
  Button,
  Typography,
  IconButton,
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  MenuItem,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateGLDocument = ({
  form: externalForm,
  setForm: setExternalForm,
  handleSubmit: externalSubmit,
}) => {
  const navigate = useNavigate();
  const isEdit = !!externalForm;
  const [glMasterData, setGlMasterData] = useState([]);
  const [glDataLoaded, setGlDataLoaded] = useState(false);

  const [form, setForm] = useState(
    externalForm || {
      documentDate: '',
      postingDate: '',
      currency: 'INR',
      reference: '',
      documentHeaderText: '',
      crossCCNumber: '',
      companyCode: '',
      companyName: '',
      totalDebit: 0,
      totalCredit: 0,
      items: [],
    }
  );

  useEffect(() => {
    if (externalForm) setForm(externalForm);
  }, [externalForm]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_SERVER_URL}/api/v1/gldocumentdata`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setGlMasterData(res.data);
        setGlDataLoaded(true);
      });
  }, []);

  const addItem = () => {
    const newItem = {
      glAccount: '',
      shortText: '',
      debitCreditIndicator: 'D',
      amountInDocCurrency: 0,
      localCurrencyAmount: 0,
      taxJurisdictionCode: '',
      assignment: '',
    };
    const updated = { ...form, items: [...form.items, newItem] };
    setForm(updated);
    if (setExternalForm) setExternalForm(updated);
  };

  const removeItem = (index) => {
    const updatedItems = [...form.items];
    updatedItems.splice(index, 1);
    const updated = { ...form, items: updatedItems };
    setForm(updated);
    if (setExternalForm) setExternalForm(updated);
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...form.items];
    updated[index][field] = value;
    const updatedForm = { ...form, items: updated };
    setForm(updatedForm);
    if (setExternalForm) setExternalForm(updatedForm);
  };

  const handleChange = (e) => {
    const updatedForm = { ...form, [e.target.name]: e.target.value };
    setForm(updatedForm);
    if (setExternalForm) setExternalForm(updatedForm);
  };

  const handleSubmit = async () => {
    if (externalSubmit) return externalSubmit();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_SERVER_URL}/api/v1/gldocuments`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      navigate('/accounting/gldocuments');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Typography variant="h5" mt={2}>
        {isEdit ? 'Edit' : 'Create'} GL Document
      </Typography>

      <Grid container spacing={2} mt={1}>
        {[
          'documentDate',
          'postingDate',
          'currency',
          'reference',
          'documentHeaderText',
          'crossCCNumber',
          'companyCode',
          'companyName',
          'totalDebit',
          'totalCredit',
        ].map((field) => (
          <Grid item xs={6} key={field}>
            <TextField
              fullWidth
              label={field}
              name={field}
              type={field.includes('Date') ? 'date' : 'text'}
              InputLabelProps={{ shrink: true }}
              value={
                field.includes('Date') && form[field]
                  ? form[field].split('T')[0]
                  : form[field]
              }
              onChange={handleChange}
            />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" mt={3}>
        Items
      </Typography>

      {glDataLoaded ? (
        <>
          <Table sx={{ mt: 2 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell>GL Account</TableCell>
                <TableCell>Short Text</TableCell>
                <TableCell>Debit/Credit</TableCell>
                <TableCell>Amount in Doc Currency</TableCell>
                <TableCell>Local Currency Amount</TableCell>
                <TableCell>Tax Jurisdiction Code</TableCell>
                <TableCell>Assignment</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {form.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ minWidth: 200 }}>
                    <Autocomplete
                      fullWidth
                      options={glMasterData}
                      getOptionLabel={(option) =>
                        `${option.G_L_Account} - ${option.shortText || ''}`
                      }
                      value={
                        glMasterData.find(
                          (gl) => `${gl.G_L_Account}` === `${item.glAccount}`
                        ) || null
                      }
                      onChange={(_, value) => {
                        if (!value) return;
                        const updatedItem = {
                          ...item,
                          glAccount: value.G_L_Account,
                          shortText: value.shortText || item.shortText,
                          taxJurisdictionCode:
                            value.taxJurisdictionCode ||
                            item.taxJurisdictionCode ||
                            '',
                          assignment: value.assignment || item.assignment || '',
                        };
                        const updatedItems = [...form.items];
                        updatedItems[index] = updatedItem;
                        const updatedForm = { ...form, items: updatedItems };
                        setForm(updatedForm);
                        if (setExternalForm) setExternalForm(updatedForm);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          label="GL Account"
                        />
                      )}
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      size="small"
                      fullWidth
                      value={item.shortText}
                      onChange={(e) =>
                        handleItemChange(index, 'shortText', e.target.value)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      select
                      size="small"
                      fullWidth
                      label="Debit/Credit"
                      value={item.debitCreditIndicator}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          'debitCreditIndicator',
                          e.target.value
                        )
                      }
                    >
                      <MenuItem value="D">Debit</MenuItem>
                      <MenuItem value="C">Credit</MenuItem>
                    </TextField>
                  </TableCell>

                  <TableCell>
                    <TextField
                      size="small"
                      fullWidth
                      type="number"
                      value={item.amountInDocCurrency}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          'amountInDocCurrency',
                          e.target.value
                        )
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      size="small"
                      fullWidth
                      type="number"
                      value={item.localCurrencyAmount}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          'localCurrencyAmount',
                          e.target.value
                        )
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      size="small"
                      fullWidth
                      value={item.taxJurisdictionCode}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          'taxJurisdictionCode',
                          e.target.value
                        )
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      size="small"
                      fullWidth
                      value={item.assignment}
                      onChange={(e) =>
                        handleItemChange(index, 'assignment', e.target.value)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <IconButton onClick={() => removeItem(index)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <Typography mt={2}>Loading GL master data...</Typography>
      )}

      <Button startIcon={<Add />} onClick={addItem} sx={{ mt: 2 }}>
        Add Item
      </Button>

      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        {isEdit ? 'Update' : 'Submit'}
      </Button>
    </Container>
  );
};

export default CreateGLDocument;
