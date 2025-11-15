import React from 'react';
import './ChartTypeControl.css';

const ChartTypeControl = ({ chartType, onChartTypeChange }) => {
  return (
    <div className="chart-type-control">
      <h3>📊 차트 타입</h3>
      <div className="chart-type-buttons">
        <button
          className={`chart-type-btn ${chartType === 'line' ? 'active' : ''}`}
          onClick={() => onChartTypeChange('line')}
        >
          <span className="icon">📈</span>
          <span className="label">라인 차트</span>
        </button>
        <button
          className={`chart-type-btn ${chartType === 'candlestick' ? 'active' : ''}`}
          onClick={() => onChartTypeChange('candlestick')}
        >
          <span className="icon">🕯️</span>
          <span className="label">캔들스틱</span>
        </button>
      </div>
    </div>
  );
};

export default ChartTypeControl;
