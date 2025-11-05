import './App.css';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import StockCard from './components/StockCard';
import StockChart from './components/StockChart';

function App() {
  const [stock, setStock] = useState(null);
  const [chartData, setChartData] = useState([]);

  const handleSearch = (symbol) => {
    // 임시 주식 데이터
    const mockStock = {
      symbol: symbol,
      name: symbol === 'AAPL' ? 'Apple Inc.' : 
            symbol === '005930' ? '삼성전자' : 
            symbol,
      price: 150.25,
      change: 2.50,
      changePercent: 1.69,
      volume: 45678900,
      marketCap: 2500000000000
    };
    
    // 임시 차트 데이터 (30일)
    const mockChartData = [];
    const today = new Date();
    let basePrice = 140;
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // 랜덤 가격 변동 (±5%)
      const change = (Math.random() - 0.5) * 10;
      basePrice = Math.max(basePrice + change, 100);
      
      mockChartData.push({
        date: `${date.getMonth() + 1}/${date.getDate()}`,
        price: basePrice
      });
    }
    
    setStock(mockStock);
    setChartData(mockChartData);
  };

  return (
    <div className="App">
      <h1>📈 주가 예측 플랫폼</h1>
      <p>Stock Prediction Platform</p>
      
      <SearchBar onSearch={handleSearch} />
      
      {stock && <StockCard stock={stock} />}
      
      {chartData.length > 0 && <StockChart data={chartData} />}
    </div>
  );
}

export default App;