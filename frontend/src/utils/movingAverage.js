// utils/movingAverage.js

/**
 * 이동평균선 계산 함수
 * @param {Array} data - 가격 데이터 배열
 * @param {number} period - 이동평균 기간
 * @returns {Array} - 이동평균 배열 (초기 값은 null)
 */
export const calculateMovingAverage = (data, period) => {
  const result = [];

  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      // 데이터가 부족하면 null
      result.push(null);
    } else {
      // period 개수만큼의 평균 계산
      let sum = 0;
      for (let j = 0; j < period; j++) {
        sum += data[i - j];
      }
      result.push(sum / period);
    }
  }

  return result;
};

/**
 * 여러 기간의 이동평균선 계산
 * @param {Array} prices - 가격 데이터 배열
 * @param {Array} periods - 기간 배열 [5, 20, 60]
 * @returns {Object} - { ma5: [...], ma20: [...], ma60: [...] }
 */
export const calculateMultipleMA = (prices, periods = [5, 20, 60]) => {
  const result = {};

  periods.forEach(period => {
    result[`ma${period}`] = calculateMovingAverage(prices, period);
  });

  return result;
};