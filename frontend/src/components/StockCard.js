import React from 'react';
import './StockCard.css';

function StockCard({ stock }) {
  if (!stock) return null;

  const isPositive = stock.change >= 0;

  return (
    <div className="stock-card">
      <div className="stock-header">
        <h2>{stock.name}</h2>
        <span className="symbol">{stock.symbol}</span>
      </div>
      
      <div className="stock-price">
        <div className="current-price">
          ${stock.price.toFixed(2)}
        </div>
        <div className={`change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '▲' : '▼'} {Math.abs(stock.change).toFixed(2)} 
          ({Math.abs(stock.changePercent).toFixed(2)}%)
        </div>
      </div>

      <div className="stock-info">
        <div className="info-item">
          <span className="label">거래량</span>
          <span className="value">{stock.volume.toLocaleString()}</span>
        </div>
        <div className="info-item">
          <span className="label">시가총액</span>
          <span className="value">${(stock.marketCap / 1e9).toFixed(2)}B</span>
        </div>
      </div>
    </div>
  );
}

export default StockCard;