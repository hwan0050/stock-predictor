<div align="center">
  
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=Stock%20Prediction%20App&fontSize=50&fontAlignY=35&animation=twinkling&fontColor=ffffff" />
  
  <h3>🤖 AI 기반 주가 예측 웹 애플리케이션</h3>
  <p>React · Spring Boot · Python · Machine Learning</p>
  
</div>

<!--# 📈 Stock Prediction App -->

<div align="center">

<!--![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Java](https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white) 

**AI 기반 주가 예측 웹 애플리케이션** -->

[데모 보기](#) · [버그 제보](../../issues) · [기능 제안](../../issues)

</div>

---

## 🎯 프로젝트 소개

실시간 주식 데이터를 분석하여 미래 주가를 예측하는 웹 애플리케이션입니다.

### ✨ 주요 기능

- 📊 **실시간 주가 데이터** - 주요 종목의 실시간 가격 정보
- 🤖 **AI 기반 예측** - 머신러닝 모델을 활용한 가격 예측
- 📈 **인터랙티브 차트** - 직관적인 데이터 시각화
- 🔔 **가격 알림** - 목표 가격 도달 시 알림 기능
- 📱 **반응형 디자인** - 모바일/태블릿/데스크톱 지원

---

## 🛠️ 기술 스택

### Frontend
- **React** (예정) - 사용자 인터페이스
- **JavaScript/TypeScript** (학습 중) - 프론트엔드 로직
- **Chart.js** - 데이터 시각화
- **Tailwind CSS** - 스타일링

### Backend
- **Java/Spring Boot** - REST API 서버
- **Python** - 데이터 분석 및 ML 모델
- **Node.js** - 실시간 데이터 처리 (검토 중)

### Data & AI
- **pandas** - 데이터 처리
- **scikit-learn** - 머신러닝 모델
- **TensorFlow/PyTorch** - 딥러닝 (예정)

### Database
- **PostgreSQL** - 주가 데이터 저장
- **Redis** - 캐싱 및 세션 관리

---

## 📂 프로젝트 구조

```
stock-prediction-app/
├── frontend/               # React 프론트엔드
│   ├── src/
│   │   ├── components/    # React 컴포넌트
│   │   ├── pages/         # 페이지
│   │   └── utils/         # 유틸리티
│   └── package.json
│
├── backend/               # Spring Boot 백엔드
│   ├── src/main/java/
│   │   └── com/stock/
│   │       ├── controller/
│   │       ├── service/
│   │       └── repository/
│   └── pom.xml
│
├── ml-model/              # Python ML 모델
│   ├── data/              # 학습 데이터
│   ├── models/            # 저장된 모델
│   ├── train.py           # 모델 학습
│   └── predict.py         # 예측 스크립트
│
├── docs/                  # 문서
│   └── GIT_WORKFLOW.md   # Git 작업 정책
│
└── README.md
```

---

## 🚀 시작하기

### 필수 요구사항

- **Node.js** 18+ (프론트엔드)
- **Java** 11+ (백엔드)
- **Python** 3.8+ (ML 모델)
- **PostgreSQL** 13+
- **Git**

### 설치 방법

#### 1️⃣ 저장소 클론

```bash
git clone https://github.com/hwan0050/stock-prediction-app.git
cd stock-prediction-app
```

#### 2️⃣ 백엔드 설정 (Spring Boot)

```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

서버: `http://localhost:8080`

#### 3️⃣ 프론트엔드 설정 (React)

```bash
cd frontend
npm install
npm start
```

앱: `http://localhost:3000`

#### 4️⃣ ML 모델 설정 (Python)

```bash
cd ml-model
pip install -r requirements.txt
python train.py
```

---

## 💡 사용 방법

### 1. 주식 검색
```
홈 화면에서 종목 코드 또는 이름 입력
예: "삼성전자", "005930", "AAPL"
```

### 2. 차트 확인
```
선택한 종목의 과거 데이터 및 예측 그래프 표시
```

### 3. 예측 보기
```
AI 모델이 분석한 다음 주 예상 가격 확인
```

---

## 📊 API 엔드포인트

### 주가 데이터 조회
```http
GET /api/stocks/{symbol}
```

### 예측 데이터 조회
```http
GET /api/predictions/{symbol}?days=7
```

### 알림 설정
```http
POST /api/alerts
Content-Type: application/json

{
  "symbol": "005930",
  "targetPrice": 75000,
  "condition": "above"
}
```

자세한 API 문서: [API.md](docs/API.md) (예정)

---

## 🎨 화면 구성

### 메인 화면
- 인기 종목 목록
- 실시간 시장 현황
- 검색 바

### 종목 상세
- 실시간 가격
- 과거 데이터 차트
- AI 예측 그래프
- 기술적 지표

### 마이페이지
- 관심 종목
- 알림 설정
- 예측 히스토리

---

## 🧪 테스트

```bash
# 백엔드 테스트
cd backend
./mvnw test

# 프론트엔드 테스트
cd frontend
npm test

# ML 모델 테스트
cd ml-model
pytest
```

---

## 📋 개발 로드맵

### Phase 1: MVP (진행 중)
- [x] 프로젝트 초기 설정
- [ ] 기본 UI 구현
- [ ] 주가 데이터 API 연동
- [ ] 간단한 차트 표시

### Phase 2: 핵심 기능
- [ ] 사용자 인증 시스템
- [ ] 기본 ML 모델 구현
- [ ] 실시간 데이터 업데이트
- [ ] 관심 종목 관리

### Phase 3: 고급 기능
- [ ] 딥러닝 모델 적용
- [ ] 포트폴리오 분석
- [ ] 뉴스 감성 분석
- [ ] 모바일 앱 개발

---

## 🤝 기여하기

프로젝트에 기여하고 싶으신가요? 환영합니다!

### 기여 프로세스

1. **Fork** 이 저장소
2. **Feature 브랜치** 생성 (`git checkout -b feature/amazing-feature`)
3. **변경사항 커밋** (`git commit -m 'feat: Add amazing feature'`)
4. **브랜치에 Push** (`git push origin feature/amazing-feature`)
5. **Pull Request** 생성

### Git 작업 정책

이 프로젝트는 체계적인 Git 작업 정책을 따릅니다.

📖 자세한 내용: [Git 작업 정책](docs/GIT_WORKFLOW.md)

---

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

## 👤 개발자

**Hwan Lee**

- GitHub: [@hwan0050](https://github.com/hwan0050)
- Email: akma0050@naver.com

---

## 🙏 감사의 말

- [Yahoo Finance API](https://finance.yahoo.com) - 주가 데이터 제공
- [Chart.js](https://www.chartjs.org) - 차트 라이브러리
- [Spring Boot](https://spring.io/projects/spring-boot) - 백엔드 프레임워크

---

## 📌 참고 자료

- [프로젝트 위키](../../wiki)
- [이슈 트래커](../../issues)
- [변경 로그](CHANGELOG.md)
- [기여 가이드](CONTRIBUTING.md)

---

<div align="center">

**⭐ 이 프로젝트가 도움이 되셨다면 Star를 눌러주세요! ⭐**

Made with ❤️ by Hwan

</div>
