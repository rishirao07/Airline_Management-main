import React, { useState } from 'react';

const ReviewPopup = ({ onClose }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Rating:", rating, "Review:", review);
    onClose(); 
  };

  const handleStarClick = (starIndex) => {
    setRating(starIndex);
  };

  return (
    <div className="review-popup">
      <div className="review-popup-content">
        <h2 className="review-popup-title">Leave a Review</h2>
        <form onSubmit={handleSubmit} className="review-popup-form">
          <label className="review-popup-label">
            Rating:
            <div className="review-popup-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`review-popup-star ${star <= rating ? 'active' : ''}`}
                  onClick={() => handleStarClick(star)}
                >
                  &#9733;
                </span>
              ))}
            </div>
          </label>
          <label className="review-popup-label">
            Review:
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="review-popup-textarea"
            />
          </label>
          <button type="submit" className="review-popup-button">Submit</button>
        </form>
        <button onClick={onClose} className="review-popup-close-button">Close</button>
      </div>
    </div>
  );
};

export default ReviewPopup;