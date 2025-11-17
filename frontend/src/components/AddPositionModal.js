import React, { useState } from 'react';
import './Portfolio.css';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const API_BASE_PATH = process.env.REACT_APP_API_BASE_PATH || '/api';

const AddPositionModal = ({ onClose, onAdd }) => {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stockInfo, setStockInfo] = useState(null);

  // 종목 검증
  const handleVerifyStock = async () => {
    if (!symbol.trim()) {
      setError('심볼을 입력해주세요');
      return;
    }

    setLoading(true);
    setError('');
    setStockInfo(null);

    try {
      const response = await axios.get(`${API_URL}${API_BASE_PATH}/stocks/${symbol.toUpperCase()}`);
      setStockInfo(response.data);
      setPurchasePrice(response.data.currentPrice.toString());
      setError('');
    } catch (err) {
      setError('종목을 찾을 수 없습니다. 심볼을 확인해주세요.');
      setStockInfo(null);
    } finally {
      setLoading(false);
    }
  };

  // 종목 추가
  const handleAdd = () => {
    if (!symbol.trim()) {
      setError('심볼을 입력해주세요');
      return;
    }

    if (!quantity || parseFloat(quantity) <= 0) {
      setError('올바른 수량을 입력해주세요');
      return;
    }

    if (!purchasePrice || parseFloat(purchasePrice) <= 0) {
      setError('올바른 매수가를 입력해주세요');
      return;
    }

    const newPosition = {
      symbol: symbol.toUpperCase(),
      name: stockInfo?.name || '',
      quantity: parseFloat(quantity),
      purchasePrice: parseFloat(purchasePrice)
    };

    onAdd(newPosition);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>➕ 종목 추가</h3>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          {/* 심볼 입력 */}
          <div className="form-group">
            <label>종목 심볼</label>
            <div className="input-with-button">
              <input
                type="text"
                placeholder="예: AAPL, TSLA, GOOGL"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === 'Enter' && handleVerifyStock()}
              />
              <button
                className="verify-button"
                onClick={handleVerifyStock}
                disabled={loading || !symbol.trim()}
              >
                {loading ? '⏳' : '🔍 확인'}
              </button>
            </div>
          </div>

          {/* 종목 정보 */}
          {stockInfo && (
            <div className="stock-info-box">
              <div className="info-row">
                <span className="info-label">종목명:</span>
                <span className="info-value">{stockInfo.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">현재가:</span>
                <span className="info-value">${stockInfo.currentPrice.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* 수량 입력 */}
          <div className="form-group">
            <label>보유 수량</label>
            <input
              type="number"
              placeholder="예: 10"
              min="0.01"
              step="0.01"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              disabled={!stockInfo}
            />
          </div>

          {/* 매수가 입력 */}
          <div className="form-group">
            <label>평균 매수가</label>
            <input
              type="number"
              placeholder="예: 150.25"
              min="0.01"
              step="0.01"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              disabled={!stockInfo}
            />
            {stockInfo && (
              <div className="price-hint">
                현재가 기준으로 자동 입력되었습니다. 수정 가능합니다.
              </div>
            )}
          </div>

          {/* 예상 투자금 */}
          {quantity && purchasePrice && (
            <div className="investment-preview">
              <span>예상 투자금:</span>
              <span className="preview-value">
                ${(parseFloat(quantity) * parseFloat(purchasePrice)).toFixed(2)}
              </span>
            </div>
          )}

          {/* 에러 메시지 */}
          {error && (
            <div className="error-box">
              ⚠️ {error}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            취소
          </button>
          <button
            className="add-btn"
            onClick={handleAdd}
            disabled={!stockInfo || !quantity || !purchasePrice}
          >
            추가하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPositionModal;