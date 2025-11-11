import './App.css';
import { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import StockCard from './components/StockCard';
import StockChart from './components/StockChart';

function App() {
  const [stock, setStock] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (symbol) => {
    setLoading(true);
    setError(null);

    try {
      // 백엔드 API 호출 (axios)
      const stockResponse = await axios.get(`http://localhost:8080/api/stocks/${symbol}`);
      setStock(stockResponse.data);

      // History API 호출 (axios)
      try {
        const historyResponse = await axios.get(
          `http://localhost:8080/api/stocks/${symbol}/history`,
          { params: { days: 30 } }
        );

        // 데이터 존재 여부 확인
        if (historyResponse.data && historyResponse.data.data && Array.isArray(historyResponse.data.data)) {
          // 차트 데이터 변환
          const chartDataFormatted = historyResponse.data.data.map(item => ({
            date: item.date ? item.date.substring(5) : '',
            price: item.close || 0
          }));

          setChartData(chartDataFormatted);
        } else {
          console.warn('History data not available');
          setChartData([]);
        }
      } catch (historyError) {
        console.warn('History API failed, skipping chart:', historyError.message);
        setChartData([]);
      }

    } catch (err) {
      console.error('API 호출 실패:', err);

      // axios 에러 메시지 개선
      if (err.response) {
        // 서버가 응답했지만 에러
        setError(`서버 에러: ${err.response.status} - ${err.response.data.message || '데이터를 불러올 수 없습니다.'}`);
      } else if (err.request) {
        // 요청은 보냈지만 응답 없음
        setError('서버에 연결할 수 없습니다. Backend가 실행 중인지 확인해주세요.');
      } else {
        // 요청 설정 중 에러
        setError('요청 설정 중 오류가 발생했습니다.');
      }

      setStock(null);
      setChartData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>📈 주가 예측 플랫폼</h1>
      <p>Stock Prediction Platform</p>

      <SearchBar onSearch={handleSearch} />

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>데이터를 불러오는 중...</p>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {stock && <StockCard stock={stock} />}

      {chartData.length > 0 && <StockChart data={chartData} />}
    </div>
  );
}

export default App;