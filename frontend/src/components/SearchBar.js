import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [symbol, setSymbol] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (symbol.trim()) {
      onSearch(symbol.toUpperCase());
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="종목 코드 입력 (예: AAPL, 005930)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <button type="submit">검색</button>
      </form>
    </div>
  );
}

export default SearchBar;