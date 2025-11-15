import React from 'react';
import './ZoomControl.css';

const ZoomControl = ({ onReset, disabled }) => {
  return (
    <div className="zoom-control">
      <div className="zoom-info">
        <span className="zoom-icon">🔍</span>
        <span className="zoom-text">마우스 휠로 확대/축소, 드래그로 이동</span>
      </div>
      <button
        className="zoom-reset-btn"
        onClick={onReset}
        disabled={disabled}
      >
        🔄 리셋
      </button>
    </div>
  );
};

export default ZoomControl;