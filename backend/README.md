# 🚀 Stock Predictor - Backend

> Spring Boot 기반 실시간 주가 조회 REST API 서버

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.0-6DB33F?logo=springboot)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-17-007396?logo=java)](https://www.oracle.com/java/)
[![Gradle](https://img.shields.io/badge/Gradle-8.0-02303A?logo=gradle)](https://gradle.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](../LICENSE)

---

## 🎯 프로젝트 개요

Yahoo Finance API를 활용한 실시간 주가 데이터 제공 REST API 서버입니다.

**GitHub**: [https://github.com/hwan0050/stock-predictor](https://github.com/hwan0050/stock-predictor)

---

## ✨ 주요 기능

### 1. 📊 실시간 주가 조회
- 현재 주가 정보 (실시간)
- 시가/종가/고가/저가
- 거래량/평균거래량
- 시가총액
- 등락률 및 등락금액

### 2. 📈 과거 데이터 조회
- 7일/30일/90일/1년 기간 선택
- 일별 종가 및 거래량
- 날짜별 정렬

### 3. 🔧 최적화
- **Spring Cache**: API 호출 캐싱 (5분)
- **CORS 설정**: Frontend 연동
- **예외 처리**: GlobalExceptionHandler

---

## 🛠 기술 스택

| 카테고리 | 기술 |
|---------|-----|
| **Framework** | Spring Boot 3.x |
| **Language** | Java 17 |
| **Build Tool** | Gradle 8.x |
| **External API** | Yahoo Finance (yahoofinance-api) |
| **Caching** | Spring Cache |

---

## 📁 프로젝트 구조

```
backend/
├── src/main/java/com/stock/predictor/
│   ├── config/
│   │   ├── CacheConfig.java         # 캐시 설정
│   │   └── WebConfig.java           # CORS 설정
│   │
│   ├── controller/
│   │   ├── HelloController.java     # 테스트 컨트롤러
│   │   └── StockController.java     # 주가 API 컨트롤러
│   │
│   ├── dto/
│   │   ├── StockDataDto.java        # 현재 주가 DTO
│   │   └── StockHistoryDto.java     # 🆕 과거 데이터 DTO (volume 추가)
│   │
│   ├── exception/
│   │   └── GlobalExceptionHandler.java  # 전역 예외 처리
│   │
│   ├── service/
│   │   └── YahooFinanceService.java     # Yahoo Finance 연동
│   │
│   └── PredictorApplication.java    # 메인 애플리케이션
│
├── src/main/resources/
│   └── application.properties       # 설정 파일
│
├── build.gradle                     # Gradle 빌드 파일
└── README.md
```

---

## 🚀 설치 및 실행

### 사전 요구사항
- Java 17+
- Gradle 8.0+

### 설치
```bash
cd backend
./gradlew clean build
```

### 실행
```bash
# 방법 1: Gradle
./gradlew bootRun

# 방법 2: JAR 파일
java -jar build/libs/predictor-0.0.1-SNAPSHOT.jar

# 방법 3: IntelliJ IDEA
# PredictorApplication.java 우클릭 → Run
```

- URL: http://localhost:8080

---

## 📡 API 엔드포인트

### 1. 현재 주가 조회
```http
GET /api/stocks/{symbol}
```

**Request:**
```bash
curl http://localhost:8080/api/stocks/AAPL
```

**Response:**
```json
{
  "symbol": "AAPL",
  "name": "Apple Inc.",
  "currentPrice": 150.25,
  "open": 148.50,
  "dayHigh": 151.00,
  "dayLow": 147.80,
  "previousClose": 149.50,
  "change": 0.75,
  "changePercent": 0.50,
  "volume": 45680000,
  "avgVolume": 50000000,
  "marketCap": 2500000000000
}
```

---

### 2. 과거 데이터 조회
```http
GET /api/stocks/{symbol}/history?days={days}
```

**Parameters:**
- `symbol`: 주식 심볼 (예: AAPL)
- `days`: 조회 기간 (7, 30, 90, 365)

**Request:**
```bash
curl "http://localhost:8080/api/stocks/AAPL/history?days=30"
```

**Response:**
```json
{
  "symbol": "AAPL",
  "data": [
    {
      "date": "2025-10-16",
      "close": 150.25,
      "volume": 45680000
    },
    {
      "date": "2025-10-17",
      "close": 151.50,
      "volume": 48000000
    }
  ],
  "count": 30
}
```

---

### 3. 헬스 체크
```http
GET /api/hello
```

**Response:**
```json
{
  "message": "Hello, Stock Predictor!"
}
```

---

## 🔧 주요 클래스 설명

### StockController
```java
@RestController
@RequestMapping("/api/stocks")
public class StockController {
    
    @GetMapping("/{symbol}")
    public ResponseEntity<StockDataDto> getStockData(@PathVariable String symbol) {
        // 현재 주가 조회
    }
    
    @GetMapping("/{symbol}/history")
    public ResponseEntity<Map<String, Object>> getStockHistory(
        @PathVariable String symbol,
        @RequestParam(defaultValue = "30") int days
    ) {
        // 과거 데이터 조회
    }
}
```

---

### YahooFinanceService
```java
@Service
public class YahooFinanceService {
    
    @Cacheable(value = "stockData", key = "#symbol")
    public StockDataDto getStockData(String symbol) {
        // Yahoo Finance API 호출 (5분 캐싱)
    }
    
    @Cacheable(value = "stockHistory", key = "#symbol + '_' + #days")
    public List<StockHistoryDto> getStockHistory(String symbol, int days) {
        // 과거 데이터 조회 (캐싱)
    }
}
```

---

### StockHistoryDto (업데이트)
```java
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockHistoryDto {
    private String date;
    private Double close;
    private Long volume;      // 🆕 거래량 추가
    
    // 추가 필드 (선택)
    private Double open;
    private Double high;
    private Double low;
    private Double adjClose;
}
```

---

## ⚙️ 설정

### application.properties
```properties
# 서버 포트
server.port=8080

# 로깅 레벨
logging.level.com.stock.predictor=INFO

# 캐시 설정 (CacheConfig에서 관리)
```

### CacheConfig (Spring Cache)
```java
@Configuration
@EnableCaching
public class CacheConfig {
    
    @Bean
    public CacheManager cacheManager() {
        SimpleCacheManager cacheManager = new SimpleCacheManager();
        cacheManager.setCaches(Arrays.asList(
            new ConcurrentMapCache("stockData"),     // 5분 TTL
            new ConcurrentMapCache("stockHistory")   // 5분 TTL
        ));
        return cacheManager;
    }
}
```

### WebConfig (CORS)
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*");
    }
}
```

---

## 🔒 예외 처리

### GlobalExceptionHandler
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse(e.getMessage()));
    }
    
    @ExceptionHandler(IOException.class)
    public ResponseEntity<ErrorResponse> handleIOException(IOException e) {
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                .body(new ErrorResponse("Failed to fetch stock data"));
    }
}
```

---

## 📊 캐싱 전략

### 캐시 적용
- **stockData**: 현재 주가 (5분 TTL)
- **stockHistory**: 과거 데이터 (5분 TTL)

### 캐시 키
```java
// 현재 주가: "AAPL"
@Cacheable(value = "stockData", key = "#symbol")

// 과거 데이터: "AAPL_30"
@Cacheable(value = "stockHistory", key = "#symbol + '_' + #days")
```

---

## 🧪 테스트

### 단위 테스트
```bash
./gradlew test
```

### API 테스트 (curl)
```bash
# 현재 주가
curl http://localhost:8080/api/stocks/AAPL

# 과거 데이터 (30일)
curl "http://localhost:8080/api/stocks/AAPL/history?days=30"

# 과거 데이터 (7일)
curl "http://localhost:8080/api/stocks/AAPL/history?days=7"
```

---

## 📈 데이터 흐름

```
Frontend (React)
    ↓ HTTP Request
StockController
    ↓ Service Call
YahooFinanceService
    ↓ Cache Check
    ├─ Cache Hit → Return Cached Data
    └─ Cache Miss → Yahoo Finance API
                    ↓
                 Cache Store
                    ↓
                 Return Data
```

---

## 🐛 트러블슈팅

### Yahoo Finance API 429 에러
- **원인**: 너무 많은 요청
- **해결**: Spring Cache 적용 (5분)

### CORS 에러
- **원인**: Frontend 도메인 허용 안 됨
- **해결**: WebConfig에서 CORS 설정

### 데이터 없음 (404)
- **원인**: 잘못된 심볼 입력
- **해결**: 유효한 심볼 확인 (예: AAPL, TSLA)

---

## 🔜 로드맵

- [ ] 데이터베이스 연동 (PostgreSQL)
- [ ] Redis 캐싱
- [ ] JWT 인증
- [ ] Rate Limiting
- [ ] Docker 컨테이너화
- [ ] CI/CD 파이프라인

---

## 📦 의존성

```gradle
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-cache'
    implementation 'com.yahoofinance-api:YahooFinanceAPI:3.17.0'
    
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
    
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
```

---

## 🚀 배포

### JAR 빌드
```bash
./gradlew bootJar
```

### Docker (예정)
```dockerfile
FROM openjdk:17-jdk-slim
COPY build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

---

## 📄 라이센스

MIT License - 자세한 내용은 [LICENSE](../LICENSE) 파일 참조

---

## 👨‍💻 개발자

**Hwan Lee** ([@hwan0050](https://github.com/hwan0050))
- Email: akma0050@naver.com
- GitHub: https://github.com/hwan0050/stock-predictor

---

## 🙏 기여하기

Pull Request를 환영합니다!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Made with ❤️ by hwan0050**