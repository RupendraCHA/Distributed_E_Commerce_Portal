import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const navigate = useNavigate();
  const isProcessed = useRef(false); // Track if the payment has been processed

  useEffect(() => {
    const confirmPayment = async () => {
      if (isProcessed.current) return; // Prevent multiple calls
      isProcessed.current = true; // Mark as processed

      try {
        const token = localStorage.getItem('token');

        // Call the backend to confirm payment and create order
        await axios.post(
          'http://localhost:3002/confirm-payment',
          { sessionId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        toast.success('Payment confirmed and order created successfully!');
        navigate('/my-orders'); // Redirect to the orders page
      } catch (error) {
        console.error('Error confirming payment:', error);
        toast.error('Failed to confirm payment. Please try again.');
        navigate('/cart'); // Redirect back to the cart page
      }
    };

    if (sessionId) {
      confirmPayment();
    } else {
      navigate('/cart'); // Redirect back to the cart page if no session ID
    }
  }, [sessionId, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-gray-600">
          Your order is being processed. Redirecting...
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
