# 📈 Stock Predictor - Frontend

> React 기반 주가 예측 웹 애플리케이션 프론트엔드

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![React Router](https://img.shields.io/badge/React_Router-6.20.0-CA4245?logo=reactrouter)](https://reactrouter.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.4.0-FF6384?logo=chartdotjs)](https://www.chartjs.org/)
[![Axios](https://img.shields.io/badge/Axios-1.6.0-5A29E4?logo=axios)](https://axios-http.com/)

---

## 🎯 개요

Stock Predictor의 프론트엔드는 React를 기반으로 한 SPA(Single Page Application)입니다.  
실시간 주가 정보를 시각화하고 사용자 친화적인 인터페이스를 제공합니다.

---

## ✨ 주요 기능

### 기본 기능
- 🔍 **주식 심볼 검색** - 실시간 주가 정보 조회
- 📊 **데이터 시각화** - Chart.js를 활용한 인터랙티브 차트
- 📱 **반응형 디자인** - 모바일/태블릿/데스크톱 대응
- 💾 **검색 히스토리** - 최근 검색 종목 저장 (최대 5개)

### 고급 기능
- 🌙 **다크모드** - 라이트/다크 테마 전환
- 🚫 **404 페이지** - 귀여운 에러 페이지 (NEW!)
- 🧭 **라우팅** - React Router 기반 네비게이션 (NEW!)
- ⚡ **빠른 로딩** - 최적화된 컴포넌트 렌더링
- 🎨 **부드러운 애니메이션** - CSS 트랜지션 효과
- 🛡️ **에러 처리** - 친절한 에러 메시지

---

## 🏗️ 프로젝트 구조

```
frontend/
├── public/
│   ├── index.html          # HTML 템플릿
│   └── favicon.ico         # 파비콘 (📈)
│
├── src/
│   ├── components/         # React 컴포넌트
│   │   ├── SearchBar.js           # 검색 바
│   │   ├── SearchBar.css
│   │   ├── StockCard.js           # 주가 정보 카드
│   │   ├── StockCard.css
│   │   ├── StockChart.js          # 차트 컴포넌트
│   │   ├── StockChart.css
│   │   ├── SearchHistory.js       # 검색 히스토리
│   │   ├── SearchHistory.css
│   │   ├── ThemeToggle.js         # 테마 토글
│   │   ├── ThemeToggle.css
│   │   ├── NotFound.js            # 404 페이지 (NEW!)
│   │   └── NotFound.css
│   │
│   ├── App.js              # 메인 앱 컴포넌트 (라우팅 설정)
│   ├── App.css             # 전역 스타일 + 다크모드
│   ├── index.js            # 진입점
│   └── index.css           # 기본 스타일
│
├── .env                    # 환경 변수
├── .gitignore
├── package.json            # 의존성 관리
├── package-lock.json
└── README.md               # 이 파일
```

---

## 🚀 시작하기

### 1. 사전 요구사항

- **Node.js**: 18.x 이상
- **npm**: 9.x 이상
- **Backend**: Spring Boot 서버 실행 중 (포트 8080)

### 2. 설치

```bash
# 1. 프로젝트 클론
git clone https://github.com/hwan0050/stock-predictor.git
cd stock-predictor/frontend

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정
# .env 파일이 있는지 확인
# 없으면 아래 내용으로 생성:
# REACT_APP_API_URL=http://localhost:8080
# REACT_APP_API_BASE_PATH=/api
# REACT_APP_HISTORY_DAYS=30
```

### 3. 실행

```bash
# 개발 서버 실행
npm start

# 브라우저 자동 실행
# http://localhost:3000
```

### 4. 빌드

```bash
# 프로덕션 빌드
npm run build

# build/ 폴더에 최적화된 파일 생성
```

---

## 🧭 라우팅 (NEW!)

### React Router 구조

| 경로 | 컴포넌트 | 설명 |
|------|---------|------|
| `/` | HomePage | 메인 검색 페이지 |
| `/*` | NotFound | 404 에러 페이지 |

### 사용 예시

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

---

## 🎨 주요 컴포넌트

### 1. SearchBar
검색 입력 컴포넌트

**Props:**
- `onSearch`: 검색 핸들러 함수
- `disabled`: 로딩 중 비활성화

**기능:**
- Enter 키 검색
- 빈 값 검증
- 대문자 자동 변환

### 2. StockCard
주가 정보 카드 컴포넌트

**Props:**
- `data`: 주가 데이터 객체

**표시 정보:**
- 심볼, 회사명
- 현재가, 변동액, 변동률
- 시가, 고가, 저가, 전일종가
- 거래량, 평균거래량, 시가총액

### 3. StockChart
차트 컴포넌트 (Chart.js)

**Props:**
- `data`: 히스토리 데이터 배열
- `symbol`: 주식 심볼

**기능:**
- 30일 종가 라인 차트
- 인터랙티브 툴팁
- 반응형 차트 크기

### 4. SearchHistory
검색 히스토리 컴포넌트

**Props:**
- `onClick`: 히스토리 클릭 핸들러

**기능:**
- LocalStorage 연동
- 최근 5개 저장
- 중복 제거
- 원클릭 재검색

### 5. ThemeToggle
테마 전환 컴포넌트

**Props:**
- `theme`: 현재 테마 ('light' or 'dark')
- `toggleTheme`: 테마 전환 함수

**기능:**
- 라이트/다크 모드 전환
- LocalStorage 저장
- 부드러운 애니메이션

### 6. NotFound (NEW!)
404 에러 페이지 컴포넌트

**Props:** 없음

**기능:**
- 🏠 홈으로 돌아가기 버튼
- ← 이전 페이지 버튼
- 🏷️ 추천 검색어 태그
- 📉 튀는 이모지 애니메이션
- 🌙 다크모드 지원

---

## 🎨 스타일링

### CSS Variables (다크모드 지원)

```css
:root {
  --bg-color: #f5f7fa;
  --card-bg: #ffffff;
  --text-primary: #2c3e50;
  --text-secondary: #7f8c8d;
  --border-color: #e0e0e0;
  --shadow: rgba(0, 0, 0, 0.1);
  --primary-color: #3498db;
  --success-color: #27ae60;
  --danger-color: #e74c3c;
}

body.dark-mode {
  --bg-color: #1a1a2e;
  --card-bg: #16213e;
  --text-primary: #eaeaea;
  /* ... */
}
```

### 반응형 브레이크포인트

- **Desktop**: 1200px 이상
- **Tablet**: 768px ~ 1199px
- **Mobile**: 767px 이하

---

## 🔌 API 연동

### 환경 변수 (.env)

```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_API_BASE_PATH=/api
REACT_APP_HISTORY_DAYS=30
```

### API 엔드포인트

#### 1. 현재 주가 조회
```javascript
GET /api/stocks/{symbol}

// 응답 예시
{
  "symbol": "AAPL",
  "name": "Apple Inc.",
  "currentPrice": 150.25,
  "change": 2.50,
  "changePercent": 1.69,
  // ...
}
```

#### 2. 과거 데이터 조회
```javascript
GET /api/stocks/{symbol}/history?days=30

// 응답 예시
{
  "symbol": "AAPL",
  "data": [
    {
      "date": "2024-11-12",
      "open": 148.50,
      "high": 151.00,
      "low": 147.80,
      "close": 150.25,
      "volume": 50000000
    },
    // ...
  ],
  "count": 30
}
```

---

## 💾 LocalStorage

### 저장 키

1. **stock-search-history**
    - 검색 히스토리 배열
    - 최대 5개
    - 중복 제거

2. **stock-app-theme**
    - 테마 설정 ('light' or 'dark')
    - 자동 불러오기

```javascript
// 예시
localStorage.getItem('stock-search-history')
// ["AAPL", "TSLA", "GOOGL", "MSFT", "TEST"]

localStorage.getItem('stock-app-theme')
// "dark"
```

---

## 🧪 테스트

### 테스트 시나리오

1. **기본 검색**
   ```
   1. "TEST" 입력
   2. 검색 버튼 클릭
   3. StockCard 표시 확인
   4. Chart 표시 확인
   ```

2. **검색 히스토리**
   ```
   1. 여러 종목 검색 (AAPL, TSLA, etc.)
   2. 히스토리 표시 확인
   3. 히스토리 클릭으로 재검색
   ```

3. **다크모드**
   ```
   1. 우상단 🌙 버튼 클릭
   2. 테마 전환 확인
   3. 새로고침 후 테마 유지 확인
   ```

4. **404 페이지** (NEW!)
   ```
   1. 잘못된 URL 입력 (예: /asdf123)
   2. 404 페이지 표시 확인
   3. 홈으로 버튼 클릭 → 홈 이동 확인
   4. 이전 페이지 버튼 클릭 → 뒤로가기 확인
   5. 추천 태그 클릭 → 홈 이동 확인
   ```

5. **에러 처리**
   ```
   1. 잘못된 심볼 입력
   2. 에러 메시지 확인
   3. Backend 종료 후 에러 확인
   ```

---

## 📦 의존성

### 프로덕션 의존성

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "axios": "^1.6.0",
  "chart.js": "^4.4.0",
  "react-chartjs-2": "^5.2.0"
}
```

### 개발 의존성

```json
{
  "react-scripts": "5.0.1"
}
```

---

## 🐛 문제 해결

### 1. Backend 연결 실패
```
Error: 서버에 연결할 수 없습니다
```

**해결책:**
- Backend 서버 실행 확인 (포트 8080)
- .env 파일 확인
- CORS 설정 확인

### 2. 차트가 안 보임
```
Chart not rendering
```

**해결책:**
- Chart.js 등록 확인
- 데이터 구조 확인
- Console 에러 확인

### 3. 다크모드 안 됨
```
Theme not switching
```

**해결책:**
- ThemeToggle 컴포넌트 확인
- LocalStorage 확인
- CSS Variables 확인

### 4. 404 페이지 안 나옴 (NEW!)
```
404 page not showing
```

**해결책:**
- React Router 설치 확인
- BrowserRouter 설정 확인
- Routes 순서 확인 (/* 는 마지막!)

---

## 🔧 커스터마이징

### 1. 테마 색상 변경

`src/App.css` 수정:
```css
:root {
  --primary-color: #your-color;
  --success-color: #your-color;
  --danger-color: #your-color;
}
```

### 2. 차트 기간 변경

`.env` 수정:
```env
REACT_APP_HISTORY_DAYS=90
```

### 3. API URL 변경

`.env` 수정:
```env
REACT_APP_API_URL=https://your-api-url.com
```

### 4. 404 페이지 커스터마이징

`src/components/NotFound.js` 수정:
- 이모지 변경
- 메시지 수정
- 버튼 추가/삭제
- 추천 검색어 변경

---

## 📊 성능 최적화

- ✅ React.memo 사용 고려
- ✅ useCallback, useMemo 활용
- ✅ Code Splitting
- ✅ Lazy Loading
- ✅ 이미지 최적화

---

## 🚀 배포

### Vercel 배포

```bash
# 1. Vercel CLI 설치
npm install -g vercel

# 2. 배포
vercel

# 3. 프로덕션 배포
vercel --prod
```

### 환경 변수 설정
Vercel Dashboard에서 환경 변수 추가:
- `REACT_APP_API_URL`
- `REACT_APP_API_BASE_PATH`
- `REACT_APP_HISTORY_DAYS`

---

## 📝 체인지로그

### v0.6.5 (2024-11-12)
- ✨ 404 페이지 추가 (NotFound 컴포넌트)
- 🧭 React Router 설치 및 라우팅 설정
- 🎨 페이드인 애니메이션, 튀는 이모지
- 🌙 다크모드 완벽 지원
- 📱 반응형 디자인

### v0.6.0 (2024-11-12)
- ✨ 다크모드 추가
- 🐛 StockCard/StockChart 버그 수정
- 🎨 CSS Variables 도입
- 🔧 에러 처리 강화

### v0.5.0 (2024-11-11)
- ✨ 검색 히스토리 추가
- 🎨 반응형 디자인 개선
- 📄 README 업데이트

### v0.1.0 (2024-11-10)
- 🎉 초기 버전
- ✨ 기본 검색 기능
- 📊 차트 구현

---

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

자세한 내용은 [CONTRIBUTING.md](../CONTRIBUTING.md) 참고

---

## 📄 라이센스

MIT License - [LICENSE](../LICENSE) 파일 참고

---

## 📞 문의

- **GitHub**: [@hwan0050](https://github.com/hwan0050)
- **Email**: akma0050@naver.com
- **Issues**: https://github.com/hwan0050/stock-predictor/issues

---

**Made with ❤️ by hwan0050**