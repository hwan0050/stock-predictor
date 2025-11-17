// ============================================
// 기술적 지표 계산 유틸리티
// ============================================

/**
 * RSI (Relative Strength Index) 계산
 * @param {number[]} prices - 종가 배열
 * @param {number} period - 기간 (기본값: 14)
 * @returns {number[]} RSI 값 배열
 */
export const calculateRSI = (prices, period = 14) => {
  if (!prices || prices.length < period + 1) {
    return [];
  }

  const rsi = [];
  const gains = [];
  const losses = [];

  // 1. 가격 변화 계산
  for (let i = 1; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1];
    gains.push(change > 0 ? change : 0);
    losses.push(change < 0 ? -change : 0);
  }

  // 2. 첫 번째 평균 계산
  let avgGain = gains.slice(0, period).reduce((a, b) => a + b, 0) / period;
  let avgLoss = losses.slice(0, period).reduce((a, b) => a + b, 0) / period;

  // 첫 period 구간은 null
  for (let i = 0; i < period; i++) {
    rsi.push(null);
  }

  // 3. RSI 계산
  for (let i = period; i < gains.length; i++) {
    avgGain = (avgGain * (period - 1) + gains[i]) / period;
    avgLoss = (avgLoss * (period - 1) + losses[i]) / period;

    const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    const rsiValue = 100 - (100 / (1 + rs));
    rsi.push(rsiValue);
  }

  return rsi;
};

/**
 * EMA (Exponential Moving Average) 계산
 * @param {number[]} prices - 가격 배열
 * @param {number} period - 기간
 * @returns {number[]} EMA 값 배열
 */
export const calculateEMA = (prices, period) => {
  if (!prices || prices.length < period) {
    return [];
  }

  const ema = [];
  const multiplier = 2 / (period + 1);

  // 첫 번째 EMA는 SMA로 시작
  let sum = 0;
  for (let i = 0; i < period; i++) {
    sum += prices[i];
    ema.push(null);
  }
  ema[period - 1] = sum / period;

  // EMA 계산
  for (let i = period; i < prices.length; i++) {
    const value = (prices[i] - ema[i - 1]) * multiplier + ema[i - 1];
    ema.push(value);
  }

  return ema;
};

/**
 * MACD (Moving Average Convergence Divergence) 계산
 * @param {number[]} prices - 종가 배열
 * @param {number} fastPeriod - 빠른 EMA 기간 (기본값: 12)
 * @param {number} slowPeriod - 느린 EMA 기간 (기본값: 26)
 * @param {number} signalPeriod - Signal 기간 (기본값: 9)
 * @returns {Object} { macd, signal, histogram }
 */
export const calculateMACD = (prices, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) => {
  if (!prices || prices.length < slowPeriod) {
    return { macd: [], signal: [], histogram: [] };
  }

  // 1. Fast EMA & Slow EMA 계산
  const fastEMA = calculateEMA(prices, fastPeriod);
  const slowEMA = calculateEMA(prices, slowPeriod);

  // 2. MACD Line 계산
  const macdLine = [];
  for (let i = 0; i < prices.length; i++) {
    if (fastEMA[i] !== null && slowEMA[i] !== null) {
      macdLine.push(fastEMA[i] - slowEMA[i]);
    } else {
      macdLine.push(null);
    }
  }

  // 3. Signal Line 계산 (MACD의 EMA)
  const validMacd = macdLine.filter(v => v !== null);
  const signalEMA = calculateEMA(validMacd, signalPeriod);

  const signalLine = [];
  let signalIndex = 0;
  for (let i = 0; i < macdLine.length; i++) {
    if (macdLine[i] === null) {
      signalLine.push(null);
    } else {
      signalLine.push(signalEMA[signalIndex] || null);
      signalIndex++;
    }
  }

  // 4. Histogram 계산
  const histogram = [];
  for (let i = 0; i < macdLine.length; i++) {
    if (macdLine[i] !== null && signalLine[i] !== null) {
      histogram.push(macdLine[i] - signalLine[i]);
    } else {
      histogram.push(null);
    }
  }

  return {
    macd: macdLine,
    signal: signalLine,
    histogram: histogram
  };
};

/**
 * 볼린저 밴드 (Bollinger Bands) 계산
 * @param {number[]} prices - 종가 배열
 * @param {number} period - 기간 (기본값: 20)
 * @param {number} stdDev - 표준편차 배수 (기본값: 2)
 * @returns {Object} { upper, middle, lower }
 */
export const calculateBollingerBands = (prices, period = 20, stdDev = 2) => {
  if (!prices || prices.length < period) {
    return { upper: [], middle: [], lower: [] };
  }

  const upper = [];
  const middle = [];
  const lower = [];

  for (let i = 0; i < prices.length; i++) {
    if (i < period - 1) {
      upper.push(null);
      middle.push(null);
      lower.push(null);
      continue;
    }

    // 1. SMA 계산 (중간 밴드)
    const slice = prices.slice(i - period + 1, i + 1);
    const sma = slice.reduce((a, b) => a + b, 0) / period;
    middle.push(sma);

    // 2. 표준편차 계산
    const variance = slice.reduce((sum, price) => sum + Math.pow(price - sma, 2), 0) / period;
    const std = Math.sqrt(variance);

    // 3. 상단/하단 밴드 계산
    upper.push(sma + (std * stdDev));
    lower.push(sma - (std * stdDev));
  }

  return {
    upper: upper,
    middle: middle,
    lower: lower
  };
};

/**
 * SMA (Simple Moving Average) 계산
 * @param {number[]} prices - 가격 배열
 * @param {number} period - 기간
 * @returns {number[]} SMA 값 배열
 */
export const calculateSMA = (prices, period) => {
  if (!prices || prices.length < period) {
    return [];
  }

  const sma = [];

  for (let i = 0; i < prices.length; i++) {
    if (i < period - 1) {
      sma.push(null);
      continue;
    }

    const slice = prices.slice(i - period + 1, i + 1);
    const avg = slice.reduce((a, b) => a + b, 0) / period;
    sma.push(avg);
  }

  return sma;
};

/**
 * 표준편차 계산
 * @param {number[]} values - 값 배열
 * @returns {number} 표준편차
 */
export const calculateStdDev = (values) => {
  if (!values || values.length === 0) return 0;

  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / values.length;
  return Math.sqrt(variance);
};