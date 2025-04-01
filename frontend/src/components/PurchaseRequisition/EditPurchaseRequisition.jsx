import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Autocomplete,
  IconButton,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
const CustomTextField = (props) => (
  <TextField fullWidth sx={{ minWidth: '120px' }} {...props} />
);
const EditPurchaseRequisition = () => {
  const { id } = useParams();
  const server_Url = import.meta.env.VITE_API_SERVER_URL;
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [requisition, setRequisition] = useState({ materials: [] });
  const token = localStorage.getItem('token');
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get(server_Url + '/api/v1/vendors-list', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setVendors(res.data))
      .catch((err) => console.error('Error fetching vendors:', err));
  }, []);

  useEffect(() => {
    axios
      .get(server_Url + '/api/v1/getMaterialIds', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMaterials(res.data));

    axios
      .get(`${server_Url}/api/v1/requisition/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const updatedMaterials = res.data.materials.map((material, index) => ({
          ...material,
          sNo: index + 1,
          itemNo: `ITM${String(index + 1).padStart(3, '0')}`,
        }));
        setRequisition({ ...res.data, materials: updatedMaterials });
      });
  }, [id]);

  const handleChange = async (index, field, value) => {
    const updatedMaterials = [...requisition.materials];
    updatedMaterials[index][field] = value;

    if (field === 'materialId') {
      const selectedMaterial = materials.find((p) => p.materialId === value);
      if (selectedMaterial) {
        updatedMaterials[index].materialName = selectedMaterial.materialName;
        updatedMaterials[index].shortText = selectedMaterial.shortText || '-';
        updatedMaterials[index].materialGroup = selectedMaterial.materialGroup || '-';
        updatedMaterials[index].itemNo = `ITM${String(index + 1).padStart(3, '0')}`;

        // ✅ Fetch fixed supplier for selected material
        try {
          const res = await axios.get(
            `${server_Url}/api/v1/item-info-records?material=${value}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const fixedRecord = res.data.find(
            (rec) => rec.sourceListOverview?.fixedItemInfoRecordId === rec._id
          );

          if (fixedRecord) {
            updatedMaterials[index].vendor = fixedRecord.purchOrgData1?.supplier || '';
            updatedMaterials[index].fixedVendorIS = 'Yes';
          } else {
            updatedMaterials[index].vendor = '';
            updatedMaterials[index].fixedVendorIS = 'No Fixed Vendor Found';
          }
        } catch (err) {
          console.error('Error fetching fixed vendor in edit mode:', err);
        }
      }
    }

    setRequisition({ ...requisition, materials: updatedMaterials });
  };


  const addRow = () => {
    setRequisition({
      ...requisition,
      materials: [
        ...requisition.materials,
        {
          sNo: requisition.materials.length + 1,
          status: '',
          itemNo: `ITM${String(requisition.materials.length + 1).padStart(
            3,
            '0'
          )}`,
          materialId: '',
          materialName: '',
          shortText: '',
          materialGroup: '',
          quantity: 1,
          unit: '',
          deliveryDate: '',
          plant: '',
          storageLocation: '',
          purchasingGroup: '',
          requisitioner: '',
          trackingNo: '',
          vendor: '',
          fixedVendorIS: '',
          readVendorSPG: '',
          splitIndicator: '',
          purchasingOrg: '',
          agreement: '',
          itemInfoRecord: '',
          mpnMaterial: '',
        },
      ],
    });
  };

  const removeRow = (index) => {
    const updatedMaterials = requisition.materials.filter(
      (_, i) => i !== index
    );
    setRequisition({
      ...requisition,
      materials: updatedMaterials.map((material, i) => ({
        ...material,
        sNo: i + 1,
        itemNo: `ITM${String(i + 1).padStart(3, '0')}`,
      })),
    });
  };

  const handleEditSave = () => {
    axios
      .put(`${server_Url}/api/v1/requisition/${id}`, requisition, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        navigate('/sourcing/purchase-requisitions');
      });
  };

  console.log('Requisition:', JSON.stringify(requisition, null, 2));

  return (
    <Container>
      <h2>Edit Purchase Requisition</h2>
      <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
        <Table style={{ minWidth: '1800px' }}>
          <TableHead>
            <TableRow>
              {[
                'S.No',
                'Item No',
                'Material ID',
                'Material Name',
                'Vendor',
                'Quantity',
                'Unit',
                'Status',
                'Delivery Date',
                'Fixed Vendor IS',
                'Read Vendor SPG',
                'Split Indicator',
                'Short Text',
                'Material Group',
                'Plant',
                'Storage Location',
                'Purchasing Group',
                'Requisitioner',
                'Tracking No',
                'Purchasing Organization',
                'Agreement',
                'Item Info Record',
                'MPN Material',
                'Action',
              ].map((header) => (
                <TableCell
                  key={header}
                  style={{ minWidth: '120px', fontWeight: 'bold' }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {requisition.materials.map((material, index) => (
              <TableRow key={index}>
                <TableCell>{material.sNo}</TableCell>
                <TableCell>
                  <CustomTextField value={material.itemNo} disabled fullWidth />
                </TableCell>
                <TableCell>
                  <Autocomplete
                    options={materials.map((p) => p.materialId)}
                    value={material.materialId}
                    onChange={(event, newValue) =>
                      handleChange(index, 'materialId', newValue)
                    }
                    renderInput={(params) => (
                      <CustomTextField {...params} label="Material ID" fullWidth />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <CustomTextField value={material.materialName} disabled fullWidth />
                </TableCell>
                <TableCell key="vendor">
                  <CustomTextField
                    fullWidth
                    value={material.vendor}
                    disabled
                  />
                </TableCell>


                {[
                  { key: 'quantity', type: 'number' },
                  { key: 'unit' },
                  { key: 'status' },
                  { key: 'deliveryDate', type: 'date' },
                  { key: 'fixedVendorIS' },
                  { key: 'readVendorSPG' },
                  { key: 'splitIndicator' },
                  { key: 'shortText', disabled: true },
                  { key: 'materialGroup', disabled: true },
                  { key: 'plant', disabled: true },
                  { key: 'storageLocation', disabled: true },
                  { key: 'purchasingGroup', disabled: true },
                  { key: 'requisitioner', disabled: true },
                  { key: 'trackingNo', disabled: true },
                  { key: 'purchasingOrg', disabled: true },
                  { key: 'agreement', disabled: true },
                  { key: 'itemInfoRecord', disabled: true },
                  { key: 'mpnMaterial', disabled: true },
                ].map(({ key, type, disabled }) => (
                  <TableCell key={key}>
                    <CustomTextField
                      type={type || 'text'}
                      value={material[key]}
                      onChange={(e) => handleChange(index, key, e.target.value)}
                      fullWidth
                      disabled={disabled}
                    />
                  </TableCell>
                ))}
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => removeRow(index)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Button
        startIcon={<Add />}
        onClick={addRow}
        variant="outlined"
        color="primary"
        style={{ marginTop: '10px' }}
      >
        Add Row
      </Button>
      <Button
        onClick={handleEditSave}
        variant="contained"
        color="primary"
        style={{ marginTop: '10px', marginLeft: '10px' }}
      >
        Save Purchase Order
      </Button>
    </Container>
  );
};

export default EditPurchaseRequisition;
