import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewPopup from './ReviewPopUp';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [isReviewPopupVisible, setIsReviewPopupVisible] = useState(true);

  const handleReturnHome = () => {
    navigate('/'); 
  };

  const handleCloseReviewPopup = () => {
    setIsReviewPopupVisible(false);
  };

  return (
    <div className="success-container">
      <h1 className="success-title">Payment Successful!</h1>
      <p className="success-message">Thank you for your payment. Your transaction has been completed successfully.</p>
      <button className="success-button" onClick={handleReturnHome}>Return to Home</button>
      {isReviewPopupVisible && <ReviewPopup onClose={handleCloseReviewPopup} />}
    </div>
  );
};

export default PaymentSuccess;
