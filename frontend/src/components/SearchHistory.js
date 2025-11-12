import React from 'react';
import './SearchHistory.css';

function SearchHistory({ history, onSelect, onClear }) {
  if (!history || history.length === 0) {
    return null;
  }

  return (
    <div className="search-history">
      <div className="history-header">
        <h3>최근 검색</h3>
        <button onClick={onClear} className="clear-btn">
          전체 삭제
        </button>
      </div>
      <div className="history-items">
        {history.map((item, index) => (
          <div
            key={index}
            className="history-item"
            onClick={() => onSelect(item)}
          >
            <span className="history-symbol">{item}</span>
            <span className="history-time">최근 검색</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory;