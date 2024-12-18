import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../../store/cartSlice'; // Import the necessary actions
import axios from 'axios';
import './cart.css';
import { useEffect, useState } from 'react';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to manage selected items
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setSelectedItems(cartItems.map((item) => item.productId));
  }, [cartItems]);

  // Handle checkbox toggle
  const handleCheckboxChange = (productId) => {
    if (selectedItems.includes(productId)) {
      setSelectedItems((prevSelected) =>
        prevSelected.filter((id) => id !== productId)
      );
    } else {
      setSelectedItems((prevSelected) => [...prevSelected, productId]);
    }
  };

  // Calculate total price
  const totalPrice = cartItems
    .filter((item) => selectedItems.includes(item.productId))
    .reduce(
      (total, item) =>
        total + parseFloat(item.price.replace('$', '')) * item.quantity,
      0
    );

  const handleContinueToPayment = async () => {
    // Check if the user has an address before proceeding to payment
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:3002/addresses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.length === 0) {
        navigate('/payment'); // Redirect to add address page if no address exists
      } else {
        navigate('/checkout');
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  return (
    <div className="cart-container">
      <h1 className="yourCart">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.productId)}
                  onChange={() => handleCheckboxChange(item.productId)}
                />
                <img
                  src={item.image}
                  alt={item.productName}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h2>{item.productName}</h2>
                  <p>
                    <strong>Description:</strong> {item.description}
                  </p>
                  <p>
                    <strong>Price:</strong> {item.price}
                  </p>
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            productId: item.productId,
                            quantity: item.quantity - 1,
                          })
                        )
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span> {item.quantity} </span>
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            productId: item.productId,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                    >
                      +
                    </button>
                    <button
                      onClick={() => dispatch(removeFromCart(item.productId))}
                      className="btn btn-danger"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="total-price">
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            <button
              className="btn btn-primary"
              onClick={handleContinueToPayment}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
