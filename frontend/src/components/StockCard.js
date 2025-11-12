import React from 'react';
import './StockCard.css';

function StockCard({ data }) {
  console.log('🎴 StockCard 렌더링:', data);

  // 데이터 검증
  if (!data) {
    console.error('❌ StockCard: data가 없음!');
    return <div className="stock-card">데이터를 불러올 수 없습니다.</div>;
  }

  // 안전한 값 가져오기
  const symbol = data.symbol || 'N/A';
  const name = data.name || 'Unknown';
  const currentPrice = data.currentPrice || 0;
  const open = data.open || 0;
  const dayHigh = data.dayHigh || 0;
  const dayLow = data.dayLow || 0;
  const previousClose = data.previousClose || 0;
  const change = data.change || 0;
  const changePercent = data.changePercent || 0;
  const volume = data.volume || 0;
  const avgVolume = data.avgVolume || 0;
  const marketCap = data.marketCap || 0;

  // 변동률에 따른 색상
  const changeClass = change >= 0 ? 'positive' : 'negative';
  const changeSymbol = change >= 0 ? '+' : '';

  // 숫자 포맷팅
  const formatNumber = (num) => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(2)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
    return num.toFixed(2);
  };

  return (
    <div className="stock-card">
      <div className="stock-header">
        <div>
          <h2 className="stock-symbol">{symbol}</h2>
          <p className="stock-name">{name}</p>
        </div>
        <div className="stock-price-container">
          <h2 className="stock-price">${currentPrice.toFixed(2)}</h2>
          <p className={`stock-change ${changeClass}`}>
            {changeSymbol}${change.toFixed(2)} ({changeSymbol}{changePercent.toFixed(2)}%)
          </p>
        </div>
      </div>

      <div className="stock-details">
        <div className="detail-item">
          <span className="detail-label">시가</span>
          <span className="detail-value">${open.toFixed(2)}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">전일 종가</span>
          <span className="detail-value">${previousClose.toFixed(2)}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">고가</span>
          <span className="detail-value">${dayHigh.toFixed(2)}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">저가</span>
          <span className="detail-value">${dayLow.toFixed(2)}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">거래량</span>
          <span className="detail-value">{formatNumber(volume)}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">평균 거래량</span>
          <span className="detail-value">{formatNumber(avgVolume)}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">시가총액</span>
          <span className="detail-value">{formatNumber(marketCap)}</span>
        </div>
      </div>
    </div>
  );
}

export default StockCard;