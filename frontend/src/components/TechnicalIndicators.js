import React, { useState } from 'react';
import './TechnicalIndicators.css';

const TechnicalIndicators = ({
  selectedIndicators,
  onIndicatorsChange,
  disabled
}) => {
  const [showInfo, setShowInfo] = useState(null);

  const indicators = [
    {
      key: 'rsi',
      label: 'RSI',
      params: '(14)',
      description: '상대강도지수: 과매수(70↑) / 과매도(30↓) 판단',
      icon: '📈'
    },
    {
      key: 'macd',
      label: 'MACD',
      params: '(12, 26, 9)',
      description: '이동평균 수렴확산: 추세 전환 신호 포착',
      icon: '📊'
    },
    {
      key: 'bollingerBands',
      label: '볼린저 밴드',
      params: '(20, 2)',
      description: '가격 변동성 밴드: 상단/하단 돌파 신호',
      icon: '📉'
    }
  ];

  const handleToggle = (key) => {
    if (disabled) return;

    const newIndicators = {
      ...selectedIndicators,
      [key]: !selectedIndicators[key]
    };
    onIndicatorsChange(newIndicators);
  };

  const toggleInfo = (key) => {
    setShowInfo(showInfo === key ? null : key);
  };

  return (
    <div className="technical-indicators">
      <h3>📊 기술적 지표</h3>

      <div className="indicators-grid">
        {indicators.map((indicator) => (
          <div key={indicator.key} className="indicator-item">
            <label
              className={`indicator-label ${selectedIndicators[indicator.key] ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
            >
              <input
                type="checkbox"
                checked={selectedIndicators[indicator.key] || false}
                onChange={() => handleToggle(indicator.key)}
                disabled={disabled}
              />
              <span className="indicator-icon">{indicator.icon}</span>
              <div className="indicator-info">
                <span className="indicator-name">
                  {indicator.label} <span className="indicator-params">{indicator.params}</span>
                </span>
                <button
                  type="button"
                  className="info-button"
                  onClick={() => toggleInfo(indicator.key)}
                  title="설명 보기"
                >
                  ℹ️
                </button>
              </div>
            </label>

            {showInfo === indicator.key && (
              <div className="indicator-description">
                {indicator.description}
              </div>
            )}
          </div>
        ))}
      </div>

      {Object.values(selectedIndicators).some(v => v) && (
        <div className="indicators-notice">
          💡 선택한 지표는 차트 아래에 표시됩니다
        </div>
      )}
    </div>
  );
};

export default TechnicalIndicators;