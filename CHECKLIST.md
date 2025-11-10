# 🚀 주가 예측 웹 애플리케이션 - 개발 체크리스트

## 프로젝트 정보
- **GitHub:** https://github.com/hwan0050/stock-predictor
- **시작일:** 2025-11-08
- **기술스택:** React, Spring Boot, Python

---

## 📊 전체 진행률: 40% (12/30)

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

### 1.3 데이터베이스 설계
- [ ] Entity 클래스 설계
- [ ] Repository 구현
- [ ] 주가 데이터 저장 로직
- [ ] 스케줄러로 정기 수집

### 1.4 추가 기능
- [ ] 캐싱 (Redis/Spring Cache)
- [ ] Rate Limiting
- [ ] 로깅 강화
- [ ] 단위 테스트 작성

---

## Phase 2: Frontend 개발 (진행률: 40% 완료) 🔥

### 2.1 프로젝트 초기 설정
- [X] React 프로젝트 생성 (Create React App)
- [X] 폴더 구조 설계
- [X] Chart.js 설치
- [ ] Tailwind CSS 설치
- [ ] Axios 설치 ⬅️ **다음 작업!**

### 2.2 기본 컴포넌트
- [X] 헤더/네비게이션
- [X] 검색 바 (SearchBar.js)
- [X] 주가 카드 컴포넌트 (StockCard.js)
- [X] 차트 컴포넌트 (StockChart.js)

### 2.3 API 연동
- [ ] Axios 인스턴스 설정
- [X] API 서비스 함수 작성 (fetch 사용)
- [X] 실시간 데이터 조회
- [X] 에러 핸들링
- [X] Backend API 연동 성공

### 2.4 차트 구현
- [X] Chart.js 설치 완료
- [X] 주가 차트 컴포넌트 작성
- [ ] 인터랙티브 기능 추가
- [ ] 반응형 디자인

### 2.5 주요 페이지
- [X] 홈 페이지 (기본)
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
**작업:** Frontend-Backend 연동 완료! 🎉  
**다음:** axios 설치 및 UI 개선

**완료 사항:**
- ✅ Backend API Mock 데이터 처리 추가
- ✅ Frontend StockCard 버그 수정 (price → currentPrice)
- ✅ Frontend App.js 에러 처리 개선
- ✅ TEST 심볼로 정상 작동 확인
- ✅ Frontend 실행 성공 (localhost:3000)
- ✅ Backend 실행 성공 (localhost:8080)
- ✅ Git 커밋 완료 (Frontend 버그 수정, Backend Mock 추가)

**파일 위치:**

**Backend:**
- `/backend/src/main/java/com/stock/predictor/controller/StockController.java` (수정)
- `/backend/src/main/java/com/stock/predictor/service/YahooFinanceService.java`
- `/backend/src/main/java/com/stock/predictor/dto/`

**Frontend:**
- `/frontend/src/App.js` (수정)
- `/frontend/src/components/StockCard.js` (수정)
- `/frontend/src/components/SearchBar.js`
- `/frontend/src/components/StockChart.js`

---

## 📝 다음 작업 (우선순위)

### 1. **axios 설치 및 적용** (10분) ⬅️ **지금!**
- axios 설치: `npm install axios`
- App.js fetch → axios 리팩토링
- API 호출 코드 개선

### 2. **컴포넌트 상세 확인** (10분)
- SearchBar 기능 확인
- StockChart 렌더링 확인
- CSS 스타일 확인

### 3. **실제 주가 데이터 테스트** (5분)
- AAPL, MSFT, GOOGL 테스트
- Yahoo API 429 에러 해결 대기

### 4. **UI/UX 개선** (30분)
- Tailwind CSS 설치 (선택)
- 반응형 디자인
- 로딩 애니메이션

### 5. **추가 기능** (1시간+)
- 관심 종목 저장
- 여러 종목 비교
- 예측 기능 연동 준비

---

## 🐛 알려진 이슈

### Backend:
- ~~Yahoo Finance API 429 에러 (Too Many Requests)~~ ✅ 해결
    - **해결:** TEST 심볼로 Mock 데이터 자동 반환
    - 실제 종목은 API 제한 주의 필요

### Frontend:
- ~~StockCard price 속성 에러~~ ✅ 해결
- ~~App.js history.data undefined 에러~~ ✅ 해결

---

## 💡 메모 / 아이디어

- Yahoo Finance API는 무료 버전이라 호출 제한 있음 → 캐싱 필요
- 한국 주식은 `.KS` 또는 `.KQ` 붙여야 함
- 나중에 WebSocket으로 실시간 업데이트 고려
- Mock 엔드포인트:
    - `/api/stocks/test/mock` (기존)
    - `/api/stocks/TEST` (자동 Mock 반환) ✅ 추가됨
- Chart.js 잘 작동함! react-chartjs-2 사용 중

---

## 📚 참고 자료

- [Yahoo Finance API](https://github.com/sstrickx/yahoofinance-api)
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [React Docs](https://react.dev/)
- [Chart.js](https://www.chartjs.org/)
- [react-chartjs-2](https://react-chartjs-2.js.org/)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🔄 새 대화 시작 시 말할 것

```
안녕! 주가예측 프로젝트 계속 진행 중이야.

GitHub: https://github.com/hwan0050/stock-predictor

[CHECKLIST.md 파일 업로드]

현재 상황:
- Backend: Yahoo Finance API 연동 완료 ✅
- Frontend: Backend API 연동 성공 ✅
- 테스트: TEST 심볼로 정상 작동 확인 ✅
- 다음 작업: axios 설치 및 UI 개선

환경:
- IntelliJ IDEA
- Windows PowerShell
- localhost:8080 (Backend)
- localhost:3000 (Frontend)

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

---

**마지막 업데이트:** 2025-11-09 00:15  
**작업자:** Hwan Lee  
**환경:** IntelliJ IDEA + Windows PowerShell
**상태:** Frontend-Backend 연동 성공! 🎉 