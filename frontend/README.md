# 📱 Stock Predictor - Frontend

React 기반 주가 예측 웹 애플리케이션의 프론트엔드

---

## 🎨 기술 스택

- **React** 18.x - UI 라이브러리
- **Chart.js** & **react-chartjs-2** - 차트 시각화
- **Axios** - HTTP 클라이언트
- **CSS3** - 스타일링 (반응형 디자인)

---

## 📂 프로젝트 구조

```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── SearchBar.js        # 검색 바 컴포넌트
│   │   ├── SearchBar.css
│   │   ├── StockCard.js        # 주가 카드 컴포넌트
│   │   ├── StockCard.css
│   │   ├── StockChart.js       # 차트 컴포넌트
│   │   └── StockChart.css
│   ├── App.js                  # 메인 앱 컴포넌트
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

---

## 🚀 시작하기

### 사전 요구사항
- **Node.js** 16.x 이상
- **npm** 8.x 이상

### 설치
```bash
cd frontend
npm install
```

### 개발 서버 실행
```bash
npm start
```
브라우저에서 자동으로 `http://localhost:3000` 열림

### 빌드
```bash
npm run build
```
`build/` 폴더에 최적화된 프로덕션 빌드 생성

---

## 🔧 환경 설정

### Backend API URL
기본적으로 `http://localhost:8080`을 사용합니다.

변경이 필요한 경우 `src/App.js`의 axios 요청 URL을 수정하세요:

```javascript
// App.js
const stockResponse = await axios.get(`http://localhost:8080/api/stocks/${symbol}`);
```

또는 환경 변수 사용:
```bash
# .env 파일 생성
REACT_APP_API_URL=http://your-backend-url.com
```

```javascript
// App.js에서 사용
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
```

---

## 🧩 컴포넌트 설명

### SearchBar
검색창 컴포넌트로, 사용자가 종목 코드를 입력하고 검색할 수 있습니다.

**Props:**
- `onSearch(symbol)`: 검색 시 호출되는 콜백 함수

**사용 예시:**
```javascript
<SearchBar onSearch={handleSearch} />
```

---

### StockCard
주가 정보를 카드 형태로 표시하는 컴포넌트입니다.

**Props:**
- `stock`: 주가 데이터 객체
  ```javascript
  {
    symbol: string,
    name: string,
    currentPrice: number,
    change: number,
    changePercent: number,
    volume: number,
    marketCap: number
  }
  ```

**사용 예시:**
```javascript
<StockCard stock={stockData} />
```

---

### StockChart
주가 히스토리를 차트로 표시하는 컴포넌트입니다.

**Props:**
- `data`: 차트 데이터 배열
  ```javascript
  [
    { date: string, price: number },
    ...
  ]
  ```

**사용 예시:**
```javascript
<StockChart data={chartData} />
```

---

## 🎨 스타일링

### 색상 팔레트
```css
/* 주요 색상 */
--primary: #667eea;          /* 보라색 */
--secondary: #764ba2;        /* 진한 보라색 */
--success: #10b981;          /* 상승 (초록색) */
--danger: #ef4444;           /* 하락 (빨간색) */
--warning: #ff6b6b;          /* 에러 (주황-빨강) */
```

### 반응형 브레이크포인트
```css
/* 모바일 */
@media (max-width: 480px) { ... }

/* 태블릿 */
@media (max-width: 768px) { ... }

/* 데스크톱 */
@media (min-width: 769px) { ... }
```

---

## 📊 상태 관리

현재는 React의 `useState`를 사용한 로컬 상태 관리를 사용합니다.

**주요 상태:**
```javascript
const [stock, setStock] = useState(null);           // 현재 주가 데이터
const [chartData, setChartData] = useState([]);     // 차트 데이터
const [loading, setLoading] = useState(false);      // 로딩 상태
const [error, setError] = useState(null);           // 에러 메시지
```

---

## 🔌 API 연동

### 주가 조회
```javascript
const handleSearch = async (symbol) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/stocks/${symbol}`);
    setStock(response.data);
  } catch (error) {
    console.error('API 호출 실패:', error);
  }
};
```

### 히스토리 조회
```javascript
const historyResponse = await axios.get(
  `http://localhost:8080/api/stocks/${symbol}/history`,
  { params: { days: 30 } }
);
```

---

## ✨ 주요 기능

### 1. 실시간 검색
- 종목 코드 입력 (예: AAPL, MSFT, 005930.KS)
- Enter 키 또는 검색 버튼 클릭
- 자동 대문자 변환

### 2. 로딩 상태
- 회전하는 스피너 애니메이션
- "데이터를 불러오는 중..." 메시지

### 3. 에러 처리
- 서버 연결 실패
- API 에러 (429, 500 등)
- 사용자 친화적 에러 메시지

### 4. 차트 시각화
- 30일 주가 히스토리
- 인터랙티브 툴팁
- 반응형 차트 크기

---

## 🧪 테스트

### 단위 테스트
```bash
npm test
```

### 테스트 커버리지
```bash
npm run test:coverage
```

---

## 📦 의존성

### 주요 패키지
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.6.0",
    "chart.js": "^4.4.0",
    "react-chartjs-2": "^5.2.0"
  }
}
```

---

## 🚧 개발 예정 기능

- [ ] TypeScript 마이그레이션
- [ ] Context API 또는 Redux 상태 관리
- [ ] Tailwind CSS 적용
- [ ] 다크 모드
- [ ] PWA (Progressive Web App)
- [ ] 관심 종목 저장 (LocalStorage)
- [ ] 검색 히스토리
- [ ] 여러 종목 비교 차트
- [ ] 애니메이션 효과
- [ ] 국제화 (i18n)

---

## 🐛 알려진 이슈

### 1. Yahoo API 429 에러
- **문제**: 실제 종목 검색 시 에러 발생
- **원인**: API 호출 제한
- **해결**: TEST 심볼 사용 또는 Backend 캐싱 구현 대기

### 2. 차트 반응속도
- **문제**: 큰 데이터셋에서 차트 렌더링 느림
- **해결 예정**: 데이터 샘플링 또는 lazy loading

---

## 💡 개발 팁

### 1. Mock 데이터 테스트
```javascript
// TEST 심볼로 테스트
검색창에 "TEST" 입력
```

### 2. 개발자 도구 활용
```javascript
// Chrome DevTools
F12 → Console 탭 → 에러 확인
F12 → Network 탭 → API 호출 확인
```

### 3. 반응형 테스트
```javascript
// Chrome DevTools
Ctrl + Shift + M (Device Toolbar)
```

---

## 📚 참고 자료

- [React 공식 문서](https://react.dev/)
- [Chart.js 공식 문서](https://www.chartjs.org/)
- [Axios 문서](https://axios-http.com/)
- [react-chartjs-2 문서](https://react-chartjs-2.js.org/)

---

## 🔗 관련 링크

- [Backend README](../backend/README.md)
- [메인 README](../README.md)
- [CHECKLIST.md](../CHECKLIST.md)

---

**개발 문의:** GitHub Issues를 통해 문의해주세요!