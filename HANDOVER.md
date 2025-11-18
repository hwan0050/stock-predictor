# 📋 Stock Predictor 프로젝트 인수인계 문서

새로운 대화창에서 프로젝트를 이어받을 때 필요한 모든 정보를 담은 문서입니다.

**작성일:** 2024년 1월  
**프로젝트 상태:** Phase 6 완료 + 배포 완료 (100%) ✅  
**마지막 커밋:** Vercel 배포 및 스크린샷 추가 완료  
**Live Demo:** https://stock-predictor-89hovs9w2-hwan0050s-projects.vercel.app

---

## 🎯 프로젝트 개요

### 프로젝트명
**Stock Predictor** - 주가 예측 웹 애플리케이션

### 목적
실시간 주식 데이터 조회, 기술적 분석, 포트폴리오 관리, 뉴스 피드를 제공하는 풀스택 웹 애플리케이션

### 기술 스택
- **Frontend:** React 18.2.0, Chart.js, Axios
- **Backend:** Spring Boot 3.2.0, Yahoo Finance API
- **저장소:** LocalStorage (클라이언트 사이드)

---

## 📊 현재 상태

### 완료율
**100%** - 모든 Phase 완료 ✅

### 최근 작업
1. **Phase 6-D** (포트폴리오 관리) - 완료
2. **Phase 6-E** (뉴스/공시 정보) - 완료
3. **Vercel 배포** - 완료 ⭐
4. 모든 문서 업데이트 완료

### 동작 확인
- ✅ 주가 검색 정상 작동
- ✅ 차트 표시 정상 작동
- ✅ 기술적 지표 정상 작동
- ✅ 포트폴리오 정상 작동
- ✅ 뉴스 피드 정상 작동
- ✅ 다크모드 정상 작동
- ✅ 반응형 디자인 정상
- ✅ Vercel 배포 정상 ⭐

---

## 🏗️ 프로젝트 구조

```
stock-predictor/
├── frontend/                          # React 프론트엔드
│   ├── src/
│   │   ├── components/               # 컴포넌트 (25개+)
│   │   │   ├── SearchBar.js         # 검색 바
│   │   │   ├── StockCard.js         # 주식 정보 카드
│   │   │   ├── StockChart.js        # 메인 차트 (라인/캔들)
│   │   │   ├── SearchHistory.js     # 검색 히스토리
│   │   │   ├── PopularStocks.js     # 인기 종목
│   │   │   ├── PeriodSelector.js    # 기간 선택
│   │   │   ├── MovingAverageControl.js # 이동평균선
│   │   │   ├── CompareControl.js    # 종목 비교
│   │   │   ├── ChartTypeControl.js  # 차트 타입
│   │   │   ├── ZoomControl.js       # 줌/리셋
│   │   │   ├── WatchlistControl.js  # 관심 종목 ⭐
│   │   │   ├── TechnicalIndicators.js # 지표 선택
│   │   │   ├── IndicatorChart.js    # 지표 차트
│   │   │   ├── Portfolio.js         # 포트폴리오 메인 💼
│   │   │   ├── PortfolioItem.js     # 포트폴리오 아이템
│   │   │   ├── AddPositionModal.js  # 종목 추가 모달
│   │   │   ├── NewsSection.js       # 뉴스 섹션 📰
│   │   │   ├── NewsCard.js          # 뉴스 카드
│   │   │   ├── ThemeToggle.js       # 다크모드 토글
│   │   │   ├── LoadingSpinner.js    # 로딩
│   │   │   ├── SkeletonCard.js      # 스켈레톤 UI
│   │   │   ├── SkeletonChart.js
│   │   │   └── NotFound.js          # 404
│   │   ├── utils/
│   │   │   └── technicalIndicators.js # RSI, MACD, BB 계산
│   │   ├── App.js                   # 메인 앱 (탭 시스템)
│   │   ├── App.css                  # 전역 스타일
│   │   └── index.js
│   ├── package.json
│   └── .env
│
├── backend/                          # Spring Boot 백엔드
│   ├── src/main/java/com/stock/
│   │   ├── controller/
│   │   │   └── StockController.java # REST API
│   │   ├── service/
│   │   │   └── StockService.java    # 비즈니스 로직
│   │   ├── model/
│   │   │   ├── StockData.java       # 데이터 모델
│   │   │   └── HistoricalData.java
│   │   ├── config/
│   │   │   └── CorsConfig.java      # CORS 설정
│   │   └── StockPredictorApplication.java
│   ├── pom.xml
│   └── application.properties
│
├── docs/                             # 문서
│   ├── CHECKLIST.md                 # 개발 체크리스트
│   ├── GIT_WORKFLOW.md              # Git 작업 정책
│   └── HANDOVER.md                  # 이 파일
│
├── README.md                         # 프로젝트 README
└── .gitignore
```

---

## 🚀 빠른 시작 가이드

### 1. 저장소 클론
```bash
git clone https://github.com/hwan0050/stock-predictor.git
cd stock-predictor
```

### 2. 백엔드 실행
```bash
cd backend
./mvnw spring-boot:run
# 서버: http://localhost:8080
```

### 3. 프론트엔드 실행
```bash
cd frontend
npm install
npm start
# 앱: http://localhost:3000
```

### 4. 환경 변수 확인
`frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_API_BASE_PATH=/api
```

---

## 🎨 주요 기능 목록

### ✅ 완료된 기능

#### 1. 주가 검색 및 조회
- 심볼 검색 (AAPL, TSLA, GOOGL 등)
- 실시간 주가 정보 표시
- 검색 히스토리 (최근 5개, LocalStorage)
- 인기 종목 빠른 선택

#### 2. 차트 시각화
- **라인 차트**: 종가 + 거래량
- **캔들스틱 차트**: OHLC 데이터
- **이동평균선**: MA5, MA20, MA60
- **기간 선택**: 7일, 30일, 90일, 365일, 전체
- **줌/팬**: 마우스 휠, 드래그
- **리셋**: 원래 보기로 복원

#### 3. 기술적 지표 📊
- **RSI** (14일): 과매수(70)/과매도(30) 판단
- **MACD** (12,26,9): 이동평균 수렴확산
- **볼린저 밴드** (20,2): 가격 변동성 분석
- 독립된 IndicatorChart로 표시
- 선택적 표시 (체크박스)

#### 4. 종목 비교
- 다중 종목 동시 비교
- 정규화된 차트 (100 기준)
- 동적 종목 추가/제거
- 색상 자동 할당

#### 5. 관심 종목 ⭐
- 별 버튼으로 추가/제거
- 최대 10개 저장 (LocalStorage)
- 칩 형태로 표시
- 빠른 검색 기능

#### 6. 포트폴리오 관리 💼
- **종목 추가**: 심볼, 수량, 매수가
- **종목 수정**: 인라인 편집
- **종목 삭제**: 확인 후 삭제
- **실시간 평가**: 현재가 기반 수익률
- **총계 대시보드**: 평가액, 투자금, 손익
- **자산 분포**: 파이 차트
- **LocalStorage**: 영구 저장
- **탭 시스템**: 주가 검색 ↔ 포트폴리오

#### 7. 뉴스 피드 📰
- 종목별 뉴스 표시
- 감정 분석 (긍정📈/중립📊/부정📉)
- 날짜 필터 (전체/오늘/이번주)
- 상대 시간 표시 (2시간 전, 1일 전)
- 외부 링크 (새 탭)
- Mock 데이터 시스템

#### 8. UI/UX
- 다크모드 (LocalStorage 저장)
- 반응형 디자인 (모바일/태블릿/데스크톱)
- 로딩 스피너 & 스켈레톤 UI
- 에러 메시지 표시
- 부드러운 애니메이션
- 404 페이지

---

## 📡 API 엔드포인트

### 현재 사용 중
```
GET /api/stocks/{symbol}
GET /api/stocks/{symbol}/history?days={days}
GET /api/stocks/popular
```

### 선택적 (Mock 데이터 사용)
```
GET /api/news/{symbol}
```

---

## 💾 데이터 저장

### LocalStorage 키
- `stock-app-theme` - 테마 설정 (light/dark)
- `stock-search-history` - 검색 히스토리 (배열, 최대 5개)
- `stock-watchlist` - 관심 종목 (배열, 최대 10개)
- `stock-portfolio` - 포트폴리오 (배열, 무제한)

---

## 🔑 주요 컴포넌트 설명

### App.js (메인)
- **탭 시스템**: 주가 검색 / 포트폴리오
- **State 관리**:
    - `activeTab` - 현재 탭
    - `stockData` - 주식 정보
    - `historyData` - 과거 데이터
    - `selectedPeriod` - 선택된 기간
    - `selectedMA` - 이동평균선 선택
    - `compareMode` - 비교 모드 여부
    - `chartType` - 차트 타입
    - `selectedIndicators` - 기술적 지표 선택

### StockChart.js
- Chart.js 기반 메인 차트
- 라인 / 캔들스틱 전환
- 이동평균선 오버레이
- 종목 비교 지원
- 줌/팬 기능

### Portfolio.js
- 포트폴리오 메인 컴포넌트
- 종목 목록 관리
- 실시간 가격 업데이트
- 총계 계산
- 파이 차트 렌더링

### NewsSection.js
- 뉴스 피드 관리
- API 또는 Mock 데이터
- 날짜 필터링
- NewsCard 렌더링

### utils/technicalIndicators.js
- RSI, MACD, 볼린저 밴드 계산
- EMA, SMA 헬퍼 함수
- 입력 데이터 검증

---

## 🎓 개발 히스토리

### Phase 1: 초기 설정 (완료)
- 프로젝트 생성
- 기본 구조 설정
- Git 설정

### Phase 2: 백엔드 API (완료)
- Spring Boot API 구현
- Yahoo Finance 연동
- CORS 설정

### Phase 3: 기본 UI (완료)
- 검색, 카드 컴포넌트
- 다크모드
- API 연동

### Phase 4: 차트 통합 (완료)
- Chart.js 설정
- 라인 차트
- 거래량 차트

### Phase 5: 고급 차트 (완료)
- 캔들스틱 차트
- 비교 모드
- 이동평균선
- 기간 선택
- 줌/리셋

### Phase 6: 추가 기능 (완료)
- **6-A**: OHLC 향상 (롤백)
- **6-B**: 관심 종목 ⭐
- **6-C**: 기술적 지표 📊
- **6-D**: 포트폴리오 💼
- **6-E**: 뉴스 피드 📰

---

## 🔧 개발 시 주의사항

### 1. 기술적 지표 계산
- **입력 검증 필수**: `technicalIndicators.js` 참고
- **최소 데이터 요구**:
    - RSI: 15개 이상
    - MACD: 34개 이상
    - BB: 21개 이상
- 데이터 부족 시 빈 배열 반환

### 2. LocalStorage 사용
- 항상 `try-catch`로 감싸기
- JSON.parse 실패 대비
- 기본값 제공 (`|| '[]'`)

### 3. API 에러 처리
- 404: 종목 없음
- 429: Rate Limit
- Network: 서버 연결 실패
- 사용자에게 명확한 메시지

### 4. Chart.js
- 컴포넌트 언마운트 시 `destroy()` 호출
- `ref` 사용하여 차트 인스턴스 관리
- 옵션 변경 시 차트 업데이트

### 5. Git 커밋
- 컨벤션 준수: `feat:`, `fix:`, `docs:` 등
- 의미있는 단위로 커밋
- 작업 전 항상 최신 코드 pull

---

## 🚀 다음 작업 제안

### 우선순위 높음
1. **테스트 추가**
    - 컴포넌트 단위 테스트
    - API 통합 테스트
    - E2E 테스트

2. **배포 준비**
    - Frontend: Vercel/Netlify
    - Backend: Heroku/AWS
    - 환경 변수 설정

3. **성능 최적화**
    - 컴포넌트 메모이제이션
    - API 응답 캐싱
    - 이미지 최적화

### 우선순위 중간
4. **뉴스 API 실제 연동**
    - NewsAPI 또는 다른 서비스
    - 백엔드에 엔드포인트 추가

5. **알림 기능**
    - 목표가 도달 알림
    - 브라우저 알림 권한

6. **자동완성**
    - 검색 시 종목 제안
    - Debounce 적용

### 우선순위 낮음
7. **AI 예측 모델 (Phase 7)**
    - Python ML 모델
    - 예측 API
    - 프론트엔드 통합

8. **실시간 업데이트 (Phase 8)**
    - WebSocket 연동
    - 실시간 가격

9. **소셜 기능 (Phase 9)**
    - 사용자 인증
    - 댓글/의견 공유

---

## 📚 참고 문서

### 프로젝트 문서
- `README.md` - 프로젝트 개요
- `docs/CHECKLIST.md` - 개발 체크리스트
- `docs/GIT_WORKFLOW.md` - Git 작업 정책
- `frontend/README.md` - 프론트엔드 상세
- `backend/README.md` - 백엔드 상세

### 외부 문서
- [React 공식 문서](https://react.dev)
- [Chart.js 공식 문서](https://www.chartjs.org)
- [Spring Boot 공식 문서](https://spring.io/projects/spring-boot)
- [Yahoo Finance API](https://finance.yahoo.com)

---

## 🐛 알려진 이슈 / 제한사항

### 현재 이슈
- 없음 ✅

### 제한사항
1. **뉴스 API**: 현재 Mock 데이터 사용
2. **실시간 업데이트**: 수동 새로고침 필요
3. **데이터베이스**: LocalStorage만 사용 (서버 DB 없음)
4. **인증**: 사용자 로그인 기능 없음

---

## 💡 개발 팁

### 새 기능 추가 시
1. `components/` 폴더에 컴포넌트 생성
2. CSS 파일 함께 생성
3. `App.js`에 import 및 통합
4. LocalStorage 필요 시 `try-catch` 사용
5. 커밋 전 테스트

### 디버깅
```javascript
// API 응답 확인
console.log('✅ Data:', response.data);

// 상태 확인
console.log('🔍 State:', state);

// 에러 확인
console.error('❌ Error:', error);
```

### 스타일링
- CSS 변수 활용: `var(--primary-color)`
- 다크모드 고려: `body.dark-mode` 선택자
- 반응형: `@media` 쿼리 사용

---

## 📞 연락처

**개발자:** Hwan Lee (hwan0050)  
**GitHub:** [@hwan0050](https://github.com/hwan0050)  
**Email:** akma0050@naver.com

---

## 🎉 마무리

### 현재 상태
- ✅ 모든 Phase 완료
- ✅ 주요 기능 구현
- ✅ 문서화 완료
- ✅ Git 정리 완료

### 프로젝트 인계
이 문서를 새 대화창에 첨부하면 프로젝트를 즉시 이어받을 수 있습니다!

**필요한 정보:**
1. 프로젝트 구조
2. 완료된 기능
3. 실행 방법
4. 주의사항
5. 다음 작업

모두 이 문서에 포함되어 있습니다! 📋

---

## 🚀 새 대화 시작 시

### 시작 메시지 예시
```
안녕하세요! Stock Predictor 프로젝트를 이어서 작업하려고 합니다.

[HANDOVER.md 파일 첨부]

현재 Phase 6까지 완료된 상태이며, [원하는 작업]을 진행하고 싶습니다.
```

### AI가 확인할 내용
1. 프로젝트 구조
2. 완료된 기능
3. 사용 중인 기술
4. 개발 히스토리
5. 다음 작업 제안

---

**작성일:** 2025년 11월  
**버전:** 1.0  
**상태:** Phase 6 완료 (100%) ✅

**Made with ❤️ by Hwan**