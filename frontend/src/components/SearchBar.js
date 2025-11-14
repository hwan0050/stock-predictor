import React, { useState, useRef, useEffect } from 'react';
import './SearchBar.css';

// 자동완성용 주식 데이터 (TOP 50)
const stocksData = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'META', name: 'Meta Platforms Inc.' },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.' },
  { symbol: 'TSM', name: 'Taiwan Semiconductor' },
  { symbol: 'V', name: 'Visa Inc.' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
  { symbol: 'WMT', name: 'Walmart Inc.' },
  { symbol: 'MA', name: 'Mastercard Inc.' },
  { symbol: 'PG', name: 'Procter & Gamble Co.' },
  { symbol: 'JNJ', name: 'Johnson & Johnson' },
  { symbol: 'HD', name: 'Home Depot Inc.' },
  { symbol: 'BAC', name: 'Bank of America Corp.' },
  { symbol: 'NFLX', name: 'Netflix Inc.' },
  { symbol: 'DIS', name: 'Walt Disney Co.' },
  { symbol: 'ORCL', name: 'Oracle Corporation' },
  { symbol: 'ADBE', name: 'Adobe Inc.' },
  { symbol: 'CRM', name: 'Salesforce Inc.' },
  { symbol: 'CSCO', name: 'Cisco Systems Inc.' },
  { symbol: 'PEP', name: 'PepsiCo Inc.' },
  { symbol: 'KO', name: 'Coca-Cola Co.' },
  { symbol: 'INTC', name: 'Intel Corporation' },
  { symbol: 'NKE', name: 'Nike Inc.' },
  { symbol: 'AMD', name: 'Advanced Micro Devices' },
  { symbol: 'QCOM', name: 'Qualcomm Inc.' },
  { symbol: 'T', name: 'AT&T Inc.' },
  { symbol: 'VZ', name: 'Verizon Communications' },
  { symbol: 'CMCSA', name: 'Comcast Corporation' },
  { symbol: 'UNH', name: 'UnitedHealth Group' },
  { symbol: 'MCD', name: 'McDonald\'s Corporation' },
  { symbol: 'BA', name: 'Boeing Co.' },
  { symbol: 'GE', name: 'General Electric Co.' },
  { symbol: 'F', name: 'Ford Motor Co.' },
  { symbol: 'GM', name: 'General Motors Co.' },
  { symbol: 'PYPL', name: 'PayPal Holdings Inc.' },
  { symbol: 'UBER', name: 'Uber Technologies Inc.' },
  { symbol: 'SQ', name: 'Block Inc.' },
  { symbol: 'ABNB', name: 'Airbnb Inc.' },
  { symbol: 'SPOT', name: 'Spotify Technology' },
  { symbol: 'SNAP', name: 'Snap Inc.' },
  { symbol: 'TWTR', name: 'Twitter Inc.' },
  { symbol: 'COIN', name: 'Coinbase Global Inc.' },
  { symbol: 'RBLX', name: 'Roblox Corporation' },
  { symbol: 'ZM', name: 'Zoom Video Communications' },
  { symbol: 'SHOP', name: 'Shopify Inc.' },
  { symbol: 'TEST', name: 'Test Stock Inc.' }
];

function SearchBar({ onSearch, disabled }) {
  const [symbol, setSymbol] = useState('');
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    // 외부 클릭 시 자동완성 닫기
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const validateSymbol = (value) => {
    if (!value.trim()) {
      return '검색어를 입력해주세요.';
    }

    if (!/^[A-Za-z.]+$/.test(value)) {
      return '알파벳만 입력 가능합니다.';
    }

    if (value.length < 1 || value.length > 6) {
      return '1-6자 이내로 입력해주세요.';
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateSymbol(symbol);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setShowSuggestions(false);
    onSearch(symbol.toUpperCase());
    setSymbol('');
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSymbol(value);
    setSelectedIndex(-1);

    if (error) {
      setError('');
    }

    // 자동완성 필터링
    if (value.length >= 1) {
      const filtered = stocksData.filter(stock =>
        stock.symbol.toLowerCase().startsWith(value.toLowerCase()) ||
        stock.name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8); // 최대 8개

      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (stock) => {
    setSymbol(stock.symbol);
    setShowSuggestions(false);
    setError('');
    onSearch(stock.symbol);
    setSymbol('');
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        if (selectedIndex >= 0) {
          e.preventDefault();
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  return (
    <div className="search-bar-container">
      <form className="search-bar" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            ref={inputRef}
            type="text"
            className={`search-input ${error ? 'error' : ''}`}
            placeholder="주식 심볼 또는 회사명 입력..."
            value={symbol}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (suggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            disabled={disabled}
            maxLength={6}
            autoComplete="off"
          />

          {/* 자동완성 드롭다운 */}
          {showSuggestions && suggestions.length > 0 && (
            <div ref={suggestionsRef} className="suggestions-dropdown">
              {suggestions.map((stock, index) => (
                <div
                  key={stock.symbol}
                  className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                  onClick={() => handleSuggestionClick(stock)}
                >
                  <span className="suggestion-symbol">{stock.symbol}</span>
                  <span className="suggestion-name">{stock.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="search-button"
          disabled={disabled || !symbol.trim()}
        >
          {disabled ? '검색 중...' : '🔍 검색'}
        </button>
      </form>

      {error && (
        <div className="search-error">
          <span className="error-icon">⚠️</span>
          <span className="error-text">{error}</span>
        </div>
      )}
    </div>
  );
}

export default SearchBar;