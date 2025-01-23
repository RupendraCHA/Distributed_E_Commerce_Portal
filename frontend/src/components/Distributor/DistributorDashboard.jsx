// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { format } from 'date-fns';
// import { Link } from 'react-router-dom';
// import { FaWarehouse, FaBox, FaMoneyBillWave, FaTruck } from 'react-icons/fa';

// const DistributorDashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(
//         'http://localhost:3002/distributor/dashboard',
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setDashboardData(response.data);
//     } catch (err) {
//       setError('Failed to fetch dashboard data');
//       console.error('Error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="p-4 bg-red-100 text-red-700 rounded">{error}</div>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Distributor Dashboard</h1>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//         {/* Total Warehouses */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center">
//             <FaWarehouse className="text-blue-500 text-3xl mr-4" />
//             <div>
//               <p className="text-gray-500">Total Warehouses</p>
//               <h3 className="text-2xl font-bold">
//                 {dashboardData?.warehouseCount || 0}
//               </h3>
//             </div>
//           </div>
//         </div>

//         {/* Total Products */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center">
//             <FaBox className="text-green-500 text-3xl mr-4" />
//             <div>
//               <p className="text-gray-500">Total Products</p>
//               <h3 className="text-2xl font-bold">
//                 {dashboardData?.productCount || 0}
//               </h3>
//             </div>
//           </div>
//         </div>

//         {/* Total Revenue */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center">
//             <FaMoneyBillWave className="text-yellow-500 text-3xl mr-4" />
//             <div>
//               <p className="text-gray-500">Total Revenue</p>
//               <h3 className="text-2xl font-bold">
//                 ₹{dashboardData?.totalRevenue?.toLocaleString() || '0'}
//               </h3>
//             </div>
//           </div>
//         </div>

//         {/* Pending Orders */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center">
//             <FaTruck className="text-purple-500 text-3xl mr-4" />
//             <div>
//               <p className="text-gray-500">Pending Orders</p>
//               <h3 className="text-2xl font-bold">
//                 {dashboardData?.pendingOrders || 0}
//               </h3>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Orders & Low Stock */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Orders */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead>
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Order ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Date
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Amount
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {dashboardData?.recentOrders?.map((order) => (
//                   <tr key={order._id}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">
//                       {order._id.slice(-6)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">
//                       {format(new Date(order.date), 'dd/MM/yyyy')}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">
//                       ₹{order.amount.toLocaleString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-2 py-1 text-xs rounded-full ${
//                           order.status === 'completed'
//                             ? 'bg-green-100 text-green-800'
//                             : 'bg-yellow-100 text-yellow-800'
//                         }`}
//                       >
//                         {order.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Low Stock Alert */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">Low Stock Alert</h2>
//           <div className="space-y-4">
//             {dashboardData?.lowStockProducts?.map((product) => (
//               <div
//                 key={product._id}
//                 className="flex items-center justify-between border-b pb-4"
//               >
//                 <div>
//                   <h3 className="font-medium">{product.name}</h3>
//                   <p className="text-sm text-gray-500">
//                     Warehouse: {product.warehouse}
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-red-600 font-medium">
//                     {product.currentStock} units left
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     Minimum required: {product.minStock}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Link
//           to="/distributor/warehouses"
//           className="bg-blue-500 text-white rounded-lg p-4 text-center hover:bg-blue-600 transition-colors"
//         >
//           Manage Warehouses
//         </Link>
//         <Link
//           to="/distributor/inventory"
//           className="bg-green-500 text-white rounded-lg p-4 text-center hover:bg-green-600 transition-colors"
//         >
//           Update Inventory
//         </Link>
//         <Link
//           to="/distributor/orders"
//           className="bg-purple-500 text-white rounded-lg p-4 text-center hover:bg-purple-600 transition-colors"
//         >
//           View All Orders
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default DistributorDashboard;

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tabs,
  Tab,
} from '@mui/material';
import axios from 'axios';

const DistributorDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [profile, setProfile] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [products, setProducts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState({
    warehouse: false,
    product: false,
    inventory: false,
  });
  const [formData, setFormData] = useState({
    warehouse: { name: '', address: '', contactNumber: '' },
    product: { productId: '', price: '' },
    inventory: { warehouseId: '', productId: '', quantity: '' },
  });

  // Fetch distributor profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/distributor/profile');
        setProfile(response.data);
        setWarehouses(response.data.warehouses);
        setProducts(response.data.products);
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };
    fetchProfile();
  }, []);

  // Handle Tab Change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Add Warehouse
  const handleAddWarehouse = async () => {
    try {
      const response = await axios.post(
        '/distributor/warehouses',
        formData.warehouse
      );
      setWarehouses(response.data);
      setDialogOpen({ ...dialogOpen, warehouse: false });
      setFormData({
        ...formData,
        warehouse: { name: '', address: '', contactNumber: '' },
      });
    } catch (error) {
      console.error('Failed to add warehouse', error);
    }
  };

  // Add Product
  const handleAddProduct = async () => {
    try {
      const response = await axios.post('/distributor/products', {
        productId: formData.product.productId,
        price: parseFloat(formData.product.price),
      });
      setProducts(response.data);
      setDialogOpen({ ...dialogOpen, product: false });
      setFormData({ ...formData, product: { productId: '', price: '' } });
    } catch (error) {
      console.error('Failed to add product', error);
    }
  };

  // Add Inventory
  const handleAddInventory = async () => {
    try {
      const { warehouseId, productId, quantity } = formData.inventory;
      await axios.post(`/distributor/warehouses/${warehouseId}/inventory`, {
        productId,
        quantity: parseInt(quantity),
      });
      const response = await axios.get('/distributor/profile');
      setWarehouses(response.data.warehouses);
      setDialogOpen({ ...dialogOpen, inventory: false });
      setFormData({
        ...formData,
        inventory: { warehouseId: '', productId: '', quantity: '' },
      });
    } catch (error) {
      console.error('Failed to add inventory', error);
    }
  };

  // Update Product Price
  const handleUpdateProductPrice = async (productId, newPrice) => {
    try {
      await axios.put(`/distributor/products/${productId}`, {
        price: newPrice,
      });
      const response = await axios.get('/distributor/profile');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Failed to update product price', error);
    }
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        <Tab label="Profile" />
        <Tab label="Warehouses" />
        <Tab label="Products" />
      </Tabs>

      {/* Profile Tab */}
      {activeTab === 0 && (
        <Card>
          <CardHeader title="Company Profile" />
          <CardContent>
            {profile && (
              <>
                <Typography>Company Name: {profile.companyName}</Typography>
                <Typography>Contact Person: {profile.contactPerson}</Typography>
                <Typography>Distributor ID: {profile.distributorId}</Typography>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Warehouses Tab */}
      {activeTab === 1 && (
        <Card>
          <CardHeader
            title="Warehouses"
            action={
              <Button
                onClick={() =>
                  setDialogOpen({ ...dialogOpen, warehouse: true })
                }
              >
                Add Warehouse
              </Button>
            }
          />
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {warehouses.map((warehouse) => (
                    <TableRow key={warehouse._id}>
                      <TableCell>{warehouse.name}</TableCell>
                      <TableCell>{warehouse.address}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            setFormData({
                              ...formData,
                              inventory: {
                                ...formData.inventory,
                                warehouseId: warehouse._id,
                              },
                            });
                            setDialogOpen({ ...dialogOpen, inventory: true });
                          }}
                        >
                          Add Inventory
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* Products Tab */}
      {activeTab === 2 && (
        <Card>
          <CardHeader
            title="Product Catalog"
            action={
              <Button
                onClick={() => setDialogOpen({ ...dialogOpen, product: true })}
              >
                Add Product
              </Button>
            }
          />
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product ID</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.productId}>
                      <TableCell>{product.productId}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        {product.active ? 'Active' : 'Inactive'}
                      </TableCell>
                      <TableCell>
                        <TextField
                          label="Update Price"
                          type="number"
                          defaultValue={product.price}
                          onChange={(e) => {
                            const newPrice = parseFloat(e.target.value);
                            handleUpdateProductPrice(
                              product.productId,
                              newPrice
                            );
                          }}
                          variant="outlined"
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* Add Warehouse Dialog */}
      <Dialog
        open={dialogOpen.warehouse}
        onClose={() => setDialogOpen({ ...dialogOpen, warehouse: false })}
      >
        <DialogTitle>Add New Warehouse</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={formData.warehouse.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                warehouse: { ...formData.warehouse, name: e.target.value },
              })
            }
          />
          <TextField
            margin="dense"
            label="Address"
            fullWidth
            value={formData.warehouse.address}
            onChange={(e) =>
              setFormData({
                ...formData,
                warehouse: { ...formData.warehouse, address: e.target.value },
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDialogOpen({ ...dialogOpen, warehouse: false })}
          >
            Cancel
          </Button>
          <Button onClick={handleAddWarehouse}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Add Product Dialog */}
      <Dialog
        open={dialogOpen.product}
        onClose={() => setDialogOpen({ ...dialogOpen, product: false })}
      >
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Product ID"
            fullWidth
            value={formData.product.productId}
            onChange={(e) =>
              setFormData({
                ...formData,
                product: { ...formData.product, productId: e.target.value },
              })
            }
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            value={formData.product.price}
            onChange={(e) =>
              setFormData({
                ...formData,
                product: { ...formData.product, price: e.target.value },
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDialogOpen({ ...dialogOpen, product: false })}
          >
            Cancel
          </Button>
          <Button onClick={handleAddProduct}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Add Inventory Dialog */}
      <Dialog
        open={dialogOpen.inventory}
        onClose={() => setDialogOpen({ ...dialogOpen, inventory: false })}
      >
        <DialogTitle>Add Inventory</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Product ID"
            fullWidth
            value={formData.inventory.productId}
            onChange={(e) =>
              setFormData({
                ...formData,
                inventory: { ...formData.inventory, productId: e.target.value },
              })
            }
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            value={formData.inventory.quantity}
            onChange={(e) =>
              setFormData({
                ...formData,
                inventory: { ...formData.inventory, quantity: e.target.value },
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDialogOpen({ ...dialogOpen, inventory: false })}
          >
            Cancel
          </Button>
          <Button onClick={handleAddInventory}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DistributorDashboard;
