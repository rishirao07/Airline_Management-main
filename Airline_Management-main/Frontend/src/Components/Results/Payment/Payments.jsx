import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe("pk_test_51PPlr2RrF58wXDtVVW51A9ACDq5RxB9HXvdCrcsrLQ119bZE3FQkhfSKXd9Vtaz1KyKeboi6x8JdrdBandFd3KQL004b96VJyL");

const Payments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const stripe = useStripe();
  const elements = useElements();
  const [price, setPrice] = useState(0);
  const [totalPassengers, setTotalPassengers] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cardholderName, setCardholderName] = useState("");

  useEffect(() => {
    if (location.state) {
      setPrice(location.state.price);
      setTotalPassengers(location.state.travelers);
    }
  }, [location.state]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      const paymentIntentResponse = await axios.post("http://localhost:3000/api/create-payment-intent", {
        amount: 10000,
      });

      const { clientSecret } = paymentIntentResponse.data;

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: cardholderName,
          },
        },
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        console.log("Payment confirmed successfully.");
        navigate("/payment-success");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error confirming payment:", error);
      setError("Failed to process payment. Please try again later.");
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payments-container">
      <h1 className="payments-title">Payment Page</h1>
      <p className="payments-amount">Total amount: RS.{10000}</p>
      <form onSubmit={handleSubmit} className="payments-form">
        <label className="payments-label">
          Cardholder Name
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            className="payments-input"
          />
        </label>
        <label className="payments-label">
          Card details
          <div className="payments-card-section">
            <CardElement className="payments-card-element" onChange={handleChange} />
          </div>
        </label>
        <button className="payments-button" disabled={!stripe || loading}>Pay Now</button>
        {error && <div className="payments-error">{error}</div>}
      </form>
    </div>
  );
};

const PaymentWrapper = () => (
  <Elements stripe={stripePromise}>
    <Payments />
  </Elements>
);

export default PaymentWrapper;
