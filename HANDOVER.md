# 🚀 Stock Predictor 배포 가이드

프로젝트를 Vercel (Frontend)과 Render (Backend)에 배포하는 상세한 가이드입니다.

**마지막 업데이트:** 2025년 11월  
**배포 상태:** ✅ 완료

---

## 📋 목차

1. [배포 개요](#배포-개요)
2. [사전 준비](#사전-준비)
3. [Backend 배포 (Render)](#backend-배포-render)
4. [Frontend 배포 (Vercel)](#frontend-배포-vercel)
5. [통합 테스트](#통합-테스트)
6. [문제 해결](#문제-해결)
7. [유지보수](#유지보수)

---

## 🌐 배포 개요

### 현재 배포 구조
```
┌─────────────────┐
│   사용자        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Vercel         │ ← Frontend (React)
│  (Frontend)     │   https://stock-predictor-lrrj7q16f-hwan0050s-projects.vercel.app
└────────┬────────┘
         │ API 호출
         ▼
┌─────────────────┐
│  Render         │ ← Backend (Spring Boot)
│  (Backend)      │   https://stock-predictor-zu6p.onrender.com
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Yahoo Finance   │ ← 외부 API
│     API         │
└─────────────────┘
```

### 배포 플랫폼 선택 이유

#### Vercel (Frontend)
- ✅ React 앱 최적화
- ✅ 자동 빌드 및 배포
- ✅ CDN 제공
- ✅ 무료 플랜 제공
- ✅ GitHub 통합

#### Render (Backend)
- ✅ Docker 지원
- ✅ Java 17 호환
- ✅ 자동 배포
- ✅ 무료 플랜 제공
- ✅ GitHub 통합

---

## 📋 사전 준비

### 필요한 계정
- [x] GitHub 계정
- [x] Vercel 계정 (https://vercel.com)
- [x] Render 계정 (https://render.com)

### 필요한 도구
- [x] Git
- [x] Node.js 18+
- [x] Java 17
- [x] Gradle
- [x] Docker (선택)

### GitHub 저장소 준비
```bash
# 저장소 클론
git clone https://github.com/hwan0050/stock-predictor.git
cd stock-predictor

# 최신 상태 확인
git pull origin main

# 브랜치 확인
git branch
```

---

## 🔧 Backend 배포 (Render)

### Step 1: Dockerfile 준비

`backend/Dockerfile`:
```dockerfile
# 빌드 스테이지
FROM gradle:8.5-jdk17 AS build
WORKDIR /app
COPY build.gradle settings.gradle ./
COPY src ./src
RUN gradle clean build -x test

# 실행 스테이지
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**중요 사항:**
- ✅ Java 17 사용 (21이 아님!)
- ✅ Multi-stage build로 이미지 크기 최소화
- ✅ 테스트 스킵으로 빌드 시간 단축

### Step 2: CORS 설정 수정

`backend/src/main/java/com/stock/config/CorsConfig.java`:
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

**중요 사항:**
- ✅ `allowedOriginPatterns` 사용 (와일드카드 지원)
- ✅ Vercel preview URL 패턴 허용

### Step 3: application.properties 설정

`backend/src/main/resources/application.properties`:
```properties
# 서버 포트
server.port=8080

# CORS 설정 (환경 변수로 재정의 가능)
cors.allowed-origins=https://stock-predictor-*.vercel.app,https://stock-predictor-lrrj7q16f-hwan0050s-projects.vercel.app

# 로깅
logging.level.com.stock=INFO
```

### Step 4: Render에 배포

#### 4-1. Render 프로젝트 생성
1. Render Dashboard 접속: https://dashboard.render.com
2. **New** → **Web Service** 클릭
3. GitHub 저장소 연결

#### 4-2. 설정
```
Name: stock-predictor
Region: Oregon (US West)
Branch: main
Root Directory: backend
Environment: Docker
Dockerfile Path: ./Dockerfile
```

#### 4-3. Plan 선택
```
Instance Type: Free
```

#### 4-4. 환경 변수 설정
Environment Variables:
```
CORS_ALLOWED_ORIGINS=https://stock-predictor-*.vercel.app,https://stock-predictor-lrrj7q16f-hwan0050s-projects.vercel.app
PORT=8080
```

#### 4-5. 배포 시작
- **Create Web Service** 클릭
- 빌드 로그 실시간 확인
- 약 5-10분 소요

#### 4-6. 배포 URL 확인
```
https://stock-predictor-zu6p.onrender.com
```

### Step 5: Backend 테스트

```bash
# Health Check
curl https://stock-predictor-zu6p.onrender.com/actuator/health

# API 테스트
curl https://stock-predictor-zu6p.onrender.com/api/stocks/AAPL

# 과거 데이터 조회
curl "https://stock-predictor-zu6p.onrender.com/api/stocks/AAPL/history?days=30"
```

**예상 응답:**
```json
{
  "symbol": "AAPL",
  "name": "Apple Inc.",
  "currentPrice": 150.25,
  ...
}
```

---

## 🎨 Frontend 배포 (Vercel)

### Step 1: 환경 변수 파일 준비

`frontend/.env` (로컬 개발용):
```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_API_BASE_PATH=/api
```

**중요:** 이 파일은 Git에 커밋하지 않습니다!

### Step 2: package.json 확인

`frontend/package.json`:
```json
{
  "name": "stock-predictor-frontend",
  "version": "0.1.0",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.6.2",
    "chart.js": "^4.4.0",
    "react-chartjs-2": "^5.2.0",
    ...
  }
}
```

### Step 3: Vercel에 배포

#### 3-1. Vercel CLI 설치 (선택)
```bash
npm install -g vercel
```

#### 3-2. Vercel 로그인
```bash
vercel login
```

#### 3-3. 프로젝트 배포
```bash
cd frontend
vercel
```

또는 Vercel Dashboard 사용:

#### 3-4. Dashboard에서 배포
1. Vercel Dashboard 접속: https://vercel.com/dashboard
2. **Add New...** → **Project** 클릭
3. GitHub 저장소 import
4. 설정:
   ```
   Framework Preset: Create React App
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```

#### 3-5. 환경 변수 설정
Environment Variables:
```
REACT_APP_API_URL=https://stock-predictor-zu6p.onrender.com
REACT_APP_API_BASE_PATH=/api
```

**설정 위치:**
- Production
- Preview (선택)
- Development (선택)

#### 3-6. 배포 시작
- **Deploy** 클릭
- 빌드 로그 확인
- 약 2-3분 소요

#### 3-7. 배포 URL 확인
```
Production: https://stock-predictor-lrrj7q16f-hwan0050s-projects.vercel.app
Preview: https://stock-predictor-[hash].vercel.app
```

### Step 4: 자동 배포 설정

#### Git Integration
```bash
# main 브랜치에 push하면 자동 배포
git add .
git commit -m "deploy: Update frontend"
git push origin main
```

#### 배포 설정
Vercel Dashboard → Settings → Git:
- ✅ Production Branch: main
- ✅ Preview Branches: All branches
- ✅ Ignored Build Step: (비활성화)

---

## ✅ 통합 테스트

### 1. Frontend에서 Backend 연결 테스트

브라우저에서:
```
https://stock-predictor-lrrj7q16f-hwan0050s-projects.vercel.app
```

#### 테스트 항목
- [x] 검색 기능 (예: AAPL)
- [x] 차트 표시
- [x] 기간 변경 (7일, 30일, 90일 등)
- [x] 차트 타입 변경 (라인, 캔들스틱)
- [x] 이동평균선
- [x] 기술적 지표 (RSI, MACD, BB)
- [x] 비교 모드
- [x] 관심 종목
- [x] 포트폴리오
- [x] 뉴스 피드
- [x] 다크모드
- [x] 반응형 디자인

### 2. API 엔드포인트 테스트

```bash
# 주식 정보
curl https://stock-predictor-zu6p.onrender.com/api/stocks/AAPL

# 과거 데이터
curl "https://stock-predictor-zu6p.onrender.com/api/stocks/AAPL/history?days=30"

# 인기 종목
curl https://stock-predictor-zu6p.onrender.com/api/stocks/popular
```

### 3. CORS 테스트

브라우저 개발자 도구 → Network 탭:
- ✅ API 요청 성공 (200 OK)
- ✅ CORS 에러 없음
- ✅ 응답 데이터 정상

### 4. 성능 테스트

- [x] 페이지 로드 시간 < 3초
- [x] API 응답 시간 < 2초
- [x] 차트 렌더링 부드러움

---

## 🐛 문제 해결

### Backend 문제

#### 1. Cold Start (첫 요청 지연)
**증상:** 첫 API 요청이 30초 이상 소요

**원인:** Render 무료 플랜은 15분 비활성 시 sleep

**해결:**
- 유료 플랜으로 업그레이드
- 또는 주기적 핑 서비스 사용 (예: UptimeRobot)

#### 2. Java 버전 에러
**증상:** `UnsupportedClassVersionError`

**원인:** Java 21 사용

**해결:** Dockerfile에서 Java 17 사용
```dockerfile
FROM eclipse-temurin:17-jre-alpine
```

#### 3. CORS 에러
**증상:** `Access-Control-Allow-Origin` 에러

**해결:**
1. `CorsConfig.java`에서 `allowedOriginPatterns` 사용
2. Render 환경 변수에 모든 Vercel URL 추가
```
CORS_ALLOWED_ORIGINS=https://stock-predictor-*.vercel.app,https://stock-predictor-lrrj7q16f-hwan0050s-projects.vercel.app
```

#### 4. 빌드 실패
**증상:** Gradle 빌드 에러

**해결:**
1. 로컬에서 빌드 테스트
```bash
./gradlew clean build
```
2. Render 로그 확인
3. 의존성 문제 해결

### Frontend 문제

#### 1. 환경 변수 미적용
**증상:** API 호출 실패 (localhost:8080 호출)

**해결:**
- Vercel Dashboard → Settings → Environment Variables 확인
- 변수 재배포 필요 시 Redeploy

#### 2. 빌드 에러
**증상:** `npm run build` 실패

**해결:**
1. 로컬에서 빌드 테스트
```bash
npm run build
```
2. 의존성 버전 확인
```bash
npm audit fix
```

#### 3. Routing 404
**증상:** 페이지 새로고침 시 404

**해결:** Vercel에서는 자동 처리됨 (SPA fallback)

#### 4. Chart 렌더링 오류
**증상:** 차트가 표시되지 않음

**해결:**
- Chart.js 버전 확인
- 브라우저 콘솔 에러 확인

### 일반 문제

#### 1. API 응답 느림
**원인:** Yahoo Finance API 지연

**해결:**
- 캐싱 추가 (선택)
- Loading UI 개선

#### 2. LocalStorage 데이터 손실
**원인:** 브라우저 캐시 삭제

**해결:**
- 사용자에게 안내
- 백업/복원 기능 추가 (향후)

---

## 🔄 배포 워크플로우

### 개발 → 배포 프로세스

```
1. 로컬 개발
   ├─ 기능 구현
   ├─ 테스트
   └─ 커밋

2. Git Push
   ├─ main 브랜치에 push
   └─ 자동 배포 트리거

3. Backend 배포 (Render)
   ├─ Dockerfile 빌드
   ├─ 이미지 생성
   ├─ 컨테이너 실행
   └─ Health Check

4. Frontend 배포 (Vercel)
   ├─ npm install
   ├─ npm run build
   ├─ CDN 배포
   └─ URL 생성

5. 통합 테스트
   └─ 기능 확인
```

### 롤백 방법

#### Render (Backend)
1. Render Dashboard → Deploys
2. 이전 배포 선택
3. **Rollback** 클릭

#### Vercel (Frontend)
1. Vercel Dashboard → Deployments
2. 이전 배포 선택
3. **Promote to Production** 클릭

---

## 🔧 유지보수

### 정기 점검 항목

#### 매일
- [ ] Health Check 확인
- [ ] API 응답 시간 확인
- [ ] 에러 로그 확인

#### 매주
- [ ] 의존성 업데이트 확인
- [ ] 보안 패치 확인
- [ ] 사용자 피드백 확인

#### 매월
- [ ] 배포 로그 분석
- [ ] 성능 메트릭 분석
- [ ] 비용 확인

### 모니터링 도구

#### Vercel Analytics
- 페이지 뷰
- 트래픽 분석
- Core Web Vitals

#### Render Metrics
- CPU 사용량
- 메모리 사용량
- 응답 시간

#### 추천 도구
- **Sentry**: 에러 트래킹
- **Google Analytics**: 사용자 분석
- **UptimeRobot**: 가동 시간 모니터링

### 업데이트 프로세스

```bash
# 1. 의존성 업데이트
cd frontend
npm update
npm audit fix

cd ../backend
./gradlew dependencyUpdates

# 2. 테스트
npm test
./gradlew test

# 3. 커밋 및 배포
git add .
git commit -m "chore: Update dependencies"
git push origin main
```

---

## 📊 배포 체크리스트

### 초기 배포
- [x] GitHub 저장소 준비
- [x] Dockerfile 작성
- [x] CORS 설정
- [x] 환경 변수 설정
- [x] Backend Render 배포
- [x] Frontend Vercel 배포
- [x] 통합 테스트
- [x] 문서 업데이트

### 이후 배포
- [ ] 코드 변경사항 커밋
- [ ] 로컬 테스트
- [ ] main 브랜치 push
- [ ] 자동 배포 확인
- [ ] 통합 테스트
- [ ] 모니터링

---

## 🔗 유용한 링크

### 배포 대시보드
- Vercel: https://vercel.com/dashboard
- Render: https://dashboard.render.com

### 배포 URL
- Frontend: https://stock-predictor-lrrj7q16f-hwan0050s-projects.vercel.app
- Backend: https://stock-predictor-zu6p.onrender.com

### 문서
- [Vercel 문서](https://vercel.com/docs)
- [Render 문서](https://render.com/docs)
- [Docker 문서](https://docs.docker.com)

---

## 📞 연락처

배포 관련 문의:
- GitHub: [@hwan0050](https://github.com/hwan0050)
- Email: akma0050@naver.com

---

**작성일:** 2025년 11월  
**버전:** 1.0  
**상태:** ✅ 배포 완료

**Made with ❤️ by Hwan**