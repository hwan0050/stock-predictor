# 🚀 주가 예측 웹 애플리케이션 - 개발 체크리스트

## 프로젝트 정보
- **GitHub:** https://github.com/hwan0050/stock-predictor
- **시작일:** 2025-11-08
- **기술스택:** React, Spring Boot, Python

---

## 📊 전체 진행률: 50% (15/30)

---

## Phase 1: Backend 개발 (진행률: 75% 완료) ✅

### 1.1 프로젝트 초기 설정
- [X] Spring Boot 프로젝트 생성
- [X] build.gradle 설정
- [X] 기본 패키지 구조 생성
- [X] application.properties 설정
- [X] CORS 설정

### 1.2 Yahoo Finance API 연동 ✅ **완료!**
- [X] Yahoo Finance API 의존성 추가
- [X] StockDataDto.java 생성
- [X] StockHistoryDto.java 생성
- [X] YahooFinanceService.java 구현
- [X] StockController.java 구현
- [X] GlobalExceptionHandler.java 생성
- [X] API 로컬 테스트 완료 (Mock 엔드포인트)
- [X] Mock 테스트 완료
- [X] TEST 심볼 자동 Mock 데이터 반환 추가
- [X] TEST 심볼 history Mock 데이터 추가

### 1.3 데이터베이스 설계
- [ ] Entity 클래스 설계
- [ ] Repository 구현
- [ ] 주가 데이터 저장 로직
- [ ] 스케줄러로 정기 수집

### 1.4 추가 기능
- [ ] 캐싱 (Redis/Spring Cache) ⬅️ **다음 우선순위!**
- [ ] Rate Limiting
- [ ] 로깅 강화
- [ ] 단위 테스트 작성

---

## Phase 2: Frontend 개발 (진행률: 60% 완료) 🔥

### 2.1 프로젝트 초기 설정
- [X] React 프로젝트 생성 (Create React App)
- [X] 폴더 구조 설계
- [X] Chart.js 설치
- [X] Axios 설치 ✅
- [ ] Tailwind CSS 설치 (선택)

### 2.2 기본 컴포넌트
- [X] 헤더/네비게이션
- [X] 검색 바 (SearchBar.js) ✅
- [X] 주가 카드 컴포넌트 (StockCard.js) ✅
- [X] 차트 컴포넌트 (StockChart.js) ✅

### 2.3 API 연동
- [X] Axios 인스턴스 설정 ✅
- [X] API 서비스 함수 작성 (axios 사용) ✅
- [X] 실시간 데이터 조회 ✅
- [X] 에러 핸들링 ✅
- [X] Backend API 연동 성공 ✅

### 2.4 차트 구현
- [X] Chart.js 설치 완료 ✅
- [X] 주가 차트 컴포넌트 작성 ✅
- [X] 30일 히스토리 차트 표시 ✅
- [ ] 인터랙티브 기능 추가
- [X] 반응형 디자인 ✅

### 2.5 UI/UX
- [X] 로딩 스피너 애니메이션 ✅
- [X] 에러 메시지 스타일링 ✅
- [X] 반응형 디자인 (모바일, 태블릿) ✅
- [ ] 다크모드 (선택)
- [ ] 애니메이션 효과 추가

### 2.6 주요 페이지
- [X] 홈 페이지 (기본) ✅
- [ ] 종목 상세 페이지
- [ ] 관심 목록 페이지
- [ ] 예측 결과 페이지

---

## Phase 3: ML 모델 개발 (진행률: 0%)

### 3.1 데이터 수집
- [ ] 과거 주가 데이터 수집
- [ ] 데이터 전처리
- [ ] 학습/테스트 데이터 분리

### 3.2 모델 개발
- [ ] LSTM 모델 구현
- [ ] 모델 학습
- [ ] 모델 평가
- [ ] 하이퍼파라미터 튜닝

### 3.3 모델 배포
- [ ] Flask API 서버 구축
- [ ] 예측 엔드포인트 구현
- [ ] Backend와 연동

---

## Phase 4: 통합 및 배포 (진행률: 0%)

### 4.1 통합 테스트
- [ ] Frontend-Backend 연동 테스트
- [ ] Backend-ML 연동 테스트
- [ ] E2E 테스트

### 4.2 배포 준비
- [ ] Docker 컨테이너화
- [ ] CI/CD 파이프라인
- [ ] 환경변수 설정
- [ ] 보안 설정

### 4.3 배포
- [ ] Backend 배포 (AWS/Heroku)
- [ ] Frontend 배포 (Vercel/Netlify)
- [ ] ML 모델 배포
- [ ] 도메인 연결

---

## 🔧 현재 작업 중

**날짜:** 2025-11-09  
**작업:** UI/UX 개선 완료! 🎉  
**다음:** 캐싱 추가 또는 추가 기능 개발

**완료 사항:**
- ✅ axios 설치 및 fetch → axios 리팩토링
- ✅ SearchBar 컴포넌트 확인
- ✅ 실제 주가 테스트 (AAPL, MSFT - 429 에러 확인)
- ✅ 로딩 스피너 애니메이션 추가
- ✅ 에러 메시지 스타일 개선
- ✅ 반응형 디자인 구현 (768px, 480px)
- ✅ 모든 컴포넌트 모바일 최적화
- ✅ Git 커밋 완료

**파일 위치:**

**Backend:**
- `/backend/src/main/java/com/stock/predictor/controller/StockController.java`
- `/backend/src/main/java/com/stock/predictor/service/YahooFinanceService.java`
- `/backend/src/main/java/com/stock/predictor/dto/`

**Frontend:**
- `/frontend/src/App.js` (axios 적용, UI 개선)
- `/frontend/src/App.css` (스피너, 반응형)
- `/frontend/src/components/SearchBar.js`
- `/frontend/src/components/SearchBar.css` (반응형)
- `/frontend/src/components/StockCard.js`
- `/frontend/src/components/StockCard.css` (반응형)
- `/frontend/src/components/StockChart.js`
- `/frontend/src/components/StockChart.css` (반응형)
- `/frontend/package.json` (axios 추가)

---

## 📝 다음 작업 (우선순위)

### 1. **캐싱 추가** (30분) ⬅️ **추천!**
- Spring Cache 또는 Redis
- 같은 종목 5분간 캐싱
- Yahoo API 429 에러 회피

### 2. **API 대체** (1시간)
- Alpha Vantage API
- IEX Cloud API
- Finnhub API

### 3. **추가 기능** (1시간+)
- 관심 종목 저장 (LocalStorage)
- 여러 종목 비교
- 검색 히스토리

### 4. **ML 모델 연동 준비** (Phase 3 시작)
- Python 환경 설정
- 데이터 수집 스크립트
- LSTM 모델 개발

---

## 🐛 알려진 이슈

### Backend:
- ⚠️ **Yahoo Finance API 429 에러** (Too Many Requests)
    - **현재 상황:** 실제 종목(AAPL, MSFT 등) 검색 시 발생
    - **임시 해결:** TEST 심볼로 Mock 데이터 사용
    - **영구 해결 방안:**
        1. 캐싱 추가 (Redis/Spring Cache) - 최우선!
        2. API 대체 (Alpha Vantage, IEX Cloud)
        3. Rate Limiting 구현

### Frontend:
- ~~StockCard price 속성 에러~~ ✅ 해결
- ~~App.js history.data undefined 에러~~ ✅ 해결
- ~~fetch 에러 처리 부족~~ ✅ 해결 (axios로 개선)

---

## 💡 메모 / 아이디어

### API 관련:
- Yahoo Finance API는 무료 버전이라 호출 제한 있음
- 한국 주식은 `.KS` 또는 `.KQ` 붙여야 함
- Mock 엔드포인트:
    - `/api/stocks/test/mock` (기존)
    - `/api/stocks/TEST` (자동 Mock 반환) ✅
    - `/api/stocks/TEST/history?days=30` (히스토리 Mock) ✅

### 기술 스택:
- Chart.js + react-chartjs-2 잘 작동! ✅
- axios로 코드 20% 간소화 ✅
- 반응형 디자인 3가지 브레이크포인트 (480px, 768px, desktop) ✅

### 향후 계획:
- WebSocket으로 실시간 업데이트 고려
- TypeScript 마이그레이션 고려
- Tailwind CSS 추가 고려
- 다크모드 추가
- PWA (Progressive Web App) 변환

---

## 📚 참고 자료

### API:
- [Yahoo Finance API](https://github.com/sstrickx/yahoofinance-api)
- [Alpha Vantage](https://www.alphavantage.co/)
- [IEX Cloud](https://iexcloud.io/)
- [Finnhub](https://finnhub.io/)

### 프레임워크:
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [React Docs](https://react.dev/)
- [Chart.js](https://www.chartjs.org/)
- [react-chartjs-2](https://react-chartjs-2.js.org/)
- [Axios](https://axios-http.com/)

### 디자인:
- [Tailwind CSS](https://tailwindcss.com/)
- [Material-UI](https://mui.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

## 🔄 새 대화 시작 시 말할 것

```
안녕! 주가예측 프로젝트 계속 진행 중이야.

GitHub: https://github.com/hwan0050/stock-predictor

[CHECKLIST.md 파일 업로드]

현재 상황:
- Backend: Yahoo Finance API 연동 완료 ✅
- Frontend: axios 적용, UI/UX 개선 완료 ✅
- 반응형 디자인 완료 ✅
- 테스트: TEST 심볼로 정상 작동 ✅
- 이슈: Yahoo API 429 에러 (캐싱 필요)

환경:
- IntelliJ IDEA
- Windows PowerShell
- localhost:8080 (Backend)
- localhost:3000 (Frontend)

다음 작업: 캐싱 추가 또는 추가 기능 개발

CHECKLIST.md 보고 이어서 작업 도와줘!
```

---

## 🎯 최근 Git 커밋

### 커밋 1 (2025-11-08)
```
feat: Yahoo Finance API 연동 구현
- DTO/Service/Controller 구현
- Mock 테스트 엔드포인트 추가
```

### 커밋 2 (2025-11-08)
```
docs: Backend API 연동 완료 체크리스트 업데이트
- 진행률 업데이트 (25% → 30%)
```

### 커밋 3 (2025-11-09)
```
fix: Frontend API 연동 버그 수정
- StockCard.js: price → currentPrice 수정
- App.js: 에러 처리 개선
```

### 커밋 4 (2025-11-09)
```
feat: TEST 심볼 자동 Mock 데이터 반환
- StockController: TEST 심볼 감지 시 Mock 반환
```

### 커밋 5 (2025-11-09)
```
feat: TEST 심볼 history Mock 데이터 추가
- getTestMockHistory() 메서드 추가
- Chart.js 정상 작동
```

### 커밋 6 (2025-11-09)
```
docs: Chart.js 작동 확인 및 진행 상황 업데이트
- Phase 2.4 차트 구현 확인 완료 체크
```

### 커밋 7 (2025-11-09)
```
feat: fetch를 axios로 리팩토링
- axios 설치 및 import
- 에러 처리 개선
```

### 커밋 8 (2025-11-09) ⬅️ **최신**
```
feat: UI/UX 개선 및 반응형 디자인 추가
- 로딩 스피너 애니메이션
- 에러 메시지 스타일 개선
- 반응형 디자인 구현 (768px, 480px)
```

---

## 🎨 UI/UX 개선 내역

### 로딩 상태:
- ✅ 회전하는 스피너 애니메이션
- ✅ "데이터를 불러오는 중..." 메시지
- ✅ 부드러운 애니메이션 효과

### 에러 메시지:
- ✅ 그라디언트 배경 (빨강 → 주황)
- ✅ ⚠️ 아이콘 추가
- ✅ 그림자 효과
- ✅ 개선된 타이포그래피

### 반응형 디자인:
- ✅ 모바일 (480px 이하): 작은 폰트, 세로 배치
- ✅ 태블릿 (768px 이하): 중간 폰트, 최적화된 레이아웃
- ✅ 데스크톱 (768px 이상): 원본 디자인 유지
- ✅ SearchBar: 모바일에서 세로 배치
- ✅ StockCard: 모바일에서 1열 그리드
- ✅ StockChart: 모바일에서 높이 축소

---

## 📈 진행 상황 요약

### ✅ 완료 (50%):
1. **Backend 기본 구조** (100%)
2. **Yahoo Finance API 연동** (100%)
3. **Mock 데이터 엔드포인트** (100%)
4. **Frontend 프로젝트 설정** (100%)
5. **React 컴포넌트 개발** (100%)
6. **Backend-Frontend 연동** (100%)
7. **axios 적용** (100%)
8. **Chart.js 차트** (100%)
9. **UI/UX 개선** (100%)
10. **반응형 디자인** (100%)

### 🔄 진행 중 (0%):
- 없음 (다음 작업 대기)

### ⏳ 대기 중:
1. **캐싱 추가** (Yahoo API 429 에러 해결)
2. **데이터베이스 연동**
3. **추가 기능 개발**
4. **ML 모델 개발**
5. **배포**

---

**마지막 업데이트:** 2025-11-09 01:00  
**작업자:** Hwan Lee  
**환경:** IntelliJ IDEA + Windows PowerShell  
**상태:** UI/UX 개선 완료! 다음: 캐싱 또는 추가 기능 🚀