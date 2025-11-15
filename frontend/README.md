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
- **차트 타입**: 라인 차트 ↔ 캔들스틱 전환 🆕
- **복합 차트**: 가격 라인 + 거래량 막대 차트
- **이중 Y축**: 왼쪽(가격), 오른쪽(거래량)
- **이동평균선**: MA 5일/20일/60일 선택 표시 🆕
- **차트 비교**: 최대 5개 종목 비교 분석 🆕
- **확대/축소**: 마우스 휠 줌, 드래그 패닝 🆕
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
| **Chart Plugins** | chartjs-chart-financial, chartjs-plugin-zoom 🆕 |
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
│   │   ├── PeriodSelector.js     # 기간 선택 버튼
│   │   ├── PeriodSelector.css
│   │   ├── ChartTypeControl.js   # 🆕 차트 타입 선택
│   │   ├── ChartTypeControl.css  # 🆕
│   │   ├── MovingAverageControl.js  # 🆕 이동평균선 컨트롤
│   │   ├── MovingAverageControl.css # 🆕
│   │   ├── CompareControl.js     # 🆕 차트 비교 컨트롤
│   │   ├── CompareControl.css    # 🆕
│   │   ├── ZoomControl.js        # 🆕 줌/리셋 컨트롤
│   │   ├── ZoomControl.css       # 🆕
│   │   ├── StockCard.js          # 주가 카드
│   │   ├── StockCard.css
│   │   ├── StockChart.js         # 복합 차트 (가격+거래량)
│   │   ├── StockChart.css
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
│   ├── utils/
│   │   └── movingAverage.js      # 🆕 이동평균 계산 유틸
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

### ChartTypeControl (차트 타입) 🆕
```javascript
<ChartTypeControl
  chartType={chartType}
  onChartTypeChange={handleChartTypeChange}
/>
```
- 라인 ↔ 캔들스틱 전환
- 토글 버튼 UI
- 아이콘 + 레이블

### MovingAverageControl (이동평균선) 🆕
```javascript
<MovingAverageControl
  selectedMA={selectedMA}
  onMAChange={handleMAChange}
  disabled={loading}
/>
```
- MA 5일/20일/60일 체크박스
- 차트에 선 추가/제거
- 범례 자동 표시

### CompareControl (차트 비교) 🆕
```javascript
<CompareControl
  compareMode={compareMode}
  onCompareModeChange={handleCompareModeChange}
  compareSymbols={compareSymbols}
  onAddSymbol={handleAddSymbol}
  onRemoveSymbol={handleRemoveSymbol}
  disabled={loading}
/>
```
- 비교 모드 토글
- 종목 추가/제거
- 최대 5개 제한
- 정규화 퍼센트 비교

### ZoomControl (확대/축소) 🆕
```javascript
<ZoomControl
  onReset={handleZoomReset}
  disabled={loading}
/>
```
- 줌 리셋 버튼
- 사용 안내 메시지
- 마우스 휠/드래그 안내

### StockChart (복합 차트)
```javascript
<StockChart 
  data={historyData} 
  symbol={stockData.symbol}
  selectedMA={selectedMA}
  compareMode={compareMode}
  compareData={compareData}
  chartType={chartType}
  onChartReady={handleChartReady}
/>
```
- 가격 라인 + 거래량 막대
- 이중 Y축
- 색상 구분 (상승/하락)
- 이동평균선 지원
- 차트 비교 지원
- 캔들스틱 지원
- 줌/팬 지원

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

### 3. 이동평균선 계산 🆕
```javascript
// utils/movingAverage.js
export const calculateMA = (data, period) => {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push(null);
    } else {
      const sum = data.slice(i - period + 1, i + 1)
        .reduce((a, b) => a + b, 0);
      result.push(sum / period);
    }
  }
  return result;
};
```

### 4. 차트 비교 🆕
```javascript
// 정규화 퍼센트 계산
const basePrice = prices[0];
const normalizedPrices = prices.map(price => 
  ((price / basePrice) * 100)
);
```

### 5. 차트 줌/팬 🆕
```javascript
// chartjs-plugin-zoom 설정
zoom: {
  wheel: { enabled: true, speed: 0.1 },
  pinch: { enabled: true },
  mode: 'x',
},
pan: {
  enabled: true,
  mode: 'x',
}
```

### 6. 복합 차트 구성
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

### 3. 차트 타입 변경 🆕
1. 📈 라인 / 📊 캔들스틱 버튼 클릭
2. 차트 즉시 전환

### 4. 이동평균선 표시 🆕
1. MA 5일/20일/60일 체크박스 선택
2. 차트에 선 자동 추가

### 5. 차트 비교 🆕
1. 📊 비교 모드 버튼 클릭
2. 종목 심볼 입력 후 추가
3. 정규화된 비교 차트 표시

### 6. 차트 확대/축소 🆕
1. **줌**: 마우스 휠 스크롤
2. **이동**: 차트 영역 드래그
3. **리셋**: 🔄 리셋 버튼 클릭

### 7. 다크모드
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

### 캔들스틱이 이상해요
- **알려진 이슈**: 시각화 개선 필요
- **상태**: Phase 6에서 처리 예정

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

- [ ] 캔들스틱 차트 개선
- [ ] 기술적 지표 (RSI, MACD)
- [ ] 관심 종목 저장
- [ ] 포트폴리오 관리
- [ ] 뉴스 피드

---

## 📦 의존성

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-router-dom": "^6.0.0",
    "axios": "^1.6.0",
    "chart.js": "^4.4.0",
    "chartjs-chart-financial": "^0.2.0",
    "chartjs-plugin-zoom": "^2.0.0",
    "hammerjs": "^2.0.8"
  }
}
```

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

---

**버전**: v0.9.2  
**마지막 업데이트**: 2025-11-16