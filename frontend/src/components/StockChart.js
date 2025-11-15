import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
// 🆕 캔들스틱 import 추가
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import { calculateMultipleMA } from '../utils/movingAverage';
import { getChartColor } from './CompareControl';
import './StockChart.css';

// 🆕 캔들스틱 컨트롤러와 요소 등록
Chart.register(...registerables, CandlestickController, CandlestickElement);

const StockChart = ({
  data,
  symbol,
  selectedMA = {},
  compareMode = false,
  compareData = [], // [{ symbol: 'AAPL', data: [...] }, ...]
  chartType = 'line' // 🆕 차트 타입 prop 추가
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    console.log('🎨 StockChart useEffect 실행');
    console.log('📊 Compare Mode:', compareMode);
    console.log('📊 Compare Data:', compareData);
    console.log('📊 Chart Type:', chartType); // 🆕 추가

    // 비교 모드일 때
    if (compareMode && compareData.length > 0) {
      renderCompareChart();
      return;
    }

    // 🆕 캔들스틱 차트
    if (chartType === 'candlestick') {
      renderCandlestickChart();
      return;
    }

    // 일반 모드 (라인 차트)
    renderNormalChart();

  }, [data, symbol, selectedMA, compareMode, compareData, chartType]); // 🆕 chartType dependency 추가

  // 🆕 비교 모드 차트
  const renderCompareChart = () => {
    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // 모든 데이터 정규화 (첫날 = 100%)
    const normalizedDatasets = compareData.map((item, index) => {
      let chartData = item.data;

      // data.data 구조 처리
      if (!Array.isArray(chartData) && chartData.data && Array.isArray(chartData.data)) {
        chartData = chartData.data;
      }

      if (!Array.isArray(chartData) || chartData.length === 0) {
        return null;
      }

      const sortedData = [...chartData].sort((a, b) => new Date(a.date) - new Date(b.date));
      const prices = sortedData.map(d => d.closePrice || d.close);

      // 정규화: 첫날 가격을 100%로
      const basePrice = prices[0];
      const normalizedPrices = prices.map(price => ((price / basePrice) * 100));

      return {
        label: item.symbol,
        data: normalizedPrices,
        borderColor: getChartColor(index),
        backgroundColor: 'transparent',
        borderWidth: 2.5,
        fill: false,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 5,
        dates: sortedData.map(d => d.date)
      };
    }).filter(Boolean);

    if (normalizedDatasets.length === 0) {
      console.log('❌ No valid compare data');
      return;
    }

    // 가장 긴 데이터셋의 날짜를 라벨로 사용
    const longestDataset = normalizedDatasets.reduce((prev, current) =>
      (current.data.length > prev.data.length) ? current : prev
    );

    const labels = longestDataset.dates.map(dateStr => {
      const date = new Date(dateStr);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });

    console.log('🎨 Creating compare chart...');

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: normalizedDatasets
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
              font: { size: 12, weight: '600' },
              padding: 15,
              usePointStyle: true,
              pointStyle: 'line',
              boxWidth: 40
            }
          },
          title: {
            display: true,
            text: '종목 비교 차트 (정규화 %)',
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
                return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}%`;
              }
            }
          }
        },
        scales: {
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
          y: {
            type: 'linear',
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
              drawBorder: false
            },
            ticks: {
              color: getComputedStyle(document.documentElement)
                .getPropertyValue('--text-secondary').trim(),
              font: { size: 11 },
              callback: function(value) {
                return value.toFixed(1) + '%';
              }
            }
          }
        },
        animation: {
          duration: 750,
          easing: 'easeInOutQuart'
        }
      }
    });

    console.log('✅ Compare chart created!');
  };

  // 🆕 캔들스틱 차트
  const renderCandlestickChart = () => {
    if (!data) {
      console.log('❌ Data is null/undefined');
      return;
    }

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

    console.log('✅ Candlestick data validation passed!');

    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) {
      console.log('❌ Canvas context not found');
      return;
    }

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const sortedData = [...chartData].sort((a, b) => new Date(a.date) - new Date(b.date));

    // 캔들스틱 데이터 준비 (BigDecimal은 자동으로 number로 변환됨)
    const candlestickData = sortedData.map(item => ({
      x: new Date(item.date),
      o: item.open,
      h: item.high,
      l: item.low,
      c: item.close || item.closePrice
    }));

    const volumes = sortedData.map(item => item.volume || 0);
    const hasVolume = volumes.some(v => v > 0);

    const volumeColors = sortedData.map((item, index) => {
      if (index === 0) return 'rgba(52, 152, 219, 0.6)';
      const prevPrice = sortedData[index - 1].close || sortedData[index - 1].closePrice;
      const currPrice = item.close || item.closePrice;
      return currPrice >= prevPrice
        ? 'rgba(39, 174, 96, 0.6)'
        : 'rgba(231, 76, 60, 0.6)';
    });

    const maxVolume = Math.max(...volumes);

    const datasets = [
      {
        label: '가격',
        type: 'candlestick',
        data: candlestickData,
        yAxisID: 'y-price',
        borderColor: {
          up: 'rgb(39, 174, 96)',
          down: 'rgb(231, 76, 60)',
          unchanged: 'rgb(52, 152, 219)'
        },
        backgroundColor: {
          up: 'rgba(39, 174, 96, 0.3)',
          down: 'rgba(231, 76, 60, 0.3)',
          unchanged: 'rgba(52, 152, 219, 0.3)'
        },
        order: 1
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
        order: 3
      });
    }

    const scales = {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'M/d'
          }
        },
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
        }
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

    console.log('🎨 Creating candlestick chart...');

    try {
      chartInstance.current = new Chart(ctx, {
        type: 'candlestick',
        data: {
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
                filter: function(item) {
                  return item.text !== '거래량';
                }
              }
            },
            title: {
              display: true,
              text: hasVolume ? `${symbol} 캔들스틱 & 거래량 차트` : `${symbol} 캔들스틱 차트`,
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
                  if (context.dataset.label === '가격') {
                    const data = context.raw;
                    const change = data.c - data.o;
                    const changePercent = ((change / data.o) * 100).toFixed(2);
                    return [
                      `시가: $${data.o?.toFixed(2)}`,
                      `고가: $${data.h?.toFixed(2)}`,
                      `저가: $${data.l?.toFixed(2)}`,
                      `종가: $${data.c?.toFixed(2)}`,
                      `변동: $${change.toFixed(2)} (${changePercent}%)`
                    ];
                  } else if (context.dataset.label === '거래량') {
                    return `거래량: ${context.parsed.y.toLocaleString()}`;
                  }
                  return '';
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

      console.log('✅ Candlestick chart created successfully!');
    } catch (error) {
      console.error('❌ Candlestick chart creation error:', error);
    }
  };

  // 일반 모드 차트 (기존 코드)
  const renderNormalChart = () => {
    if (!data) {
      console.log('❌ Data is null/undefined');
      return;
    }

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

    const sortedData = [...chartData].sort((a, b) => new Date(a.date) - new Date(b.date));
    const labels = sortedData.map(item => {
      const date = new Date(item.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });

    const prices = sortedData.map(item => item.closePrice || item.close);
    const maData = calculateMultipleMA(prices, [5, 20, 60]);
    const volumes = sortedData.map(item => item.volume || 0);
    const hasVolume = volumes.some(v => v > 0);

    const volumeColors = sortedData.map((item, index) => {
      if (index === 0) return 'rgba(52, 152, 219, 0.6)';
      const prevPrice = sortedData[index - 1].closePrice || sortedData[index - 1].close;
      const currPrice = item.closePrice || item.close;
      return currPrice >= prevPrice
        ? 'rgba(39, 174, 96, 0.6)'
        : 'rgba(231, 76, 60, 0.6)';
    });

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    const pricePadding = priceRange * 0.1;
    const maxVolume = Math.max(...volumes);

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
        yAxisID: 'y-price',
        order: 1
      }
    ];

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
      }
    });

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

    console.log('🎨 Creating normal chart...');

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

      console.log('✅ Normal chart created successfully!');
    } catch (error) {
      console.error('❌ Chart creation error:', error);
    }
  };

  return (
    <div className="stock-chart">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default StockChart;