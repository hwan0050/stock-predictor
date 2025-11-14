import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import './StockChart.css';

Chart.register(...registerables);

const StockChart = ({ data, symbol }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    console.log('🎨 StockChart useEffect 실행');
    console.log('📊 Received data:', data);
    console.log('📊 Data type:', typeof data);

    // 🆕 데이터 유효성 검사
    if (!data) {
      console.log('❌ Data is null/undefined');
      return;
    }

    // 🔧 data가 객체이고 data.data가 배열이면 그걸 사용
    let chartData = data;
    if (!Array.isArray(data) && data.data && Array.isArray(data.data)) {
      console.log('🔧 Data is wrapped in object, extracting data.data');
      chartData = data.data;
    }

    console.log('📊 Chart data:', chartData);
    console.log('📊 Is Array:', Array.isArray(chartData));
    console.log('📊 Length:', chartData?.length);

    if (!Array.isArray(chartData)) {
      console.log('❌ Data is not an array');
      return;
    }

    if (chartData.length === 0) {
      console.log('❌ Data is empty array');
      return;
    }

    console.log('✅ Data validation passed!');
    console.log('📊 First item:', chartData[0]);

    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) {
      console.log('❌ Canvas context not found');
      return;
    }

    // 기존 차트 제거
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // 데이터 정렬 (날짜 오름차순)
    const sortedData = [...chartData].sort((a, b) => new Date(a.date) - new Date(b.date));
    console.log('📊 Sorted data length:', sortedData.length);

    // 라벨 (날짜)
    const labels = sortedData.map(item => {
      const date = new Date(item.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });

    // 가격 데이터 (closePrice 또는 close)
    const prices = sortedData.map(item => item.closePrice || item.close);
    console.log('💰 Prices:', prices.slice(0, 3), '...');

    // 거래량 데이터 (volume이 없으면 0으로 처리)
    const volumes = sortedData.map(item => item.volume || 0);
    console.log('📈 Volumes:', volumes.slice(0, 3), '...');

    // 거래량이 모두 0이면 거래량 차트 표시 안 함
    const hasVolume = volumes.some(v => v > 0);
    console.log('📊 Has volume data:', hasVolume);

    // 거래량 색상 (상승: 초록, 하락: 빨강)
    const volumeColors = sortedData.map((item, index) => {
      if (index === 0) return 'rgba(52, 152, 219, 0.6)';
      const prevPrice = sortedData[index - 1].closePrice || sortedData[index - 1].close;
      const currPrice = item.closePrice || item.close;
      return currPrice >= prevPrice
        ? 'rgba(39, 174, 96, 0.6)'
        : 'rgba(231, 76, 60, 0.6)';
    });

    // 최소/최대 가격
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    const pricePadding = priceRange * 0.1;

    // 최대 거래량
    const maxVolume = Math.max(...volumes);

    // 데이터셋 구성
    const datasets = [
      {
        label: '종가 ($)',
        data: prices,
        borderColor: 'rgb(52, 152, 219)',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        borderWidth: 2.5,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgb(52, 152, 219)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        yAxisID: 'y-price'
      }
    ];

    if (hasVolume) {
      datasets.push({
        label: '거래량',
        data: volumes,
        type: 'bar',
        backgroundColor: volumeColors,
        borderColor: volumeColors.map(color => color.replace('0.6', '1')),
        borderWidth: 1,
        yAxisID: 'y-volume',
        order: 2
      });
    }

    const scales = {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          color: getComputedStyle(document.documentElement)
            .getPropertyValue('--text-secondary').trim(),
          maxRotation: 45,
          minRotation: 45,
          font: { size: 11 }
        }
      },
      'y-price': {
        type: 'linear',
        position: 'left',
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          color: getComputedStyle(document.documentElement)
            .getPropertyValue('--text-secondary').trim(),
          font: { size: 11 },
          callback: function(value) {
            return '$' + value.toFixed(2);
          }
        },
        min: minPrice - pricePadding,
        max: maxPrice + pricePadding
      }
    };

    if (hasVolume) {
      scales['y-volume'] = {
        type: 'linear',
        position: 'right',
        grid: {
          drawOnChartArea: false,
          drawBorder: false
        },
        ticks: {
          color: getComputedStyle(document.documentElement)
            .getPropertyValue('--text-secondary').trim(),
          font: { size: 11 },
          callback: function(value) {
            if (value >= 1000000000) return (value / 1000000000).toFixed(1) + 'B';
            if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
            if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
            return value;
          }
        },
        min: 0,
        max: maxVolume * 3
      };
    }

    console.log('🎨 Creating chart...');

    try {
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: getComputedStyle(document.documentElement)
                  .getPropertyValue('--text-primary').trim(),
                font: { size: 12, weight: '500' },
                padding: 15,
                usePointStyle: true,
                pointStyle: 'circle'
              }
            },
            title: {
              display: true,
              text: hasVolume ? `${symbol} 주가 & 거래량 차트` : `${symbol} 주가 차트`,
              color: getComputedStyle(document.documentElement)
                .getPropertyValue('--text-primary').trim(),
              font: { size: 16, weight: 'bold' },
              padding: { top: 10, bottom: 20 }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#fff',
              bodyColor: '#fff',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              borderWidth: 1,
              padding: 12,
              displayColors: true,
              callbacks: {
                label: function(context) {
                  if (context.datasetIndex === 0) {
                    return `종가: $${context.parsed.y.toFixed(2)}`;
                  } else {
                    return `거래량: ${context.parsed.y.toLocaleString()}`;
                  }
                }
              }
            }
          },
          scales: scales,
          animation: {
            duration: 750,
            easing: 'easeInOutQuart'
          }
        }
      });

      console.log('✅ Chart created successfully!');
    } catch (error) {
      console.error('❌ Chart creation error:', error);
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        console.log('🗑️ Chart destroyed');
      }
    };
  }, [data, symbol]);

  return (
    <div className="stock-chart">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default StockChart;