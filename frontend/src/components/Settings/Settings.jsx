// src/MyAccount/Settings.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Settings = () => {
  const [userData, setUserData] = useState({ markUpValue: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const server_Url = import.meta.env.VITE_API_SERVER_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${server_Url}/api/v1/user/markup`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData({ markUpValue: response.data.markUpValue || '15' });
      } catch (err) {
        console.error(err);
        setError('Failed to fetch markup value.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, markUpValue: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${server_Url}/api/v1/user/markup`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.message) {
        toast.success(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update markup value.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      {/* <h2>Settings</h2> */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="markUpValue" className="form-label">
            Mark Up Value %
          </label>
          <input
            style={{
                width: "70px"
            }}
            type="number"
            name="markUpValue"
            value={userData.markUpValue}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update'}
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Settings;
