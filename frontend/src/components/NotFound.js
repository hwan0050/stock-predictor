import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-emoji">📉</div>
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">페이지를 찾을 수 없습니다</h2>
        <p className="not-found-message">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <div className="not-found-buttons">
          <button className="btn-home" onClick={handleGoHome}>
            🏠 홈으로 돌아가기
          </button>
          <button className="btn-back" onClick={() => navigate(-1)}>
            ← 이전 페이지
          </button>
        </div>
        <div className="not-found-suggestions">
          <p className="suggestions-title">추천 검색어:</p>
          <div className="suggestions-tags">
            <span className="tag" onClick={() => navigate('/')}>AAPL</span>
            <span className="tag" onClick={() => navigate('/')}>TSLA</span>
            <span className="tag" onClick={() => navigate('/')}>GOOGL</span>
            <span className="tag" onClick={() => navigate('/')}>TEST</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;