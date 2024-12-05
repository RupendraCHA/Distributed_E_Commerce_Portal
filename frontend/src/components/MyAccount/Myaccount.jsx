// src/MyAccount/MyAccount.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyAccount = () => {
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user data from the backend when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        const response = await axios.get('http://localhost:3002/user', {
          headers: { Authorization: `Bearer ${token}` }, // Include token in headers
        });
        setUserData(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:3002/user', userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('User data updated successfully.');
    } catch (err) {
      console.error(err);
      alert('Failed to update user data.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2>My Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default MyAccount;
