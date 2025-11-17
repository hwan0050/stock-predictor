import React, { useState, useEffect } from 'react';
import './NewsSection.css';
import NewsCard from './NewsCard';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const API_BASE_PATH = process.env.REACT_APP_API_BASE_PATH || '/api';

const NewsSection = ({ symbol }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, today, week

  useEffect(() => {
    if (symbol) {
      fetchNews(symbol);
    }
  }, [symbol]);

  const fetchNews = async (stockSymbol) => {
    setLoading(true);
    setError(null);

    try {
      // API 엔드포인트 시도
      try {
        const response = await axios.get(`${API_URL}${API_BASE_PATH}/news/${stockSymbol}`);
        setNews(response.data);
      } catch (apiError) {
        // API가 없으면 Mock 데이터 사용
        console.log('뉴스 API 없음, Mock 데이터 사용');
        setNews(getMockNews(stockSymbol));
      }
    } catch (err) {
      console.error('뉴스 조회 실패:', err);
      setError('뉴스를 불러올 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  // Mock 데이터 생성
  const getMockNews = (stockSymbol) => {
    const mockNews = [
      {
        id: 1,
        title: `${stockSymbol} 주가, 실적 호조로 상승세`,
        description: '최근 분기 실적이 시장 예상을 상회하면서 주가가 강세를 보이고 있습니다. 애널리스트들은 향후 전망도 긍정적으로 평가하고 있습니다.',
        source: 'Bloomberg',
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2시간 전
        url: `https://www.bloomberg.com/quote/${stockSymbol}:US`,
        sentiment: 'positive'
      },
      {
        id: 2,
        title: `${stockSymbol}, 신제품 출시 발표`,
        description: '회사는 오늘 혁신적인 신제품 라인업을 공개했습니다. 시장에서는 이번 출시가 매출 증대에 크게 기여할 것으로 전망하고 있습니다.',
        source: 'Reuters',
        publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5시간 전
        url: `https://www.reuters.com/companies/${stockSymbol}`,
        sentiment: 'positive'
      },
      {
        id: 3,
        title: `${stockSymbol} CEO, 경영 전략 발표`,
        description: 'CEO는 최근 인터뷰에서 회사의 장기 비전과 성장 전략을 상세히 설명했습니다. 투자자들의 관심이 집중되고 있습니다.',
        source: 'CNBC',
        publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1일 전
        url: `https://www.cnbc.com/quotes/${stockSymbol}`,
        sentiment: 'neutral'
      },
      {
        id: 4,
        title: `${stockSymbol} 분기 실적 발표 예정`,
        description: '다음 주 분기 실적 발표를 앞두고 있습니다. 애널리스트들은 전년 대비 개선된 실적을 예상하고 있습니다.',
        source: 'Financial Times',
        publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2일 전
        url: `https://markets.ft.com/data/equities/tearsheet/summary?s=${stockSymbol}`,
        sentiment: 'neutral'
      },
      {
        id: 5,
        title: `애널리스트, ${stockSymbol} 목표가 상향`,
        description: '주요 투자은행 애널리스트들이 목표 주가를 상향 조정했습니다. 펀더멘털 개선과 시장 전망이 긍정적이라는 평가입니다.',
        source: 'MarketWatch',
        publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3일 전
        url: `https://www.marketwatch.com/investing/stock/${stockSymbol}`,
        sentiment: 'positive'
      },
      {
        id: 6,
        title: `${stockSymbol}, 시장 점유율 확대`,
        description: '최신 시장 조사 결과에 따르면, 회사의 시장 점유율이 전년 대비 크게 증가한 것으로 나타났습니다.',
        source: 'WSJ',
        publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5일 전
        url: `https://www.wsj.com/market-data/quotes/${stockSymbol}`,
        sentiment: 'positive'
      }
    ];

    return mockNews;
  };

  // 필터링된 뉴스
  const getFilteredNews = () => {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;

    return news.filter(item => {
      const publishedTime = new Date(item.publishedAt).getTime();
      const diff = now - publishedTime;

      if (filter === 'today') {
        return diff < oneDay;
      } else if (filter === 'week') {
        return diff < oneWeek;
      }
      return true; // 'all'
    });
  };

  const filteredNews = getFilteredNews();

  return (
    <div className="news-section">
      <div className="news-header">
        <h3>📰 {symbol} 관련 뉴스</h3>
        <div className="news-filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            전체
          </button>
          <button
            className={`filter-btn ${filter === 'today' ? 'active' : ''}`}
            onClick={() => setFilter('today')}
          >
            오늘
          </button>
          <button
            className={`filter-btn ${filter === 'week' ? 'active' : ''}`}
            onClick={() => setFilter('week')}
          >
            이번주
          </button>
        </div>
      </div>

      {loading && (
        <div className="news-loading">
          <div className="spinner-small"></div>
          <p>뉴스를 불러오는 중...</p>
        </div>
      )}

      {error && (
        <div className="news-error">
          <p>⚠️ {error}</p>
        </div>
      )}

      {!loading && !error && filteredNews.length === 0 && (
        <div className="news-empty">
          <p>📭 표시할 뉴스가 없습니다</p>
        </div>
      )}

      {!loading && !error && filteredNews.length > 0 && (
        <div className="news-grid">
          {filteredNews.map(item => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      )}

      {!loading && !error && filteredNews.length > 0 && (
        <div className="news-footer">
          <p className="news-disclaimer">
            ℹ️ 뉴스는 참고용이며, 투자 판단의 근거로 사용되어서는 안 됩니다.
          </p>
        </div>
      )}
    </div>
  );
};

export default NewsSection;