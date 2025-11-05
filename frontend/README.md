# Frontend

React 기반 프론트엔드 애플리케이션

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 또는 yarn

### Installation
```bash
cd frontend
npm install
```

### Development Server
```bash
npm start
```

브라우저에서 자동으로 열립니다: `http://localhost:3000`

### Build for Production
```bash
npm run build
```

빌드 결과물은 `build/` 폴더에 생성됩니다.

---

## 📦 Tech Stack

### Core
- **React 18** - 사용자 인터페이스 라이브러리
- **JavaScript (ES6+)** - 프로그래밍 언어
- **HTML5 & CSS3** - 마크업 및 스타일링

### UI/UX
- **Chart.js** - 주가 차트 시각화
- **Recharts** - 인터랙티브 차트 컴포넌트
- **Tailwind CSS** *(예정)* - 유틸리티 기반 CSS 프레임워크

### State Management
- **React Hooks** - useState, useEffect, useContext
- **Context API** - 전역 상태 관리

### HTTP Client
- **Axios** - REST API 통신
- **Fetch API** - 네이티브 HTTP 요청

### Development Tools
- **Create React App** - 프로젝트 보일러플레이트
- **ESLint** - 코드 품질 관리
- **Prettier** - 코드 포맷팅

---

## 📁 Project Structure
```
frontend/
├── public/
│   ├── index.html          # HTML 템플릿
│   └── favicon.ico         # 파비콘
│
├── src/
│   ├── components/         # 재사용 가능한 컴포넌트
│   │   ├── Chart/         # 차트 컴포넌트
│   │   ├── StockCard/     # 주식 카드 컴포넌트
│   │   ├── SearchBar/     # 검색 바 컴포넌트
│   │   └── Navbar/        # 네비게이션 바
│   │
│   ├── pages/             # 페이지 컴포넌트
│   │   ├── Home.js        # 메인 페이지
│   │   ├── StockDetail.js # 종목 상세 페이지
│   │   └── Dashboard.js   # 대시보드
│   │
│   ├── services/          # API 서비스
│   │   └── api.js         # API 호출 함수
│   │
│   ├── utils/             # 유틸리티 함수
│   │   ├── formatters.js  # 데이터 포맷팅
│   │   └── validators.js  # 입력 검증
│   │
│   ├── hooks/             # 커스텀 훅
│   │   └── useStockData.js
│   │
│   ├── context/           # Context API
│   │   └── StockContext.js
│   │
│   ├── App.js             # 루트 컴포넌트
│   ├── App.css            # 전역 스타일
│   └── index.js           # 진입점
│
├── package.json           # 의존성 관리
└── README.md             # 이 문서
```

---

## 🎯 Features

### 구현 완료
- [ ] 프로젝트 초기 설정
- [ ] 기본 라우팅 구조
- [ ] API 연동 레이어

### 개발 중
- [ ] 주식 검색 기능
- [ ] 실시간 가격 표시
- [ ] 차트 시각화

### 예정
- [ ] 사용자 인증 (로그인/회원가입)
- [ ] 관심 종목 관리
- [ ] 알림 설정
- [ ] 다크 모드
- [ ] 반응형 디자인 최적화

---

## 🔌 API Integration

### Base URL
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

### Example Usage
```javascript
import axios from 'axios';

// 주식 정보 조회
const getStock = async (symbol) => {
  const response = await axios.get(`${API_BASE_URL}/stocks/${symbol}`);
  return response.data;
};

// 주가 예측 조회
const getPrediction = async (symbol, days = 7) => {
  const response = await axios.get(`${API_BASE_URL}/predictions/${symbol}?days=${days}`);
  return response.data;
};
```

자세한 API 문서는 [API.md](../docs/API.md)를 참조하세요.

---

## 🎨 Component Examples

### StockCard Component
```jsx
import React from 'react';

const StockCard = ({ symbol, name, price, change }) => {
  const isPositive = change >= 0;
  
  return (
    <div className="stock-card">
      <h3>{name}</h3>
      <p className="symbol">{symbol}</p>
      <div className="price">
        <span className="current">${price.toFixed(2)}</span>
        <span className={isPositive ? 'positive' : 'negative'}>
          {isPositive ? '+' : ''}{change.toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

export default StockCard;
```

---

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Test Coverage
```bash
npm run test:coverage
```

---

## 🚧 Development Guidelines

### Code Style
- **함수형 컴포넌트** 사용
- **Hooks** 활용 (클래스 컴포넌트 지양)
- **컴포넌트명**: PascalCase (예: `StockCard`)
- **파일명**: PascalCase.js (예: `StockCard.js`)

### Commit Convention
```
feat(component): 새로운 컴포넌트 추가
fix(api): API 호출 오류 수정
style(ui): 버튼 스타일 개선
```

자세한 내용은 [Git 작업 정책](../docs/GIT_WORKFLOW.md)을 참조하세요.

---

## 🐛 Troubleshooting

### 포트 충돌
```bash
# 다른 포트로 실행
PORT=3001 npm start
```

### 의존성 오류
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

### 빌드 오류
```bash
# 캐시 정리
npm run build -- --clean
```

---

## 📚 Learning Resources

- [React 공식 문서](https://react.dev)
- [Chart.js 문서](https://www.chartjs.org/docs/latest/)
- [Axios 가이드](https://axios-http.com/docs/intro)

---

## 🤝 Contributing

버그 리포트나 기능 제안은 [Issues](../../issues)에 등록해주세요.

자세한 기여 방법은 [CONTRIBUTING.md](../CONTRIBUTING.md)를 참조하세요.

---

## 📞 Contact

문의사항: akma0050@naver.com
