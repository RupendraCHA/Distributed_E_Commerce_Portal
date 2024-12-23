// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const MyAddress = () => {
//   const [addresses, setAddresses] = useState([]);
//   const [newAddress, setNewAddress] = useState({
//     addressLine1: '',
//     addressLine2: '',
//     city: '',
//     state: '',
//     zipCode: '',
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchAddresses = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:3002/addresses', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setAddresses(response.data);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to fetch addresses.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAddresses();
//   }, []);

//   const handleChange = (e) => {
//     setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     try {
//       const response = await axios.post(
//         'http://localhost:3002/addresses',
//         newAddress,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setAddresses([...addresses, response.data]);
//       setNewAddress({
//         addressLine1: '',
//         addressLine2: '',
//         city: '',
//         state: '',
//         zipCode: '',
//       });
//     } catch (err) {
//       console.error(err);
//       alert('Failed to add address.');
//     }
//   };

//   const handleDelete = async (addressId) => {
//     const token = localStorage.getItem('token');
//     try {
//       await axios.delete(`http://localhost:3002/addresses/${addressId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAddresses(addresses.filter((address) => address._id !== addressId));
//     } catch (err) {
//       console.error(err);
//       alert('Failed to delete address.');
//     }
//   };

//   const handleSetPrimary = async (addressId) => {
//     const token = localStorage.getItem('token');
//     try {
//       const response = await axios.put(
//         `http://localhost:3002/addresses/${addressId}/primary`,
//         null,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setAddresses(
//         addresses.map((addr) =>
//           addr._id === addressId ? response.data : { ...addr, isPrimary: false }
//         )
//       );
//     } catch (err) {
//       console.error(err);
//       alert('Failed to set primary address.');
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="text-danger">{error}</p>;

//   return (
//     <div className="container mt-4">
//       <h2>My Addresses</h2>
//       {addresses.length === 0 ? (
//         <p>No addresses found.</p>
//       ) : (
//         <ul>
//           {addresses.map((address) => (
//             <li key={address._id}>
//               <p>
//                 {address.addressLine1}, {address.city}, {address.state},{' '}
//                 {address.zipCode}
//                 {address.isPrimary && <strong> (Primary)</strong>}
//               </p>
//               <button
//                 onClick={() => handleSetPrimary(address._id)}
//                 className="btn btn-primary"
//               >
//                 Set as Primary
//               </button>
//               <button
//                 onClick={() => handleDelete(address._id)}
//                 className="btn btn-danger"
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}

//       <h3>Add a New Address</h3>
//       <form onSubmit={handleSubmit}>
//         <div style={{ color: 'black' }}>
//           <div className="mb-3">
//             <label htmlFor="addressLine1" className="form-label">
//               Address Line 1
//             </label>
//             <input
//               type="text"
//               name="addressLine1"
//               value={newAddress.addressLine1}
//               onChange={handleChange}
//               className="form-control"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="addressLine2" className="form-label">
//               Address Line 2
//             </label>
//             <input
//               type="text"
//               name="addressLine2"
//               value={newAddress.addressLine2}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="city" className="form-label">
//               City
//             </label>
//             <input
//               type="text"
//               name="city"
//               value={newAddress.city}
//               onChange={handleChange}
//               className="form-control"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="state" className="form-label">
//               State
//             </label>
//             <input
//               type="text"
//               name="state"
//               value={newAddress.state}
//               onChange={handleChange}
//               className="form-control"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="zipCode" className="form-label">
//               Zip Code
//             </label>
//             <input
//               type="text"
//               name="zipCode"
//               value={newAddress.zipCode}
//               onChange={handleChange}
//               className="form-control"
//               required
//             />
//           </div>
//           <button type="submit" className="btn btn-primary">
//             Add Address
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default MyAddress;

import { useState, useEffect } from 'react';
import axios from 'axios';

const MyAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
  });

  // Fetch addresses on component mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3002/addresses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch addresses');
      console.error('Error fetching addresses:', err);
    } finally {
      setLoading(false);
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
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (editingAddress) {
        // Update existing address
        await axios.put(
          `http://localhost:3002/addresses/${editingAddress._id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        // Add new address
        await axios.post('http://localhost:3002/addresses', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      // Refresh addresses list
      await fetchAddresses();
      // Reset form
      setFormData({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
      });
      setShowAddForm(false);
      setEditingAddress(null);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save address');
      console.error('Error saving address:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (address) => {
    setFormData({
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || '',
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
    });
    setEditingAddress(address);
    setShowAddForm(true);
  };

  const handleDelete = async (addressId) => {
    if (!window.confirm('Are you sure you want to delete this address?'))
      return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3002/addresses/${addressId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchAddresses();
      setError(null);
    } catch (err) {
      setError('Failed to delete address');
      console.error('Error deleting address:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSetPrimary = async (addressId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:3002/addresses/${addressId}/primary`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await fetchAddresses();
      setError(null);
    } catch (err) {
      setError('Failed to set primary address');
      console.error('Error setting primary address:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Addresses</h1>
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditingAddress(null);
            setFormData({
              addressLine1: '',
              addressLine2: '',
              city: '',
              state: '',
              zipCode: '',
            });
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {showAddForm ? 'Cancel' : 'Add New Address'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6"
        >
          <h2 className="text-xl font-semibold mb-4">
            {editingAddress ? 'Edit Address' : 'Add New Address'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address Line 1*
              </label>
              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleInputChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address Line 2
              </label>
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                City*
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                State*
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                ZIP Code*
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
                pattern="[0-9]{5}"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading
                ? 'Saving...'
                : editingAddress
                ? 'Update Address'
                : 'Add Address'}
            </button>
          </div>
        </form>
      )}

      {loading && !showAddForm ? (
        <div className="text-center py-4">Loading addresses...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {addresses.map((address) => (
            <div
              key={address._id}
              className={`bg-white shadow-md rounded-lg p-4 relative ${
                address.isPrimary ? 'border-2 border-blue-500' : ''
              }`}
            >
              {address.isPrimary && (
                <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  Primary
                </span>
              )}
              <div className="mb-4">
                <p className="font-semibold">{address.addressLine1}</p>
                {address.addressLine2 && <p>{address.addressLine2}</p>}
                <p>{`${address.city}, ${address.state} ${address.zipCode}`}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleEdit(address)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(address._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Remove
                </button>
                {!address.isPrimary && (
                  <button
                    onClick={() => handleSetPrimary(address._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Set as Primary
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAddress;
