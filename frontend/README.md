# 📊 Stock Predictor - Frontend

> React 기반 실시간 주가 조회 웹 애플리케이션 프론트엔드

[![React](https://img.shields.io/badge/React-18.0-61DAFB?logo=react)](https://reactjs.org/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.0-FF6384?logo=chartdotjs)](https://www.chartjs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](../LICENSE)

---

## 🎯 프로젝트 개요

Yahoo Finance API를 활용한 실시간 주가 조회 및 차트 시각화 애플리케이션입니다.

**GitHub**: [https://github.com/hwan0050/stock-predictor](https://github.com/hwan0050/stock-predictor)

---

## ✨ 주요 기능

### 1. 🔍 검색 기능
- **자동완성**: 50개 주요 종목 실시간 필터링
- **유효성 검사**: 정규식 기반 실시간 검증 (알파벳 1-6자)
- **키보드 네비게이션**: ↑↓ 키로 선택, Enter로 검색
- **검색 히스토리**: 최근 5개 검색 기록 (개별/전체 삭제)

### 2. 📈 차트 기능
- **기간 선택**: 7일/30일/90일/1년 버튼 선택
- **복합 차트**: 가격 라인 + 거래량 막대 차트
- **이중 Y축**: 왼쪽(가격), 오른쪽(거래량)
- **색상 구분**: 상승일(초록 🟢), 하락일(빨강 🔴)
- **인터랙티브**: 호버 시 상세 정보 표시
- **반응형**: 모바일/태블릿/데스크톱 최적화

### 3. 💳 카드 UI
- **실시간 정보**: 현재가, 시가, 종가, 고가, 저가
- **변동 표시**: 등락률 및 금액 표시
- **거래 정보**: 거래량, 평균 거래량, 시가총액

### 4. 🎨 UI/UX
- **다크모드**: 버튼 클릭으로 라이트/다크 전환
- **로딩 애니메이션**:
    - LoadingSpinner (이중 회전)
    - Skeleton UI (카드/차트)
- **404 페이지**: 잘못된 경로 처리
- **인기 종목**: 8개 추천 종목 빠른 검색

---

## 🛠 기술 스택

| 카테고리 | 기술 |
|---------|-----|
| **Framework** | React 18 |
| **Routing** | React Router 6 |
| **HTTP Client** | Axios |
| **Charts** | Chart.js 4 |
| **Styling** | CSS3 (CSS Variables) |
| **Build Tool** | Create React App |

---

## 📁 프로젝트 구조

```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── components/
│   │   ├── SearchBar.js          # 검색 바 (자동완성)
│   │   ├── SearchBar.css
│   │   ├── SearchHistory.js      # 검색 히스토리
│   │   ├── SearchHistory.css
│   │   ├── PopularStocks.js      # 인기 종목 추천
│   │   ├── PopularStocks.css
│   │   ├── PeriodSelector.js     # 🆕 기간 선택 버튼
│   │   ├── PeriodSelector.css    # 🆕
│   │   ├── StockCard.js          # 주가 카드
│   │   ├── StockCard.css
│   │   ├── StockChart.js         # 🆕 복합 차트 (가격+거래량)
│   │   ├── StockChart.css        # 🆕
│   │   ├── ThemeToggle.js        # 다크모드 토글
│   │   ├── ThemeToggle.css
│   │   ├── NotFound.js           # 404 페이지
│   │   ├── NotFound.css
│   │   ├── LoadingSpinner.js     # 로딩 스피너
│   │   ├── LoadingSpinner.css
│   │   ├── SkeletonCard.js       # Skeleton UI
│   │   ├── SkeletonCard.css
│   │   ├── SkeletonChart.js
│   │   └── SkeletonChart.css
│   │
│   ├── App.js                    # 메인 앱 (라우팅)
│   ├── App.css                   # 전역 스타일
│   ├── index.js                  # 진입점
│   └── index.css                 # 기본 스타일
│
├── .env                          # 환경변수
├── package.json
└── README.md
```

---

## 🚀 설치 및 실행

### 사전 요구사항
- Node.js 18+
- npm 또는 yarn

### 설치
```bash
cd frontend
npm install
```

### 환경변수 설정
`.env` 파일 생성:
```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_API_BASE_PATH=/api
```

### 개발 서버 실행
```bash
npm start
```
- URL: http://localhost:3000
- 자동 새로고침 활성화

### 프로덕션 빌드
```bash
npm run build
```

---

## 🎨 주요 컴포넌트

### SearchBar (자동완성)
```javascript
<SearchBar 
  onSearch={handleSearch} 
  disabled={loading} 
/>
```
- 50개 주요 종목 자동완성
- 실시간 유효성 검사
- 키보드 네비게이션

### PeriodSelector (기간 선택)
```javascript
<PeriodSelector 
  selectedPeriod={selectedPeriod}
  onPeriodChange={handlePeriodChange}
  disabled={loading}
/>
```
- 7일/30일/90일/1년 버튼
- 선택 시 자동 재조회

### StockChart (복합 차트)
```javascript
<StockChart 
  data={historyData} 
  symbol={stockData.symbol} 
/>
```
- 가격 라인 + 거래량 막대
- 이중 Y축
- 색상 구분 (상승/하락)

---

## 🎨 스타일 시스템

### CSS Variables (다크모드)
```css
:root {
  --bg-color: #f5f7fa;
  --card-bg: #ffffff;
  --text-primary: #2c3e50;
  --text-secondary: #7f8c8d;
  --border-color: #e0e0e0;
  --primary-color: #3498db;
  --success-color: #27ae60;
  --danger-color: #e74c3c;
}

body.dark-mode {
  --bg-color: #1a1a2e;
  --card-bg: #16213e;
  --text-primary: #eaeaea;
  --text-secondary: #bdc3c7;
  --border-color: #2c3e50;
}
```

---

## 📊 API 연동

### API 엔드포인트
```javascript
// 현재 주가
GET /api/stocks/{symbol}

// 과거 데이터
GET /api/stocks/{symbol}/history?days=30
```

### Axios 사용 예시
```javascript
const response = await axios.get(
  `${API_URL}/api/stocks/AAPL`
);
```

---

## 💾 로컬 스토리지

### 저장 데이터
```javascript
// 검색 히스토리 (최대 5개)
localStorage.setItem('stock-search-history', JSON.stringify(['AAPL', 'TSLA']));

// 테마 설정
localStorage.setItem('stock-app-theme', 'dark');
```

---

## 🔧 주요 기능 설명

### 1. 자동완성 검색
```javascript
// 50개 종목 데이터
const stocksData = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  // ... 48개 더
];

// 실시간 필터링
const filtered = stocksData.filter(stock => 
  stock.symbol.toLowerCase().includes(input.toLowerCase()) ||
  stock.name.toLowerCase().includes(input.toLowerCase())
);
```

### 2. 기간 선택 & 차트 갱신
```javascript
const handlePeriodChange = (newPeriod) => {
  setSelectedPeriod(newPeriod);
  if (stockData) {
    fetchStockData(stockData.symbol); // 자동 재조회
  }
};
```

### 3. 복합 차트 구성
```javascript
// Chart.js 복합 차트
const datasets = [
  // 가격 라인
  { type: 'line', yAxisID: 'y-price', data: prices },
  // 거래량 막대
  { type: 'bar', yAxisID: 'y-volume', data: volumes }
];
```

---

## 🎯 사용 방법

### 1. 검색하기
1. 검색창에 심볼 입력 (예: AAPL)
2. 자동완성 목록에서 선택 또는 Enter
3. 주가 카드 & 차트 표시

### 2. 기간 변경
1. 7일/30일/90일/1년 버튼 클릭
2. 차트 자동 갱신

### 3. 다크모드
1. 우측 상단 🌙 버튼 클릭
2. 라이트 ↔ 다크 전환

---

## 📱 반응형 디자인

### 브레이크포인트
```css
/* 태블릿 */
@media (max-width: 768px) {
  .period-buttons { flex-wrap: wrap; }
  .stock-chart { min-height: 300px; }
}

/* 모바일 */
@media (max-width: 480px) {
  .period-button { min-width: calc(50% - 0.25rem); }
  .stock-card { padding: 1rem; }
}
```

---

## 🐛 트러블슈팅

### 차트가 안 보여요
- **원인**: Backend 응답이 객체로 감싸져 있음
- **해결**: StockChart에서 `data.data` 자동 추출

### CORS 에러
- **원인**: Backend CORS 설정 필요
- **해결**: Backend WebConfig 확인

### 환경변수가 안 먹혀요
- **원인**: `.env` 파일 위치 잘못됨
- **해결**: `frontend/` 루트에 `.env` 생성

---

## 🚀 배포

### Vercel (추천)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# build 폴더 업로드
```

---

## 📝 개발 가이드

### 새 컴포넌트 추가
```bash
frontend/src/components/
├── NewComponent.js
└── NewComponent.css
```

### 스타일 가이드
- CSS Variables 사용
- BEM 네이밍 (선택)
- 다크모드 고려

---

## 🔜 로드맵

- [ ] 캔들스틱 차트
- [ ] 이동평균선 (5일/20일/60일)
- [ ] 차트 확대/축소
- [ ] 종목 비교 기능
- [ ] 포트폴리오 관리

---

## 📄 라이센스

MIT License - 자세한 내용은 [LICENSE](../LICENSE) 파일 참조

---

## 👨‍💻 개발자

**Hwan Lee** ([@hwan0050](https://github.com/hwan0050))
- Email: akma0050@naver.com
- GitHub: https://github.com/hwan0050/stock-predictor

---

## 🙏 기여하기

Pull Request를 환영합니다!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Made with ❤️ by hwan0050**