import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack'; // For notification
import { useNavigate } from 'react-router-dom';
import "./MyOrders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]); // Store orders data
  const { enqueueSnackbar } = useSnackbar(); // Notification handler
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (!token) {
          enqueueSnackbar('User not authenticated. Please log in.', { variant: 'warning' });
          navigate('/login'); // Redirect to login if token is missing
          return;
        }

        const response = await axios.get('http://localhost:3002/orders', {
          headers: { Authorization: `Bearer ${token}` }, // Add token to headers
        });

        console.log("Orders fetched:", response.data); // Debug API response
        setOrders(response.data); // Update state with orders
      } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message); // Debug error
        enqueueSnackbar('Failed to fetch orders. Please try again.', { variant: 'error' });
      }
    };

    fetchOrders();
  }, [enqueueSnackbar, navigate]);

  return (
    <div className="my-orders-container">
      <h1 className="order-heading">My Orders</h1>
      <div className="my-orders">
        {orders.length === 0 ? (
          <p>You have no orders yet.</p>
        ) : (
          <ul className="orders-list">
            {orders.map((order) => (
              <li key={order._id} className="order-item">
                <h4 className="order-id">Order ID: {order._id}</h4>
                <p className="total-amt">Order Value: ${order.total?.toFixed(2) || "0.00"}</p>
                <p className="pay-method">
                  Payment Method: <span>{order.paymentMethod || "Unknown"}</span>
                </p>
                <p className="shipping-address">
                  <span>Shipping Address:</span>{" "}
                  {order.address?.addressLine1}, {order.address?.addressLine2}, {order.address?.city},{" "}
                  {order.address?.state}, {order.address?.zipCode}
                </p>
                <div className="products">
                  <h5>Items:</h5>
                  <ul>
                    {order.items.map((item, index) => (
                      <li className="product" key={index}>
                        <div className="img-container">
                          <img
                            src={item.image}
                            alt={item.productName}
                            style={{ width: '50px', marginRight: '10px' }}
                          />
                        </div>
                        <div className="details">
                          <strong>{item.productName}</strong>
                          <p>${item.price} (Quantity: {item.quantity})</p>
                          <p>{item.description}</p>
                          <p>
                            Brand: {item.brand} | Weight: {item.weight} | Expiration Date:{" "}
                            {item.expirationDate}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
