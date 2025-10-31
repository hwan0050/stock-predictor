# Git 작업 단위별 관리 정책 📋

## 🌿 브랜치 전략 (Git Flow 간소화 버전)

```
main (production)
  ↓
develop (개발)
  ↓
feature/기능명 (기능 개발)
  ↓
hotfix/버그명 (긴급 수정)
```

### 브랜치 종류

| 브랜치 | 용도 | 네이밍 규칙 | 예시 |
|--------|------|-------------|------|
| `main` | 배포용 | - | `main` |
| `develop` | 개발 통합 | - | `develop` |
| `feature` | 새 기능 개발 | `feature/기능명` | `feature/login-page` |
| `fix` | 버그 수정 | `fix/버그명` | `fix/navbar-responsive` |
| `hotfix` | 긴급 수정 | `hotfix/버그명` | `hotfix/security-patch` |
| `refactor` | 리팩토링 | `refactor/작업명` | `refactor/api-structure` |

---

## 📝 커밋 메시지 컨벤션

### 기본 구조
```
타입(스코프): 제목

본문 (선택)

푸터 (선택)
```

### 커밋 타입

| 타입 | 설명 | 예시 |
|------|------|------|
| `feat` | 새로운 기능 추가 | `feat(auth): 로그인 페이지 추가` |
| `fix` | 버그 수정 | `fix(api): 데이터 로딩 오류 수정` |
| `docs` | 문서 수정 | `docs(readme): 설치 가이드 업데이트` |
| `style` | 코드 포맷팅 (기능 변경 X) | `style(css): 버튼 간격 조정` |
| `refactor` | 코드 리팩토링 | `refactor(user): 사용자 모델 구조 개선` |
| `test` | 테스트 코드 | `test(auth): 로그인 유닛 테스트 추가` |
| `chore` | 빌드, 패키지 등 | `chore(deps): axios 버전 업데이트` |
| `design` | UI/UX 디자인 변경 | `design(home): 메인 페이지 레이아웃 수정` |

### 커밋 메시지 작성 규칙

1. **제목은 50자 이내**
2. **제목 첫 글자는 대문자 (영문) 또는 명확한 동사 (한글)**
3. **제목 끝에 마침표 금지**
4. **본문은 72자마다 줄바꿈**
5. **본문은 "무엇을", "왜" 변경했는지 설명**

### 좋은 예시
```bash
feat(auth): 소셜 로그인 기능 구현

- Google OAuth 2.0 연동
- 사용자 프로필 자동 생성
- 세션 관리 추가

Closes #123
```

### 나쁜 예시
```bash
# ❌ 너무 모호함
update code

# ❌ 타입 누락
로그인 버그 수정

# ❌ 여러 작업을 한 커밋에
feat: 로그인 추가, 회원가입 추가, CSS 수정
```

---

## 🔄 작업 프로세스

### 1️⃣ 새 기능 개발 시

```bash
# 1. develop 브랜치에서 최신 코드 받기
git checkout develop
git pull origin develop

# 2. 새 기능 브랜치 생성
git checkout -b feature/stock-chart

# 3. 작업 후 커밋 (작은 단위로 자주)
git add .
git commit -m "feat(chart): 주가 차트 컴포넌트 추가"

# 4. 더 작업...
git commit -m "feat(chart): 차트 데이터 로딩 구현"

# 5. 원격 저장소에 푸시
git push origin feature/stock-chart

# 6. GitHub에서 Pull Request 생성
# develop <- feature/stock-chart

# 7. 코드 리뷰 후 머지

# 8. 로컬에서 브랜치 삭제
git checkout develop
git branch -d feature/stock-chart
```

### 2️⃣ 버그 수정 시

```bash
# 1. develop에서 브랜치 생성
git checkout develop
git checkout -b fix/price-display

# 2. 수정 후 커밋
git commit -m "fix(ui): 가격 표시 오류 수정"

# 3. 푸시 및 PR
git push origin fix/price-display
```

### 3️⃣ 긴급 수정 (Hotfix) 시

```bash
# 1. main에서 직접 브랜치 생성
git checkout main
git checkout -b hotfix/security-patch

# 2. 수정 후 커밋
git commit -m "hotfix(security): XSS 취약점 패치"

# 3. main과 develop 둘 다 머지
git checkout main
git merge hotfix/security-patch
git push origin main

git checkout develop
git merge hotfix/security-patch
git push origin develop

# 4. 브랜치 삭제
git branch -d hotfix/security-patch
```

---

## 📏 작업 단위 가이드

### ✅ 커밋 단위 (작게 쪼개기)
- **하나의 논리적 변경사항 = 하나의 커밋**
- 예시:
  - ✅ "차트 컴포넌트 UI 구현"
  - ✅ "API 데이터 연동"
  - ✅ "에러 처리 추가"
  - ❌ "주가 차트 전체 구현" (너무 큼)

### ✅ 브랜치 단위 (기능/이슈 기준)
- **하나의 완결된 기능 = 하나의 브랜치**
- 예시:
  - ✅ `feature/stock-search`
  - ✅ `feature/price-alert`
  - ❌ `feature/all-features` (너무 큼)

### ✅ Pull Request 단위
- **리뷰 가능한 크기로 유지 (변경된 파일 10개 이하 권장)**
- 너무 크면 여러 PR로 분리

---

## 🚀 프로젝트별 커밋 스코프

### Frontend
- `ui` - UI 컴포넌트
- `page` - 페이지
- `chart` - 차트 관련
- `api` - API 호출

### Backend
- `controller` - 컨트롤러
- `service` - 비즈니스 로직
- `repository` - 데이터베이스
- `api` - REST API

### ML Model
- `model` - 모델 구조
- `train` - 학습 관련
- `predict` - 예측 로직
- `data` - 데이터 처리

### 공통
- `config` - 설정
- `test` - 테스트
- `docs` - 문서

---

## 🚀 실전 팁

### 1. 커밋 전 체크리스트
```bash
# 변경사항 확인
git status
git diff

# 불필요한 파일 제외
# .gitignore 활용

# 테스트 실행
npm test  # 프론트엔드
./mvnw test  # 백엔드
pytest  # ML 모델

# 커밋
git commit -m "타입(스코프): 설명"
```

### 2. 자주 사용하는 명령어
```bash
# 커밋 히스토리 보기
git log --oneline --graph

# 마지막 커밋 수정
git commit --amend

# 작업 임시 저장
git stash
git stash pop

# 브랜치 목록
git branch -a

# 원격 브랜치 삭제
git push origin --delete feature/old-feature
```

### 3. 좋은 습관
- ✅ 매일 작업 시작 전 `git pull`
- ✅ 작은 단위로 자주 커밋
- ✅ 의미 있는 커밋 메시지 작성
- ✅ Push 전에 로컬에서 테스트
- ✅ PR에 작업 내용과 스크린샷 포함

### 4. 나쁜 습관
- ❌ 며칠 작업을 한 번에 커밋
- ❌ "수정", "변경" 같은 모호한 메시지
- ❌ main/develop에 직접 푸시
- ❌ 머지된 브랜치 방치

---

## 📂 .gitignore 설정

```gitignore
# Node.js (Frontend)
node_modules/
npm-debug.log
yarn-error.log
.env.local

# Java (Backend)
target/
.gradle/
build/
*.class
*.jar
*.war

# Python (ML Model)
__pycache__/
*.pyc
*.pyo
venv/
.env
*.h5
*.pkl
data/*.csv

# IDE
.vscode/
.idea/
*.swp
*.swo
.DS_Store

# Database
*.db
*.sqlite

# Logs
*.log
logs/

# Environment
.env
.env.local
.env.production
```

---

## ✨ 요약

1. **브랜치**: 기능 단위로 생성 (`feature/기능명`)
2. **커밋**: 작은 단위로 자주 (`타입(스코프): 설명`)
3. **푸시**: 작업 완료 후 원격에 백업
4. **PR**: 코드 리뷰 후 머지
5. **정리**: 머지된 브랜치는 삭제

이 정책을 따르면 깔끔하고 관리하기 쉬운 Git 히스토리를 유지할 수 있습니다! 🎉
