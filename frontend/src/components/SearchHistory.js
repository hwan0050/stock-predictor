import React, { useState, useEffect } from 'react';
import './SearchHistory.css';

function SearchHistory({ onClick }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    try {
      const saved = localStorage.getItem('stock-search-history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (err) {
      console.error('Error loading history:', err);
    }
  };

  const removeFromHistory = (symbolToRemove, e) => {
    e.stopPropagation(); // 부모 클릭 이벤트 방지

    try {
      const newHistory = history.filter(symbol => symbol !== symbolToRemove);
      setHistory(newHistory);
      localStorage.setItem('stock-search-history', JSON.stringify(newHistory));
    } catch (err) {
      console.error('Error removing from history:', err);
    }
  };

  const clearAllHistory = () => {
    if (window.confirm('모든 검색 기록을 삭제하시겠습니까?')) {
      setHistory([]);
      localStorage.removeItem('stock-search-history');
    }
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="search-history">
      <div className="history-header">
        <span className="history-title">🕒 최근 검색</span>
        <button
          className="clear-all-button"
          onClick={clearAllHistory}
          title="모두 삭제"
        >
          전체 삭제
        </button>
      </div>
      <div className="history-items">
        {history.map((symbol, index) => (
          <div
            key={index}
            className="history-item"
            onClick={() => onClick(symbol)}
          >
            <span className="history-symbol">{symbol}</span>
            <button
              className="remove-button"
              onClick={(e) => removeFromHistory(symbol, e)}
              title="삭제"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory;