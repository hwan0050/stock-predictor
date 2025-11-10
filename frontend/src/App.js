import './App.css';
import { useState } from 'react';
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
      // 백엔드 API 호출
      const stockResponse = await fetch(`http://localhost:8080/api/stocks/${symbol}`);

      if (!stockResponse.ok) {
        throw new Error(`HTTP error! status: ${stockResponse.status}`);
      }

      const stockData = await stockResponse.json();
      setStock(stockData);

      // History API 호출
      const historyResponse = await fetch(`http://localhost:8080/api/stocks/${symbol}/history?days=30`);

      if (historyResponse.ok) {
        const historyData = await historyResponse.json();

        // 데이터 존재 여부 확인
        if (historyData && historyData.data && Array.isArray(historyData.data)) {
          // 차트 데이터 변환
          const chartDataFormatted = historyData.data.map(item => ({
            date: item.date ? item.date.substring(5) : '', // MM-DD 형식
            price: item.close || 0
          }));

          setChartData(chartDataFormatted);
        } else {
          console.warn('History data not available');
          setChartData([]);
        }
      } else {
        console.warn('History API failed, skipping chart');
        setChartData([]);
      }

    } catch (err) {
      console.error('API 호출 실패:', err);
      setError('데이터를 불러오는데 실패했습니다.');
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
      
      {loading && <p style={{color: 'white'}}>로딩 중...</p>}
      {error && <p style={{color: '#ff6b6b'}}>{error}</p>}
      
      {stock && <StockCard stock={stock} />}
      
      {chartData.length > 0 && <StockChart data={chartData} />}
    </div>
  );
}

export default App;