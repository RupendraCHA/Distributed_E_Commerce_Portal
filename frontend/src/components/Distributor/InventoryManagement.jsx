import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaWarehouse } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    productId: '',
    warehouseId: '',
    quantity: '',
    minimumStock: '',
    reorderPoint: '',
    notes: '',
  });
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchInventoryData();
    fetchWarehouses();
  }, []);

  const fetchInventoryData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:3002/distributor/inventory',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setInventory(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch inventory data');
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const fetchWarehouses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:3002/distributor/warehouses',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setWarehouses(response.data);
    } catch (error) {
      toast.error('Failed to fetch warehouses');
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (editingItem) {
        await axios.put(
          `http://localhost:3002/distributor/inventory/${editingItem._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Inventory updated successfully');
      } else {
        await axios.post(
          'http://localhost:3002/distributor/inventory',
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Product added to inventory');
      }

      setShowForm(false);
      setEditingItem(null);
      resetForm();
      fetchInventoryData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const resetForm = () => {
    setFormData({
      productId: '',
      warehouseId: '',
      quantity: '',
      minimumStock: '',
      reorderPoint: '',
      notes: '',
    });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      productId: item.productId,
      warehouseId: item.warehouseId,
      quantity: item.quantity,
      minimumStock: item.minimumStock,
      reorderPoint: item.reorderPoint,
      notes: item.notes || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (itemId) => {
    if (
      !window.confirm('Are you sure you want to delete this inventory item?')
    ) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `http://localhost:3002/distributor/inventory/${itemId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Inventory item deleted successfully');
      fetchInventoryData();
    } catch (error) {
      toast.error('Failed to delete inventory item');
    }
  };

  const filteredInventory = inventory.filter((item) => {
    const matchesWarehouse =
      !selectedWarehouse || item.warehouseId === selectedWarehouse;
    const matchesSearch =
      !searchTerm ||
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesWarehouse && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingItem(null);
            resetForm();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
        >
          <FaPlus className="mr-2" />
          {showForm ? 'Cancel' : 'Add Item'}
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          <div>
            <select
              value={selectedWarehouse}
              onChange={(e) => setSelectedWarehouse(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Warehouses</option>
              {warehouses.map((warehouse) => (
                <option key={warehouse._id} value={warehouse._id}>
                  {warehouse.city} - {warehouse.addressLine1}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Inventory Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-6 mb-6"
        >
          <h2 className="text-xl font-semibold mb-4">
            {editingItem ? 'Edit Inventory Item' : 'Add New Inventory Item'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Warehouse
              </label>
              <select
                name="warehouseId"
                value={formData.warehouseId}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Warehouse</option>
                {warehouses.map((warehouse) => (
                  <option key={warehouse._id} value={warehouse._id}>
                    {warehouse.city} - {warehouse.addressLine1}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Stock Level
              </label>
              <input
                type="number"
                name="minimumStock"
                value={formData.minimumStock}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reorder Point
              </label>
              <input
                type="number"
                name="reorderPoint"
                value={formData.reorderPoint}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {editingItem ? 'Update' : 'Add'} Item
            </button>
          </div>
        </form>
      )}

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Warehouse
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.productName}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {item.productId}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FaWarehouse className="text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">
                        {warehouses.find((w) => w._id === item.warehouseId)
                          ?.city || 'Unknown'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.quantity}</div>
                    {item.quantity <= item.minimumStock && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Low Stock
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.quantity > item.reorderPoint
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {item.quantity > item.reorderPoint
                        ? 'In Stock'
                        : 'Reorder'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default InventoryManagement;
