import React, { useState } from 'react';
import './Portfolio.css';

const PortfolioItem = ({ position, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editQuantity, setEditQuantity] = useState(position.quantity);
  const [editPurchasePrice, setEditPurchasePrice] = useState(position.purchasePrice);

  const currentPrice = position.currentPrice || position.purchasePrice;
  const totalValue = currentPrice * position.quantity;
  const totalCost = position.purchasePrice * position.quantity;
  const profit = totalValue - totalCost;
  const profitPercent = (profit / totalCost) * 100;

  const handleSave = () => {
    onUpdate(position.id, {
      quantity: parseFloat(editQuantity),
      purchasePrice: parseFloat(editPurchasePrice)
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditQuantity(position.quantity);
    setEditPurchasePrice(position.purchasePrice);
    setIsEditing(false);
  };

  return (
    <div className="portfolio-item">
      <div className="item-header">
        <div className="item-symbol">
          <span className="symbol-text">{position.symbol}</span>
          <span className="symbol-name">{position.name || ''}</span>
        </div>
        <div className="item-actions">
          {!isEditing ? (
            <>
              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
                title="수정"
              >
                ✏️
              </button>
              <button
                className="delete-button"
                onClick={() => {
                  if (window.confirm(`${position.symbol} 종목을 삭제하시겠습니까?`)) {
                    onDelete(position.id);
                  }
                }}
                title="삭제"
              >
                🗑️
              </button>
            </>
          ) : (
            <>
              <button className="save-button" onClick={handleSave}>
                ✅ 저장
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                ❌ 취소
              </button>
            </>
          )}
        </div>
      </div>

      {!isEditing ? (
        <div className="item-details">
          <div className="detail-row">
            <span className="detail-label">보유 수량:</span>
            <span className="detail-value">{position.quantity}주</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">평균 매수가:</span>
            <span className="detail-value">${position.purchasePrice.toFixed(2)}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">현재가:</span>
            <span className="detail-value">${currentPrice.toFixed(2)}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">평가액:</span>
            <span className="detail-value highlight">${totalValue.toFixed(2)}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">투자금:</span>
            <span className="detail-value">${totalCost.toFixed(2)}</span>
          </div>
          <div className={`detail-row ${profit >= 0 ? 'profit-row' : 'loss-row'}`}>
            <span className="detail-label">손익:</span>
            <span className="detail-value profit-value">
              {profit >= 0 ? '+' : ''}${profit.toFixed(2)}
              <span className="profit-percent">
                ({profit >= 0 ? '+' : ''}{profitPercent.toFixed(2)}%)
              </span>
            </span>
          </div>
        </div>
      ) : (
        <div className="item-edit">
          <div className="edit-group">
            <label>보유 수량</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={editQuantity}
              onChange={(e) => setEditQuantity(e.target.value)}
            />
          </div>
          <div className="edit-group">
            <label>평균 매수가</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={editPurchasePrice}
              onChange={(e) => setEditPurchasePrice(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioItem;