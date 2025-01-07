import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import './StripePayment.css';

// Replace this with your own Stripe public key
const stripePromise = loadStripe(
  'pk_test_51Q9ZJ7HC7NaQVzOSxGKAaAL81sfBbYcMofntt5O1buXa3gOOuujbGc5IWv0eaXi0Uk5kRWmJz6YOpZpE8o1d3aGb00SMK4ehJL'
);

const StripeCheckout = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleCheckout = async () => {
    try {
      // Replace this with your backend URL if it’s hosted elsewhere
      const response = await fetch(
        'http://localhost:3002/create-checkout-session',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { id: sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error('Stripe checkout error:', error);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div className="payment">
      <div>
        <h1>It's our pleasure to have you here, Click below to pay</h1>
        <button onClick={handleCheckout} disabled={!stripe}>
          Pay with Stripe
        </button>
      </div>
    </div>
  );
};

const StripePaymentComponent = () => {
  return (
    <Elements stripe={stripePromise}>
      <StripeCheckout />
    </Elements>
  );
};

export default StripePaymentComponent;
