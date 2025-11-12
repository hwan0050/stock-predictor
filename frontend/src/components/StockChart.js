import React, { useEffect, useRef } from 'react';
import './StockChart.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function StockChart({ data, symbol }) {
  console.log('📈 StockChart 렌더링:', data);
  const chartRef = useRef(null);

  // 데이터 검증
  if (!data) {
    console.error('❌ StockChart: data가 없음!');
    return <div className="stock-chart">차트 데이터를 불러올 수 없습니다.</div>;
  }

  // 데이터 구조 확인 및 배열 추출
  let historyArray = [];
  if (Array.isArray(data)) {
    historyArray = data;
  } else if (data.data && Array.isArray(data.data)) {
    historyArray = data.data;
  } else {
    console.error('❌ StockChart: 잘못된 데이터 구조!', data);
    return <div className="stock-chart">차트 데이터 형식이 올바르지 않습니다.</div>;
  }

  if (historyArray.length === 0) {
    return <div className="stock-chart">차트 데이터가 없습니다.</div>;
  }

  console.log('✅ StockChart: 히스토리 배열', historyArray.length, '개');

  // 날짜와 가격 추출
  const labels = historyArray.map(item => {
    if (item.date) {
      const date = new Date(item.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }
    return '';
  }).reverse(); // 최신순으로 정렬

  const prices = historyArray.map(item => item.close || 0).reverse();

  // Chart.js 데이터 설정
  const chartData = {
    labels,
    datasets: [
      {
        label: `${symbol || 'Stock'} 종가`,
        data: prices,
        borderColor: 'rgb(52, 152, 219)',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgb(52, 152, 219)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      }
    ]
  };

  // Chart.js 옵션
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: `${symbol || 'Stock'} - 최근 ${historyArray.length}일 차트`,
        font: {
          size: 18,
          weight: 'bold'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            return `종가: $${context.parsed.y.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value) {
            return '$' + value.toFixed(2);
          }
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return (
    <div className="stock-chart">
      <div className="chart-container">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  );
}

export default StockChart;