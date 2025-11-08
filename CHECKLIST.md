# 🚀 주가 예측 웹 애플리케이션 - 개발 체크리스트

## 프로젝트 정보
- **GitHub:** https://github.com/hwan0050/stock-predictor
- **시작일:** 2025-11-08
- **기술스택:** React, Spring Boot, Python

---

## 📊 전체 진행률: 25% (6/24)

---

## Phase 1: Backend 개발 (진행률: 60% 완료)

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
- [ ] API 로컬 테스트 완료
- [ ] Postman 테스트 완료

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

## Phase 2: Frontend 개발 (진행률: 0%)

### 2.1 프로젝트 초기 설정
- [ ] React 프로젝트 생성
- [ ] 폴더 구조 설계
- [ ] Tailwind CSS 설치
- [ ] Axios 설치

### 2.2 기본 컴포넌트
- [ ] 헤더/네비게이션
- [ ] 검색 바
- [ ] 주가 카드 컴포넌트
- [ ] 차트 컴포넌트

### 2.3 API 연동
- [ ] Axios 인스턴스 설정
- [ ] API 서비스 함수 작성
- [ ] 실시간 데이터 조회
- [ ] 에러 핸들링

### 2.4 차트 구현
- [ ] Chart.js 또는 Recharts 설치
- [ ] 주가 차트 컴포넌트
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

**날짜:** 2025-11-08  
**작업:** Backend - Yahoo Finance API 연동 완료  
**파일 위치:** `/backend/src/main/java/com/stock/predictor/`

**생성된 파일:**
- `dto/StockDataDto.java`
- `dto/StockHistoryDto.java`
- `service/YahooFinanceService.java`
- `controller/StockController.java`
- `exception/GlobalExceptionHandler.java`

**수정된 파일:**
- `build.gradle`
- `application.properties`

---

## 📝 다음 작업 (우선순위)

1. **Backend 테스트** (1-2시간)
   - 로컬에서 실행
   - Postman으로 API 테스트
   - 버그 수정

2. **Frontend 시작** (2-3시간)
   - React 프로젝트 생성
   - 기본 컴포넌트 구조
   - Backend API 연동 테스트

3. **차트 구현** (3-4시간)
   - Chart.js 설치
   - 주가 차트 컴포넌트
   - 실시간 업데이트

---

## 🐛 알려진 이슈

없음

---

## 💡 메모 / 아이디어

- Yahoo Finance API는 무료 버전이라 호출 제한 있음 → 캐싱 필요
- 한국 주식은 `.KS` 또는 `.KQ` 붙여야 함
- 나중에 WebSocket으로 실시간 업데이트 고려

---

## 📚 참고 자료

- [Yahoo Finance API](https://github.com/sstrickx/yahoofinance-api)
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [React Docs](https://react.dev/)
- [Chart.js](https://www.chartjs.org/)

---

## 🔄 새 대화 시작 시 말할 것

"https://github.com/hwan0050/stock-predictor 프로젝트 진행 중이야.
CHECKLIST.md 파일 보고 현재 진행 상황 확인하고 다음 작업 도와줘.
지금까지 Backend Yahoo Finance API 연동까지 완료했어."

---

**마지막 업데이트:** 2025-11-08 14:15  
**작업자:** Hwan Lee
