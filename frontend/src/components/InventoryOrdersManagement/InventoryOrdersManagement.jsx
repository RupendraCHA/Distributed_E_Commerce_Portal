
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaWarehouse, FaBox, FaSortAmountDown } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./InventoryOrdersManagement.css"
import { useSelector } from 'react-redux';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const InventoryOrdersManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [warehouses, setWarehouses] = useState([]);

  const server_Url = import.meta.env.VITE_API_SERVER_URL


  const userOrder = useSelector((state) => state.userOrders.userOrdersData)
  const isUpdated = useSelector((state) => state.userOrders.isUpdated)
//   console.log("userOrderData1",userOrder)

  const [isEditMode, setIsEditMode] = useState(false);
  const [newPrice, setNewPrice] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);  // To store the selected product details
  function extractFloats(text) {
      return text.match(/\d+(\.\d+)?/g).map(Number);
  }
  // Open the modal for editing
  const handleEditClick = (product) => {
    setIsEditMode(true);
    setSelectedProduct(product)
    setNewPrice(extractFloats(`${product.price}` || '0')); // Show the updated price or the default price

  };

  // Close the modal
  const handleCancel = () => {
    setIsEditMode(false);
    setOpenModal(false);
    setNewPrice(selectedProduct ? selectedProduct.price : 0); // Reset the price field to the original
  };

  // Handle price change and submit to backend
  const handlePriceChange = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        server_Url + '/api/v1/distributor/update-price',
        { productId: selectedProduct.productId, newPrice: `$${newPrice}`, warehouseId: selectedProduct.warehouseId  },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        toast.success("Price updated successfully");
        fetchInventoryData(); // Refetch the inventory data
        handleCancel(); // Close the modal after updating
      }
    } catch (error) {
      console.error("Error updating price:", error);
    }
  };
  useEffect(() => {
    fetchInventoryData();
  }, []);

  useEffect(() => {
    // Apply filters whenever inventory, warehouse selection, or search query changes
    filterInventory();
  }, [inventory, selectedWarehouse, searchQuery,isUpdated]);

  const fetchInventoryData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        server_Url + '/api/v1/distributor/inventory',
        // 'http://localhost:3002/distributor/inventory',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setInventory(response.data);
      console.log("Inventory", response.data)
      // Extract unique warehouses from inventory data
      const uniqueWarehouses = [
        ...new Set(response.data.map((item) => item.warehouseName)),
      ];
      setWarehouses(uniqueWarehouses);
    } catch (error) {
      toast.error('Failed to fetch inventory data');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterInventory = () => {
    let filtered = [...inventory];

    // Apply warehouse filter
    if (selectedWarehouse !== 'all') {
      filtered = filtered.filter(
        (item) => item.warehouseName === selectedWarehouse
      );
    }

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((item) =>
        item.productId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredInventory(filtered);
  };

  const handleSort = () => {
    const sorted = [...filteredInventory].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.quantity - b.quantity;
      } else {
        return b.quantity - a.quantity;
      }
    });
    setFilteredInventory(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600">Loading inventory...</span>
      </div>
    );
  }

  return (<>
  <div className="container">
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold flex items-center">
            <FaWarehouse className="mr-2"/>
            Inventory Management
            {/* Warehouses Dashboard */}
          </h1>
          <button
            onClick={handleSort}
            className="bg-blue-400 text-white px-2 py-1 font-medium rounded hover:bg-blue-600 flex items-center"
          >
            <FaSortAmountDown className="mr-2" />
            Sort by Quantity (
            {sortOrder === 'asc' ? 'Low to High' : 'High to Low'})
          </button>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <div className="flex">
              <input
                type="text"
                placeholder="Search by Product ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full font-semibold p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <select
            value={selectedWarehouse}
            onChange={(e) => setSelectedWarehouse(e.target.value)}
            className="p-2 border rounded font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Warehouses</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse} value={warehouse}>
                {warehouse}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-blue-700 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-blue-700 uppercase tracking-wider">
                  Warehouse
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-blue-700 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-blue-700 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-blue-700 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {console.log({filteredInventory})}
              {filteredInventory.map((item, index) => {
                const price = extractFloats( `${item?.price}` || "0");
                let itemCountColor = 'bg-yellow-100 text-yellow-800';

                if (item.quantity < 10) {
                  itemCountColor = 'bg-red-100 text-red-800';
                } else if (item.quantity >= 10 && item.quantity <= 20) {
                  itemCountColor = 'bg-orange-100 text-orange-800';
                } else if (item.quantity > 20) {
                  itemCountColor = 'bg-green-100 text-green-800';
                }

                return (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaBox className="text-gray-500 mr-2" />
                        <div>
                          <div className="text-sm font-bold text-gray-900">
                            {item.productName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-bold">
                        {item.warehouseName}
                      </div>
                      <div className="text-sm text-gray-500 font-semibold">
                        {item.warehouseLocation}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-bold">
                        {item.quantity}
                      </div>
                      {item.quantity <= item.minimumStock && (
                        <span className="px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Low Stock
                        </span>
                      )}
                    </td>
                    {/* Price Column with Editable Text Field */}
                    <td className="px-6 py-4 whitespace-nowrap">
                    <span>Price: ${price}</span>
                    <IconButton onClick={()=>handleEditClick(item)}>
                      <EditIcon />
                    </IconButton>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${itemCountColor}`}
                      >
                        {item.quantity > item.reorderPoint ? "In Stock" : "Reorder"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal for updating price */}
      {/* Modal for updating price */}
      <Dialog open={isEditMode} onClose={handleCancel} fullWidth>
        <DialogTitle>Update Product Price</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <>
              <div className="mb-2">
                <strong>Product Name:</strong> {selectedProduct.productName}
              </div>
              <div className="mb-2">
                <strong>Warehouse:</strong> {selectedProduct.warehouseName}
              </div>
              <div className="mb-2">
                <strong>Quantity:</strong> {selectedProduct.quantity}
              </div>
              <TextField
                label="New Price"
                type="text"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                fullWidth
                variant="outlined"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handlePriceChange} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer position="top-right" autoClose={3000} containerId={"inventoryManagement"} />
    </div>
    
  </>
    
  );
};

export default InventoryOrdersManagement;