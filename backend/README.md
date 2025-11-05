# Backend

Spring Boot 기반 REST API 서버

---

## 🚀 Quick Start

### Prerequisites

- Java 11 이상 (JDK 11+)
- Maven 3.6 이상
- PostgreSQL 13 이상

### Installation
```bash
cd backend
./mvnw clean install
```

### Run Development Server
```bash
./mvnw spring-boot:run
```

서버가 실행됩니다: `http://localhost:8080`

### Build for Production
```bash
./mvnw clean package
java -jar target/stock-predictor-backend-0.1.0.jar
```

---

## 📦 Tech Stack

### Framework
- **Spring Boot 2.7** - 애플리케이션 프레임워크
- **Spring Web** - RESTful API 개발
- **Spring Data JPA** - 데이터베이스 ORM

### Database
- **PostgreSQL** - 주요 데이터베이스
- **H2** - 테스트용 인메모리 DB
- **Flyway** - 데이터베이스 마이그레이션

### Security
- **Spring Security** *(예정)* - 인증/인가
- **JWT** *(예정)* - 토큰 기반 인증

### External APIs
- **Yahoo Finance API** - 주가 데이터
- **Alpha Vantage API** *(예정)* - 실시간 시세

### Development Tools
- **Lombok** - 보일러플레이트 코드 자동 생성
- **MapStruct** - 객체 매핑
- **Swagger/OpenAPI** - API 문서 자동화

### Testing
- **JUnit 5** - 단위 테스트
- **Mockito** - 모킹 프레임워크
- **TestContainers** - 통합 테스트

---

## 📁 Project Structure
```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/stock/predictor/
│   │   │       ├── StockPredictorApplication.java   # 메인 클래스
│   │   │       │
│   │   │       ├── controller/        # REST 컨트롤러
│   │   │       │   ├── StockController.java
│   │   │       │   ├── PredictionController.java
│   │   │       │   └── AlertController.java
│   │   │       │
│   │   │       ├── service/           # 비즈니스 로직
│   │   │       │   ├── StockService.java
│   │   │       │   ├── PredictionService.java
│   │   │       │   └── AlertService.java
│   │   │       │
│   │   │       ├── repository/        # 데이터 액세스
│   │   │       │   ├── StockRepository.java
│   │   │       │   ├── PredictionRepository.java
│   │   │       │   └── AlertRepository.java
│   │   │       │
│   │   │       ├── model/             # 엔티티
│   │   │       │   ├── Stock.java
│   │   │       │   ├── Prediction.java
│   │   │       │   └── Alert.java
│   │   │       │
│   │   │       ├── dto/               # Data Transfer Objects
│   │   │       │   ├── StockDto.java
│   │   │       │   └── PredictionDto.java
│   │   │       │
│   │   │       ├── config/            # 설정 클래스
│   │   │       │   ├── SecurityConfig.java
│   │   │       │   └── SwaggerConfig.java
│   │   │       │
│   │   │       ├── exception/         # 예외 처리
│   │   │       │   ├── GlobalExceptionHandler.java
│   │   │       │   └── StockNotFoundException.java
│   │   │       │
│   │   │       └── util/              # 유틸리티
│   │   │           └── DateUtils.java
│   │   │
│   │   └── resources/
│   │       ├── application.yml        # 설정 파일
│   │       ├── application-dev.yml    # 개발 환경
│   │       ├── application-prod.yml   # 운영 환경
│   │       └── db/migration/          # Flyway 마이그레이션
│   │
│   └── test/
│       └── java/
│           └── com/stock/predictor/
│               ├── controller/        # 컨트롤러 테스트
│               ├── service/           # 서비스 테스트
│               └── repository/        # 리포지토리 테스트
│
├── pom.xml                            # Maven 의존성
└── README.md                          # 이 문서
```

---

## 🎯 Features

### 구현 완료
- [ ] 프로젝트 초기 설정
- [ ] 데이터베이스 스키마 설계
- [ ] 기본 REST API 구조

### 개발 중
- [ ] 주식 데이터 CRUD API
- [ ] 외부 API 연동
- [ ] 예측 결과 저장/조회

### 예정
- [ ] 사용자 인증 시스템
- [ ] 알림 발송 기능
- [ ] 캐싱 레이어 (Redis)
- [ ] 실시간 데이터 스트리밍
- [ ] API Rate Limiting

---

## 🔌 API Endpoints

자세한 API 문서는 [API.md](../docs/API.md)를 참조하세요.

### 주식 데이터
```
GET    /api/stocks/{symbol}           # 주식 정보 조회
GET    /api/stocks/{symbol}/history   # 과거 데이터 조회
GET    /api/stocks/search              # 종목 검색
```

### 예측 데이터
```
GET    /api/predictions/{symbol}      # 예측 결과 조회
POST   /api/predictions/{symbol}      # 예측 요청
```

### 알림
```
POST   /api/alerts                    # 알림 생성
GET    /api/alerts                    # 알림 목록
DELETE /api/alerts/{id}               # 알림 삭제
```

---

## 🗄️ Database Schema

### Stock (주식 정보)
```sql
CREATE TABLE stock (
    id BIGSERIAL PRIMARY KEY,
    symbol VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    market VARCHAR(20),
    current_price DECIMAL(15, 2),
    change_amount DECIMAL(15, 2),
    change_percent DECIMAL(5, 2),
    volume BIGINT,
    market_cap BIGINT,
    updated_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Prediction (예측 결과)
```sql
CREATE TABLE prediction (
    id BIGSERIAL PRIMARY KEY,
    stock_id BIGINT REFERENCES stock(id),
    prediction_date DATE NOT NULL,
    predicted_price DECIMAL(15, 2),
    confidence DECIMAL(3, 2),
    min_price DECIMAL(15, 2),
    max_price DECIMAL(15, 2),
    model_version VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Alert (가격 알림)
```sql
CREATE TABLE alert (
    id BIGSERIAL PRIMARY KEY,
    stock_id BIGINT REFERENCES stock(id),
    target_price DECIMAL(15, 2) NOT NULL,
    condition VARCHAR(10) NOT NULL,
    email VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    triggered_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔧 Configuration

### application.yml
```yaml
spring:
  application:
    name: stock-predictor
  datasource:
    url: jdbc:postgresql://localhost:5432/stockdb
    username: ${DB_USERNAME:postgres}
    password: ${DB_PASSWORD:password}
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: true
    
server:
  port: 8080
  
api:
  yahoo-finance:
    base-url: https://query1.finance.yahoo.com
  rate-limit:
    requests-per-hour: 1000
```

---

## 🧪 Testing

### Run All Tests
```bash
./mvnw test
```

### Run Specific Test
```bash
./mvnw test -Dtest=StockServiceTest
```

### Integration Tests
```bash
./mvnw verify -P integration-tests
```

### Test Coverage Report
```bash
./mvnw jacoco:report
```

리포트 확인: `target/site/jacoco/index.html`

---

## 🚧 Development Guidelines

### Code Style
- **Java Code Convention** 준수
- **Lombok** 적극 활용
- **명확한 네이밍**: 메서드명은 동사로 시작
- **JavaDoc**: public 메서드에 작성

### Exception Handling
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(StockNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleStockNotFound(
        StockNotFoundException ex) {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse(ex.getMessage()));
    }
}
```

### Commit Convention
```
feat(stock): 주식 데이터 조회 API 추가
fix(api): 데이터 파싱 오류 수정
refactor(service): 비즈니스 로직 리팩토링
test(controller): 컨트롤러 단위 테스트 추가
```

자세한 내용은 [Git 작업 정책](../docs/GIT_WORKFLOW.md)을 참조하세요.

---

## 🐛 Troubleshooting

### 포트 이미 사용 중
```bash
# application.yml에서 포트 변경
server:
  port: 8081
```

### 데이터베이스 연결 실패
```bash
# PostgreSQL 실행 확인
pg_ctl status

# 연결 테스트
psql -U postgres -h localhost
```

### Maven 의존성 오류
```bash
# Maven 캐시 정리
./mvnw dependency:purge-local-repository
./mvnw clean install
```

---

## 📚 Learning Resources

- [Spring Boot 공식 문서](https://spring.io/projects/spring-boot)
- [Spring Data JPA 가이드](https://spring.io/guides/gs/accessing-data-jpa/)
- [PostgreSQL 문서](https://www.postgresql.org/docs/)

---

## 🤝 Contributing

버그 리포트나 기능 제안은 [Issues](../../issues)에 등록해주세요.

자세한 기여 방법은 [CONTRIBUTING.md](../CONTRIBUTING.md)를 참조하세요.

---

## 📞 Contact

문의사항: akma0050@naver.com
