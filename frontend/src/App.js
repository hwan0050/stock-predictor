import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SearchBar from './components/SearchBar';
import StockCard from './components/StockCard';
import StockChart from './components/StockChart';
import SearchHistory from './components/SearchHistory';
import ThemeToggle from './components/ThemeToggle';
import NotFound from './components/NotFound';
import LoadingSpinner from './components/LoadingSpinner';
import SkeletonCard from './components/SkeletonCard';
import SkeletonChart from './components/SkeletonChart';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const API_BASE_PATH = process.env.REACT_APP_API_BASE_PATH || '/api';
const HISTORY_DAYS = parseInt(process.env.REACT_APP_HISTORY_DAYS) || 30;

function HomePage() {
  const [stockData, setStockData] = useState(null);
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (symbol) => {
    console.log('🔍 검색 시작:', symbol);

    setLoading(true);
    setShowSkeleton(false);
    setError(null);
    setStockData(null);
    setHistoryData(null);

    // 약간의 지연 후 Skeleton 표시
    const skeletonTimer = setTimeout(() => {
      setShowSkeleton(true);
    }, 300);

    try {
      // 현재 주가 정보
      const stockResponse = await axios.get(`${API_URL}${API_BASE_PATH}/stocks/${symbol}`);
      console.log('✅ Stock Data:', stockResponse.data);
      setStockData(stockResponse.data);

      // 과거 데이터
      const historyResponse = await axios.get(
        `${API_URL}${API_BASE_PATH}/stocks/${symbol}/history?days=${HISTORY_DAYS}`
      );
      console.log('✅ History Data:', historyResponse.data);
      setHistoryData(historyResponse.data);

      // 검색 히스토리 저장
      saveToHistory(symbol);
    } catch (err) {
      console.error('❌ Error:', err);

      if (err.response) {
        if (err.response.status === 404) {
          setError('주식 종목을 찾을 수 없습니다. 심볼을 확인해주세요.');
        } else if (err.response.status === 429) {
          setError('요청이 너무 많습니다. 잠시 후 다시 시도해주세요.');
        } else {
          setError('데이터를 불러오는 중 오류가 발생했습니다.');
        }
      } else if (err.request) {
        setError('서버에 연결할 수 없습니다. 백엔드 서버를 확인해주세요.');
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      clearTimeout(skeletonTimer);
      setLoading(false);
      setShowSkeleton(false);
    }
  };

  const saveToHistory = (symbol) => {
    try {
      const history = JSON.parse(localStorage.getItem('stock-search-history') || '[]');
      const newHistory = [
        symbol,
        ...history.filter(item => item !== symbol)
      ].slice(0, 5);
      localStorage.setItem('stock-search-history', JSON.stringify(newHistory));
    } catch (err) {
      console.error('Error saving to history:', err);
    }
  };

  const handleHistoryClick = (symbol) => {
    handleSearch(symbol);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📈 주가 예측</h1>
        <p>실시간 주식 정보 검색</p>
      </header>

      <main className="App-main">
        <SearchBar onSearch={handleSearch} disabled={loading} />

        <SearchHistory onClick={handleHistoryClick} />

        {/* 로딩 초기: LoadingSpinner */}
        {loading && !showSkeleton && (
          <LoadingSpinner message="검색 중..." />
        )}

        {/* 로딩 중: Skeleton UI (Card + Chart) */}
        {loading && showSkeleton && (
          <div className="results-container">
            <SkeletonCard />
            <SkeletonChart />
          </div>
        )}

        {/* 에러 */}
        {error && (
          <div className="error-message">
            <p>⚠️ {error}</p>
          </div>
        )}

        {/* 데이터 표시 */}
        {!loading && stockData && (
          <div className="results-container">
            <StockCard data={stockData} />
            {historyData && (
              <StockChart data={historyData} symbol={stockData.symbol} />
            )}
          </div>
        )}

        {/* Welcome 메시지 */}
        {!loading && !error && !stockData && (
          <div className="welcome-message">
            <p>🔍 주식 심볼을 검색해보세요!</p>
            <p className="example">예시: AAPL, TSLA, GOOGL, TEST</p>
          </div>
        )}
      </main>

      <footer className="App-footer">
        <p>Made with ❤️ by hwan0050</p>
      </footer>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('stock-app-theme') || 'light';
    setTheme(savedTheme);
    document.body.className = savedTheme === 'dark' ? 'dark-mode' : '';
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('stock-app-theme', newTheme);
    document.body.className = newTheme === 'dark' ? 'dark-mode' : '';
  };

  return (
    <BrowserRouter>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;