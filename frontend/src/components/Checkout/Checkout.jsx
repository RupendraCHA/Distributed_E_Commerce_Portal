import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack'; // Import useSnackbar
import { resetCart } from '../../store/cartSlice';
import './Checkout.css';
const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [debitCardDetails, setDebitCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
  });
  const [checkDetails, setCheckDetails] = useState({
    checkNumber: '',
    bankName: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar(); // Use snackbar

  const totalPrice = cartItems
    .reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + price;
    }, 0)
    .toFixed(2); // Calculate total price

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3002/addresses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAddresses(response.data);

        // Automatically select the primary address if available
        const primaryAddress = response.data.find(
          (address) => address.isPrimary
        );
        if (primaryAddress) {
          setSelectedAddress(primaryAddress);
        } else if (response.data.length > 0) {
          setSelectedAddress(response.data[0]); // Default to the first address
        }
      } catch (err) {
        enqueueSnackbar('Failed to fetch addresses', { variant: 'error' });
      }
    };

    fetchAddresses();
  }, []);

  if (!addresses.length) {
    navigate('/my-address'); // Redirect to add address if no addresses
  } else if (!selectedAddress) {
    enqueueSnackbar('Please select an address to proceed.', {
      variant: 'warning',
    });
  } else if (!paymentMethod) {
    enqueueSnackbar('Please select a payment method.', { variant: 'warning' });
  } else if (paymentMethod === 'debit card' && !validateDebitCard()) {
    enqueueSnackbar('Please enter valid debit card details.', {
      variant: 'warning',
    });
  } else if (paymentMethod === 'check' && !validateCheckDetails()) {
    enqueueSnackbar('Please enter valid check details.', {
      variant: 'warning',
    });
  }

  const handleProceedToPayment = async () => {
    try {
      const token = localStorage.getItem('token');
      const orderData = {
        items: cartItems,
        total: totalPrice,
        address: selectedAddress,
        paymentMethod,
        ...(paymentMethod === 'debit card' && { debitCardDetails }),
        ...(paymentMethod === 'check' && { checkDetails }),
      };

      // Store the order
      await axios.post('http://localhost:3002/orders', orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      enqueueSnackbar('Order successfully created', { variant: 'success' });
      // navigate('/my-orders');
      navigate('/payment');
      dispatch(resetCart());
    } catch (error) {
      // enqueueSnackbar('Error while creating order', { variant: 'error' });
    }
    const token = localStorage.getItem('token');

    if (token) {
      navigate('/payment');
    }
  };

  const handleDebitCardChange = (e) => {
    setDebitCardDetails({
      ...debitCardDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckDetailsChange = (e) => {
    setCheckDetails({
      ...checkDetails,
      [e.target.name]: e.target.value,
    });
  };

  const validateDebitCard = () => {
    const { cardNumber, expiryDate, cvv, cardHolderName } = debitCardDetails;
    return cardNumber && expiryDate && cvv && cardHolderName;
  };

  const validateCheckDetails = () => {
    const { checkNumber, bankName } = checkDetails;
    return checkNumber && bankName;
  };

  return (
    <div className="checkout-container">
      <div className="checkout-bg-container">
        <div className="checkout-card">
          <div>
            <h1 className="card-heading">Checkout:</h1>
            <h2 className="total-price">Total Price: ${totalPrice}</h2>
            <div className="shipping">
              <h3>Your Address Details :</h3>
              {addresses.length === 0 ? (
                <p>
                  No addresses found.{' '}
                  <Link to="/my-address">Add an Address</Link>
                </p>
              ) : (
                <div>
                  <select
                    className="address-info"
                    value={selectedAddress ? selectedAddress._id : ''}
                    onChange={(e) =>
                      setSelectedAddress(
                        addresses.find(
                          (address) => address._id === e.target.value
                        )
                      )
                    }
                  >
                    {addresses.map((address) => (
                      <option key={address._id} value={address._id}>
                        {address.addressLine1}, {address.city}, {address.state},{' '}
                        {address.zipCode} {address.isPrimary && '(Primary)'}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="pay-options">
              <h3>Payment Options :</h3>
              <ul>
                <li className="payment-type">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="debit card"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Debit Card
                </li>
                <li className="payment-type">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="check"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Check
                </li>
              </ul>
              {paymentMethod === 'debit card' && (
                <div className="debit-card-form">
                  <h4>Debit Card Details:</h4>
                  <div className="form-group">
                    <label>Card Number: </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={debitCardDetails.cardNumber}
                      onChange={handleDebitCardChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Expiry Date(MM/YY):</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={debitCardDetails.expiryDate}
                      onChange={handleDebitCardChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV Number:</label>
                    <input
                      type="password"
                      name="cvv"
                      value={debitCardDetails.cvv}
                      onChange={handleDebitCardChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Card Holder Name:</label>
                    <input
                      type="text"
                      name="cardHolderName"
                      value={debitCardDetails.cardHolderName}
                      onChange={handleDebitCardChange}
                      required
                    />
                  </div>
                </div>
              )}
              {paymentMethod === 'check' && (
                <div className="debit-card-form">
                  <h4>Check Details: </h4>
                  <div className="form-group">
                    <label>Check Number:</label>
                    <input
                      type="text"
                      name="checkNumber"
                      value={checkDetails.checkNumber}
                      onChange={handleCheckDetailsChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Bank Name:</label>
                    <input
                      type="text"
                      name="bankName"
                      value={checkDetails.bankName}
                      onChange={handleCheckDetailsChange}
                      required
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="proceed-to-payment">
            <h3 style={{ width: '100%' }}>Your Cart Items:</h3>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul className="items-bg">
                {cartItems.map((item, index) => (
                  <li className="cart-items" key={index}>
                    {index + 1} {item.productName} - {item.price}
                  </li>
                ))}
              </ul>
            )}
            <button className="confirm-btn" onClick={handleProceedToPayment}>
              Confirm to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
