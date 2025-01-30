import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import './MyOrders.css';
import { useSelector } from 'react-redux';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userRole = useSelector((state) => state.auth.user?.role);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      // const orderUrl = userRole === "Consumer" ? 'http://localhost:3002/orders' : 'http://localhost:3002/admin/orders'
      const response = await axios.get('http://localhost:3002/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const sortedOrders = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      // Automatically update status from "confirmed" to "processing" after 10 seconds
      // and from "processing" to "delivered" after 1 hour
      const updatedOrders = sortedOrders.map((order) => {
        if (order.status === 'confirmed') {
          setTimeout(() => {
            updateOrderStatus(order._id, 'processing');
          }, 10000); // 10 seconds
        } else if (order.status === 'processing') {
          setTimeout(() => {
            updateOrderStatus(order._id, 'delivered');
          }, 3600000); // 1 hour (3600000 milliseconds)
        }
        return order;
      });

      setOrders(updatedOrders);
      setError(null);
    } catch (err) {
      setError('Failed to fetch orders. Please try again later.');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:3002/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update the local state to reflect the new status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  const getDeliveryDate = (createdAt, days) => {
    const date = new Date(createdAt);
    date.setDate(date.getDate() + days);
    return date.toDateString(); // Formats as "Day Mon DD YYYY"
  };

  const OrderDetails = ({ order }) => (
    <div className="order-card">
      <div className="order-header">
        <div>
          <h3 className="order-id">
            Order #{order._id.slice(-8).toUpperCase()}
          </h3>
          <p className="order-date">
            Placed on {format(new Date(order.createdAt), 'MMM dd, yyyy')}
          </p>
        </div>
        <span className={`status-badge ${order.status.toLowerCase()}`}>
          {order.status}
        </span>
      </div>

      <div className="order-content">
        {/* Order Items */}
        <div className="order-section">
          <h4 className="section-title">Items</h4>
          <div className="item-list">
            {order.items.map((item, index) => (
              <div key={index} className="order-item">
                <div className="item-details">
                  {console.log(item)}
                  <p className="item-name">{item.name}</p>
                  <p className="item-quantity">Quantity: {item.quantity}</p>
                </div>
                <p className="item-price">
                  $
                  {item.price
                    ? (
                        parseFloat(item.price.replace(/[^0-9.]/g, '')) *
                        item.quantity
                      ).toFixed(2)
                    : 'N/A'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Address */}
        <div className="order-section">
          <h4 className="section-title">Delivery Address</h4>
          <div className="address-details">
            <p>{order.address.addressLine1}</p>
            {order.address.addressLine2 && <p>{order.address.addressLine2}</p>}
            <p>{`${order.address.city}, ${order.address.state} ${order.address.zipCode}`}</p>
          </div>
        </div>

        {/* Delivery Type */}
        <div className="order-section">
          <h4 className="section-title">Estimated Delivery</h4>
          <p className="delivery-type">
            {order.deliveryType === 'standard'
              ? `Order will be delivered on ${getDeliveryDate(
                  order.createdAt,
                  6
                )}`
              : order.deliveryType === 'premium'
              ?  `Order will be delivered on ${getDeliveryDate(
                  order.createdAt,
                  3
                )}`
              : order.deliveryType === 'airWalk'
              ? `Order will be delivered on ${getDeliveryDate(
                  order.createdAt,
                  1
                )}`
              : 'Invalid delivery type'}
          </p>

          {userRole === 'user' && (
            <div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <div className="total-row">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
          <p className="payment-method">Paid via {order.paymentMethod}</p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="orders-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <span>Loading orders...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-container">
        <div className="error-container">{error}</div>
        <button onClick={fetchOrders} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-container">
        <h1 className="page-title">My Orders</h1>
        <div className="empty-state">
          <h2 className="empty-state-title">No orders found</h2>
          <p className="empty-state-message">
            Looks like you haven&apos;t placed any orders yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1 className="page-title">My Orders</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <OrderDetails key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

Orders.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        productName: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
      })
    ).isRequired,
    address: PropTypes.shape({
      addressLine1: PropTypes.string.isRequired,
      addressLine2: PropTypes.string,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zipCode: PropTypes.string.isRequired,
    }).isRequired,
    total: PropTypes.number.isRequired,
    paymentMethod: PropTypes.string.isRequired,
    deliveryType: PropTypes.string.isRequired, // Add deliveryType to PropTypes
  }).isRequired,
};

export default Orders;
