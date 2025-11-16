import React, { useState, useEffect } from 'react';
import './WatchlistControl.css';

const WatchlistControl = ({ currentSymbol, onQuickSearch }) => {
  const [watchlist, setWatchlist] = useState([]);
  const MAX_ITEMS = 10;

  // 컴포넌트 마운트 시 LocalStorage에서 로드
  useEffect(() => {
    loadWatchlist();
  }, []);

  // LocalStorage에서 관심 종목 로드
  const loadWatchlist = () => {
    try {
      const saved = localStorage.getItem('stock-watchlist');
      if (saved) {
        const parsed = JSON.parse(saved);
        setWatchlist(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error('❌ Failed to load watchlist:', error);
      setWatchlist([]);
    }
  };

  // LocalStorage에 저장
  const saveWatchlist = (newWatchlist) => {
    try {
      localStorage.setItem('stock-watchlist', JSON.stringify(newWatchlist));
      setWatchlist(newWatchlist);
    } catch (error) {
      console.error('❌ Failed to save watchlist:', error);
    }
  };

  // 현재 종목이 관심 종목에 있는지 확인
  const isInWatchlist = (symbol) => {
    return watchlist.includes(symbol);
  };

  // 관심 종목에 추가
  const handleAddToWatchlist = () => {
    if (!currentSymbol) {
      alert('종목을 먼저 검색해주세요.');
      return;
    }

    if (isInWatchlist(currentSymbol)) {
      alert('이미 관심 종목에 추가되어 있습니다.');
      return;
    }

    if (watchlist.length >= MAX_ITEMS) {
      alert(`최대 ${MAX_ITEMS}개까지 추가할 수 있습니다.`);
      return;
    }

    const newWatchlist = [...watchlist, currentSymbol];
    saveWatchlist(newWatchlist);
    console.log('✅ Added to watchlist:', currentSymbol);
  };

  // 관심 종목에서 제거
  const handleRemoveFromWatchlist = () => {
    if (!currentSymbol) return;

    const newWatchlist = watchlist.filter(symbol => symbol !== currentSymbol);
    saveWatchlist(newWatchlist);
    console.log('✅ Removed from watchlist:', currentSymbol);
  };

  // 특정 종목 제거 (칩에서 ✕ 클릭)
  const handleRemoveSymbol = (symbol) => {
    const newWatchlist = watchlist.filter(s => s !== symbol);
    saveWatchlist(newWatchlist);
    console.log('✅ Removed from watchlist:', symbol);
  };

  // 종목 클릭 시 검색
  const handleSymbolClick = (symbol) => {
    if (onQuickSearch) {
      onQuickSearch(symbol);
    }
  };

  return (
    <div className="watchlist-control">
      <h3>⭐ 관심 종목</h3>

      {/* 현재 종목 추가/제거 버튼 */}
      {currentSymbol && (
        <div className="watchlist-current">
          <span className="current-symbol-label">현재: <strong>{currentSymbol}</strong></span>
          {isInWatchlist(currentSymbol) ? (
            <button
              className="watchlist-btn watchlist-btn-remove"
              onClick={handleRemoveFromWatchlist}
            >
              ★ 관심 종목에서 제거
            </button>
          ) : (
            <button
              className="watchlist-btn watchlist-btn-add"
              onClick={handleAddToWatchlist}
              disabled={watchlist.length >= MAX_ITEMS}
            >
              ☆ 관심 종목에 추가
            </button>
          )}
        </div>
      )}

      {/* 관심 종목 목록 */}
      <div className="watchlist-body">
        {watchlist.length === 0 ? (
          <p className="watchlist-empty">
            관심 종목이 없습니다. 종목을 검색한 후 추가해보세요! 💡
          </p>
        ) : (
          <>
            <div className="watchlist-header-label">
              내 관심 종목 ({watchlist.length}/{MAX_ITEMS})
            </div>
            <div className="watchlist-chips">
              {watchlist.map((symbol) => (
                <div
                  key={symbol}
                  className={`watchlist-chip ${currentSymbol === symbol ? 'active' : ''}`}
                >
                  <span
                    className="watchlist-chip-symbol"
                    onClick={() => handleSymbolClick(symbol)}
                  >
                    {symbol}
                  </span>
                  <button
                    className="watchlist-chip-remove"
                    onClick={() => handleRemoveSymbol(symbol)}
                    title={`${symbol} 제거`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WatchlistControl;