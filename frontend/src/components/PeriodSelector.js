import React from 'react';
import './PeriodSelector.css';

const PeriodSelector = ({ selectedPeriod, onPeriodChange, disabled }) => {
  const periods = [
    { value: 7, label: '7일' },
    { value: 30, label: '30일' },
    { value: 90, label: '90일' },
    { value: 365, label: '1년' }
  ];

  return (
    <div className="period-selector">
      <span className="period-selector-label">기간</span>
      <div className="period-buttons">
        {periods.map((period) => (
          <button
            key={period.value}
            className={`period-button ${selectedPeriod === period.value ? 'active' : ''}`}
            onClick={() => onPeriodChange(period.value)}
            disabled={disabled}
          >
            {period.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PeriodSelector;