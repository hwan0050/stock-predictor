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
- 🚫 **404 페이지** - 귀여운 에러 페이지
- 🧭 **라우팅** - React Router 기반 네비게이션
- ⚡ **로딩 애니메이션** - Spinner + Skeleton UI
- 🎨 **Shimmer 효과** - 프로페셔널 로딩

### 검색 기능 (NEW!)
- 🔎 **자동완성** - 50개 주요 종목 실시간 검색
- ✅ **유효성 검사** - 실시간 입력 검증
- 🗑️ **히스토리 삭제** - 개별/전체 삭제 기능
- 🔥 **인기 종목** - 원클릭 검색

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
│   │   ├── SearchBar.js           # 검색 바 (자동완성 + 유효성)
│   │   ├── SearchBar.css
│   │   ├── StockCard.js           # 주가 정보 카드
│   │   ├── StockCard.css
│   │   ├── StockChart.js          # 차트 컴포넌트
│   │   ├── StockChart.css
│   │   ├── SearchHistory.js       # 검색 히스토리 (삭제)
│   │   ├── SearchHistory.css
│   │   ├── ThemeToggle.js         # 테마 토글
│   │   ├── ThemeToggle.css
│   │   ├── NotFound.js            # 404 페이지
│   │   ├── NotFound.css
│   │   ├── LoadingSpinner.js      # 로딩 스피너
│   │   ├── LoadingSpinner.css
│   │   ├── SkeletonCard.js        # 카드 skeleton
│   │   ├── SkeletonCard.css
│   │   ├── SkeletonChart.js       # 차트 skeleton
│   │   ├── SkeletonChart.css
│   │   ├── PopularStocks.js       # 인기 종목 (NEW!)
│   │   └── PopularStocks.css
│   │
│   ├── App.js              # 메인 앱 컴포넌트
│   ├── App.css             # 전역 스타일
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
```

### 3. 실행

```bash
# 개발 서버 실행
npm start

# 브라우저 자동 실행
# http://localhost:3000
```

---

## 🎨 주요 컴포넌트

### 1. SearchBar (자동완성 + 유효성 검사) ⭐ NEW!

**Props:**
- `onSearch`: 검색 핸들러 함수
- `disabled`: 로딩 중 비활성화

**기능:**
- 🔎 **자동완성**
    - 50개 주요 종목 데이터
    - 심볼 + 회사명 검색
    - 키보드 네비게이션 (↑↓ Enter ESC)
    - 최대 8개 결과 표시
    - 외부 클릭 시 자동 닫기
- ✅ **유효성 검사**
    - 알파벳만 허용
    - 1-6자 길이 제한
    - 실시간 에러 메시지

### 2. SearchHistory (삭제 기능) ⭐ NEW!

**Props:**
- `onClick`: 히스토리 클릭 핸들러

**기능:**
- 🗑️ **개별 삭제**: ✕ 버튼 클릭
- 🗑️ **전체 삭제**: 전체 삭제 버튼
- ⚠️ **삭제 확인**: window.confirm 대화상자
- 💾 **실시간 저장**: LocalStorage 즉시 업데이트

### 3. PopularStocks ⭐ NEW!

**Props:**
- `onStockClick`: 종목 클릭 핸들러
- `disabled`: 로딩 중 비활성화

**기능:**
- 🔥 **8개 인기 종목** (AAPL, TSLA, GOOGL, etc.)
- 🎨 **이모지 + 심볼 + 이름**
- 🖱️ **원클릭 검색**
- 📱 **반응형 그리드**

### 4. LoadingSpinner

**Props:**
- `message`: 로딩 메시지

**기능:**
- ⭕⭕ 이중 회전 애니메이션
- • • • 튀는 점 애니메이션
- 🌙 다크모드 지원

### 5. SkeletonCard / SkeletonChart

**Props:** 없음

**기능:**
- ✨ Shimmer 효과
- 📐 실제 레이아웃 모방
- 🌙 다크모드 최적화

---

## 🔍 검색 시스템 (NEW!)

### 자동완성 작동 원리

```javascript
// 1. 입력 시 실시간 필터링
const filtered = stocksData.filter(stock => 
  stock.symbol.toLowerCase().startsWith(value.toLowerCase()) ||
  stock.name.toLowerCase().includes(value.toLowerCase())
).slice(0, 8);

// 2. 키보드 네비게이션
- ArrowDown: 다음 항목
- ArrowUp: 이전 항목
- Enter: 선택
- Escape: 닫기

// 3. 외부 클릭 감지
useEffect(() => {
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);
```

### 유효성 검사 규칙

```javascript
// 1. 빈 값 체크
if (!value.trim()) return '검색어를 입력해주세요.';

// 2. 알파벳만 허용
if (!/^[A-Za-z.]+$/.test(value)) return '알파벳만 입력 가능합니다.';

// 3. 길이 제한
if (value.length < 1 || value.length > 6) return '1-6자 이내로 입력해주세요.';
```

### 히스토리 삭제 시스템

```javascript
// 개별 삭제
const removeFromHistory = (symbolToRemove, e) => {
  e.stopPropagation(); // 부모 클릭 방지
  const newHistory = history.filter(symbol => symbol !== symbolToRemove);
  localStorage.setItem('stock-search-history', JSON.stringify(newHistory));
};

// 전체 삭제
const clearAllHistory = () => {
  if (window.confirm('모든 검색 기록을 삭제하시겠습니까?')) {
    localStorage.removeItem('stock-search-history');
  }
};
```

---

## ⚡ 로딩 시스템

### 로딩 단계

```
검색 시작
   ↓
⭕⭕ LoadingSpinner (0.3초)
   ↓
████░░░ SkeletonCard
│││││││ SkeletonChart
   ↓
📊 실제 데이터 표시!
```

---

## 🎨 스타일링

### CSS Variables

```css
:root {
  --bg-color: #f5f7fa;
  --card-bg: #ffffff;
  --text-primary: #2c3e50;
  --border-color: #e0e0e0;
  --primary-color: #3498db;
}

body.dark-mode {
  --bg-color: #1a1a2e;
  --card-bg: #16213e;
  --text-primary: #eaeaea;
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

---

## 🧪 테스트

### 자동완성 테스트 (NEW!)
```
1. 검색창에 "AA" 입력
2. AAPL, AAL 등 자동완성 표시 확인
3. ↓ 키로 이동
4. Enter로 선택
5. 검색 실행 확인
```

### 유효성 검사 테스트 (NEW!)
```
1. "123" 입력 → 에러 메시지
2. "TOOLONG" 입력 → 에러 메시지
3. 빈 값 검색 → 에러 메시지
```

### 히스토리 삭제 테스트 (NEW!)
```
1. 여러 종목 검색
2. 히스토리에 ✕ 버튼 확인
3. 클릭 시 삭제 확인
4. "전체 삭제" 버튼 클릭
5. 확인 대화상자 확인
```

### 인기 종목 테스트 (NEW!)
```
1. Welcome 화면에서 인기 종목 카드 확인
2. Apple 카드 클릭
3. AAPL 검색 실행 확인
```

---

## 📝 체인지로그

### v0.7.5 (2024-11-12)
- ✨ 검색 기능 대폭 개선
- 🔎 자동완성 추가 (50개 종목)
- ✅ 유효성 검사 추가
- 🗑️ 히스토리 삭제 기능
- 🔥 인기 종목 추천 추가

### v0.7.0 (2024-11-12)
- ✨ 로딩 애니메이션 개선
- ⭕ LoadingSpinner 추가
- ✨ Skeleton UI 추가

### v0.6.5 (2024-11-12)
- ✨ 404 페이지 추가
- 🧭 React Router 설치

### v0.6.0 (2024-11-12)
- ✨ 다크모드 추가
- 🐛 버그 수정

---

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch
3. Commit your Changes
4. Push to the Branch
5. Open a Pull Request

---

## 📄 라이센스

MIT License - [LICENSE](../LICENSE) 파일 참고

---

## 📞 문의

- **GitHub**: [@hwan0050](https://github.com/hwan0050)
- **Email**: akma0050@naver.com

---

**Made with ❤️ by hwan0050**