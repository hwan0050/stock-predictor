import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { calculateRSI, calculateMACD, calculateBollingerBands } from '../utils/technicalIndicators';
import './IndicatorChart.css';

Chart.register(...registerables);

const IndicatorChart = ({
  data,
  symbol,
  selectedIndicators
}) => {
  const rsiChartRef = useRef(null);
  const macdChartRef = useRef(null);
  const bbChartRef = useRef(null);

  const rsiInstanceRef = useRef(null);
  const macdInstanceRef = useRef(null);
  const bbInstanceRef = useRef(null);

  useEffect(() => {
    if (!data) {
      return;
    }

    // 데이터 추출을 먼저 수행
    let chartData = data;
    if (!Array.isArray(data) && data.data && Array.isArray(data.data)) {
      chartData = data.data;
    }

    // 추출된 데이터로 검증
    if (!Array.isArray(chartData) || chartData.length === 0) {
      return;
    }

    const sortedData = [...chartData].sort((a, b) => new Date(a.date) - new Date(b.date));
    const prices = sortedData.map(item => item.closePrice || item.close);
    const labels = sortedData.map(item => {
      const date = new Date(item.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });

    // RSI 차트
    if (selectedIndicators.rsi) {
      renderRSIChart(prices, labels);
    } else {
      destroyChart(rsiInstanceRef);
    }

    // MACD 차트
    if (selectedIndicators.macd) {
      renderMACDChart(prices, labels);
    } else {
      destroyChart(macdInstanceRef);
    }

    // 볼린저 밴드 차트
    if (selectedIndicators.bollingerBands) {
      renderBollingerBandsChart(prices, labels);
    } else {
      destroyChart(bbInstanceRef);
    }

    // Cleanup
    return () => {
      destroyChart(rsiInstanceRef);
      destroyChart(macdInstanceRef);
      destroyChart(bbInstanceRef);
    };

  }, [data, symbol, selectedIndicators]);

  const destroyChart = (instanceRef) => {
    if (instanceRef.current) {
      instanceRef.current.destroy();
      instanceRef.current = null;
    }
  };

  // RSI 차트 렌더링
  const renderRSIChart = (prices, labels) => {
    const ctx = rsiChartRef.current?.getContext('2d');
    if (!ctx) {
      return;
    }

    destroyChart(rsiInstanceRef);

    const rsiValues = calculateRSI(prices, 14);

    rsiInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'RSI (14)',
            data: rsiValues,
            borderColor: 'rgb(155, 89, 182)',
            backgroundColor: 'rgba(155, 89, 182, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 4
          },
          {
            label: '과매수 (70)',
            data: Array(labels.length).fill(70),
            borderColor: 'rgba(231, 76, 60, 0.5)',
            borderWidth: 1,
            borderDash: [5, 5],
            pointRadius: 0,
            fill: false
          },
          {
            label: '과매도 (30)',
            data: Array(labels.length).fill(30),
            borderColor: 'rgba(46, 204, 113, 0.5)',
            borderWidth: 1,
            borderDash: [5, 5],
            pointRadius: 0,
            fill: false
          }
        ]
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
              font: { size: 11 },
              padding: 10,
              usePointStyle: true
            }
          },
          title: {
            display: true,
            text: `${symbol} - RSI (14)`,
            color: getComputedStyle(document.documentElement)
              .getPropertyValue('--text-primary').trim(),
            font: { size: 14, weight: 'bold' },
            padding: { top: 5, bottom: 10 }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 10,
            callbacks: {
              label: function(context) {
                if (context.datasetIndex === 0) {
                  const value = context.parsed.y;
                  if (value === null) return '';
                  let status = '';
                  if (value >= 70) status = ' (과매수)';
                  else if (value <= 30) status = ' (과매도)';
                  return `RSI: ${value.toFixed(2)}${status}`;
                }
                return '';
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(0, 0, 0, 0.05)' },
            ticks: {
              color: getComputedStyle(document.documentElement)
                .getPropertyValue('--text-secondary').trim(),
              maxRotation: 45,
              minRotation: 45,
              font: { size: 10 }
            }
          },
          y: {
            min: 0,
            max: 100,
            grid: { color: 'rgba(0, 0, 0, 0.05)' },
            ticks: {
              color: getComputedStyle(document.documentElement)
                .getPropertyValue('--text-secondary').trim(),
              font: { size: 10 }
            }
          }
        }
      }
    });
  };

  // MACD 차트 렌더링
  const renderMACDChart = (prices, labels) => {
    const ctx = macdChartRef.current?.getContext('2d');
    if (!ctx) return;

    destroyChart(macdInstanceRef);

    const { macd, signal, histogram } = calculateMACD(prices, 12, 26, 9);

    const histogramColors = histogram.map(val => {
      if (val === null) return 'rgba(0, 0, 0, 0)';
      return val >= 0 ? 'rgba(46, 204, 113, 0.6)' : 'rgba(231, 76, 60, 0.6)';
    });

    macdInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Histogram',
            data: histogram,
            backgroundColor: histogramColors,
            borderColor: histogramColors,
            borderWidth: 1,
            type: 'bar',
            order: 3
          },
          {
            label: 'MACD',
            data: macd,
            borderColor: 'rgb(52, 152, 219)',
            backgroundColor: 'transparent',
            borderWidth: 2,
            type: 'line',
            pointRadius: 0,
            pointHoverRadius: 4,
            order: 1
          },
          {
            label: 'Signal',
            data: signal,
            borderColor: 'rgb(231, 76, 60)',
            backgroundColor: 'transparent',
            borderWidth: 2,
            type: 'line',
            pointRadius: 0,
            pointHoverRadius: 4,
            order: 2
          }
        ]
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
              font: { size: 11 },
              padding: 10,
              usePointStyle: true
            }
          },
          title: {
            display: true,
            text: `${symbol} - MACD (12, 26, 9)`,
            color: getComputedStyle(document.documentElement)
              .getPropertyValue('--text-primary').trim(),
            font: { size: 14, weight: 'bold' },
            padding: { top: 5, bottom: 10 }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 10,
            callbacks: {
              label: function(context) {
                const value = context.parsed.y;
                if (value === null) return '';
                return `${context.dataset.label}: ${value.toFixed(4)}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(0, 0, 0, 0.05)' },
            ticks: {
              color: getComputedStyle(document.documentElement)
                .getPropertyValue('--text-secondary').trim(),
              maxRotation: 45,
              minRotation: 45,
              font: { size: 10 }
            }
          },
          y: {
            grid: { color: 'rgba(0, 0, 0, 0.05)' },
            ticks: {
              color: getComputedStyle(document.documentElement)
                .getPropertyValue('--text-secondary').trim(),
              font: { size: 10 }
            }
          }
        }
      }
    });
  };

  // 볼린저 밴드 차트 렌더링
  const renderBollingerBandsChart = (prices, labels) => {
    const ctx = bbChartRef.current?.getContext('2d');
    if (!ctx) return;

    destroyChart(bbInstanceRef);

    const { upper, middle, lower } = calculateBollingerBands(prices, 20, 2);

    bbInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: '상단 밴드',
            data: upper,
            borderColor: 'rgba(231, 76, 60, 0.5)',
            backgroundColor: 'transparent',
            borderWidth: 1.5,
            borderDash: [5, 5],
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 4
          },
          {
            label: '중간 (SMA 20)',
            data: middle,
            borderColor: 'rgb(52, 152, 219)',
            backgroundColor: 'transparent',
            borderWidth: 2,
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 4
          },
          {
            label: '하단 밴드',
            data: lower,
            borderColor: 'rgba(46, 204, 113, 0.5)',
            backgroundColor: 'transparent',
            borderWidth: 1.5,
            borderDash: [5, 5],
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 4
          },
          {
            label: '종가',
            data: prices,
            borderColor: 'rgb(155, 89, 182)',
            backgroundColor: 'rgba(155, 89, 182, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 4
          }
        ]
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
              font: { size: 11 },
              padding: 10,
              usePointStyle: true
            }
          },
          title: {
            display: true,
            text: `${symbol} - 볼린저 밴드 (20, 2)`,
            color: getComputedStyle(document.documentElement)
              .getPropertyValue('--text-primary').trim(),
            font: { size: 14, weight: 'bold' },
            padding: { top: 5, bottom: 10 }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 10,
            callbacks: {
              label: function(context) {
                const value = context.parsed.y;
                if (value === null) return '';
                return `${context.dataset.label}: $${value.toFixed(2)}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(0, 0, 0, 0.05)' },
            ticks: {
              color: getComputedStyle(document.documentElement)
                .getPropertyValue('--text-secondary').trim(),
              maxRotation: 45,
              minRotation: 45,
              font: { size: 10 }
            }
          },
          y: {
            grid: { color: 'rgba(0, 0, 0, 0.05)' },
            ticks: {
              color: getComputedStyle(document.documentElement)
                .getPropertyValue('--text-secondary').trim(),
              font: { size: 10 },
              callback: function(value) {
                return '$' + value.toFixed(2);
              }
            }
          }
        }
      }
    });
  };

  return (
    <div className="indicator-charts">
      {selectedIndicators.rsi && (
        <div className="indicator-chart-container">
          <canvas ref={rsiChartRef}></canvas>
        </div>
      )}

      {selectedIndicators.macd && (
        <div className="indicator-chart-container">
          <canvas ref={macdChartRef}></canvas>
        </div>
      )}

      {selectedIndicators.bollingerBands && (
        <div className="indicator-chart-container">
          <canvas ref={bbChartRef}></canvas>
        </div>
      )}
    </div>
  );
};

export default IndicatorChart;