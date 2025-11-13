import React from 'react';
import './SkeletonCard.css';

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-header">
        <div className="skeleton-left">
          <div className="skeleton-line skeleton-symbol"></div>
          <div className="skeleton-line skeleton-name"></div>
        </div>
        <div className="skeleton-right">
          <div className="skeleton-line skeleton-price"></div>
          <div className="skeleton-line skeleton-change"></div>
        </div>
      </div>

      <div className="skeleton-details">
        {[...Array(7)].map((_, index) => (
          <div className="skeleton-detail-item" key={index}>
            <div className="skeleton-line skeleton-label"></div>
            <div className="skeleton-line skeleton-value"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkeletonCard;