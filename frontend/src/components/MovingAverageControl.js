import React from 'react';
import './MovingAverageControl.css';

const MovingAverageControl = ({ selectedMA, onMAChange, disabled }) => {
  const maOptions = [
    { period: 5, label: 'MA 5일', color: '#ff6384' },
    { period: 20, label: 'MA 20일', color: '#9966ff' },
    { period: 60, label: 'MA 60일', color: '#4bc0c0' }
  ];

  const handleToggle = (period) => {
    if (disabled) return;

    const newSelected = { ...selectedMA };
    newSelected[`ma${period}`] = !newSelected[`ma${period}`];
    onMAChange(newSelected);
  };

  return (
    <div className="ma-control">
      <span className="ma-control-label">이동평균선</span>
      <div className="ma-checkboxes">
        {maOptions.map(({ period, label, color }) => (
          <label
            key={period}
            className={`ma-checkbox ${selectedMA[`ma${period}`] ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
          >
            <input
              type="checkbox"
              checked={selectedMA[`ma${period}`] || false}
              onChange={() => handleToggle(period)}
              disabled={disabled}
            />
            <span className="ma-checkbox-indicator" style={{ borderColor: color }}>
              <svg viewBox="0 0 12 12">
                <polyline
                  points="1.5 6 4.5 9 10.5 1"
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                />
              </svg>
            </span>
            <span className="ma-checkbox-label">{label}</span>
            <span className="ma-line-preview" style={{ backgroundColor: color }}></span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MovingAverageControl;