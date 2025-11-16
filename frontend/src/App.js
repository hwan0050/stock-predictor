import React, { useState, useEffect, useRef } from 'react';
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
import PopularStocks from './components/PopularStocks';
import PeriodSelector from './components/PeriodSelector';
import MovingAverageControl from './components/MovingAverageControl';
import CompareControl from './components/CompareControl';
import ChartTypeControl from './components/ChartTypeControl';
import ZoomControl from './components/ZoomControl';
import WatchlistControl from './components/WatchlistControl'; // 🆕 관심 종목 추가
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const API_BASE_PATH = process.env.REACT_APP_API_BASE_PATH || '/api';

function HomePage() {
  const [stockData, setStockData] = useState(null);
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(30);

  const [selectedMA, setSelectedMA] = useState({
    ma5: false,
    ma20: false,
    ma60: false
  });

  const [compareMode, setCompareMode] = useState(false);
  const [compareSymbols, setCompareSymbols] = useState([]);
  const [compareData, setCompareData] = useState([]);

  const [chartType, setChartType] = useState('line');

  // 차트 인스턴스 ref
  const chartInstanceRef = useRef(null);

  const handleSearch = async (symbol) => {
    console.log('🔍 검색 시작:', symbol);

    setLoading(true);
    setShowSkeleton(false);
    setError(null);
    setStockData(null);
    setHistoryData(null);

    const skeletonTimer = setTimeout(() => {
      setShowSkeleton(true);
    }, 300);

    try {
      const stockResponse = await axios.get(`${API_URL}${API_BASE_PATH}/stocks/${symbol}`);
      console.log('✅ Stock Data:', stockResponse.data);
      setStockData(stockResponse.data);

      const historyResponse = await axios.get(
        `${API_URL}${API_BASE_PATH}/stocks/${symbol}/history?days=${selectedPeriod}`
      );
      console.log('✅ History Data:', historyResponse.data);
      setHistoryData(historyResponse.data);

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

  const handlePopularClick = (symbol) => {
    handleSearch(symbol);
  };

  // 🆕 관심 종목에서 빠른 검색
  const handleQuickSearch = (symbol) => {
    console.log('⭐ Quick search from watchlist:', symbol);
    handleSearch(symbol);
  };

  const handlePeriodChange = (newPeriod) => {
    console.log('📅 기간 변경:', newPeriod);
    setSelectedPeriod(newPeriod);

    if (stockData && stockData.symbol) {
      handleSearch(stockData.symbol);
    }

    if (compareMode && compareSymbols.length > 0) {
      fetchCompareData(compareSymbols, newPeriod);
    }
  };

  const handleMAChange = (newMA) => {
    console.log('📊 이동평균선 변경:', newMA);
    setSelectedMA(newMA);
  };

  const handleChartTypeChange = (type) => {
    console.log('📊 차트 타입 변경:', type);
    setChartType(type);

    if (type === 'candlestick' && compareMode) {
      setCompareMode(false);
      setCompareSymbols([]);
      setCompareData([]);
    }
  };

  const handleCompareModeChange = (enabled) => {
    console.log('🔄 비교 모드:', enabled);
    setCompareMode(enabled);

    if (!enabled) {
      setCompareSymbols([]);
      setCompareData([]);
    } else {
      if (stockData && stockData.symbol) {
        setCompareSymbols([stockData.symbol]);
        setCompareData([{ symbol: stockData.symbol, data: historyData }]);
      }
    }
  };

  const handleAddSymbol = async (symbol) => {
    console.log('➕ 종목 추가:', symbol);

    setLoading(true);
    try {
      const historyResponse = await axios.get(
        `${API_URL}${API_BASE_PATH}/stocks/${symbol}/history?days=${selectedPeriod}`
      );

      setCompareSymbols(prev => [...prev, symbol]);
      setCompareData(prev => [...prev, { symbol, data: historyResponse.data }]);

      console.log('✅ 종목 추가 성공:', symbol);
    } catch (err) {
      console.error('❌ 종목 추가 실패:', err);
      alert(`${symbol} 종목을 찾을 수 없습니다.`);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSymbol = (symbol) => {
    console.log('➖ 종목 제거:', symbol);
    setCompareSymbols(prev => prev.filter(s => s !== symbol));
    setCompareData(prev => prev.filter(d => d.symbol !== symbol));
  };

  const fetchCompareData = async (symbols, days) => {
    console.log('🔄 비교 데이터 갱신:', symbols);

    setLoading(true);
    try {
      const promises = symbols.map(symbol =>
        axios.get(`${API_URL}${API_BASE_PATH}/stocks/${symbol}/history?days=${days}`)
      );

      const responses = await Promise.all(promises);
      const newCompareData = symbols.map((symbol, index) => ({
        symbol,
        data: responses[index].data
      }));

      setCompareData(newCompareData);
      console.log('✅ 비교 데이터 갱신 완료');
    } catch (err) {
      console.error('❌ 비교 데이터 갱신 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  // 차트 준비 완료 콜백
  const handleChartReady = (chartInstance) => {
    chartInstanceRef.current = chartInstance;
  };

  // 줌 리셋 핸들러
  const handleZoomReset = () => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.resetZoom();
      console.log('🔄 Zoom reset');
    }
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

        {/* 🆕 관심 종목 컴포넌트 */}
        <WatchlistControl
          currentSymbol={stockData?.symbol}
          onQuickSearch={handleQuickSearch}
        />

        {(stockData || loading) && (
          <>
            <PeriodSelector
              selectedPeriod={selectedPeriod}
              onPeriodChange={handlePeriodChange}
              disabled={loading}
            />

            {!compareMode && (
              <ChartTypeControl
                chartType={chartType}
                onChartTypeChange={handleChartTypeChange}
              />
            )}

            {!compareMode && chartType === 'line' && (
              <MovingAverageControl
                selectedMA={selectedMA}
                onMAChange={handleMAChange}
                disabled={loading}
              />
            )}

            <CompareControl
              compareMode={compareMode}
              onCompareModeChange={handleCompareModeChange}
              compareSymbols={compareSymbols}
              onAddSymbol={handleAddSymbol}
              onRemoveSymbol={handleRemoveSymbol}
              disabled={loading || chartType === 'candlestick'}
            />

            {/* 줌 컨트롤 */}
            <ZoomControl
              onReset={handleZoomReset}
              disabled={loading}
            />
          </>
        )}

        {loading && !showSkeleton && (
          <LoadingSpinner message="검색 중..." />
        )}

        {loading && showSkeleton && (
          <div className="results-container">
            <SkeletonCard />
            <SkeletonChart />
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>⚠️ {error}</p>
          </div>
        )}

        {!loading && stockData && (
          <div className="results-container">
            {!compareMode && <StockCard data={stockData} />}

            {historyData && (
              <StockChart
                data={historyData}
                symbol={stockData.symbol}
                selectedMA={selectedMA}
                compareMode={compareMode}
                compareData={compareData}
                chartType={chartType}
                onChartReady={handleChartReady}
              />
            )}
          </div>
        )}

        {!loading && !error && !stockData && (
          <>
            <div className="welcome-message">
              <p>🔍 주식 심볼을 검색해보세요!</p>
              <p className="example">예시: AAPL, TSLA, GOOGL, TEST</p>
            </div>
            <PopularStocks onStockClick={handlePopularClick} disabled={loading} />
          </>
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