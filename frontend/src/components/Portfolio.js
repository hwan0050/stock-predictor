import React, { useState, useEffect } from 'react';
import './Portfolio.css';
import PortfolioItem from './PortfolioItem';
import AddPositionModal from './AddPositionModal';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

Chart.register(ArcElement, Tooltip, Legend);

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const API_BASE_PATH = process.env.REACT_APP_API_BASE_PATH || '/api';

const Portfolio = () => {
  const [positions, setPositions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [profitPercent, setProfitPercent] = useState(0);

  // LocalStorage에서 포지션 로드
  useEffect(() => {
    loadPositions();
  }, []);

  // 포지션 로드 시 현재가 업데이트
  useEffect(() => {
    if (positions.length > 0) {
      updateCurrentPrices();
    }
  }, [positions.length]);

  const loadPositions = () => {
    try {
      const saved = localStorage.getItem('stock-portfolio');
      if (saved) {
        const parsed = JSON.parse(saved);
        setPositions(parsed);
      }
    } catch (err) {
      console.error('포트폴리오 로드 실패:', err);
    }
  };

  const savePositions = (newPositions) => {
    try {
      localStorage.setItem('stock-portfolio', JSON.stringify(newPositions));
      setPositions(newPositions);
    } catch (err) {
      console.error('포트폴리오 저장 실패:', err);
    }
  };

  // 현재가 업데이트
  const updateCurrentPrices = async () => {
    setLoading(true);
    try {
      const updatedPositions = await Promise.all(
        positions.map(async (pos) => {
          try {
            const response = await axios.get(`${API_URL}${API_BASE_PATH}/stocks/${pos.symbol}`);
            return {
              ...pos,
              currentPrice: response.data.currentPrice
            };
          } catch (err) {
            console.error(`${pos.symbol} 가격 조회 실패:`, err);
            return pos;
          }
        })
      );

      setPositions(updatedPositions);
      calculateTotals(updatedPositions);
    } catch (err) {
      console.error('가격 업데이트 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  // 총계 계산
  const calculateTotals = (posArray) => {
    let totalVal = 0;
    let totalCostVal = 0;

    posArray.forEach(pos => {
      const currentVal = (pos.currentPrice || pos.purchasePrice) * pos.quantity;
      const costVal = pos.purchasePrice * pos.quantity;
      totalVal += currentVal;
      totalCostVal += costVal;
    });

    const profit = totalVal - totalCostVal;
    const percent = totalCostVal > 0 ? (profit / totalCostVal) * 100 : 0;

    setTotalValue(totalVal);
    setTotalCost(totalCostVal);
    setTotalProfit(profit);
    setProfitPercent(percent);
  };

  // 포지션 추가
  const handleAddPosition = (newPosition) => {
    const updatedPositions = [...positions, {
      ...newPosition,
      id: Date.now(),
      currentPrice: newPosition.purchasePrice
    }];
    savePositions(updatedPositions);
    calculateTotals(updatedPositions);
    setShowModal(false);
  };

  // 포지션 삭제
  const handleDeletePosition = (id) => {
    const updatedPositions = positions.filter(pos => pos.id !== id);
    savePositions(updatedPositions);
    calculateTotals(updatedPositions);
  };

  // 포지션 수정
  const handleUpdatePosition = (id, updatedData) => {
    const updatedPositions = positions.map(pos =>
      pos.id === id ? { ...pos, ...updatedData } : pos
    );
    savePositions(updatedPositions);
    calculateTotals(updatedPositions);
  };

  // 파이 차트 데이터
  const getPieChartData = () => {
    const data = positions.map(pos => ({
      label: pos.symbol,
      value: (pos.currentPrice || pos.purchasePrice) * pos.quantity
    }));

    return {
      labels: data.map(d => d.label),
      datasets: [{
        data: data.map(d => d.value),
        backgroundColor: [
          'rgba(52, 152, 219, 0.8)',
          'rgba(46, 204, 113, 0.8)',
          'rgba(155, 89, 182, 0.8)',
          'rgba(241, 196, 15, 0.8)',
          'rgba(231, 76, 60, 0.8)',
          'rgba(52, 73, 94, 0.8)',
          'rgba(26, 188, 156, 0.8)',
          'rgba(230, 126, 34, 0.8)',
          'rgba(149, 165, 166, 0.8)',
          'rgba(236, 240, 241, 0.8)'
        ],
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 2
      }]
    };
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: getComputedStyle(document.documentElement)
            .getPropertyValue('--text-primary').trim(),
          padding: 15,
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: $${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="portfolio-container">
      <div className="portfolio-header">
        <h2>💼 내 포트폴리오</h2>
        <div className="portfolio-actions">
          <button
            className="refresh-button"
            onClick={updateCurrentPrices}
            disabled={loading || positions.length === 0}
          >
            {loading ? '⏳ 업데이트 중...' : '🔄 가격 업데이트'}
          </button>
          <button className="add-button" onClick={() => setShowModal(true)}>
            ➕ 종목 추가
          </button>
        </div>
      </div>

      {positions.length === 0 ? (
        <div className="portfolio-empty">
          <p>📊 포트폴리오가 비어있습니다</p>
          <p className="empty-hint">종목을 추가하여 포트폴리오를 구성해보세요!</p>
          <button className="empty-add-button" onClick={() => setShowModal(true)}>
            ➕ 첫 종목 추가하기
          </button>
        </div>
      ) : (
        <>
          {/* 총계 카드 */}
          <div className="portfolio-summary">
            <div className="summary-card">
              <div className="summary-label">총 평가액</div>
              <div className="summary-value">${totalValue.toFixed(2)}</div>
            </div>
            <div className="summary-card">
              <div className="summary-label">총 투자금</div>
              <div className="summary-value">${totalCost.toFixed(2)}</div>
            </div>
            <div className={`summary-card ${totalProfit >= 0 ? 'profit' : 'loss'}`}>
              <div className="summary-label">총 손익</div>
              <div className="summary-value">
                {totalProfit >= 0 ? '+' : ''}${totalProfit.toFixed(2)}
              </div>
              <div className="summary-percent">
                ({totalProfit >= 0 ? '+' : ''}{profitPercent.toFixed(2)}%)
              </div>
            </div>
          </div>

          {/* 자산 분포 차트 */}
          <div className="portfolio-chart">
            <h3>📊 자산 분포</h3>
            <div className="chart-wrapper">
              <Pie data={getPieChartData()} options={pieChartOptions} />
            </div>
          </div>

          {/* 포지션 목록 */}
          <div className="portfolio-positions">
            <h3>📈 보유 종목</h3>
            {positions.map(position => (
              <PortfolioItem
                key={position.id}
                position={position}
                onDelete={handleDeletePosition}
                onUpdate={handleUpdatePosition}
              />
            ))}
          </div>
        </>
      )}

      {/* 종목 추가 모달 */}
      {showModal && (
        <AddPositionModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddPosition}
        />
      )}
    </div>
  );
};

export default Portfolio;