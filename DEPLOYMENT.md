# 🚀 Stock Predictor 배포 가이드

이 문서는 Stock Predictor 프로젝트를 배포하는 방법을 설명합니다.

**마지막 업데이트:** 2024년 1월  
**배포 상태:** ✅ Vercel 배포 완료

---

## 🌐 Live Demo

**배포 URL:** https://stock-predictor-xxx.vercel.app

*(실제 URL로 교체하세요)*

---

## 📦 Frontend 배포 (Vercel)

### 사전 요구사항
- GitHub 계정
- Vercel 계정 (무료)
- Node.js 18.x 이상

### 1️⃣ 빌드 테스트
```bash
cd frontend
npm install
npm run build
```

**확인사항:**
- ✅ `build/` 폴더 생성
- ✅ 에러 없음

### 2️⃣ Vercel 배포

#### GitHub 연동 (추천)

1. **Vercel 가입**
   ```
   https://vercel.com
   → "Start Deploying" 클릭
   → GitHub 계정으로 로그인
   ```

2. **프로젝트 Import**
   ```
   "Add New..." → "Project"
   → GitHub 저장소 선택: stock-predictor
   → "Import" 클릭
   ```

3. **설정**
   ```
   Framework Preset: Create React App
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: build
   ```

4. **환경 변수**
   ```
   Name: REACT_APP_API_URL
   Value: http://localhost:8080
   
   (또는 백엔드 배포 URL)
   ```

5. **배포**
   ```
   "Deploy" 버튼 클릭
   ⏳ 1-2분 대기...
   ✅ 배포 완료!
   ```

#### CLI 배포

```bash
# Vercel CLI 설치
npm install -g vercel

# 로그인
vercel login

# 배포
cd frontend
vercel

# 프로덕션 배포
vercel --prod
```

---

## 🔧 Backend 배포 (선택적)

### Option 1: Render (무료 - 추천)

1. **Render 가입**
   ```
   https://render.com
   → GitHub 계정으로 가입
   ```

2. **Web Service 생성**
   ```
   "New +" → "Web Service"
   → GitHub 저장소 연결
   → Root Directory: backend
   ```

3. **설정**
   ```
   Name: stock-predictor-api
   Environment: Java
   Build Command: ./mvnw clean package
   Start Command: java -jar target/stock-predictor-0.0.1-SNAPSHOT.jar
   ```

4. **환경 변수**
   ```
   SPRING_PROFILES_ACTIVE=prod
   YAHOO_FINANCE_API_KEY=your_key_here (필요시)
   ```

5. **배포**
   ```
   "Create Web Service" 클릭
   ⏳ 5-10분 대기...
   ✅ 배포 완료!
   ```

### Option 2: Railway (무료 제한적)

```bash
# Railway CLI 설치
npm install -g @railway/cli

# 로그인
railway login

# 초기화
cd backend
railway init

# 배포
railway up
```

### Option 3: 로컬 실행 (프론트만 배포)

Backend는 로컬에서 실행하고 Frontend만 배포하는 방법:

```bash
# Backend 로컬 실행
cd backend
./mvnw spring-boot:run

# Frontend는 Vercel에 배포
# 환경 변수: REACT_APP_API_URL=http://localhost:8080
```

**주의:** CORS 이슈가 발생할 수 있음

---

## 🔄 자동 배포 (CI/CD)

### Vercel 자동 배포

GitHub에 push하면 자동으로 배포됩니다!

```bash
git add .
git commit -m "feat: Add new feature"
git push origin main

# Vercel이 자동으로 빌드 & 배포 ✨
```

**Preview Deployment:**
- PR 생성 시 미리보기 URL 자동 생성
- 머지 전 테스트 가능

---

## 🌍 커스텀 도메인 연결

### 1. 도메인 구매
- Namecheap, GoDaddy 등에서 구매

### 2. Vercel에 도메인 추가
```
Vercel Dashboard
→ 프로젝트 선택
→ Settings → Domains
→ 도메인 입력
→ DNS 레코드 설정
```

### 3. DNS 설정
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.21.21
```

**적용 시간:** 최대 48시간

---

## 🐛 배포 트러블슈팅

### 빌드 실패
```bash
# 로컬에서 먼저 테스트
npm run build

# 에러 확인
npm install
npm audit fix
```

### CORS 에러
```javascript
// Backend CorsConfig.java 확인
.allowedOrigins("https://your-domain.vercel.app")
```

### 환경 변수 미적용
```
Vercel Dashboard
→ Settings → Environment Variables
→ 재배포 필요 (Redeploy)
```

### 404 Not Found (SPA)
```json
// vercel.json 생성
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 📊 배포 상태 확인

### Vercel Dashboard
```
https://vercel.com/dashboard
→ 프로젝트 선택
→ Deployments 확인
```

### 로그 확인
```
Deployment 클릭
→ Runtime Logs 확인
→ 에러 확인
```

---

## 🔐 환경 변수 관리

### 프로덕션
```env
REACT_APP_API_URL=https://api.yourbackend.com
REACT_APP_API_BASE_PATH=/api
```

### 개발
```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_API_BASE_PATH=/api
```

**주의:** `.env` 파일은 절대 Git에 커밋하지 마세요!

---

## 📈 성능 모니터링

### Vercel Analytics
```
Vercel Dashboard
→ Analytics 탭
→ 페이지 로드 시간, 방문자 수 등 확인
```

### Google Analytics (선택)
```javascript
// index.html에 추가
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
```

---

## 🎯 배포 체크리스트

- [x] Frontend 빌드 테스트
- [x] Vercel 계정 생성
- [x] GitHub 저장소 연결
- [x] 환경 변수 설정
- [x] 배포 완료
- [x] 배포 URL 확인
- [x] 기능 테스트
- [ ] 커스텀 도메인 (선택)
- [ ] Analytics 설정 (선택)

---

## 🚀 다음 단계

### 배포 후 할 일
1. README에 배포 URL 추가
2. 스크린샷 캡처 및 추가
3. GitHub About 섹션 업데이트
4. 포트폴리오에 프로젝트 추가

### 개선 사항
1. 성능 최적화
2. SEO 개선
3. PWA 변환 (선택)
4. 백엔드 배포 (선택)

---

## 📞 문의

배포 관련 문의: akma0050@naver.com

---

**Made with ❤️ by Hwan**