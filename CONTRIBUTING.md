# 🤝 Contributing to Stock Predictor

주가 예측 웹 애플리케이션에 기여해주셔서 감사합니다! 이 문서는 프로젝트에 기여하는 방법을 안내합니다.

---

## 📋 목차

- [행동 강령](#행동-강령)
- [시작하기](#시작하기)
- [개발 프로세스](#개발-프로세스)
- [커밋 메시지 규칙](#커밋-메시지-규칙)
- [Pull Request 프로세스](#pull-request-프로세스)
- [코드 스타일](#코드-스타일)
- [테스트](#테스트)
- [이슈 리포팅](#이슈-리포팅)

---

## 🤝 행동 강령

### 우리의 약속

우리는 모든 기여자들에게 열린, 환영하는, 그리고 안전한 환경을 제공하기 위해 노력합니다.

### 기대되는 행동

- ✅ 존중하고 포용적인 언어 사용
- ✅ 다른 관점과 경험을 존중
- ✅ 건설적인 비판을 우아하게 수용
- ✅ 커뮤니티에 최선이 되는 것에 집중
- ✅ 다른 커뮤니티 멤버에게 공감 표시

### 용납되지 않는 행동

- ❌ 성적인 언어나 이미지 사용
- ❌ 트롤링, 모욕적/경멸적 댓글, 개인적/정치적 공격
- ❌ 공개적 또는 사적 괴롭힘
- ❌ 명시적 허가 없이 타인의 개인정보 공개

---

## 🚀 시작하기

### 1. 저장소 Fork 및 Clone

```bash
# Fork 버튼 클릭 (GitHub)
# 그 다음 Clone
git clone https://github.com/your-username/stock-predictor.git
cd stock-predictor

# Upstream 추가
git remote add upstream https://github.com/hwan0050/stock-predictor.git
```

### 2. 개발 환경 설정

#### Backend
```bash
cd backend
./gradlew build

# Windows
.\gradlew.bat build
```

#### Frontend
```bash
cd frontend
npm install
```

### 3. 최신 변경사항 동기화

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

---

## 💻 개발 프로세스

### 1. 이슈 확인 또는 생성

기여하기 전에:
- 기존 이슈를 확인하세요
- 관련 이슈가 없다면 새로 생성하세요
- 이슈에 대해 논의하고 할당받으세요

### 2. Feature 브랜치 생성

```bash
# 브랜치 명명 규칙
git checkout -b feature/기능명
git checkout -b fix/버그명
git checkout -b docs/문서명
git checkout -b refactor/리팩토링명

# 예시
git checkout -b feature/add-stock-comparison
git checkout -b fix/chart-rendering-bug
git checkout -b docs/update-api-docs
```

### 3. 코드 작성

- 코드 스타일 가이드를 따르세요
- 필요한 경우 테스트를 작성하세요
- 작은 커밋으로 자주 커밋하세요

### 4. 테스트

```bash
# Backend 테스트
cd backend
./gradlew test

# Frontend 테스트
cd frontend
npm test
```

### 5. 변경사항 커밋

커밋 메시지 규칙을 따라 커밋하세요 (아래 참조)

### 6. 푸시

```bash
git push origin feature/기능명
```

### 7. Pull Request 생성

GitHub에서 Pull Request를 생성하세요

---

## 📝 커밋 메시지 규칙

### 형식

```
<타입>(<범위>): <제목>

<본문>

<푸터>
```

### 타입

- **feat**: 새로운 기능 추가
- **fix**: 버그 수정
- **docs**: 문서 변경
- **style**: 코드 포맷팅, 세미콜론 누락 등 (코드 변경 없음)
- **refactor**: 코드 리팩토링
- **test**: 테스트 추가 또는 수정
- **chore**: 빌드 프로세스나 도구 변경

### 예시

```bash
# 좋은 예
feat(api): Yahoo Finance API 캐싱 추가

Redis를 사용하여 API 호출을 5분간 캐싱합니다.
429 에러를 방지하고 응답 속도를 개선합니다.

Closes #123

# 나쁜 예
update code
fix bug
```

### 제목 규칙

- 50자 이내로 작성
- 명령형 현재 시제 사용 ("추가한다" 대신 "추가")
- 첫 글자는 소문자
- 마침표 없음

### 본문 규칙 (선택)

- 72자에서 줄바꿈
- 무엇을, 왜 변경했는지 설명
- 어떻게 변경했는지는 코드가 설명

### 푸터 규칙 (선택)

```bash
# 이슈 참조
Closes #123
Fixes #456
Relates to #789

# Breaking Changes
BREAKING CHANGE: API 응답 형식 변경
```

---

## 🔄 Pull Request 프로세스

### PR 생성 전 체크리스트

- [ ] 최신 main 브랜치와 동기화
- [ ] 모든 테스트 통과
- [ ] 코드 스타일 가이드 준수
- [ ] 문서 업데이트 (필요시)
- [ ] 커밋 메시지 규칙 준수

### PR 템플릿

```markdown
## 변경 사항
<!-- 무엇을 변경했나요? -->

## 변경 이유
<!-- 왜 이 변경이 필요한가요? -->

## 테스트 방법
<!-- 어떻게 테스트할 수 있나요? -->

## 스크린샷 (UI 변경인 경우)
<!-- 스크린샷 첨부 -->

## 관련 이슈
Closes #이슈번호

## 체크리스트
- [ ] 테스트 통과
- [ ] 문서 업데이트
- [ ] 코드 리뷰 준비 완료
```

### 리뷰 프로세스

1. PR 생성 후 자동 테스트 실행
2. 메인테이너가 코드 리뷰
3. 피드백 반영
4. 승인 후 메인 브랜치에 병합

### 병합 후

```bash
# 로컬 브랜치 정리
git checkout main
git pull upstream main
git branch -d feature/기능명

# 원격 브랜치 정리
git push origin --delete feature/기능명
```

---

## 🎨 코드 스타일

### Java (Backend)

#### 일반 규칙
- **들여쓰기**: 4 스페이스
- **줄 길이**: 120자 이내
- **명명 규칙**: camelCase (변수, 메서드), PascalCase (클래스)

#### 예시
```java
@RestController
@RequestMapping("/api/stocks")
public class StockController {
    
    private final StockService stockService;
    
    @GetMapping("/{symbol}")
    public ResponseEntity<StockDataDto> getStock(@PathVariable String symbol) {
        try {
            StockDataDto stockData = stockService.getRealtimeStockData(symbol);
            return ResponseEntity.ok(stockData);
        } catch (Exception e) {
            log.error("Error fetching stock data: {}", e.getMessage());
            throw new RuntimeException("Failed to fetch stock data");
        }
    }
}
```

#### Spring Boot 규칙
- `@Service`, `@Repository`, `@Controller` 적절히 사용
- 생성자 주입 선호 (필드 주입 지양)
- Lombok `@Slf4j` 사용

---

### JavaScript/React (Frontend)

#### 일반 규칙
- **들여쓰기**: 2 스페이스
- **따옴표**: 작은따옴표 `'` 사용
- **세미콜론**: 사용 (optional이지만 일관성 유지)
- **명명 규칙**: camelCase (변수, 함수), PascalCase (컴포넌트)

#### React 컴포넌트 예시
```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StockCard.css';

function StockCard({ stock }) {
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Side effects
  }, [stock]);
  
  if (!stock) return null;
  
  return (
    <div className="stock-card">
      <h2>{stock.name}</h2>
      <p>${stock.currentPrice}</p>
    </div>
  );
}

export default StockCard;
```

#### React 규칙
- 함수형 컴포넌트 사용
- Hooks 사용 (useState, useEffect 등)
- Props 명확히 정의
- CSS 모듈화 (컴포넌트별 CSS 파일)

---

### CSS

#### 규칙
- **들여쓰기**: 2 스페이스
- **명명 규칙**: kebab-case
- **선택자**: 클래스 선택자 우선 (ID 선택자 지양)

#### 예시
```css
.stock-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stock-card__title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.stock-card--positive {
  border-left: 4px solid #10b981;
}
```

---

## 🧪 테스트

### Backend 테스트

#### 단위 테스트
```java
@SpringBootTest
class StockServiceTest {
    
    @Autowired
    private StockService stockService;
    
    @Test
    void testGetStockData() {
        // Given
        String symbol = "AAPL";
        
        // When
        StockDataDto result = stockService.getRealtimeStockData(symbol);
        
        // Then
        assertNotNull(result);
        assertEquals(symbol, result.getSymbol());
    }
}
```

### Frontend 테스트

#### 컴포넌트 테스트
```javascript
import { render, screen } from '@testing-library/react';
import StockCard from './StockCard';

test('renders stock card with data', () => {
  const stockData = {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    currentPrice: 178.25
  };
  
  render(<StockCard stock={stockData} />);
  
  expect(screen.getByText('Apple Inc.')).toBeInTheDocument();
  expect(screen.getByText('$178.25')).toBeInTheDocument();
});
```

---

## 🐛 이슈 리포팅

### 버그 리포트

다음 정보를 포함해주세요:

```markdown
## 버그 설명
<!-- 명확하고 간결하게 설명 -->

## 재현 방법
1. '...'로 이동
2. '...'를 클릭
3. '...'까지 스크롤
4. 에러 확인

## 예상 동작
<!-- 어떻게 동작해야 하나요? -->

## 실제 동작
<!-- 실제로 무슨 일이 일어났나요? -->

## 스크린샷
<!-- 해당되는 경우 스크린샷 추가 -->

## 환경
- OS: [예: Windows 11]
- 브라우저: [예: Chrome 120]
- Node 버전: [예: 18.17.0]
- Java 버전: [예: 17]

## 추가 정보
<!-- 추가 컨텍스트 -->
```

### 기능 제안

```markdown
## 기능 설명
<!-- 명확하고 간결하게 설명 -->

## 동기
<!-- 왜 이 기능이 필요한가요? -->

## 제안된 솔루션
<!-- 어떻게 구현할까요? -->

## 대안
<!-- 고려한 다른 방법은? -->

## 추가 정보
<!-- 추가 컨텍스트, 스크린샷 등 -->
```

---

## 📚 추가 리소스

### 문서
- [README.md](README.md) - 프로젝트 개요
- [CHECKLIST.md](CHECKLIST.md) - 개발 진행 상황
- [Backend README](backend/README.md) - Backend 문서
- [Frontend README](frontend/README.md) - Frontend 문서

### 참고 자료
- [Spring Boot 문서](https://spring.io/projects/spring-boot)
- [React 문서](https://react.dev/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## 💬 질문이나 도움이 필요하신가요?

- **Issues**: [GitHub Issues](https://github.com/hwan0050/stock-predictor/issues)
- **Discussions**: [GitHub Discussions](https://github.com/hwan0050/stock-predictor/discussions)
- **Email**: akma0050@naver.com

---

## 🙏 감사합니다!

모든 기여에 감사드립니다! 여러분의 노력이 이 프로젝트를 더 좋게 만듭니다.

**⭐ 프로젝트가 마음에 드신다면 Star를 눌러주세요!**