# 🚀 주가 예측 웹 애플리케이션 - 개발 체크리스트

## 프로젝트 정보
- **GitHub:** https://github.com/hwan0050/stock-predictor
- **시작일:** 2025-11-08
- **기술스택:** React, Spring Boot, Python

---

## 📊 전체 진행률: 40% (12/24)

---

## Phase 1: Backend 개발 (진행률: 70% 완료)

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

## Phase 2: Frontend 개발 (진행률: 40%)

### 2.1 프로젝트 초기 설정
- [X] React 프로젝트 생성 ✅
- [X] 폴더 구조 설계 ✅
- [ ] Tailwind CSS 설치
- [ ] Axios 설치

### 2.2 기본 컴포넌트
- [X] 헤더/네비게이션 ✅
- [X] 검색 바 ✅
- [X] 주가 카드 컴포넌트 ✅
- [X] 차트 컴포넌트 ✅

### 2.3 API 연동
- [ ] Axios 인스턴스 설정
- [X] API 서비스 함수 작성 ✅ (fetch 사용)
- [X] 실시간 데이터 조회 ✅
- [X] 에러 핸들링 ✅

### 2.4 차트 구현
- [X] Chart.js 설치 ✅
- [X] 주가 차트 컴포넌트 ✅
- [ ] 인터랙티브 기능
- [ ] 반응형 디자인

### 2.5 주요 페이지
- [ ] 홈 페이지
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
**작업:** Frontend-Backend 연동 완료! 다음: axios 설치 및 UI 개선

**완료 사항:**
- Backend API Mock 데이터 처리 추가
- Frontend StockCard 버그 수정 (price → currentPrice)
- Frontend App.js 에러 처리 개선
- TEST 심볼로 정상 작동 확인
- Frontend 실행 성공 (localhost:3000)
- Backend 실행 성공 (localhost:8080)

**다음 작업:**
- axios 설치 및 적용
- SearchBar, StockChart 컴포넌트 확인
- 실제 주가 데이터 테스트 (Yahoo API 복구 대기)
- UI/UX 개선

**파일 위치:** `/backend/src/main/java/com/stock/predictor/`

**생성된 파일:**
- `dto/StockDataDto.java`
- `dto/StockHistoryDto.java`
- `service/YahooFinanceService.java`
- `controller/StockController.java` (업데이트)
- `exception/GlobalExceptionHandler.java`

**수정된 파일:**
- `build.gradle`
- `application.properties`
- `config/WebConfig.java`

---

## 📝 다음 작업 (우선순위)

1. **Frontend React 프로젝트 생성** (30분)
    - Create React App 또는 Vite 사용
    - 기본 폴더 구조 설정
    - Tailwind CSS 설치

2. **Backend Mock API로 Frontend 연동** (1시간)
    - Axios 설정
    - Mock 엔드포인트로 연결 테스트
    - 데이터 화면에 표시

3. **기본 UI 컴포넌트 작성** (2시간)
    - 검색 바
    - 주가 카드
    - 간단한 차트

---

## 🐛 알려진 이슈

### Backend:
- Yahoo Finance API 429 에러 (Too Many Requests)
    - **원인:** 무료 API 요청 제한
    - **해결:** Mock 엔드포인트로 테스트 진행 중
    - **향후:** 캐싱 추가 또는 유료 API 고려

---

## 💡 메모 / 아이디어

- Yahoo Finance API는 무료 버전이라 호출 제한 있음 → 캐싱 필요
- 한국 주식은 `.KS` 또는 `.KQ` 붙여야 함
- 나중에 WebSocket으로 실시간 업데이트 고려
- Mock 엔드포인트: http://localhost:8080/api/stocks/test/mock

---

## 📚 참고 자료

- [Yahoo Finance API](https://github.com/sstrickx/yahoofinance-api)
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [React Docs](https://react.dev/)
- [Chart.js](https://www.chartjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🔄 새 대화 시작 시 말할 것

```
안녕! 주가예측 프로젝트 계속 진행 중이야.

GitHub: https://github.com/hwan0050/stock-predictor

[CHECKLIST.md 파일 업로드]

현재 상황:
- Backend: Yahoo Finance API 연동 완료 ✅
- Mock 테스트 완료 ✅
- 다음 작업: Frontend React 프로젝트 시작

CHECKLIST.md 보고 이어서 작업 도와줘!
```

---

## 🎯 최근 Git 커밋

### 커밋 1 (2025-11-08)
```
feat: Yahoo Finance API 연동 구현

- Yahoo Finance API 의존성 추가
- DTO/Service/Controller 구현
- Mock 테스트 엔드포인트 추가
```

### 커밋 2 (2025-11-08)
```
docs: Backend API 연동 완료 체크리스트 업데이트

- 진행률 업데이트 (25% → 30%)
- 다음 작업: Frontend 개발 준비
```

---

**마지막 업데이트:** 2025-11-08 23:50  
**작업자:** Hwan Lee  
**환경:** IntelliJ IDEA