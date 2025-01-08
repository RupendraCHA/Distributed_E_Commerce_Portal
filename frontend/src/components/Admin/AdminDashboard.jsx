import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:3002/admin/dashboard',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDashboardData(response.data);
      setError(null);
    } catch (err) {
      if (err.response?.status === 403) {
        navigate('/');
      }
      setError('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed w-64 h-full bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="mt-4">
          <a
            href="#"
            onClick={() => setActiveTab('overview')}
            className={`block px-4 py-2 ${
              activeTab === 'overview'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Overview
          </a>
          <a
            href="#"
            onClick={() => setActiveTab('users')}
            className={`block px-4 py-2 ${
              activeTab === 'users'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Users
          </a>
          <a
            href="#"
            onClick={() => setActiveTab('orders')}
            className={`block px-4 py-2 ${
              activeTab === 'orders'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Orders
          </a>
        </nav>
      </div>

      {/* Main content */}
      <div className="ml-64 p-8">
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {activeTab === 'overview' && dashboardData && (
          <Overview dashboardData={dashboardData} />
        )}
        {activeTab === 'users' && <h1>User Management</h1>}
        {activeTab === 'orders' && <h1>Order Management</h1>}
        {/* {activeTab === 'users' && <UserManagement />}
        {activeTab === 'orders' && <OrderManagement />} */}
      </div>
    </div>
  );
};

// Overview Component
const Overview = ({ dashboardData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
        <p className="text-3xl font-bold text-gray-900">
          {dashboardData.totalUsers}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
        <p className="text-3xl font-bold text-gray-900">
          {dashboardData.totalOrders}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
        <p className="text-3xl font-bold text-gray-900">
          $
          {dashboardData.recentOrders
            .reduce((sum, order) => sum + order.total, 0)
            .toFixed(2)}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 col-span-full">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Recent Orders
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardData.recentOrders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {order._id.slice(-8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

Overview.propTypes = {
  dashboardData: PropTypes.shape({
    totalUsers: PropTypes.number.isRequired,
    totalOrders: PropTypes.number.isRequired,
    recentOrders: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
