import React from 'react';
import './LoadingSpinner.css';

function LoadingSpinner({ message = "데이터를 불러오는 중..." }) {
  return (
    <div className="loading-spinner-container">
      <div className="spinner-wrapper">
        <div className="spinner-circle"></div>
        <div className="spinner-inner"></div>
      </div>
      <p className="loading-message">{message}</p>
      <div className="loading-dots">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
}

export default LoadingSpinner;