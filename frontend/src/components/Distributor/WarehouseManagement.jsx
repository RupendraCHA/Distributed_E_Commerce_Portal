// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   FaEdit,
//   FaTrash,
//   FaPlus,
//   FaMapMarkerAlt,
//   FaPhone,
//   FaCheckCircle,
//   FaWarehouse,
// } from 'react-icons/fa';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';

// const WarehouseManagement = () => {
//   const [warehouses, setWarehouses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [editingWarehouse, setEditingWarehouse] = useState(null);
//   const [formData, setFormData] = useState({
//     addressLine1: '',
//     addressLine2: '',
//     city: '',
//     state: '',
//     zipCode: '',
//     phone: '',
//     capacity: '',
//     isActive: true,
//   });

//   const navigate = useNavigate();

//   const usaStates = [
//     'Alabama',
//     'Alaska',
//     'Arizona',
//     'Arkansas',
//     'California',
//     'Colorado',
//     'Connecticut',
//     'Delaware',
//     'Florida',
//     'Georgia',
//     'Hawaii',
//     'Idaho',
//     'Illinois',
//     'Indiana',
//     'Iowa',
//     'Kansas',
//     'Kentucky',
//     'Louisiana',
//     'Maine',
//     'Maryland',
//     'Massachusetts',
//     'Michigan',
//     'Minnesota',
//     'Mississippi',
//     'Missouri',
//     'Montana',
//     'Nebraska',
//     'Nevada',
//     'New Hampshire',
//     'New Jersey',
//     'New Mexico',
//     'New York',
//     'North Carolina',
//     'North Dakota',
//     'Ohio',
//     'Oklahoma',
//     'Oregon',
//     'Pennsylvania',
//     'Rhode Island',
//     'South Carolina',
//     'South Dakota',
//     'Tennessee',
//     'Texas',
//     'Utah',
//     'Vermont',
//     'Virginia',
//     'Washington',
//     'West Virginia',
//     'Wisconsin',
//     'Wyoming',
//   ];

//   useEffect(() => {
//     fetchWarehouses();
//   }, []);

//   const fetchWarehouses = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(
//         'http://localhost:3002/distributor/warehouses',
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setWarehouses(response.data);
//       setLoading(false);
//     } catch (error) {
//       toast.error('Failed to fetch warehouses');
//       console.error('Error:', error);
//       setLoading(false);
//     }
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.addressLine1) errors.addressLine1 = 'Address is required';
//     if (!formData.city) errors.city = 'City is required';
//     if (!formData.state) errors.state = 'State is required';
//     if (!formData.zipCode) errors.zipCode = 'ZIP Code is required';
//     if (!formData.phone) errors.phone = 'Phone number is required';
//     if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
//       errors.phone = 'Phone number must be 10 digits';
//     }
//     if (formData.zipCode && !/^\d{5}$/.test(formData.zipCode)) {
//       errors.zipCode = 'ZIP Code must be 6 digits';
//     }
//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errors = validateForm();

//     if (Object.keys(errors).length > 0) {
//       Object.values(errors).forEach((error) => toast.error(error));
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       if (editingWarehouse) {
//         await axios.put(
//           `http://localhost:3002/distributor/warehouses/${editingWarehouse._id}`,
//           formData,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         toast.success('Warehouse updated successfully');
//       } else {
//         await axios.post(
//           'http://localhost:3002/distributor/warehouses',
//           formData,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         toast.success('Warehouse added successfully');
//       }

//       setShowForm(false);
//       setEditingWarehouse(null);
//       resetForm();
//       fetchWarehouses();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Operation failed');
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const resetForm = () => {
//     setFormData({
//       addressLine1: '',
//       addressLine2: '',
//       city: '',
//       state: '',
//       zipCode: '',
//       phone: '',
//       capacity: '',
//       isActive: true,
//     });
//   };

//   const handleEdit = (warehouse) => {
//     setEditingWarehouse(warehouse);
//     setFormData({
//       addressLine1: warehouse.addressLine1,
//       addressLine2: warehouse.addressLine2 || '',
//       city: warehouse.city,
//       state: warehouse.state,
//       zipCode: warehouse.zipCode,
//       phone: warehouse.phone,
//       capacity: warehouse.capacity || '',
//       isActive: warehouse.isActive,
//     });
//     setShowForm(true);
//   };

//   const handleDelete = async (warehouseId) => {
//     if (!window.confirm('Are you sure you want to delete this warehouse?')) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(
//         `http://localhost:3002/distributor/warehouses/${warehouseId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success('Warehouse deleted successfully');
//       fetchWarehouses();
//     } catch (error) {
//       toast.error('Failed to delete warehouse');
//     }
//   };

//   const handleSetPrimary = async (warehouseId) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(
//         `http://localhost:3002/distributor/warehouses/${warehouseId}/primary`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success('Primary warehouse updated');
//       fetchWarehouses();
//     } catch (error) {
//       toast.error('Failed to update primary warehouse');
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

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Warehouse Management</h1>
//         <button
//           onClick={() => {
//             setShowForm(!showForm);
//             setEditingWarehouse(null);
//             resetForm();
//           }}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
//         >
//           <FaPlus className="mr-2" />
//           {showForm ? 'Cancel' : 'Add Warehouse'}
//         </button>
//       </div>

//       {/* Warehouse Form */}
//       {showForm && (
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white rounded-lg shadow p-6 mb-6"
//         >
//           <h2 className="text-xl font-semibold mb-4">
//             {editingWarehouse ? 'Edit Warehouse' : 'Add New Warehouse'}
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Address Line 1
//               </label>
//               <input
//                 type="text"
//                 name="addressLine1"
//                 value={formData.addressLine1}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Street address"
//               />
//             </div>

//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-2">
//       Address Line 2
//     </label>
//     <input
//       type="text"
//       name="addressLine2"
//       value={formData.addressLine2}
//       onChange={handleInputChange}
//       className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       placeholder="Apartment, suite, etc. (optional)"
//     />
//   </div>

//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-2">
//       City
//     </label>
//     <input
//       type="text"
//       name="city"
//       value={formData.city}
//       onChange={handleInputChange}
//       required
//       className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//     />
//   </div>

//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-2">
//       State
//     </label>
//     <select
//       name="state"
//       value={formData.state}
//       onChange={handleInputChange}
//       required
//       className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//     >
//       <option value="">Select State</option>
//       {usaStates.map((state) => (
//         <option key={state} value={state}>
//           {state}
//         </option>
//       ))}
//     </select>
//   </div>

//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-2">
//       PIN Code
//     </label>
//     <input
//       type="text"
//       name="zipCode"
//       value={formData.zipCode}
//       onChange={handleInputChange}
//       required
//       pattern="\d{5}"
//       maxLength="5"
//       minLength="5"
//       className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       placeholder="5-digit PIN code"
//     />
//   </div>

//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-2">
//       Phone Number
//     </label>
//     <input
//       type="tel"
//       name="phone"
//       value={formData.phone}
//       onChange={handleInputChange}
//       required
//       pattern="\d{10}"
//       maxLength="10"
//       className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       placeholder="10-digit phone number"
//     />
//   </div>

//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-2">
//       Storage Capacity (sq ft)
//     </label>
//     <input
//       type="number"
//       name="capacity"
//       value={formData.capacity}
//       onChange={handleInputChange}
//       className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       placeholder="Storage capacity"
//     />
//   </div>

//   <div className="flex items-center">
//     <input
//       type="checkbox"
//       name="isActive"
//       checked={formData.isActive}
//       onChange={handleInputChange}
//       className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//     />
//     <label className="ml-2 block text-sm text-gray-900">
//       Warehouse is active
//     </label>
//   </div>
// </div>

//           <div className="mt-4 flex justify-end space-x-3">
//             <button
//               type="button"
//               onClick={() => {
//                 setShowForm(false);
//                 resetForm();
//               }}
//               className="px-4 py-2 border rounded-lg hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//             >
//               {editingWarehouse ? 'Update' : 'Add'} Warehouse
//             </button>
//           </div>
//         </form>
//       )}

//       {/* Warehouses List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {warehouses.map((warehouse) => (
//           <div
//             key={warehouse._id}
//             className={`bg-white rounded-lg shadow p-6 ${
//               warehouse.isPrimary ? 'border-2 border-blue-500' : ''
//             }`}
//           >
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 {warehouse.isPrimary && (
//                   <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
//                     Primary Warehouse
//                   </span>
//                 )}
//                 {!warehouse.isActive && (
//                   <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded ml-2">
//                     Inactive
//                   </span>
//                 )}
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => handleEdit(warehouse)}
//                   className="text-blue-600 hover:text-blue-900"
//                 >
//                   <FaEdit />
//                 </button>
//                 <button
//                   onClick={() => handleDelete(warehouse._id)}
//                   className="text-red-600 hover:text-red-900"
//                 >
//                   <FaTrash />
//                 </button>
//               </div>
//             </div>

//             <div className="space-y-3">
//               <div className="flex items-start">
//                 <FaMapMarkerAlt className="text-gray-400 mt-1 mr-2" />
//                 <div>
//                   <p className="text-gray-900">{warehouse.addressLine1}</p>
//                   {warehouse.addressLine2 && (
//                     <p className="text-gray-600">{warehouse.addressLine2}</p>
//                   )}
//                   <p className="text-gray-600">
//                     {warehouse.city}, {warehouse.state} - {warehouse.zipCode}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center">
//                 <FaPhone className="text-gray-400 mr-2" />
//                 <p className="text-gray-900">{warehouse.phone}</p>
//               </div>

//               {warehouse.capacity && (
//                 <p className="text-sm text-gray-600">
//                   Storage Capacity: {warehouse.capacity} sq ft
//                 </p>
//               )}

//               {!warehouse.isPrimary && (
//                 <button
//                   onClick={() => handleSetPrimary(warehouse._id)}
//                   className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
//                 >
//                   <FaCheckCircle className="mr-2" />
//                   Set as Primary
//                 </button>
//               )}

//               {/* Inventory Summary */}
//               <div className="mt-4 pt-4 border-t border-gray-200">
//                 <h4 className="text-sm font-medium text-gray-900 mb-2">
//                   Inventory Summary
//                 </h4>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-sm text-gray-500">Total Items</p>
//                     <p className="text-lg font-semibold">
//                       {warehouse.inventory?.length || 0}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Space Utilized</p>
//                     <p className="text-lg font-semibold">
//                       {warehouse.spaceUtilized
//                         ? `${warehouse.spaceUtilized}%`
//                         : 'N/A'}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Quick Actions */}
//               <div className="mt-4 pt-4 border-t border-gray-200">
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() =>
//                       navigate(
//                         `/distributor/warehouses/${warehouse._id}/inventory`
//                       )
//                     }
//                     className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//                   >
//                     View Inventory
//                   </button>
//                   <button
//                     onClick={() =>
//                       navigate(
//                         `/distributor/warehouses/${warehouse._id}/reports`
//                       )
//                     }
//                     className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//                   >
//                     Reports
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}

//         {/* Add New Warehouse Card */}
//         {!showForm && (
//           <div
//             onClick={() => {
//               setShowForm(true);
//               setEditingWarehouse(null);
//               resetForm();
//             }}
//             className="bg-gray-50 rounded-lg shadow p-6 border-2 border-dashed border-gray-300 hover:border-blue-500 cursor-pointer flex flex-col items-center justify-center text-gray-500 hover:text-blue-500 transition-colors"
//           >
//             <FaPlus className="text-3xl mb-2" />
//             <p className="font-medium">Add New Warehouse</p>
//           </div>
//         )}
//       </div>

//       {warehouses.length === 0 && !showForm && (
//         <div className="text-center py-12">
//           <div className="text-gray-400 mb-4">
//             <FaWarehouse className="inline-block text-6xl" />
//           </div>
//           <h3 className="text-lg font-medium text-gray-900 mb-2">
//             No Warehouses Added Yet
//           </h3>
//           <p className="text-gray-500 mb-4">
//             Start by adding your first warehouse location
//           </p>
//           <button
//             onClick={() => setShowForm(true)}
//             className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//           >
//             <FaPlus className="mr-2" />
//             Add Warehouse
//           </button>
//         </div>
//       )}

//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default WarehouseManagement;

import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaMapMarkerAlt,
  FaPhone,
  FaCheckCircle,
  FaWarehouse,
} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';

const WarehouseManagement = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState(null);
  const [formData, setFormData] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    capacity: '',
    isActive: true,
  });

  // const navigate = useNavigate();

  const usaStates = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  // Fetch warehouses on component mount
  useEffect(() => {
    fetchWarehouses();
  }, []);

  // Fetch warehouses from the backend
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
    } finally {
      setLoading(false);
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const errors = {};
    if (!formData.addressLine1) errors.addressLine1 = 'Address is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.state) errors.state = 'State is required';
    if (!formData.zipCode) errors.zipCode = 'ZIP Code is required';
    if (!formData.phone) errors.phone = 'Phone number is required';
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Phone number must be 10 digits';
    }
    if (formData.zipCode && !/^\d{5}$/.test(formData.zipCode)) {
      errors.zipCode = 'ZIP Code must be 5 digits';
    }
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => toast.error(error));
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (editingWarehouse) {
        await axios.put(
          `http://localhost:3002/distributor/warehouses/${editingWarehouse._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Warehouse updated successfully');
      } else {
        await axios.post(
          'http://localhost:3002/distributor/warehouses',
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Warehouse added successfully');
      }

      setShowForm(false);
      setEditingWarehouse(null);
      resetForm();
      fetchWarehouses(); // Refresh the list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      capacity: '',
      isActive: true,
    });
  };

  // Handle edit action
  const handleEdit = (warehouse) => {
    setEditingWarehouse(warehouse);
    setFormData({
      addressLine1: warehouse.addressLine1,
      addressLine2: warehouse.addressLine2 || '',
      city: warehouse.city,
      state: warehouse.state,
      zipCode: warehouse.zipCode,
      phone: warehouse.phone,
      capacity: warehouse.capacity || '',
      isActive: warehouse.isActive,
    });
    setShowForm(true);
  };

  // Handle delete action
  const handleDelete = async (warehouseId) => {
    if (!window.confirm('Are you sure you want to delete this warehouse?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://localhost:3002/distributor/warehouses/${warehouseId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      toast.success('Warehouse deleted successfully');
      fetchWarehouses(); // Refresh the list
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete warehouse');
    }
  };

  // Handle setting a warehouse as primary
  const handleSetPrimary = async (warehouseId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:3002/distributor/warehouses/${warehouseId}/primary`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Primary warehouse updated');
      fetchWarehouses(); // Refresh the list
    } catch (error) {
      toast.error('Failed to update primary warehouse');
    }
  };

  // Loading state
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
        <h1 className="text-2xl font-bold">Warehouse Management</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingWarehouse(null);
            resetForm();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
        >
          <FaPlus className="mr-2" />
          {showForm ? 'Cancel' : 'Add Warehouse'}
        </button>
      </div>

      {/* Warehouse Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-6 mb-6"
        >
          <h2 className="text-xl font-semibold mb-4">
            {editingWarehouse ? 'Edit Warehouse' : 'Add New Warehouse'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Form fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Line 1
              </label>
              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Street address"
              />
            </div>
            {/* Add other form fields similarly */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Line 2
              </label>
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Apartment, suite, etc. (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select State</option>
                {usaStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PIN Code
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
                pattern="\d{5}"
                maxLength="5"
                minLength="5"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="5-digit PIN code"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                pattern="\d{10}"
                maxLength="10"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="10-digit phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Storage Capacity (sq ft)
              </label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Storage capacity"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Warehouse is active
              </label>
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
              {editingWarehouse ? 'Update' : 'Add'} Warehouse
            </button>
          </div>
        </form>
      )}

      {/* Warehouses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {warehouses.map((warehouse) => (
          <div
            key={warehouse._id}
            className={`bg-white rounded-lg shadow p-6 ${
              warehouse.isPrimary ? 'border-2 border-blue-500' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                {warehouse.isPrimary && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    Primary Warehouse
                  </span>
                )}
                {!warehouse.isActive && (
                  <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded ml-2">
                    Inactive
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(warehouse)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(warehouse._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            {/* Warehouse details */}
            <div className="space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-gray-400 mt-1 mr-2" />
                <div>
                  <p className="text-gray-900">{warehouse.addressLine1}</p>
                  {warehouse.addressLine2 && (
                    <p className="text-gray-600">{warehouse.addressLine2}</p>
                  )}
                  <p className="text-gray-600">
                    {warehouse.city}, {warehouse.state} - {warehouse.zipCode}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-gray-400 mr-2" />
                <p className="text-gray-900">{warehouse.phone}</p>
              </div>
              {warehouse.capacity && (
                <p className="text-sm text-gray-600">
                  Storage Capacity: {warehouse.capacity} sq ft
                </p>
              )}
              {!warehouse.isPrimary && (
                <button
                  onClick={() => handleSetPrimary(warehouse._id)}
                  className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <FaCheckCircle className="mr-2" />
                  Set as Primary
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Add New Warehouse Card */}
        {!showForm && (
          <div
            onClick={() => {
              setShowForm(true);
              setEditingWarehouse(null);
              resetForm();
            }}
            className="bg-gray-50 rounded-lg shadow p-6 border-2 border-dashed border-gray-300 hover:border-blue-500 cursor-pointer flex flex-col items-center justify-center text-gray-500 hover:text-blue-500 transition-colors"
          >
            <FaPlus className="text-3xl mb-2" />
            <p className="font-medium">Add New Warehouse</p>
          </div>
        )}
      </div>

      {/* Empty state */}
      {warehouses.length === 0 && !showForm && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <FaWarehouse className="inline-block text-6xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Warehouses Added Yet
          </h3>
          <p className="text-gray-500 mb-4">
            Start by adding your first warehouse location
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <FaPlus className="mr-2" />
            Add Warehouse
          </button>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default WarehouseManagement;
