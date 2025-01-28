import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaWarehouse, FaBox, FaSortAmountDown } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  useEffect(() => {
    fetchInventoryData();
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
    } catch (error) {
      toast.error('Failed to fetch inventory data');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = () => {
    const sortedInventory = [...inventory].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.quantity - b.quantity;
      } else {
        return b.quantity - a.quantity;
      }
    });
    setInventory(sortedInventory);
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <FaWarehouse className="mr-2" />
          Inventory Management
        </h1>
        <button
          onClick={handleSort}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
        >
          <FaSortAmountDown className="mr-2" />
          Sort by Quantity (
          {sortOrder === 'asc' ? 'Low to High' : 'High to Low'})
        </button>
      </div>

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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventory.map((item) => {
                let itemCountColor = 'bg-yellow-100 text-yellow-800';
                if (item.quantity < 10) {
                  itemCountColor = 'bg-red-100 text-white-800';
                }
                if (item.quantity < 10 && item.quantity > 20) {
                  itemCountColor = 'bg-orange-100 text-white-800';
                }

                if (item.quantity > 20) {
                  itemCountColor = 'bg-green-100 text-white-800';
                }
                return (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaBox className="text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item.productName}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {item.productId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.warehouseName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.warehouseLocation}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.quantity}
                      </div>
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
                            ? itemCountColor
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {item.quantity > item.reorderPoint
                          ? 'In Stock'
                          : 'Reorder'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default InventoryManagement;
