# 📈 Stock Predictor - 주가 예측 웹 애플리케이션

실시간 주식 데이터를 분석하여 미래 주가를 예측하는 풀스택 웹 애플리케이션입니다.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6db33f.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## 🌐 Live Demo

**🚀 [Stock Predictor 실행하기](https://stock-predictor-89hovs9w2-hwan0050s-projects.vercel.app)**

> 실시간으로 주가를 검색하고 분석해보세요!  
> *(현재 Backend 배포 준비 중 - 스크린샷으로 기능 확인 가능)*

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
│   │       └── repository/  # 데이터 접근
│   └── pom.xml
│
├── docs/                    # 문서
│   ├── API.md              # API 문서
│   ├── CHECKLIST.md        # 개발 체크리스트
│   └── GIT_WORKFLOW.md     # Git 작업 정책
│
└── README.md               # 프로젝트 README
```

---

## 🚀 빠른 시작

### 📋 사전 요구사항

- **Node.js** 18.x 이상
- **Java** 11 이상
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
./mvnw clean install
./mvnw spring-boot:run
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
- **Maven** - 빌드 도구

### API 통합
- **Yahoo Finance API** - 실시간 주가 데이터
- REST API 아키텍처

### Deployment
- **Vercel** - Frontend 배포
- **GitHub Actions** - CI/CD (선택적)

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

자세한 API 문서: [docs/API.md](docs/API.md)

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

---

## 📸 스크린샷

<div align="center">

### 메인 화면
![메인 화면](docs/images/screenshots/main.png)
*실시간 주가 검색 및 차트 분석*

### 기술적 지표
![기술적 지표](docs/images/screenshots/indicators.png)
*RSI, MACD, 볼린저 밴드 분석*

### 포트폴리오 관리
![포트폴리오](docs/images/screenshots/portfolio.png)
*보유 종목 관리 및 수익률 계산*

### 뉴스 피드
![뉴스](docs/images/screenshots/news.png)
*종목별 뉴스 및 감정 분석*

</div>

---

## 🔮 향후 계획

- [ ] AI 기반 주가 예측 모델
- [ ] 실시간 알림 시스템
- [ ] 모바일 앱 개발
- [ ] 소셜 기능 (의견 공유)
- [ ] 다국어 지원

---

## ⭐ 스타를 눌러주세요!

이 프로젝트가 도움이 되셨다면 ⭐️를 눌러주세요!

---

**Made with ❤️ by Hwan**