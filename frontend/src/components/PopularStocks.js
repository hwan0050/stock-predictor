import React from 'react';
import './PopularStocks.css';

function PopularStocks({ onStockClick, disabled }) {
  const popularStocks = [
    { symbol: 'AAPL', name: 'Apple', emoji: '🍎' },
    { symbol: 'TSLA', name: 'Tesla', emoji: '⚡' },
    { symbol: 'GOOGL', name: 'Google', emoji: '🔍' },
    { symbol: 'MSFT', name: 'Microsoft', emoji: '💻' },
    { symbol: 'AMZN', name: 'Amazon', emoji: '📦' },
    { symbol: 'NVDA', name: 'NVIDIA', emoji: '🎮' },
    { symbol: 'META', name: 'Meta', emoji: '👥' },
    { symbol: 'NFLX', name: 'Netflix', emoji: '🎬' }
  ];

  return (
    <div className="popular-stocks">
      <div className="popular-header">
        <span className="popular-icon">🔥</span>
        <h3 className="popular-title">인기 종목</h3>
      </div>
      <div className="popular-grid">
        {popularStocks.map((stock) => (
          <button
            key={stock.symbol}
            className="popular-item"
            onClick={() => onStockClick(stock.symbol)}
            disabled={disabled}
            title={`${stock.name} (${stock.symbol})`}
          >
            <span className="stock-emoji">{stock.emoji}</span>
            <div className="stock-info">
              <span className="stock-symbol">{stock.symbol}</span>
              <span className="stock-name">{stock.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default PopularStocks;