# 🤝 Contributing to Stock Prediction App

프로젝트에 기여해주셔서 감사합니다! 이 문서는 기여 방법을 안내합니다.

## 📋 기여 전 체크리스트

- [ ] 이슈 트래커에서 관련 이슈 확인
- [ ] 없으면 새 이슈 생성하여 논의
- [ ] Fork 후 작업
- [ ] 테스트 통과 확인

## 🚀 기여 프로세스

### 1. Fork & Clone
```bash
# 1. 이 저장소를 Fork 합니다 (GitHub 우측 상단 Fork 버튼)

# 2. Fork한 저장소를 Clone
git clone https://github.com/YOUR_USERNAME/stock-prediction-app.git
cd stock-prediction-app

# 3. 원본 저장소를 upstream으로 추가
git remote add upstream https://github.com/hwan0050/stock-prediction-app.git
```

### 2. 브랜치 생성
```bash
# develop 브랜치에서 시작
git checkout develop
git pull upstream develop

# 새 기능 브랜치 생성
git checkout -b feature/your-feature-name
```

### 3. 작업 & 커밋
```bash
# 작업 후 커밋 (작은 단위로!)
git add .
git commit -m "feat(scope): 설명"

# 자세한 커밋 컨벤션은 docs/GIT_WORKFLOW.md 참조
```

### 4. 테스트
```bash
# 프론트엔드 테스트
cd frontend
npm test

# 백엔드 테스트
cd backend
./mvnw test

# ML 모델 테스트
cd ml-model
pytest
```

### 5. Push & Pull Request
```bash
# 본인의 Fork에 Push
git push origin feature/your-feature-name
```

그 다음:
1. GitHub에서 본인의 Fork 페이지 열기
2. **"Compare & pull request"** 버튼 클릭
3. PR 제목과 설명 작성
4. **"Create pull request"** 클릭

## 📝 Pull Request 가이드라인

### PR 제목
```
feat(chart): 주가 차트 줌 기능 추가
```

### PR 설명 템플릿
```markdown
## 📌 관련 이슈
Closes #123

## 🎯 변경 사항
- 주가 차트에 줌 인/아웃 기능 추가
- 마우스 휠로 확대/축소 가능
- 더블클릭으로 리셋

## 📸 스크린샷
(변경 전/후 이미지)

## ✅ 체크리스트
- [x] 테스트 통과
- [x] 문서 업데이트
- [x] 코드 리뷰 준비 완료
```

## 💻 코드 스타일

### JavaScript/TypeScript
- ESLint 설정 준수
- Prettier로 포맷팅
- 함수는 단일 책임 원칙

### Java
- Google Java Style Guide 준수
- 명확한 변수/메서드명
- JavaDoc 주석 작성

### Python
- PEP 8 스타일 가이드
- Type hints 사용 권장
- Docstring 작성

## 🐛 버그 리포트

버그를 발견하셨나요?

### 이슈 생성 시 포함할 내용:
1. **버그 설명**: 무엇이 잘못되었나요?
2. **재현 방법**: 
   - Step 1: ...
   - Step 2: ...
   - Step 3: ...
3. **예상 동작**: 어떻게 작동해야 하나요?
4. **실제 동작**: 실제로는 어떻게 작동하나요?
5. **환경**: 
   - OS: Windows 10
   - 브라우저: Chrome 120
   - Node.js: v18.17.0

## ✨ 기능 제안

새로운 기능을 제안하고 싶으신가요?

### 포함할 내용:
1. **기능 설명**: 어떤 기능인가요?
2. **필요성**: 왜 필요한가요?
3. **사용 시나리오**: 어떻게 사용되나요?
4. **대안**: 다른 방법은 없나요?

## 📚 문서 개선

문서 오타나 개선사항도 환영합니다!
```bash
git checkout -b docs/improve-readme
# README.md 수정
git commit -m "docs: README 설치 가이드 개선"
git push origin docs/improve-readme
```

## ❓ 질문이 있으신가요?

- 📧 이메일: akma0050@naver.com
- 💬 이슈 탭에서 질문 올리기
- 📖 [Wiki](../../wiki) 참조

## 🎉 기여자 분들

이 프로젝트에 기여해주신 모든 분들께 감사드립니다!

<!-- 자동으로 업데이트됩니다 -->

---

**다시 한 번 감사합니다!** 💖

Your contributions make this project better! 🚀
```

### 👆 여기까지 전부 복사!

---

## 📝 정리: CONTRIBUTING.md 만들기

### 1단계: 파일 생성
```
stock-prediction-app 저장소
→ Add file
→ Create new file
→ 파일명: CONTRIBUTING.md
```

### 2단계: 위 내용 붙여넣기
- 위의 **전체 내용** 복사 (Ctrl+C)
- GitHub 편집창에 붙여넣기 (Ctrl+V)

### 3단계: 커밋
```
docs: 기여 가이드 추가
