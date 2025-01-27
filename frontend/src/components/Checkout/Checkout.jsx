import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { jwtDecode } from 'jwt-decode';
import './Checkout.css';

const stripePromise = loadStripe(
  'pk_test_51Q9ZJ7HC7NaQVzOSxGKAaAL81sfBbYcMofntt5O1buXa3gOOuujbGc5IWv0eaXi0Uk5kRWmJz6YOpZpE8o1d3aGb00SMK4ehJL'
);

const Checkout = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [deliveryType, setDeliveryType] = useState('normal'); // 'normal' or 'premium'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  // Calculate total price including delivery fee
  const calculateTotal = () => {
    const itemsTotal = cartItems.reduce(
      (total, item) =>
        total + parseFloat(item.price.replace('$', '')) * item.quantity,
      0
    );
    const deliveryFee = deliveryType === 'premium' ? 10 : 0;
    return itemsTotal + deliveryFee;
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.role);
      fetchAddresses(decodedToken.role);
    }
  }, []);

  const fetchAddresses = async (role) => {
    try {
      const token = localStorage.getItem('token');
      let response;

      if (role === 'distributor') {
        response = await axios.get(
          'http://localhost:3002/distributor/warehouses',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setWarehouses(response.data);
        setSelectedWarehouse(response.data[0]); // Select first warehouse by default
      } else {
        response = await axios.get('http://localhost:3002/addresses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWarehouses(response.data);
        const primaryAddress = response.data.find((addr) => addr.isPrimary);
        setSelectedWarehouse(primaryAddress || response.data[0]);
      }
      setError(null);
    } catch (err) {
      setError('Failed to fetch addresses');
      console.error('Error fetching addresses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleWarehouseChange = (warehouse) => {
    setSelectedWarehouse(warehouse);
  };

  const handleDeliveryTypeChange = (type) => {
    setDeliveryType(type);
  };

  const handleProceedToPayment = async () => {
    if (!selectedWarehouse) {
      setError('Please select a delivery address');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const lineItems = cartItems.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.productName,
            description: item.description,
          },
          unit_amount: Math.round(
            parseFloat(item.price.replace('$', '')) * 100
          ),
        },
        quantity: item.quantity,
      }));

      // Add delivery fee if premium
      if (deliveryType === 'premium') {
        lineItems.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Premium Delivery Fee',
              description: 'Express delivery service',
            },
            unit_amount: 1000, // $10.00 in cents
          },
          quantity: 1,
        });
      }

      const response = await axios.post(
        'http://localhost:3002/create-checkout-session',
        {
          lineItems,
          selectedAddress: selectedWarehouse,
          addressId: selectedWarehouse._id,
          userId,
          cartItems,
          deliveryType,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('Failed to process payment');
      console.error('Error processing payment:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Delivery Address/Warehouse */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {userRole === 'distributor'
              ? 'Select Warehouse'
              : 'Delivery Address'}
          </h2>

          {warehouses.length === 0 ? (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              No {userRole === 'distributor' ? 'warehouses' : 'addresses'}{' '}
              found.
              <button
                onClick={() =>
                  userRole === 'distributor'
                    ? navigate('/distributor/warehouses')
                    : navigate('/my-addresses')
                }
                className="block mt-2 text-blue-500 hover:text-blue-600"
              >
                Add {userRole === 'distributor' ? 'Warehouse' : 'Address'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {warehouses.map((warehouse) => (
                <div
                  key={warehouse._id}
                  className={`border rounded-lg p-4 cursor-pointer ${
                    selectedWarehouse?._id === warehouse._id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleWarehouseChange(warehouse)}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name="warehouse"
                      checked={selectedWarehouse?._id === warehouse._id}
                      onChange={() => handleWarehouseChange(warehouse)}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <p className="font-semibold">{warehouse.addressLine1}</p>
                      {warehouse.addressLine2 && (
                        <p>{warehouse.addressLine2}</p>
                      )}
                      <p>{`${warehouse.city}, ${warehouse.state} ${warehouse.zipCode}`}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Delivery Options */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Delivery Options</h2>
            <div className="space-y-3">
              <div
                className={`border rounded-lg p-4 cursor-pointer ${
                  deliveryType === 'normal'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleDeliveryTypeChange('normal')}
              >
                <div className="flex items-start">
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryType === 'normal'}
                    onChange={() => handleDeliveryTypeChange('normal')}
                    className="mt-1 mr-3"
                  />
                  <div>
                    <p className="font-semibold">Regular Shipping (5-7 days)</p>
                    <p className="text-sm text-gray-600">Free</p>
                  </div>
                </div>
              </div>

              <div
                className={`border rounded-lg p-4 cursor-pointer ${
                  deliveryType === 'premium'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleDeliveryTypeChange('premium')}
              >
                <div className="flex items-start">
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryType === 'premium'}
                    onChange={() => handleDeliveryTypeChange('premium')}
                    className="mt-1 mr-3"
                  />
                  <div>
                    <p className="font-semibold">Expedited Shipping (3-5 days)</p>
                    <p className="text-sm text-gray-600">$10.00 extra</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-4">
                      <p className="font-semibold">{item.productName}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    $
                    {(
                      parseFloat(item.price.replace('$', '')) * item.quantity
                    ).toFixed(2)}
                  </p>
                </div>
              ))}

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span>
                    ${calculateTotal() - (deliveryType === 'premium' ? 10 : 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span>Delivery Fee</span>
                  <span>${deliveryType === 'premium' ? '10.00' : '0.00'}</span>
                </div>
                <div className="flex justify-between items-center font-semibold text-lg mt-2 pt-2 border-t">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleProceedToPayment}
            disabled={loading || !selectedWarehouse}
            className={`w-full mt-6 py-3 px-4 text-white font-semibold rounded-lg ${
              loading || !selectedWarehouse
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
