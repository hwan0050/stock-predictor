# 📈 Stock Predictor - Backend

Spring Boot 기반의 주가 데이터 REST API 서버입니다.

---

## 🛠️ 기술 스택

- **Spring Boot** 3.2.0
- **Spring Web** - REST API
- **Spring Web Client** - HTTP 클라이언트
- **Lombok** - 보일러플레이트 감소
- **Jackson** - JSON 처리
- **Maven** - 빌드 도구

---

## 📁 프로젝트 구조

```
backend/
├── src/main/java/com/stock/
│   ├── StockPredictorApplication.java  # 메인 클래스
│   ├── controller/
│   │   ├── StockController.java        # 주식 API 컨트롤러
│   │   └── NewsController.java         # 뉴스 API 컨트롤러 (선택)
│   ├── service/
│   │   ├── StockService.java           # 주식 비즈니스 로직
│   │   └── NewsService.java            # 뉴스 비즈니스 로직 (선택)
│   ├── model/
│   │   ├── StockData.java              # 주식 데이터 모델
│   │   ├── HistoricalData.java         # 과거 데이터 모델
│   │   └── NewsItem.java               # 뉴스 아이템 모델 (선택)
│   └── config/
│       └── CorsConfig.java             # CORS 설정
├── src/main/resources/
│   ├── application.properties          # 애플리케이션 설정
│   └── application-dev.properties      # 개발 환경 설정
├── src/test/java/
│   └── com/stock/
│       └── StockPredictorApplicationTests.java
├── pom.xml                             # Maven 설정
└── README.md
```

---

## 🚀 시작하기

### 사전 요구사항
- Java 11 이상
- Maven 3.6 이상

### 빌드 및 실행

#### Maven Wrapper 사용 (권장)
```bash
# 빌드
./mvnw clean install

# 실행
./mvnw spring-boot:run
```

#### Maven 직접 사용
```bash
# 빌드
mvn clean install

# 실행
mvn spring-boot:run
```

서버는 http://localhost:8080 에서 실행됩니다.

### JAR 파일로 실행
```bash
# 빌드
./mvnw clean package

# 실행
java -jar target/stock-predictor-0.0.1-SNAPSHOT.jar
```

---

## 📡 API 엔드포인트

### 1. 주식 정보 조회
```
GET /api/stocks/{symbol}
```

**파라미터:**
- `symbol` (path) - 주식 심볼 (예: AAPL, TSLA)

**응답:**
```json
{
  "symbol": "AAPL",
  "name": "Apple Inc.",
  "currentPrice": 150.25,
  "change": 2.5,
  "changePercent": 1.69,
  "volume": 75234567,
  "marketCap": 2450000000000,
  "high52Week": 180.0,
  "low52Week": 120.0
}
```

### 2. 과거 데이터 조회
```
GET /api/stocks/{symbol}/history?days={days}
```

**파라미터:**
- `symbol` (path) - 주식 심볼
- `days` (query) - 조회 기간 (7, 30, 90, 365, 또는 all)

**응답:**
```json
{
  "symbol": "AAPL",
  "data": [
    {
      "date": "2024-01-15",
      "openPrice": 148.5,
      "highPrice": 151.0,
      "lowPrice": 147.8,
      "closePrice": 150.25,
      "volume": 65432100
    },
    ...
  ],
  "count": 30
}
```

### 3. 인기 종목 조회
```
GET /api/stocks/popular
```

**응답:**
```json
[
  {
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "category": "Technology"
  },
  ...
]
```

### 4. 뉴스 조회 (선택적)
```
GET /api/news/{symbol}
```

**파라미터:**
- `symbol` (path) - 주식 심볼

**응답:**
```json
[
  {
    "id": 1,
    "title": "Apple announces new product",
    "description": "...",
    "source": "Reuters",
    "publishedAt": "2024-01-15T10:30:00Z",
    "url": "https://...",
    "sentiment": "positive"
  },
  ...
]
```

---

## ⚙️ 설정

### application.properties
```properties
# 서버 포트
server.port=8080

# CORS 설정
cors.allowed-origins=http://localhost:3000

# API 키 (필요시)
yahoo.finance.api.key=your_api_key_here

# 로깅
logging.level.com.stock=DEBUG
```

### 환경별 설정
- `application.properties` - 기본 설정
- `application-dev.properties` - 개발 환경
- `application-prod.properties` - 프로덕션 환경

실행 시 프로파일 지정:
```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

---

## 🔧 CORS 설정

`CorsConfig.java`:
```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowedHeaders("*");
            }
        };
    }
}
```

---

## 📦 주요 의존성

```xml
<dependencies>
    <!-- Spring Boot Starters -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-webflux</artifactId>
    </dependency>
    
    <!-- Lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
    
    <!-- Test -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

---

## 🔌 외부 API 통합

### Yahoo Finance API
```java
@Service
public class StockService {
    private final WebClient webClient;
    
    public StockData getStockData(String symbol) {
        String url = String.format(
            "https://query1.finance.yahoo.com/v8/finance/chart/%s",
            symbol
        );
        
        // WebClient로 API 호출
        return webClient.get()
            .uri(url)
            .retrieve()
            .bodyToMono(YahooFinanceResponse.class)
            .map(this::convertToStockData)
            .block();
    }
}
```

---

## 🧪 테스트

### 단위 테스트
```bash
./mvnw test
```

### 통합 테스트
```bash
./mvnw verify
```

### 테스트 커버리지
```bash
./mvnw jacoco:report
```

---

## 📊 모니터링

### Spring Boot Actuator (선택적)
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

엔드포인트:
- `/actuator/health` - 헬스 체크
- `/actuator/metrics` - 메트릭
- `/actuator/info` - 애플리케이션 정보

---

## 🐛 에러 처리

### GlobalExceptionHandler
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(SymbolNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleSymbolNotFound(
        SymbolNotFoundException ex
    ) {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse(ex.getMessage()));
    }
}
```

---

## 🔒 보안

### API 키 관리
```properties
# application.properties에 직접 저장하지 말 것!
# 환경 변수 사용 권장
yahoo.finance.api.key=${YAHOO_API_KEY}
```

### HTTPS 설정 (프로덕션)
```properties
server.ssl.enabled=true
server.ssl.key-store=classpath:keystore.p12
server.ssl.key-store-password=changeit
server.ssl.key-store-type=PKCS12
```

---

## 📝 로깅

### Logback 설정
`src/main/resources/logback-spring.xml`:
```xml
<configuration>
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>
    
    <root level="INFO">
        <appender-ref ref="CONSOLE" />
    </root>
    
    <logger name="com.stock" level="DEBUG" />
</configuration>
```

---

## 🚀 배포

### Docker
```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

빌드 및 실행:
```bash
docker build -t stock-predictor-backend .
docker run -p 8080:8080 stock-predictor-backend
```

### Heroku
```bash
heroku create stock-predictor-api
git push heroku main
```

---

## 🔧 개발 가이드

### 새 컨트롤러 추가
```java
@RestController
@RequestMapping("/api/custom")
public class CustomController {
    
    @GetMapping("/{param}")
    public ResponseEntity<CustomData> getData(@PathVariable String param) {
        // 로직 구현
        return ResponseEntity.ok(data);
    }
}
```

### 새 서비스 추가
```java
@Service
public class CustomService {
    
    private final WebClient webClient;
    
    public CustomService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }
    
    public CustomData fetchData() {
        // 비즈니스 로직
    }
}
```

---

## 📈 성능 최적화

### 캐싱 (선택적)
```java
@EnableCaching
@Configuration
public class CacheConfig {
    
    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager("stocks", "history");
    }
}

@Service
public class StockService {
    
    @Cacheable(value = "stocks", key = "#symbol")
    public StockData getStockData(String symbol) {
        // API 호출
    }
}
```

---

## 🤝 기여

이슈나 PR은 언제든 환영합니다!

---

**Made with ❤️ by Hwan**