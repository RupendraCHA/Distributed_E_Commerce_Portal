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

  const server_Url = import.meta.env.VITE_API_SERVER_URL


  useEffect(() => {
    fetchDistributorDetails();
  }, []);

  const fetchDistributorDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        server_Url+'/api/v1/distributor/details',
        // 'http://localhost:3002/distributor/details',
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
    <div className="container">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <FaBuilding className="mr-2" />
        Distributor Dashboard
      </h1>
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
