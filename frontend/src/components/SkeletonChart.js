import React from 'react';
import './SkeletonChart.css';

function SkeletonChart() {
  return (
    <div className="skeleton-chart">
      <div className="skeleton-chart-header">
        <div className="skeleton-line skeleton-chart-title"></div>
      </div>
      <div className="skeleton-chart-body">
        <div className="skeleton-chart-bars">
          {[...Array(15)].map((_, index) => (
            <div
              key={index}
              className="skeleton-bar"
              style={{
                height: `${Math.random() * 60 + 40}%`,
                animationDelay: `${index * 0.05}s`
              }}
            ></div>
          ))}
        </div>
        <div className="skeleton-chart-axis"></div>
      </div>
    </div>
  );
}

export default SkeletonChart;