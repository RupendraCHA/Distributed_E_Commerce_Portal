import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { jwtDecode } from 'jwt-decode';

const stripePromise = loadStripe(
  'pk_test_51Q9ZJ7HC7NaQVzOSxGKAaAL81sfBbYcMofntt5O1buXa3gOOuujbGc5IWv0eaXi0Uk5kRWmJz6YOpZpE8o1d3aGb00SMK4ehJL'
);

const Checkout = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + parseFloat(item.price.replace('$', '')) * item.quantity,
    0
  );

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
      // Set primary address as selected by default
      const primaryAddress = response.data.find((addr) => addr.isPrimary);
      setSelectedAddress(primaryAddress || response.data[0]);
      setError(null);
    } catch (err) {
      setError('Failed to fetch addresses');
      console.error('Error fetching addresses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressChange = (address) => {
    setSelectedAddress(address);
  };

  // const handleProceedToPayment = async () => {
  //   if (!selectedAddress) {
  //     setError('Please select a delivery address');
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     const token = localStorage.getItem('token');

  //     // Create a line items array for Stripe
  //     const lineItems = cartItems.map((item) => ({
  //       price_data: {
  //         currency: 'usd',
  //         product_data: {
  //           name: item.productName,
  //           description: item.description,
  //         },
  //         unit_amount: Math.round(
  //           parseFloat(item.price.replace('$', '')) * 100
  //         ), // Convert to cents
  //       },
  //       quantity: item.quantity,
  //     }));

  //     // Create checkout session
  //     const response = await axios.post(
  //       'http://localhost:3002/create-checkout-session',
  //       {
  //         lineItems,
  //         selectedAddress,
  //       },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     // Redirect to Stripe checkout
  //     const stripe = await stripePromise;
  //     const { error } = await stripe.redirectToCheckout({
  //       sessionId: response.data.id,
  //     });

  //     if (error) {
  //       setError(error.message);
  //     }
  //   } catch (err) {
  //     setError('Failed to process payment');
  //     console.error('Error processing payment:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleProceedToPayment = async () => {
    if (!selectedAddress) {
      setError('Please select a delivery address');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id; // Extract userId from the token

      // Create a line items array for Stripe
      const lineItems = cartItems.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.productName,
            description: item.description,
          },
          unit_amount: Math.round(
            parseFloat(item.price.replace('$', '')) * 100
          ), // Convert to cents
        },
        quantity: item.quantity,
      }));

      // Create checkout session
      const response = await axios.post(
        'http://localhost:3002/create-checkout-session',
        {
          lineItems,
          selectedAddress,
          userId, // Include the userId
          cartItems, // Include the cart items
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Redirect to Stripe checkout
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
        {/* Left Column - Delivery Address */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>

          {addresses.length === 0 ? (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              No addresses found. Please add a delivery address.
              <button
                onClick={() => navigate('/my-addresses')}
                className="block mt-2 text-blue-500 hover:text-blue-600"
              >
                Add Address
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {addresses.map((address) => (
                <div
                  key={address._id}
                  className={`border rounded-lg p-4 cursor-pointer ${
                    selectedAddress?._id === address._id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleAddressChange(address)}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddress?._id === address._id}
                      onChange={() => handleAddressChange(address)}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <p className="font-semibold">{address.addressLine1}</p>
                      {address.addressLine2 && <p>{address.addressLine2}</p>}
                      <p>{`${address.city}, ${address.state} ${address.zipCode}`}</p>
                      {address.isPrimary && (
                        <span className="inline-block mt-1 text-sm text-blue-600">
                          Primary Address
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleProceedToPayment}
            disabled={loading || !selectedAddress}
            className={`w-full mt-6 py-3 px-4 text-white font-semibold rounded-lg ${
              loading || !selectedAddress
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
