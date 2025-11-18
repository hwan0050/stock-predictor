# 📈 Stock Predictor - 주가 예측 웹 애플리케이션

실시간 주식 데이터를 분석하여 미래 주가를 예측하는 풀스택 웹 애플리케이션입니다.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6db33f.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## 🚀 Live Demo

**🌐 Frontend:** https://stock-predictor-lrrj7q16f-hwan0050s-projects.vercel.app  
**🔧 Backend API:** https://stock-predictor-zu6p.onrender.com

### 배포 상태
- ✅ Frontend: Vercel에 배포 완료
- ✅ Backend: Render에 배포 완료
- ✅ CORS 설정 완료
- ✅ 환경 변수 설정 완료
- ✅ 완전 작동 확인됨

---

## 🌟 주요 기능

### 📊 주가 검색 및 분석
- **실시간 주가 조회** - 최신 주식 가격 및 거래량 정보
- **인터랙티브 차트** - Chart.js 기반의 직관적인 데이터 시각화
- **다양한 차트 타입** - 라인 차트, 캔들스틱 차트
- **기간 선택** - 7일, 30일, 90일, 365일, 전체 기간
- **줌/리셋 기능** - 차트 확대/축소 및 초기화

### 📈 기술적 분석
- **이동평균선** - MA5, MA20, MA60
- **RSI (상대강도지수)** - 과매수/과매도 판단 (14일 기준)
- **MACD** - 이동평균 수렴확산 (12, 26, 9)
- **볼린저 밴드** - 가격 변동성 분석 (20, 2)

### 🔄 비교 분석
- **다중 종목 비교** - 최대 여러 종목 동시 비교
- **정규화된 차트** - 종목 간 상대적 성과 비교
- **동적 종목 추가/제거** - 실시간 비교 대상 관리

### ⭐ 관심 종목
- **즐겨찾기 관리** - 최대 10개 종목 저장
- **빠른 검색** - 칩 클릭으로 즉시 조회
- **LocalStorage 저장** - 브라우저에 영구 저장

### 💼 포트폴리오 관리
- **보유 종목 관리** - 종목 추가/수정/삭제
- **실시간 평가** - 현재가 기반 자동 수익률 계산
- **자산 분포 차트** - 파이 차트로 시각화
- **손익 현황** - 실현/미실현 손익 추적

### 📰 뉴스 피드
- **종목별 뉴스** - 실시간 뉴스 및 공시 정보
- **감정 분석** - 긍정/중립/부정 표시
- **날짜 필터** - 전체/오늘/이번주
- **외부 링크** - 원문 기사로 바로가기

### 🎨 사용자 경험
- **반응형 디자인** - 모바일/태블릿/데스크톱 최적화
- **다크모드** - 라이트/다크 테마 전환
- **검색 히스토리** - 최근 검색 5개 자동 저장
- **로딩 애니메이션** - Skeleton UI로 부드러운 UX

---

## 🏗️ 프로젝트 구조

```
stock-predictor/
├── frontend/                 # React 프론트엔드
│   ├── src/
│   │   ├── components/      # React 컴포넌트
│   │   │   ├── SearchBar.js
│   │   │   ├── StockCard.js
│   │   │   ├── StockChart.js
│   │   │   ├── TechnicalIndicators.js
│   │   │   ├── IndicatorChart.js
│   │   │   ├── Portfolio.js
│   │   │   ├── NewsSection.js
│   │   │   └── ...
│   │   ├── utils/           # 유틸리티 함수
│   │   │   └── technicalIndicators.js
│   │   ├── App.js           # 메인 앱 컴포넌트
│   │   └── App.css          # 전역 스타일
│   └── package.json
│
├── backend/                 # Spring Boot 백엔드
│   ├── src/main/java/
│   │   └── com/stock/
│   │       ├── controller/  # REST API 컨트롤러
│   │       ├── service/     # 비즈니스 로직
│   │       ├── model/       # 데이터 모델
│   │       └── config/      # 설정
│   ├── Dockerfile          # Docker 설정
│   └── build.gradle
│
├── docs/                    # 문서
│   ├── CHECKLIST.md        # 개발 체크리스트
│   ├── GIT_WORKFLOW.md     # Git 작업 정책
│   ├── HANDOVER.md         # 인수인계 문서
│   └── DEPLOYMENT.md       # 배포 가이드
│
└── README.md               # 프로젝트 README
```

---

## 🚀 빠른 시작

### 📋 사전 요구사항

- **Node.js** 18.x 이상
- **Java** 17 이상
- **Git**
- **npm** 또는 **yarn**

### 💻 로컬 실행

#### 1️⃣ 저장소 클론
```bash
git clone https://github.com/hwan0050/stock-predictor.git
cd stock-predictor
```

#### 2️⃣ 백엔드 실행
```bash
cd backend
./gradlew clean build
./gradlew bootRun
```
서버: http://localhost:8080

#### 3️⃣ 프론트엔드 실행
```bash
cd frontend
npm install
npm start
```
앱: http://localhost:3000

---

## 🌐 배포

### Frontend (Vercel)
프론트엔드는 Vercel에 배포되어 있습니다:
- **URL:** https://stock-predictor-lrrj7q16f-hwan0050s-projects.vercel.app
- **플랫폼:** Vercel
- **자동 배포:** main 브랜치에 push 시 자동 배포

### Backend (Render)
백엔드는 Render에 배포되어 있습니다:
- **URL:** https://stock-predictor-zu6p.onrender.com
- **플랫폼:** Render (Docker)
- **Java 버전:** 17
- **자동 배포:** main 브랜치에 push 시 자동 배포

### 환경 변수
**Frontend (.env)**
```env
REACT_APP_API_URL=https://stock-predictor-zu6p.onrender.com
REACT_APP_API_BASE_PATH=/api
```

**Backend (Render)**
```env
CORS_ALLOWED_ORIGINS=https://stock-predictor-*.vercel.app,https://stock-predictor-lrrj7q16f-hwan0050s-projects.vercel.app
```

자세한 배포 가이드: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

---

## 🛠️ 기술 스택

### Frontend
- **React** 18.x - UI 프레임워크
- **React Router** - 라우팅
- **Axios** - HTTP 클라이언트
- **Chart.js** - 차트 라이브러리
- **react-chartjs-2** - React Chart.js 래퍼
- **LocalStorage** - 클라이언트 저장소

### Backend
- **Spring Boot** 3.x - 백엔드 프레임워크
- **Spring Web** - REST API
- **Lombok** - 보일러플레이트 감소
- **Gradle** - 빌드 도구
- **Docker** - 컨테이너화

### API 통합
- **Yahoo Finance API** - 실시간 주가 데이터
- REST API 아키텍처

### 배포
- **Vercel** - Frontend 배포
- **Render** - Backend 배포
- **Docker** - Backend 컨테이너화

---

## 📡 API 엔드포인트

### 주식 정보
```
GET /api/stocks/{symbol}
GET /api/stocks/{symbol}/history?days={days}
GET /api/stocks/popular
```

### 뉴스 (선택적)
```
GET /api/news/{symbol}
```

### API 기본 URL
- **Production:** https://stock-predictor-zu6p.onrender.com
- **Local:** http://localhost:8080

---

## 📊 개발 진행 상황

**전체 진행률: 100%** ✅

### ✅ 완료된 Phase

- **Phase 1**: 프로젝트 초기 설정 ✅
- **Phase 2**: 백엔드 API 구현 ✅
- **Phase 3**: 프론트엔드 기본 UI ✅
- **Phase 4**: 차트 통합 ✅
- **Phase 5**: 고급 차트 기능 ✅
- **Phase 6**: 추가 기능 ✅
    - 6-B: 관심 종목 ✅
    - 6-C: 기술적 지표 ✅
    - 6-D: 포트폴리오 ✅
    - 6-E: 뉴스 피드 ✅
- **Phase 7**: 배포 ✅
    - Frontend Vercel 배포 ✅
    - Backend Render 배포 ✅
    - CORS 설정 ✅
    - 환경 변수 설정 ✅

자세한 체크리스트: [docs/CHECKLIST.md](docs/CHECKLIST.md)

---

## 🤝 기여하기

프로젝트에 기여하고 싶으신가요? 환영합니다!

1. Fork 저장소
2. Feature 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'feat: Add amazing feature'`)
4. 브랜치에 Push (`git push origin feature/amazing-feature`)
5. Pull Request 생성

### Git 커밋 컨벤션
```
feat: 새로운 기능
fix: 버그 수정
docs: 문서 변경
style: 코드 포맷팅
refactor: 리팩토링
test: 테스트 추가
chore: 빌드/설정 변경
deploy: 배포 관련 변경
```

자세한 작업 정책: [docs/GIT_WORKFLOW.md](docs/GIT_WORKFLOW.md)

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. - [LICENSE](LICENSE) 파일 참조

---

## 👨‍💻 개발자

**Hwan Lee** (hwan0050)
- GitHub: [@hwan0050](https://github.com/hwan0050)
- Email: akma0050@naver.com

---

## 🙏 감사의 말

- [Yahoo Finance API](https://finance.yahoo.com) - 주가 데이터 제공
- [Chart.js](https://www.chartjs.org) - 차트 라이브러리
- [Spring Boot](https://spring.io/projects/spring-boot) - 백엔드 프레임워크
- [React](https://react.dev) - 프론트엔드 프레임워크
- [Vercel](https://vercel.com) - Frontend 호스팅
- [Render](https://render.com) - Backend 호스팅

---

## 📸 스크린샷

### 메인 화면
- 주가 검색 및 차트
- 기술적 지표
- 관심 종목

### 포트폴리오
- 보유 종목 관리
- 자산 분포 차트
- 수익률 현황

### 뉴스 피드
- 종목별 뉴스
- 감정 분석
- 날짜 필터

---

## 🔮 향후 계획

- [ ] AI 기반 주가 예측 모델
- [ ] 실시간 알림 시스템
- [ ] 모바일 앱 개발
- [ ] 소셜 기능 (의견 공유)
- [ ] 다국어 지원
- [ ] 사용자 인증 시스템
- [ ] 데이터베이스 연동

---

## ⚠️ 알려진 제한사항

1. **뉴스 API**: 현재 Mock 데이터 사용
2. **실시간 업데이트**: 수동 새로고침 필요
3. **데이터 저장**: LocalStorage만 사용 (서버 DB 없음)
4. **인증**: 사용자 로그인 기능 없음
5. **Backend Cold Start**: Render 무료 플랜 사용 시 첫 요청 지연 가능

---

## 🔧 개발 팁

### 로컬 개발
```bash
# Frontend
cd frontend
npm install
npm start

# Backend
cd backend
./gradlew bootRun
```

### 환경 변수 설정
```bash
# Frontend (.env)
REACT_APP_API_URL=http://localhost:8080
REACT_APP_API_BASE_PATH=/api
```

### Docker 빌드 (Backend)
```bash
cd backend
docker build -t stock-predictor-backend .
docker run -p 8080:8080 stock-predictor-backend
```

---

## ⭐ 스타를 눌러주세요!

이 프로젝트가 도움이 되셨다면 ⭐️를 눌러주세요!

---

**Made with ❤️ by Hwan**