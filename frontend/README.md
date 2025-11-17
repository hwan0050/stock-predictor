# 📈 Stock Predictor - Frontend

React 기반의 주가 예측 웹 애플리케이션 프론트엔드입니다.

---

## 🛠️ 기술 스택

- **React** 18.2.0 - UI 프레임워크
- **React Router DOM** 6.x - 클라이언트 라우팅
- **Axios** - HTTP 클라이언트
- **Chart.js** 4.x - 차트 라이브러리
- **react-chartjs-2** - React Chart.js 통합
- **chartjs-plugin-zoom** - 차트 줌 플러그인

---

## 📁 프로젝트 구조

```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/           # React 컴포넌트
│   │   ├── SearchBar.js     # 검색 바
│   │   ├── SearchBar.css
│   │   ├── StockCard.js     # 주식 정보 카드
│   │   ├── StockCard.css
│   │   ├── StockChart.js    # 주가 차트
│   │   ├── StockChart.css
│   │   ├── SearchHistory.js # 검색 히스토리
│   │   ├── ThemeToggle.js   # 다크모드 토글
│   │   ├── LoadingSpinner.js
│   │   ├── SkeletonCard.js  # 로딩 스켈레톤
│   │   ├── SkeletonChart.js
│   │   ├── PopularStocks.js # 인기 종목
│   │   ├── PeriodSelector.js # 기간 선택
│   │   ├── MovingAverageControl.js # 이동평균선
│   │   ├── CompareControl.js # 비교 모드
│   │   ├── ChartTypeControl.js # 차트 타입
│   │   ├── ZoomControl.js   # 줌 컨트롤
│   │   ├── WatchlistControl.js # 관심 종목
│   │   ├── TechnicalIndicators.js # 기술적 지표 선택
│   │   ├── IndicatorChart.js # 지표 차트
│   │   ├── Portfolio.js     # 포트폴리오
│   │   ├── PortfolioItem.js
│   │   ├── AddPositionModal.js
│   │   ├── NewsSection.js   # 뉴스 섹션
│   │   ├── NewsCard.js
│   │   └── NotFound.js
│   ├── utils/               # 유틸리티
│   │   └── technicalIndicators.js # 기술적 지표 계산
│   ├── App.js              # 메인 앱
│   ├── App.css             # 전역 스타일
│   └── index.js            # 엔트리 포인트
├── package.json
└── README.md
```

---

## 🚀 시작하기

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm start
```
브라우저에서 http://localhost:3000 열기

### 빌드
```bash
npm run build
```
최적화된 프로덕션 빌드를 `build/` 폴더에 생성합니다.

### 테스트
```bash
npm test
```

---

## 🎨 주요 컴포넌트

### SearchBar
- 주식 심볼 검색
- 자동완성 (구현 예정)
- 에러 핸들링

### StockCard
- 주식 기본 정보 표시
- 현재가, 변동률, 거래량
- 52주 최고/최저가

### StockChart
- 인터랙티브 차트
- 라인 / 캔들스틱 타입
- 줌 / 리셋 기능
- 이동평균선 오버레이
- 다중 종목 비교

### TechnicalIndicators
- RSI, MACD, 볼린저 밴드 선택
- 체크박스 UI
- 지표 설명 툴팁

### IndicatorChart
- 기술적 지표 차트 렌더링
- RSI: 과매수/과매도 라인
- MACD: Histogram + Signal
- 볼린저 밴드: 상/중/하단 밴드

### Portfolio
- 보유 종목 관리
- 실시간 평가액 계산
- 자산 분포 파이 차트
- LocalStorage 영구 저장

### NewsSection
- 종목별 뉴스 피드
- 날짜 필터 (전체/오늘/이번주)
- 감정 분석 표시
- 외부 링크 연결

---

## 🎨 스타일링

### CSS 변수
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
```

### 다크모드
```css
body.dark-mode {
  --bg-color: #1a1a2e;
  --card-bg: #16213e;
  --text-primary: #eaeaea;
  ...
}
```

---

## 🔧 환경 변수

`.env` 파일 생성:
```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_API_BASE_PATH=/api
```

---

## 📦 주요 의존성

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "axios": "^1.6.2",
  "chart.js": "^4.4.0",
  "react-chartjs-2": "^5.2.0",
  "chartjs-plugin-zoom": "^2.0.1"
}
```

---

## 🎯 기능별 컴포넌트 매핑

### 주가 검색
- `SearchBar` - 검색 입력
- `SearchHistory` - 최근 검색
- `PopularStocks` - 인기 종목

### 차트 표시
- `StockChart` - 메인 차트
- `PeriodSelector` - 기간 선택
- `ChartTypeControl` - 차트 타입
- `ZoomControl` - 줌/리셋

### 기술적 분석
- `MovingAverageControl` - 이동평균선
- `TechnicalIndicators` - 지표 선택
- `IndicatorChart` - 지표 차트

### 비교 분석
- `CompareControl` - 종목 비교

### 개인화
- `WatchlistControl` - 관심 종목
- `Portfolio` - 포트폴리오
- `NewsSection` - 뉴스

### UI/UX
- `LoadingSpinner` - 로딩 표시
- `SkeletonCard` / `SkeletonChart` - 스켈레톤 UI
- `ThemeToggle` - 다크모드 토글
- `NotFound` - 404 페이지

---

## 🔄 상태 관리

현재는 **React Hooks (useState, useEffect)**를 사용합니다.

향후 확장 시 Redux 또는 Context API 고려 가능합니다.

---

## 📱 반응형 디자인

### 브레이크포인트
- **Desktop**: 1200px 이상
- **Tablet**: 768px - 1199px
- **Mobile**: 767px 이하

모든 컴포넌트는 반응형으로 디자인되었습니다.

---

## 🧪 테스트

테스트 라이브러리:
- React Testing Library
- Jest

테스트 파일:
- `*.test.js` 또는 `*.spec.js`

---

## 🚀 배포

### Vercel / Netlify
```bash
npm run build
# build/ 폴더 배포
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npx", "serve", "-s", "build"]
```

---

## 🐛 알려진 이슈

현재 알려진 이슈는 없습니다.

---

## 📝 개발 가이드

### 새 컴포넌트 추가
1. `src/components/` 에 파일 생성
2. CSS 파일 함께 생성
3. `App.js`에 import 및 사용

### API 호출
```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const API_BASE_PATH = process.env.REACT_APP_API_BASE_PATH || '/api';

const response = await axios.get(`${API_URL}${API_BASE_PATH}/stocks/${symbol}`);
```

### LocalStorage 사용
```javascript
// 저장
localStorage.setItem('key', JSON.stringify(data));

// 불러오기
const data = JSON.parse(localStorage.getItem('key') || '[]');
```

---

## 🎨 디자인 시스템

### 색상
- Primary: #3498db (파랑)
- Success: #27ae60 (초록)
- Danger: #e74c3c (빨강)
- Warning: #f39c12 (주황)

### 타이포그래피
- 본문: 'Segoe UI', Tahoma, Geneva, Verdana
- 크기: 14px (기본), 16px (큰 텍스트)

### 간격
- 작은 간격: 8px, 12px
- 중간 간격: 16px, 20px
- 큰 간격: 24px, 32px

---

## 🤝 기여

이슈나 PR은 언제든 환영합니다!

---

**Made with ❤️ by Hwan**