import React, { useState } from 'react';
import './CompareControl.css';

const CompareControl = ({
  compareMode,
  onCompareModeChange,
  compareSymbols,
  onAddSymbol,
  onRemoveSymbol,
  disabled
}) => {
  const [inputSymbol, setInputSymbol] = useState('');

  const handleAddSymbol = () => {
    const symbol = inputSymbol.trim().toUpperCase();
    if (!symbol) return;

    if (compareSymbols.includes(symbol)) {
      alert('이미 추가된 종목입니다.');
      return;
    }

    if (compareSymbols.length >= 4) {
      alert('최대 5개 종목까지 비교할 수 있습니다.');
      return;
    }

    onAddSymbol(symbol);
    setInputSymbol('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddSymbol();
    }
  };

  return (
    <div className="compare-control">
      <div className="compare-header">
        <button
          className={`compare-toggle ${compareMode ? 'active' : ''}`}
          onClick={() => onCompareModeChange(!compareMode)}
          disabled={disabled}
        >
          {compareMode ? '📊 비교 모드 (켜짐)' : '📊 비교 모드'}
        </button>

        {compareMode && (
          <span className="compare-info">
            💡 여러 종목을 비교해보세요 (최대 5개)
          </span>
        )}
      </div>

      {/* 🆕 비활성화 메시지 추가 */}
      {disabled && (
        <div className="compare-disabled-message">
          캔들스틱 차트는 비교 모드를 지원하지 않습니다. 라인 차트를 선택해주세요.
        </div>
      )}

      {/* 🔧 조건 수정: compareMode && !disabled */}
      {compareMode && !disabled && (
        <div className="compare-body">
          <div className="compare-input-group">
            <input
              type="text"
              className="compare-input"
              placeholder="종목 심볼 입력 (예: MSFT)"
              value={inputSymbol}
              onChange={(e) => setInputSymbol(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              disabled={disabled || compareSymbols.length >= 4}
              maxLength={6}
            />
            <button
              className="compare-add-btn"
              onClick={handleAddSymbol}
              disabled={disabled || !inputSymbol || compareSymbols.length >= 4}
            >
              ➕ 추가
            </button>
          </div>

          {compareSymbols.length > 0 && (
            <div className="compare-symbols-list">
              <span className="compare-list-label">비교 중인 종목:</span>
              <div className="compare-chips">
                {compareSymbols.map((symbol, index) => (
                  <div key={symbol} className="compare-chip" style={{ borderColor: getChartColor(index) }}>
                    <span className="compare-chip-symbol">{symbol}</span>
                    <button
                      className="compare-chip-remove"
                      onClick={() => onRemoveSymbol(symbol)}
                      disabled={disabled}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// 차트 색상 (최대 5개)
const getChartColor = (index) => {
  const colors = [
    '#3498db', // 파랑
    '#e74c3c', // 빨강
    '#2ecc71', // 초록
    '#f39c12', // 주황
    '#9b59b6'  // 보라
  ];
  return colors[index % colors.length];
};

export { getChartColor };
export default CompareControl;