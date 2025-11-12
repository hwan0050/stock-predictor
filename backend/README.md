# 🚀 Stock Predictor - Backend

> Spring Boot 기반 주가 예측 REST API 서버

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.1.5-6DB33F?logo=springboot)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-17-ED8B00?logo=openjdk)](https://openjdk.org/)
[![Gradle](https://img.shields.io/badge/Gradle-8.4-02303A?logo=gradle)](https://gradle.org/)

---

## 🎯 개요

Stock Predictor의 백엔드는 Spring Boot를 기반으로 한 RESTful API 서버입니다.  
Yahoo Finance API를 활용하여 실시간 주가 데이터를 제공합니다.

---

## ✨ 주요 기능

### API 기능
- 📈 **실시간 주가 조회** - Yahoo Finance API 연동
- 📊 **과거 데이터 조회** - 최대 5년치 히스토리 조회
- 🔄 **캐싱** - Spring Cache로 API 호출 최적화
- 🧪 **Mock 데이터** - TEST 심볼로 개발/테스트 지원

### 기술 기능
- 🌐 **CORS 설정** - Frontend 연동
- 🛡️ **예외 처리** - GlobalExceptionHandler
- 📝 **로깅** - SLF4J 통합
- ⚡ **성능 최적화** - 캐시 전략

---

## 🏗️ 프로젝트 구조

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/stock/predictor/
│   │   │   ├── PredictorApplication.java    # 메인 클래스
│   │   │   │
│   │   │   ├── controller/
│   │   │   │   └── StockController.java     # REST API 컨트롤러
│   │   │   │
│   │   │   ├── service/
│   │   │   │   └── YahooFinanceService.java # Yahoo Finance 연동
│   │   │   │
│   │   │   ├── dto/
│   │   │   │   ├── StockDataDto.java        # 주가 데이터 DTO
│   │   │   │   └── StockHistoryDto.java     # 히스토리 DTO
│   │   │   │
│   │   │   ├── exception/
│   │   │   │   └── GlobalExceptionHandler.java  # 예외 처리
│   │   │   │
│   │   │   └── config/
│   │   │       ├── WebConfig.java           # CORS 설정
│   │   │       └── CacheConfig.java         # 캐시 설정
│   │   │
│   │   └── resources/
│   │       └── application.properties       # 설정 파일
│   │
│   └── test/                                # 테스트 코드
│
├── build.gradle                             # Gradle 빌드 설정
├── gradlew                                  # Gradle Wrapper (Unix)
├── gradlew.bat                              # Gradle Wrapper (Windows)
├── .gitignore
└── README.md                                # 이 파일
```

---

## 🚀 시작하기

### 1. 사전 요구사항

- **Java**: 17 이상
- **Gradle**: 8.x 이상 (또는 Gradle Wrapper 사용)
- **IDE**: IntelliJ IDEA 권장

### 2. 설치

```bash
# 1. 프로젝트 클론
git clone https://github.com/hwan0050/stock-predictor.git
cd stock-predictor/backend

# 2. Gradle 빌드
./gradlew build
# Windows: gradlew.bat build

# 3. 테스트
./gradlew test
```

### 3. 실행

```bash
# Gradle로 실행
./gradlew bootRun
# Windows: gradlew.bat bootRun

# 또는 JAR 실행
java -jar build/libs/predictor-0.0.1-SNAPSHOT.jar
```

서버가 실행되면:
```
http://localhost:8080
```

---

## 📡 API 명세

### Base URL
```
http://localhost:8080/api
```

### 1. 현재 주가 조회

**Endpoint:**
```
GET /stocks/{symbol}
```

**Parameters:**
- `symbol` (path): 주식 심볼 (예: AAPL, TSLA)

**Response 200 OK:**
```json
{
  "symbol": "AAPL",
  "name": "Apple Inc.",
  "currentPrice": 150.25,
  "open": 148.50,
  "dayHigh": 151.00,
  "dayLow": 147.80,
  "previousClose": 147.75,
  "change": 2.50,
  "changePercent": 1.69,
  "volume": 50000000,
  "avgVolume": 55000000,
  "marketCap": 2500000000000,
  "currency": "USD",
  "lastTradeTime": "2024-11-12T16:00:00Z",
  "timestamp": "2024-11-12T23:30:45.790643"
}
```

**Response 404 Not Found:**
```json
{
  "error": "Stock not found: INVALID",
  "timestamp": "2024-11-12T23:30:45.790643"
}
```

**Response 429 Too Many Requests:**
```json
{
  "error": "Too many requests. Please try again later.",
  "timestamp": "2024-11-12T23:30:45.790643"
}
```

---

### 2. 과거 데이터 조회

**Endpoint:**
```
GET /stocks/{symbol}/history
```

**Parameters:**
- `symbol` (path): 주식 심볼
- `days` (query, optional): 조회 기간 (기본값: 30, 최대: 1825)
- `from` (query, optional): 시작일 (YYYY-MM-DD)
- `to` (query, optional): 종료일 (YYYY-MM-DD)

**Example:**
```
GET /stocks/AAPL/history?days=30
GET /stocks/AAPL/history?from=2024-01-01&to=2024-12-31
```

**Response 200 OK:**
```json
{
  "symbol": "AAPL",
  "data": [
    {
      "date": "2024-11-12",
      "open": 148.50,
      "high": 151.00,
      "low": 147.80,
      "close": 150.25,
      "volume": 50000000
    },
    {
      "date": "2024-11-11",
      "open": 147.00,
      "high": 149.00,
      "low": 146.50,
      "close": 147.75,
      "volume": 52000000
    }
    // ... (총 30개)
  ],
  "count": 30
}
```

---

### 3. Mock 데이터 (TEST 심볼)

**Endpoint:**
```
GET /stocks/TEST
GET /stocks/TEST/history?days=30
```

**특징:**
- Yahoo Finance API 호출 없음
- 개발/테스트용 Mock 데이터 반환
- API 제한 없음

---

## ⚙️ 설정

### application.properties

```properties
# 서버 포트
server.port=8080

# 로깅 레벨
logging.level.com.stock.predictor=DEBUG
logging.level.org.springframework.web=INFO

# 캐시 설정 (추가 예정)
spring.cache.type=simple
```

---

## 🔧 주요 컴포넌트

### 1. StockController

REST API 엔드포인트 처리

**Endpoints:**
- `GET /api/stocks/{symbol}`
- `GET /api/stocks/{symbol}/history`

**Features:**
- 입력 검증
- 로깅
- 예외 처리

### 2. YahooFinanceService

Yahoo Finance API 연동 서비스

**Methods:**
- `getStockData(symbol)`: 현재 주가 조회
- `getStockHistory(symbol, days)`: 과거 데이터 조회
- `getStockHistory(symbol, from, to)`: 기간별 조회

**Features:**
- Yahoo Finance API 호출
- Mock 데이터 (TEST)
- 에러 처리
- 캐싱 지원

### 3. CacheConfig

Spring Cache 설정

**Caches:**
- `stockData`: 5분 TTL
- `stockHistory`: 5분 TTL

**Features:**
- 429 에러 방지
- API 호출 최적화
- 메모리 효율

### 4. GlobalExceptionHandler

전역 예외 처리

**Handles:**
- `RuntimeException`
- `IllegalArgumentException`
- Generic `Exception`

**Response:**
```json
{
  "error": "Error message",
  "timestamp": "ISO-8601 timestamp"
}
```

---

## 🛡️ CORS 설정

### WebConfig

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

**허용 Origin:**
- `http://localhost:3000` (Frontend 개발 서버)

프로덕션 배포 시 변경 필요!

---

## 🧪 테스트

### 수동 테스트

#### 1. cURL
```bash
# 현재 주가 조회
curl http://localhost:8080/api/stocks/AAPL

# 과거 데이터 조회
curl "http://localhost:8080/api/stocks/AAPL/history?days=30"

# Mock 데이터
curl http://localhost:8080/api/stocks/TEST
```

#### 2. Postman
```
GET http://localhost:8080/api/stocks/AAPL
GET http://localhost:8080/api/stocks/AAPL/history?days=30
```

#### 3. 브라우저
```
http://localhost:8080/api/stocks/TEST
http://localhost:8080/api/stocks/TEST/history?days=30
```

---

## 📦 의존성

### build.gradle

```gradle
dependencies {
    // Spring Boot
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-cache'
    
    // Yahoo Finance API
    implementation 'com.yahoofinance-api:YahooFinanceAPI:3.17.0'
    
    // Lombok (선택)
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
    
    // Test
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
```

---

## 🐛 문제 해결

### 1. Yahoo Finance API 429 에러

**문제:**
```
Too many requests to Yahoo Finance API
```

**해결책:**
1. TEST 심볼 사용 (Mock 데이터)
2. 24시간 대기
3. 캐시 활용 (CacheConfig)
4. VPN 사용

### 2. CORS 에러

**문제:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**해결책:**
- WebConfig의 allowedOrigins 확인
- Frontend URL 확인
- allowCredentials 설정 확인

### 3. 빌드 실패

**문제:**
```
Build failed
```

**해결책:**
```bash
# 클린 빌드
./gradlew clean build

# 테스트 스킵
./gradlew build -x test
```

---

## 📊 성능 최적화

### 캐싱 전략

**Current:**
- Spring Cache (Simple)
- 5분 TTL
- 메모리 기반

**Future:**
- Redis 캐시
- 분산 캐싱
- TTL 최적화

### API 호출 최적화

1. ✅ 캐시 적용
2. ✅ Mock 데이터 활용
3. 📅 배치 조회 (예정)
4. 📅 WebSocket 실시간 업데이트 (예정)

---

## 🚀 배포

### AWS EC2 배포 (예정)

```bash
# 1. JAR 빌드
./gradlew bootJar

# 2. EC2에 업로드
scp build/libs/*.jar ec2-user@your-ec2:/home/ec2-user/

# 3. 실행
java -jar predictor-0.0.1-SNAPSHOT.jar
```

### Docker 배포 (예정)

```dockerfile
FROM openjdk:17-jdk-slim
COPY build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

---

## 🔮 향후 계획

### Phase 1 (완료)
- ✅ 기본 API 구현
- ✅ Yahoo Finance 연동
- ✅ CORS 설정
- ✅ 캐싱

### Phase 2 (예정)
- [ ] 데이터베이스 연동 (PostgreSQL)
- [ ] JPA Entity 설계
- [ ] 데이터 저장 기능
- [ ] 배치 작업

### Phase 3 (예정)
- [ ] AI 예측 모델 연동
- [ ] Python Flask API 통합
- [ ] 예측 결과 제공

### Phase 4 (예정)
- [ ] 사용자 인증 (JWT)
- [ ] Spring Security
- [ ] 관심 종목 저장
- [ ] 알림 기능

---

## 📝 체인지로그

### v0.6.0 (2024-11-12)
- 🔧 컴포넌트 버그 수정 대응
- 📄 README 업데이트

### v0.5.0 (2024-11-11)
- ✨ Spring Cache 추가
- 🛡️ GlobalExceptionHandler 개선
- 📝 로깅 강화

### v0.1.0 (2024-11-10)
- 🎉 초기 버전
- ✨ 기본 API 구현
- 🌐 CORS 설정

---

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

자세한 내용은 [CONTRIBUTING.md](../CONTRIBUTING.md) 참고

---

## 📄 라이센스

MIT License - [LICENSE](../LICENSE) 파일 참고

---

## 📞 문의

- **GitHub**: [@hwan0050](https://github.com/hwan0050)
- **Email**: akma0050@naver.com
- **Issues**: https://github.com/hwan0050/stock-predictor/issues

---

## 🔗 관련 문서

- [Frontend README](../frontend/README.md)
- [CHECKLIST](../CHECKLIST.md)
- [CONTRIBUTING](../CONTRIBUTING.md)

---

**Made with ❤️ by hwan0050**