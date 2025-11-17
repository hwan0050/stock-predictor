import React from 'react';
import './NewsSection.css';

const NewsCard = ({ news }) => {
  // 시간 포맷팅
  const getTimeAgo = (dateString) => {
    const now = Date.now();
    const published = new Date(dateString).getTime();
    const diff = now - published;

    const minutes = Math.floor(diff / (60 * 1000));
    const hours = Math.floor(diff / (60 * 60 * 1000));
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));

    if (minutes < 60) {
      return `${minutes}분 전`;
    } else if (hours < 24) {
      return `${hours}시간 전`;
    } else if (days < 7) {
      return `${days}일 전`;
    } else {
      return new Date(dateString).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  // 감정 아이콘
  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return '📈';
      case 'negative':
        return '📉';
      default:
        return '📊';
    }
  };

  // 감정 색상
  const getSentimentClass = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'sentiment-positive';
      case 'negative':
        return 'sentiment-negative';
      default:
        return 'sentiment-neutral';
    }
  };

  const handleClick = () => {
    if (news.url) {
      window.open(news.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`news-card ${news.url ? 'clickable' : ''}`}
      onClick={handleClick}
    >
      <div className="news-card-header">
        <div className="news-source">
          <span className="source-icon">📰</span>
          <span className="source-name">{news.source}</span>
        </div>
        <div className={`news-sentiment ${getSentimentClass(news.sentiment)}`}>
          {getSentimentIcon(news.sentiment)}
        </div>
      </div>

      <h4 className="news-title">{news.title}</h4>

      <p className="news-description">{news.description}</p>

      <div className="news-card-footer">
        <span className="news-time">{getTimeAgo(news.publishedAt)}</span>
        {news.url && (
          <span className="news-link-icon">🔗</span>
        )}
      </div>
    </div>
  );
};

export default NewsCard;