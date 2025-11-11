# 🔧 Stock Predictor - Backend

Spring Boot 기반 주가 데이터 API 서버

---

## 🎯 기술 스택

- **Spring Boot** 3.2.x - 백엔드 프레임워크
- **Java** 17 - 프로그래밍 언어
- **Gradle** 8.x - 빌드 도구
- **Yahoo Finance API** - 실시간 주가 데이터
- **Lombok** - 코드 간소화

---

## 📂 프로젝트 구조

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/stock/predictor/
│   │   │       ├── PredictorApplication.java      # 메인 클래스
│   │   │       ├── controller/
│   │   │       │   └── StockController.java       # REST API 컨트롤러
│   │   │       ├── service/
│   │   │       │   └── YahooFinanceService.java   # 비즈니스 로직
│   │   │       ├── dto/
│   │   │       │   ├── StockDataDto.java          # 주가 데이터 DTO
│   │   │       │   └── StockHistoryDto.java       # 히스토리 DTO
│   │   │       ├── config/
│   │   │       │   └── WebConfig.java             # CORS 설정
│   │   │       └── exception/
│   │   │           └── GlobalExceptionHandler.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/
├── build.gradle
└── README.md
```

---

## 🚀 시작하기

### 사전 요구사항
- **Java** 17 이상
- **Gradle** 8.x 이상 (Wrapper 포함)

### 설치 및 실행

#### 1. 프로젝트 클론
```bash
git clone https://github.com/hwan0050/stock-predictor.git
cd stock-predictor/backend
```

#### 2. 의존성 설치 및 빌드
```bash
./gradlew build

# Windows
.\gradlew.bat build
```

#### 3. 애플리케이션 실행
```bash
./gradlew bootRun

# Windows
.\gradlew.bat bootRun
```

서버가 `http://localhost:8080`에서 실행됩니다.

---

## 📖 API 명세

### 1. 실시간 주가 조회

```http
GET /api/stocks/{symbol}
```

**경로 파라미터:**
- `symbol` (String): 종목 코드 (예: AAPL, MSFT, 005930.KS)

**응답 예시:**
```json
{
  "symbol": "AAPL",
  "name": "Apple Inc.",
  "currentPrice": 178.25,
  "open": 176.50,
  "dayHigh": 179.00,
  "dayLow": 175.80,
  "previousClose": 175.75,
  "change": 2.50,
  "changePercent": 1.42,
  "volume": 45678900,
  "marketCap": 2800000000000,
  "fiftyTwoWeekHigh": 199.62,
  "fiftyTwoWeekLow": 164.08,
  "averageVolume": 52000000
}
```

**에러 응답:**
```json
{
  "message": "Failed to fetch stock data",
  "status": 500
}
```

---

### 2. 주가 히스토리 조회

```http
GET /api/stocks/{symbol}/history
```

**경로 파라미터:**
- `symbol` (String): 종목 코드

**쿼리 파라미터:**
- `days` (Integer, optional): 조회 일수 (기본값: 30)
- `from` (String, optional): 시작일 (YYYY-MM-DD)
- `to` (String, optional): 종료일 (YYYY-MM-DD)

**요청 예시:**
```bash
# 최근 30일
GET /api/stocks/AAPL/history?days=30

# 특정 기간
GET /api/stocks/AAPL/history?from=2024-01-01&to=2024-01-31
```

**응답 예시:**
```json
{
  "symbol": "AAPL",
  "data": [
    {
      "date": "2024-01-01",
      "open": 176.50,
      "high": 179.00,
      "low": 175.80,
      "close": 178.25,
      "adjClose": 178.25,
      "volume": 45678900
    },
    ...
  ],
  "count": 30
}
```

---

### 3. Mock 테스트 데이터

#### 실시간 데이터
```http
GET /api/stocks/TEST
GET /api/stocks/test/mock
```

#### 히스토리 데이터
```http
GET /api/stocks/TEST/history?days=30
```

개발 및 테스트용 Mock 데이터를 제공합니다.  
Yahoo Finance API 호출 제한을 피하면서 테스트할 수 있습니다.

---

## 🔧 설정

### application.properties

```properties
# 서버 포트
server.port=8080

# 애플리케이션 이름
spring.application.name=stock-predictor

# 로깅 레벨
logging.level.com.stock.predictor=INFO
logging.level.org.springframework=INFO
```

---

## 🔌 CORS 설정

Frontend와의 통신을 위한 CORS 설정이 활성화되어 있습니다.

```java
// WebConfig.java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true);
    }
}
```

---

## 📦 주요 의존성

### build.gradle

```gradle
dependencies {
    // Spring Boot
    implementation 'org.springframework.boot:spring-boot-starter-web'
    
    // Yahoo Finance API
    implementation 'com.yahoofinance-api:YahooFinanceAPI:3.17.0'
    
    // Lombok
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
    
    // Test
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
```

---

## 🏗️ 아키텍처

### 계층 구조

```
Controller Layer (API 엔드포인트)
    ↓
Service Layer (비즈니스 로직)
    ↓
External API (Yahoo Finance)
```

### 주요 클래스

#### 1. StockController
REST API 엔드포인트를 정의합니다.

```java
@RestController
@RequestMapping("/api/stocks")
public class StockController {
    
    @GetMapping("/{symbol}")
    public ResponseEntity<StockDataDto> getStock(@PathVariable String symbol) {
        // 주가 조회 로직
    }
    
    @GetMapping("/{symbol}/history")
    public ResponseEntity<Map<String, Object>> getStockHistory(
        @PathVariable String symbol,
        @RequestParam(required = false) Integer days
    ) {
        // 히스토리 조회 로직
    }
}
```

#### 2. YahooFinanceService
Yahoo Finance API와 통신하는 서비스 클래스입니다.

```java
@Service
public class YahooFinanceService {
    
    public StockDataDto getRealtimeStockData(String symbol) {
        // Yahoo API 호출
    }
    
    public List<StockHistoryDto> getStockHistory(String symbol, int days) {
        // 히스토리 데이터 조회
    }
}
```

#### 3. DTO (Data Transfer Objects)
```java
@Data
@Builder
public class StockDataDto {
    private String symbol;
    private String name;
    private BigDecimal currentPrice;
    private BigDecimal change;
    private Double changePercent;
    // ...
}
```

---

## 🧪 테스트

### 단위 테스트 실행
```bash
./gradlew test
```

### API 테스트 (curl)

```bash
# 실시간 주가 조회
curl http://localhost:8080/api/stocks/AAPL

# 히스토리 조회
curl "http://localhost:8080/api/stocks/AAPL/history?days=30"

# Mock 데이터
curl http://localhost:8080/api/stocks/TEST
```

### API 테스트 (Postman)

1. GET `http://localhost:8080/api/stocks/AAPL`
2. GET `http://localhost:8080/api/stocks/AAPL/history?days=30`
3. GET `http://localhost:8080/api/stocks/TEST`

---

## 🐛 에러 처리

### GlobalExceptionHandler

모든 예외를 일관된 형식으로 처리합니다.

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e) {
        ErrorResponse error = new ErrorResponse(
            e.getMessage(),
            HttpStatus.INTERNAL_SERVER_ERROR.value()
        );
        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(error);
    }
}
```

---

## 🚧 알려진 이슈 및 해결 방안

### 1. Yahoo Finance API 429 에러

**문제:**
- 실제 종목 조회 시 "Too Many Requests" 에러 발생
- Yahoo Finance API 무료 버전 호출 제한

**현재 상황:**
- TEST 심볼로 Mock 데이터 자동 반환
- 개발 및 테스트는 정상 진행 가능

**해결 방안:**

#### 방안 1: 캐싱 추가 (우선순위 높음)
```java
@Cacheable(value = "stocks", key = "#symbol")
public StockDataDto getRealtimeStockData(String symbol) {
    // 5분간 캐싱
}
```

#### 방안 2: 대체 API 사용
- Alpha Vantage API
- IEX Cloud API
- Finnhub API

#### 방안 3: Rate Limiting 구현
```java
@RateLimiter(name = "yahooApi")
public StockDataDto getRealtimeStockData(String symbol) {
    // 요청 제한
}
```

---

## 📈 개발 예정 기능

### 단기 (1-2주)
- [ ] Spring Cache 추가
- [ ] Redis 캐싱
- [ ] Rate Limiting
- [ ] 로깅 강화

### 중기 (1개월)
- [ ] 데이터베이스 연동 (MySQL/PostgreSQL)
- [ ] Entity/Repository 구현
- [ ] 주가 데이터 저장 및 관리
- [ ] 스케줄러로 정기 데이터 수집
- [ ] JWT 인증

### 장기 (2개월+)
- [ ] ML 모델 API 연동
- [ ] WebSocket 실시간 업데이트
- [ ] 관심 종목 관리 API
- [ ] 알림 기능
- [ ] 관리자 대시보드

---

## 🔐 보안

### 현재 구현
- CORS 설정
- 에러 메시지 일반화

### 개발 예정
- [ ] API 키 인증
- [ ] JWT 토큰 인증
- [ ] Rate Limiting
- [ ] SQL Injection 방어
- [ ] XSS 방어

---

## 📊 모니터링 및 로깅

### 현재
```java
// SLF4J Logger
@Slf4j
public class StockController {
    log.info("Received request for stock: {}", symbol);
    log.error("Error fetching stock data: {}", e.getMessage());
}
```

### 개발 예정
- [ ] Spring Boot Actuator
- [ ] Prometheus + Grafana
- [ ] ELK Stack (Elasticsearch, Logstash, Kibana)

---

## 🚀 배포

### Docker 배포 (개발 예정)

```dockerfile
FROM openjdk:17-slim
COPY build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

```bash
docker build -t stock-predictor-backend .
docker run -p 8080:8080 stock-predictor-backend
```

### AWS 배포 (개발 예정)
- Elastic Beanstalk
- EC2 + RDS
- ECS + Fargate

---

## 📚 참고 자료

### API
- [Yahoo Finance API GitHub](https://github.com/sstrickx/yahoofinance-api)
- [Alpha Vantage](https://www.alphavantage.co/)

### Spring Boot
- [Spring Boot 공식 문서](https://spring.io/projects/spring-boot)
- [Spring Web MVC](https://docs.spring.io/spring-framework/reference/web/webmvc.html)
- [Spring Cache](https://docs.spring.io/spring-boot/docs/current/reference/html/io.html#io.caching)

### 관련 프로젝트
- [Frontend README](../frontend/README.md)
- [메인 README](../README.md)

---

## 🤝 기여

이슈 및 PR은 언제나 환영합니다!

---

**개발 문의:** GitHub Issues를 통해 문의해주세요!