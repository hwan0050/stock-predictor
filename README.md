# 📈 주가 예측 웹 애플리케이션

실시간 주가 데이터 조회 및 머신러닝 기반 주가 예측을 제공하는 풀스택 웹 애플리케이션

[![GitHub stars](https://img.shields.io/github/stars/hwan0050/stock-predictor?style=social)](https://github.com/hwan0050/stock-predictor)
[![GitHub issues](https://img.shields.io/github/issues/hwan0050/stock-predictor)](https://github.com/hwan0050/stock-predictor/issues)

## 🎯 프로젝트 개요

실시간 주가 데이터를 시각화하고, LSTM 딥러닝 모델을 활용하여 주가를 예측하는 웹 애플리케이션입니다.

### 주요 기능
- ✅ **실시간 주가 조회**: Yahoo Finance API를 통한 실시간 주가 데이터
- ✅ **차트 시각화**: Chart.js를 활용한 30일 주가 히스토리 차트
- ✅ **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- 🚧 **주가 예측**: LSTM 모델 기반 주가 예측 (개발 중)
- 🚧 **관심 종목**: 종목 저장 및 관리 (개발 예정)
- 🚧 **비교 분석**: 여러 종목 비교 기능 (개발 예정)

---

## 🏗️ 기술 스택

### Frontend
- **React** 18.x - UI 프레임워크
- **Chart.js** - 차트 라이브러리
- **Axios** - HTTP 클라이언트
- **CSS3** - 스타일링

### Backend
- **Spring Boot** 3.x - Java 백엔드 프레임워크
- **Yahoo Finance API** - 실시간 주가 데이터
- **Gradle** - 빌드 도구

### ML (개발 예정)
- **Python** 3.x
- **TensorFlow/Keras** - LSTM 모델
- **Pandas** - 데이터 처리
- **Flask** - ML API 서버

---

## 📊 프로젝트 구조

```
stock-predictor/
├── backend/                # Spring Boot 백엔드
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/stock/predictor/
│   │   │   │       ├── controller/    # REST API 컨트롤러
│   │   │   │       ├── service/       # 비즈니스 로직
│   │   │   │       ├── dto/           # 데이터 전송 객체
│   │   │   │       └── config/        # 설정 클래스
│   │   │   └── resources/
│   │   └── test/
│   └── README.md
│
├── frontend/               # React 프론트엔드
│   ├── src/
│   │   ├── components/    # React 컴포넌트
│   │   ├── App.js
│   │   └── index.js
│   └── README.md
│
├── ml/                    # ML 모델 (개발 예정)
│
├── CHECKLIST.md          # 개발 체크리스트
└── README.md             # 프로젝트 문서
```

---

## 🚀 시작하기

### 사전 요구사항
- **Java** 17 이상
- **Node.js** 16 이상
- **npm** 또는 **yarn**
- **Git**

### 설치 및 실행

#### 1. 저장소 클론
```bash
git clone https://github.com/hwan0050/stock-predictor.git
cd stock-predictor
```

#### 2. Backend 실행
```bash
cd backend
./gradlew bootRun

# Windows
.\gradlew.bat bootRun
```
Backend 서버: `http://localhost:8080`

#### 3. Frontend 실행
```bash
cd frontend
npm install
npm start
```
Frontend 앱: `http://localhost:3000`

---

## 📖 API 문서

### 실시간 주가 조회
```http
GET /api/stocks/{symbol}
```

**예시:**
```bash
curl http://localhost:8080/api/stocks/AAPL
```

**응답:**
```json
{
  "symbol": "AAPL",
  "name": "Apple Inc.",
  "currentPrice": 178.25,
  "change": 2.50,
  "changePercent": 1.42,
  "volume": 45678900,
  "marketCap": 2800000000000
}
```

### 주가 히스토리 조회
```http
GET /api/stocks/{symbol}/history?days=30
```

### Mock 테스트 데이터
```http
GET /api/stocks/TEST
GET /api/stocks/TEST/history?days=30
```

개발 및 테스트용 Mock 데이터를 제공합니다.

---

## 📈 개발 진행 상황

**전체 진행률: 50%**

### ✅ 완료
- [x] Backend API 서버 구축
- [x] Yahoo Finance API 연동
- [x] Frontend React 앱 개발
- [x] Chart.js 차트 구현
- [x] Backend-Frontend 연동
- [x] axios HTTP 클라이언트 적용
- [x] 반응형 디자인
- [x] UI/UX 개선 (로딩 스피너, 에러 메시지)
- [x] Mock 테스트 데이터

### 🚧 진행 중
- [ ] 캐싱 추가 (Redis/Spring Cache)
- [ ] 데이터베이스 연동
- [ ] 사용자 인증

### 📅 개발 예정
- [ ] LSTM 주가 예측 모델
- [ ] 관심 종목 저장
- [ ] 종목 비교 기능
- [ ] 검색 히스토리
- [ ] 알림 기능
- [ ] 배포 (AWS/Vercel)

자세한 진행 상황은 [CHECKLIST.md](CHECKLIST.md)를 참고하세요.

---

## 🐛 알려진 이슈

### Yahoo Finance API 429 에러
**문제:** 실제 종목 검색 시 "Too Many Requests" 에러 발생  
**원인:** Yahoo Finance API 무료 버전 호출 제한  
**해결 방안:**
- 캐싱 추가 (우선순위 1)
- 대체 API 사용 (Alpha Vantage, IEX Cloud)

**임시 해결:** `TEST` 심볼로 Mock 데이터 사용

---

## 🤝 기여하기

기여는 언제나 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

---

## 👨‍💻 개발자

**Hwan Lee**
- GitHub: [@hwan0050](https://github.com/hwan0050)

---

## 📚 참고 자료

- [Backend README](backend/README.md)
- [Frontend README](frontend/README.md)
- [CHECKLIST.md](CHECKLIST.md)

---

**⭐ 이 프로젝트가 도움이 되셨다면 Star를 눌러주세요!**