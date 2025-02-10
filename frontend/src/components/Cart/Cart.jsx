import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addToCart,
  removeFromCart,
  updateCartItemQuantityAsync,
  updateQuantity,
} from '../../store/cartSlice'; // Import the necessary actions
import axios from 'axios';
import './cart.css';
import { useEffect, useState } from 'react';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);

  const server_Url = import.meta.env.VITE_API_SERVER_URL


  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + parseFloat(item.price.replace('$', '')) * item.quantity,
    0
  );

  useEffect(() => {
    const fetchSavedItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(server_Url + '/savedItems', {
          headers: { Authorization: `Bearer ${token}` },
        });
        // const response = await axios.get('http://localhost:3002/savedItems', {
        //   headers: { Authorization: `Bearer ${token}` },
        // });
        setSavedItems(response.data.savedItems);
      } catch (error) {
        console.error('Error fetching saved items:', error);
      }
    };

    fetchSavedItems();
  }, []);

  const handleSaveForLater = async (productId) => {
    try {
      setSaveLoading(true);
      const token = localStorage.getItem('token');

      await axios.post(
        server_Url + `/saveForLater/${productId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // await axios.post(
      //   `http://localhost:3002/saveForLater/${productId}`,
      //   {},
      //   {
      //     headers: { Authorization: `Bearer ${token}` },
      //   }
      // );

      // Update Redux cart state
      dispatch(removeFromCart(productId));

      // Refresh saved items
      const response = await axios.get(server_Url+'/savedItems', {
        headers: { Authorization: `Bearer ${token}` },
      });
      // const response = await axios.get('http://localhost:3002/savedItems', {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      setSavedItems(response.data.savedItems);

      setError(null);
    } catch (err) {
      setError('Failed to save item for later');
      console.error('Error saving item:', err);
    } finally {
      setSaveLoading(false);
    }
  };

  // Handle quantity change
  const handleQuantityChange = async (productId, value) => {
    try {
      // Convert input to number and ensure it's not negative
      const newQuantity = Math.max(1, parseInt(value) || 1);

      // Dispatch the async thunk and wait for it to complete
      const resultAction = await dispatch(
        updateCartItemQuantityAsync({
          productId,
          quantity: newQuantity,
          // quantity: 0,
        })
      );

      // Check if the action was fulfilled
      if (updateCartItemQuantityAsync.fulfilled.match(resultAction)) {
        // Update the local state through Redux
        dispatch(
          updateQuantity({
            productId,
            quantity: newQuantity,
          })
        );
      } else if (updateCartItemQuantityAsync.rejected.match(resultAction)) {
        // Handle the error case
        console.error('Failed to update quantity:', resultAction.payload);
        // You might want to show an error message to the user here
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // Add this function to move items back to cart
  const handleMoveToCart = async (productId) => {
    try {
      setSaveLoading(true);
      const token = localStorage.getItem('token');

      const response = await axios.post(
        server_Url+`/moveToCart/${productId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // const response = await axios.post(
      //   `http://localhost:3002/moveToCart/${productId}`,
      //   {},
      //   {
      //     headers: { Authorization: `Bearer ${token}` },
      //   }
      // );

      // Update Redux cart state with the new item
      dispatch(addToCart(response.data.cartItem));

      // Refresh saved items
      const savedResponse = await axios.get(
        server_Url+'/savedItems',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // const savedResponse = await axios.get(
      //   'http://localhost:3002/savedItems',
      //   {
      //     headers: { Authorization: `Bearer ${token}` },
      //   }
      // );
      setSavedItems(savedResponse.data.savedItems);

      setError(null);
    } catch (err) {
      setError('Failed to move item to cart');
      console.error('Error moving item:', err);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      // Call the backend API to remove the item
      await axios.delete(server_Url+`/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // await axios.delete(`http://localhost:3002/cart/${productId}`, {
      //   headers: { Authorization: `Bearer ${token}` },
      // });

      // If API call succeeds, update Redux state
      dispatch(removeFromCart(productId));
      setError(null);
    } catch (err) {
      setError('Failed to remove item from cart');
      console.error('Error removing item:', err);
    } finally {
      setLoading(false);
    }
  };
  const handleContinueToPayment = async () => {
    // Check if the user has an address before proceeding to payment
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(server_Url+'/addresses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      // const response = await axios.get('http://localhost:3002/addresses', {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      if (response.data.length === 0) {
        navigate('/my-address'); // Redirect to add address page if no address exists
      } else {
        navigate('/checkout');
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  if (loading) {
    return <div className="cart-loading">Loading...</div>;
  }

  return (
    <div className="container cart-container">
      <h1 className="yourCart">Your Cart</h1>
      {error && <div className="error-message alert alert-danger">{error}</div>}

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </button>
          {savedItems.length > 0 && (
            <div className="saved-items-section">
              <h2>Saved for Later</h2>
              <ul className="saved-items">
                {savedItems.map((item) => (
                  <li key={item.productId} className="saved-item">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="saved-item-image"
                    />
                    <div className="saved-item-details">
                      <h3>{item.productName}</h3>
                      <p>
                        <strong>Price:</strong> {item.price}
                      </p>
                      <button
                        onClick={() => handleMoveToCart(item.productId)}
                        className="btn btn-primary move-to-cart-btn"
                        disabled={saveLoading}
                      >
                        Move to Cart
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.productId} className="cart-item">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h2 style={{fontWeight: "bold"}}>{item.productName}</h2>
                  <p>
                    {item.description}
                  </p>
                  <p style={{fontWeight: "bold"}}>
                    {item.price} X {item.quantity}
                  </p>
                  <div className="quantity-controls">
                    {/* <button
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
                    </button> */}
                    <label
                      htmlFor={`quantity-${item.productId}`}
                      className="quantity-label"
                    >
                      Quantity:
                    </label>
                    <input
                      id={`quantity-${item.productId}`}
                      type="number"
                      // min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.productId, e.target.value)
                      }
                      className="quantity-input"
                      style={{
                        width: '60px',
                        padding: '5px',
                        marginRight: '10px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        color: '#333',
                      }}
                    />
                    <button
                      onClick={() => handleRemoveItem(item.productId)}
                      className="btn btn-danger remove-btn"
                      disabled={loading}
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => handleSaveForLater(item.productId)}
                      style={{
                        marginLeft: '10px',
                        marginRight: '10px',
                        padding: '5px 10px',
                        borderRadius: '50px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                        width: '100px',
                        height: '40px',
                        '&:hover': {
                          backgroundColor: '#0056b3',
                        },
                        '&:disabled': {
                          backgroundColor: '#ccc',
                          cursor: 'not-allowed',
                        },
                        '&:disabled:hover': {
                          backgroundColor: '#ccc',
                        },
                        '&:focus': {
                          outline: 'none',
                        },
                        '&:active': {
                          backgroundColor: '#0062cc',
                        },
                        '&:disabled:active': {
                          backgroundColor: '#ccc',
                        },
                        '&:disabled:active:hover': {
                          backgroundColor: '#ccc',
                        },
                        '&:disabled:active:focus': {
                          backgroundColor: '#ccc',
                        },
                        '&:disabled:active:active': {
                          backgroundColor: '#ccc',
                        },
                      }}
                      className="btn btn-secondary"
                      disabled={saveLoading}
                    >
                      Save for Later
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {cartItems.length > 0 && (
            <div className="cart-summary">
              <div className="total-price">
                <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
              </div>
              <button
                className="btn btn-primary checkout-btn"
                onClick={handleContinueToPayment}
                disabled={loading}
              >
                Proceed to Checkout
              </button>
            </div>
          )}

          {savedItems.length > 0 && (
            <div className="saved-items-section">
              <h2>Saved for Later</h2>
              <ul className="saved-items">
                {savedItems.map((item) => (
                  <li key={item.productId} className="saved-item">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="saved-item-image"
                    />
                    <div className="saved-item-details">
                      <h3>{item.productName}</h3>
                      <p>
                        <strong>Price:</strong> {item.price}
                      </p>
                      <button
                        onClick={() => handleMoveToCart(item.productId)}
                        className="btn btn-primary move-to-cart-btn"
                        disabled={saveLoading}
                      >
                        Move to Cart
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
