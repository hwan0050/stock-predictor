import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { calculateMultipleMA } from '../utils/movingAverage';
import './StockChart.css';

Chart.register(...registerables);

const StockChart = ({ data, symbol, selectedMA = {} }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    console.log('🎨 StockChart useEffect 실행');
    console.log('📊 Selected MA:', selectedMA);

    if (!data) {
      console.log('❌ Data is null/undefined');
      return;
    }

    // data가 객체이고 data.data가 배열이면 추출
    let chartData = data;
    if (!Array.isArray(data) && data.data && Array.isArray(data.data)) {
      console.log('🔧 Data is wrapped in object, extracting data.data');
      chartData = data.data;
    }

    if (!Array.isArray(chartData)) {
      console.log('❌ Data is not an array');
      return;
    }

    if (chartData.length === 0) {
      console.log('❌ Data is empty array');
      return;
    }

    console.log('✅ Data validation passed!');

    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) {
      console.log('❌ Canvas context not found');
      return;
    }

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // 데이터 정렬
    const sortedData = [...chartData].sort((a, b) => new Date(a.date) - new Date(b.date));

    // 라벨 (날짜)
    const labels = sortedData.map(item => {
      const date = new Date(item.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });

    // 가격 데이터
    const prices = sortedData.map(item => item.closePrice || item.close);

    // 🆕 이동평균선 계산
    const maData = calculateMultipleMA(prices, [5, 20, 60]);
    console.log('📈 MA Data calculated:', {
      ma5: maData.ma5?.length,
      ma20: maData.ma20?.length,
      ma60: maData.ma60?.length
    });

    // 거래량 데이터
    const volumes = sortedData.map(item => item.volume || 0);
    const hasVolume = volumes.some(v => v > 0);

    // 거래량 색상
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
    const maxVolume = Math.max(...volumes);

    // 데이터셋 구성
    const datasets = [
      // 가격 라인
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
        yAxisID: 'y-price',
        order: 1
      }
    ];

    // 🆕 이동평균선 추가 (선택된 것만)
    const maConfigs = [
      { key: 'ma5', label: 'MA 5일', color: 'rgb(255, 99, 132)', borderWidth: 2 },
      { key: 'ma20', label: 'MA 20일', color: 'rgb(153, 102, 255)', borderWidth: 2 },
      { key: 'ma60', label: 'MA 60일', color: 'rgb(75, 192, 192)', borderWidth: 2 }
    ];

    maConfigs.forEach(({ key, label, color, borderWidth }) => {
      if (selectedMA[key]) {
        datasets.push({
          label: label,
          data: maData[key],
          borderColor: color,
          backgroundColor: 'transparent',
          borderWidth: borderWidth,
          fill: false,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4,
          yAxisID: 'y-price',
          order: 2
        });
        console.log(`📊 Added ${key} to chart`);
      }
    });

    // 거래량 데이터셋
    if (hasVolume) {
      datasets.push({
        label: '거래량',
        data: volumes,
        type: 'bar',
        backgroundColor: volumeColors,
        borderColor: volumeColors.map(color => color.replace('0.6', '1')),
        borderWidth: 1,
        yAxisID: 'y-volume',
        order: 3
      });
    }

    // Y축 스케일
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

    console.log('🎨 Creating chart with', datasets.length, 'datasets');

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
                pointStyle: 'line',
                boxWidth: 40
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
                  const label = context.dataset.label || '';
                  if (label.includes('MA')) {
                    return `${label}: $${context.parsed.y?.toFixed(2) || 'N/A'}`;
                  } else if (label === '종가 ($)') {
                    return `종가: $${context.parsed.y.toFixed(2)}`;
                  } else if (label === '거래량') {
                    return `거래량: ${context.parsed.y.toLocaleString()}`;
                  }
                  return label;
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
      }
    };
  }, [data, symbol, selectedMA]);

  return (
    <div className="stock-chart">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default StockChart;