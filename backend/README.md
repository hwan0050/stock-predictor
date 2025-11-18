# 📈 Stock Predictor - Backend

Spring Boot 기반의 주가 데이터 REST API 서버입니다.

**배포 URL:** https://stock-predictor-zu6p.onrender.com

---

## 🛠️ 기술 스택

- **Spring Boot** 3.2.0
- **Spring Web** - REST API
- **Spring Web Client** - HTTP 클라이언트
- **Lombok** - 보일러플레이트 감소
- **Jackson** - JSON 처리
- **Gradle** - 빌드 도구
- **Java** 17
- **Docker** - 컨테이너화

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
├── Dockerfile                          # Docker 설정
├── build.gradle                        # Gradle 설정
└── README.md
```

---

## 🚀 시작하기

### 사전 요구사항
- Java 17 이상
- Gradle 7.x 이상

### 빌드 및 실행

#### Gradle Wrapper 사용 (권장)
```bash
# 빌드
./gradlew clean build

# 실행
./gradlew bootRun
```

#### Gradle 직접 사용
```bash
# 빌드
gradle clean build

# 실행
gradle bootRun
```

서버는 http://localhost:8080 에서 실행됩니다.

### JAR 파일로 실행
```bash
# 빌드
./gradlew clean build

# 실행
java -jar build/libs/stock-predictor-0.0.1-SNAPSHOT.jar
```

---

## 🐳 Docker

### Docker 이미지 빌드
```bash
docker build -t stock-predictor-backend .
```

### Docker 컨테이너 실행
```bash
docker run -p 8080:8080 stock-predictor-backend
```

### Dockerfile
```dockerfile
FROM gradle:8.5-jdk17 AS build
WORKDIR /app
COPY build.gradle settings.gradle ./
COPY src ./src
RUN gradle clean build -x test

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
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

---

## ⚙️ 설정

### application.properties
```properties
# 서버 포트
server.port=8080

# CORS 설정
cors.allowed-origins=https://stock-predictor-*.vercel.app,https://stock-predictor-lrrj7q16f-hwan0050s-projects.vercel.app

# 로깅
logging.level.com.stock=DEBUG
```

### 환경별 설정
- `application.properties` - 기본 설정
- `application-dev.properties` - 개발 환경
- `application-prod.properties` - 프로덕션 환경

실행 시 프로파일 지정:
```bash
./gradlew bootRun --args='--spring.profiles.active=dev'
```

---

## 🔧 CORS 설정

`CorsConfig.java`:
```java
@Configuration
public class CorsConfig {
    
    @Value("${cors.allowed-origins:https://stock-predictor-*.vercel.app}")
    private String allowedOrigins;
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOriginPatterns(allowedOrigins.split(","))
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

---

## 🚀 배포

### Render 배포 (현재 사용 중) ⭐

#### 환경 변수 설정
```
CORS_ALLOWED_ORIGINS=https://stock-predictor-*.vercel.app,https://stock-predictor-lrrj7q16f-hwan0050s-projects.vercel.app
PORT=8080
```

#### Health Check
```bash
curl https://stock-predictor-zu6p.onrender.com/actuator/health
```

---

## 🌐 배포 URL

### Production
- **API Base:** https://stock-predictor-zu6p.onrender.com
- **Frontend:** https://stock-predictor-lrrj7q16f-hwan0050s-projects.vercel.app

### Local Development
- **API Base:** http://localhost:8080
- **Frontend:** http://localhost:3000

---

**Made with ❤️ by Hwan**