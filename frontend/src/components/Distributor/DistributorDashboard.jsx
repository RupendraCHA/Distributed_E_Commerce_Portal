// import { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   CardHeader,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Tabs,
//   Tab,
// } from '@mui/material';
// import axios from 'axios';

// const DistributorDashboard = () => {
//   const [activeTab, setActiveTab] = useState(0);
//   const [profile, setProfile] = useState(null);
//   const [warehouses, setWarehouses] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [dialogOpen, setDialogOpen] = useState({
//     warehouse: false,
//     product: false,
//     inventory: false,
//   });
//   const [formData, setFormData] = useState({
//     warehouse: { name: '', address: '', contactNumber: '' },
//     product: { productId: '', price: '' },
//     inventory: { warehouseId: '', productId: '', quantity: '' },
//   });

//   // Fetch distributor profile
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get('/distributor/profile');
//         setProfile(response.data);
//         setWarehouses(response.data.warehouses);
//         setProducts(response.data.products);
//       } catch (error) {
//         console.error('Failed to fetch profile', error);
//       }
//     };
//     fetchProfile();
//   }, []);

//   // Handle Tab Change
//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   // Add Warehouse
//   const handleAddWarehouse = async () => {
//     try {
//       const response = await axios.post(
//         '/distributor/warehouses',
//         formData.warehouse
//       );
//       setWarehouses(response.data);
//       setDialogOpen({ ...dialogOpen, warehouse: false });
//       setFormData({
//         ...formData,
//         warehouse: { name: '', address: '', contactNumber: '' },
//       });
//     } catch (error) {
//       console.error('Failed to add warehouse', error);
//     }
//   };

//   // Add Product
//   const handleAddProduct = async () => {
//     try {
//       const response = await axios.post('/distributor/products', {
//         productId: formData.product.productId,
//         price: parseFloat(formData.product.price),
//       });
//       setProducts(response.data);
//       setDialogOpen({ ...dialogOpen, product: false });
//       setFormData({ ...formData, product: { productId: '', price: '' } });
//     } catch (error) {
//       console.error('Failed to add product', error);
//     }
//   };

//   // Add Inventory
//   const handleAddInventory = async () => {
//     try {
//       const { warehouseId, productId, quantity } = formData.inventory;
//       await axios.post(`/distributor/warehouses/${warehouseId}/inventory`, {
//         productId,
//         quantity: parseInt(quantity),
//       });
//       const response = await axios.get('/distributor/profile');
//       setWarehouses(response.data.warehouses);
//       setDialogOpen({ ...dialogOpen, inventory: false });
//       setFormData({
//         ...formData,
//         inventory: { warehouseId: '', productId: '', quantity: '' },
//       });
//     } catch (error) {
//       console.error('Failed to add inventory', error);
//     }
//   };

//   // Update Product Price
//   const handleUpdateProductPrice = async (productId, newPrice) => {
//     try {
//       await axios.put(`/distributor/products/${productId}`, {
//         price: newPrice,
//       });
//       const response = await axios.get('/distributor/profile');
//       setProducts(response.data.products);
//     } catch (error) {
//       console.error('Failed to update product price', error);
//     }
//   };

//   return (
//     <Box sx={{ width: '100%', typography: 'body1' }}>
//       <Tabs value={activeTab} onChange={handleTabChange} centered>
//         <Tab label="Profile" />
//         <Tab label="Warehouses" />
//         <Tab label="Products" />
//       </Tabs>

//       {/* Profile Tab */}
//       {activeTab === 0 && (
//         <Card>
//           <CardHeader title="Company Profile" />
//           <CardContent>
//             {profile && (
//               <>
//                 <Typography>Company Name: {profile.companyName}</Typography>
//                 <Typography>Contact Person: {profile.contactPerson}</Typography>
//                 <Typography>Distributor ID: {profile.distributorId}</Typography>
//               </>
//             )}
//           </CardContent>
//         </Card>
//       )}

//       {/* Warehouses Tab */}
//       {activeTab === 1 && (
//         <Card>
//           <CardHeader
//             title="Warehouses"
//             action={
//               <Button
//                 onClick={() =>
//                   setDialogOpen({ ...dialogOpen, warehouse: true })
//                 }
//               >
//                 Add Warehouse
//               </Button>
//             }
//           />
//           <CardContent>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Name</TableCell>
//                     <TableCell>Address</TableCell>
//                     <TableCell>Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {warehouses.map((warehouse) => (
//                     <TableRow key={warehouse._id}>
//                       <TableCell>{warehouse.name}</TableCell>
//                       <TableCell>{warehouse.address}</TableCell>
//                       <TableCell>
//                         <Button
//                           onClick={() => {
//                             setFormData({
//                               ...formData,
//                               inventory: {
//                                 ...formData.inventory,
//                                 warehouseId: warehouse._id,
//                               },
//                             });
//                             setDialogOpen({ ...dialogOpen, inventory: true });
//                           }}
//                         >
//                           Add Inventory
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </CardContent>
//         </Card>
//       )}

//       {/* Products Tab */}
//       {activeTab === 2 && (
//         <Card>
//           <CardHeader
//             title="Product Catalog"
//             action={
//               <Button
//                 onClick={() => setDialogOpen({ ...dialogOpen, product: true })}
//               >
//                 Add Product
//               </Button>
//             }
//           />
//           <CardContent>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Product ID</TableCell>
//                     <TableCell>Price</TableCell>
//                     <TableCell>Status</TableCell>
//                     <TableCell>Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {products.map((product) => (
//                     <TableRow key={product.productId}>
//                       <TableCell>{product.productId}</TableCell>
//                       <TableCell>${product.price.toFixed(2)}</TableCell>
//                       <TableCell>
//                         {product.active ? 'Active' : 'Inactive'}
//                       </TableCell>
//                       <TableCell>
//                         <TextField
//                           label="Update Price"
//                           type="number"
//                           defaultValue={product.price}
//                           onChange={(e) => {
//                             const newPrice = parseFloat(e.target.value);
//                             handleUpdateProductPrice(
//                               product.productId,
//                               newPrice
//                             );
//                           }}
//                           variant="outlined"
//                           size="small"
//                         />
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </CardContent>
//         </Card>
//       )}

//       {/* Add Warehouse Dialog */}
//       <Dialog
//         open={dialogOpen.warehouse}
//         onClose={() => setDialogOpen({ ...dialogOpen, warehouse: false })}
//       >
//         <DialogTitle>Add New Warehouse</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="Name"
//             fullWidth
//             value={formData.warehouse.name}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 warehouse: { ...formData.warehouse, name: e.target.value },
//               })
//             }
//           />
//           <TextField
//             margin="dense"
//             label="Address"
//             fullWidth
//             value={formData.warehouse.address}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 warehouse: { ...formData.warehouse, address: e.target.value },
//               })
//             }
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={() => setDialogOpen({ ...dialogOpen, warehouse: false })}
//           >
//             Cancel
//           </Button>
//           <Button onClick={handleAddWarehouse}>Save</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Add Product Dialog */}
//       <Dialog
//         open={dialogOpen.product}
//         onClose={() => setDialogOpen({ ...dialogOpen, product: false })}
//       >
//         <DialogTitle>Add New Product</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="Product ID"
//             fullWidth
//             value={formData.product.productId}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 product: { ...formData.product, productId: e.target.value },
//               })
//             }
//           />
//           <TextField
//             margin="dense"
//             label="Price"
//             type="number"
//             fullWidth
//             value={formData.product.price}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 product: { ...formData.product, price: e.target.value },
//               })
//             }
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={() => setDialogOpen({ ...dialogOpen, product: false })}
//           >
//             Cancel
//           </Button>
//           <Button onClick={handleAddProduct}>Save</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Add Inventory Dialog */}
//       <Dialog
//         open={dialogOpen.inventory}
//         onClose={() => setDialogOpen({ ...dialogOpen, inventory: false })}
//       >
//         <DialogTitle>Add Inventory</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="Product ID"
//             fullWidth
//             value={formData.inventory.productId}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 inventory: { ...formData.inventory, productId: e.target.value },
//               })
//             }
//           />
//           <TextField
//             margin="dense"
//             label="Quantity"
//             type="number"
//             fullWidth
//             value={formData.inventory.quantity}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 inventory: { ...formData.inventory, quantity: e.target.value },
//               })
//             }
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={() => setDialogOpen({ ...dialogOpen, inventory: false })}
//           >
//             Cancel
//           </Button>
//           <Button onClick={handleAddInventory}>Save</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default DistributorDashboard;

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaBuilding,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarker,
  FaBox,
} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DistributorDashboard = () => {
  const [distributor, setDistributor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDistributorDetails();
  }, []);

  const fetchDistributorDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:3002/distributor/details',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDistributor(response.data);
    } catch (error) {
      toast.error('Failed to fetch distributor details');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600">
          Loading distributor details...
        </span>
      </div>
    );
  }

  if (!distributor) {
    return (
      <div className="text-center text-red-500">Distributor not found</div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <FaBuilding className="mr-2" />
        Distributor Dashboard
      </h1>

      {/* Company Details */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Company Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {distributor.companyName}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Distributor ID
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {distributor.distributorId}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <p className="mt-1 text-sm text-gray-900">{distributor.status}</p>
          </div>
        </div>
      </div>

      {/* Contact Person Details */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Contact Person</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {distributor.contactPerson.name}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {distributor.contactPerson.email}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {distributor.contactPerson.phone}
            </p>
          </div>
        </div>
      </div>

      {/* Warehouses */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Warehouses</h2>
        {distributor.warehouses.length === 0 ? (
          <p className="text-sm text-gray-500">No warehouses found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {distributor.warehouses.map((warehouse) => (
              <div key={warehouse._id} className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <FaMapMarker className="mr-2" />
                  {warehouse.city}
                </h3>
                <p className="text-sm text-gray-600">
                  {warehouse.addressLine1}
                </p>
                <p className="text-sm text-gray-600">
                  {warehouse.addressLine2}
                </p>
                <p className="text-sm text-gray-600">
                  {warehouse.city}, {warehouse.state} {warehouse.zipCode}
                </p>
                <p className="text-sm text-gray-600">
                  Phone: {warehouse.phone}
                </p>
                <p className="text-sm text-gray-600">
                  Capacity: {warehouse.capacity} units
                </p>
                <p className="text-sm text-gray-600">
                  Status: {warehouse.isActive ? 'Active' : 'Inactive'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Products
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        {distributor.products.length === 0 ? (
          <p className="text-sm text-gray-500">No products found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {distributor.products.map((product) => (
              <div key={product._id} className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <FaBox className="mr-2" />
                  {product.productId}
                </h3>
                <p className="text-sm text-gray-600">Price: ${product.price}</p>
                <p className="text-sm text-gray-600">
                  Status: {product.active ? 'Active' : 'Inactive'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div> */}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default DistributorDashboard;
