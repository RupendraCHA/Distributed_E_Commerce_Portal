import { useState, useEffect } from 'react';
import axios from 'axios';

const MyAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3002/addresses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAddresses(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch addresses.');
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:3002/addresses',
        newAddress,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAddresses([...addresses, response.data]);
      setNewAddress({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
      });
    } catch (err) {
      console.error(err);
      alert('Failed to add address.');
    }
  };

  const handleDelete = async (addressId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3002/addresses/${addressId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(addresses.filter((address) => address._id !== addressId));
    } catch (err) {
      console.error(err);
      alert('Failed to delete address.');
    }
  };

  const handleSetPrimary = async (addressId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `http://localhost:3002/addresses/${addressId}/primary`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAddresses(
        addresses.map((addr) =>
          addr._id === addressId ? response.data : { ...addr, isPrimary: false }
        )
      );
    } catch (err) {
      console.error(err);
      alert('Failed to set primary address.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2>My Addresses</h2>
      {addresses.length === 0 ? (
        <p>No addresses found.</p>
      ) : (
        <ul>
          {addresses.map((address) => (
            <li key={address._id}>
              <p>
                {address.addressLine1}, {address.city}, {address.state},{' '}
                {address.zipCode}
                {address.isPrimary && <strong> (Primary)</strong>}
              </p>
              <button
                onClick={() => handleSetPrimary(address._id)}
                className="btn btn-primary"
              >
                Set as Primary
              </button>
              <button
                onClick={() => handleDelete(address._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3>Add a New Address</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ color: 'black' }}>
          <div className="mb-3">
            <label htmlFor="addressLine1" className="form-label">
              Address Line 1
            </label>
            <input
              type="text"
              name="addressLine1"
              value={newAddress.addressLine1}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="addressLine2" className="form-label">
              Address Line 2
            </label>
            <input
              type="text"
              name="addressLine2"
              value={newAddress.addressLine2}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              name="city"
              value={newAddress.city}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <input
              type="text"
              name="state"
              value={newAddress.state}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="zipCode" className="form-label">
              Zip Code
            </label>
            <input
              type="text"
              name="zipCode"
              value={newAddress.zipCode}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyAddress;
