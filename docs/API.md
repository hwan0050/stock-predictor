# 📡 API Documentation

Stock Prediction App REST API 문서입니다.

## Base URL
```
http://localhost:8080/api
```

## 인증

현재는 인증이 필요하지 않습니다. (개발 중)

---

## 📊 주식 데이터

### 1. 주식 정보 조회

특정 종목의 현재 정보를 가져옵니다.

**Endpoint**
```http
GET /stocks/{symbol}
```

**Parameters**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| symbol | string | Yes | 종목 코드 (예: "005930", "AAPL") |

**Response**
```json
{
  "symbol": "005930",
  "name": "삼성전자",
  "currentPrice": 72500,
  "change": 1500,
  "changePercent": 2.11,
  "volume": 12345678,
  "marketCap": 432000000000000,
  "timestamp": "2024-11-01T09:30:00Z"
}
```

**예시**
```bash
curl http://localhost:8080/api/stocks/005930
```

---

### 2. 과거 데이터 조회

특정 기간의 주가 데이터를 가져옵니다.

**Endpoint**
```http
GET /stocks/{symbol}/history
```

**Parameters**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| symbol | string | Yes | 종목 코드 |
| period | string | No | 기간 (1d, 1w, 1m, 3m, 1y) 기본값: 1m |
| interval | string | No | 간격 (1m, 5m, 1h, 1d) 기본값: 1d |

**Response**
```json
{
  "symbol": "005930",
  "period": "1m",
  "data": [
    {
      "date": "2024-10-01",
      "open": 71000,
      "high": 72000,
      "low": 70500,
      "close": 71500,
      "volume": 10000000
    }
  ]
}
```

**예시**
```bash
curl "http://localhost:8080/api/stocks/005930/history?period=1m&interval=1d"
```

---

## 🤖 예측 데이터

### 3. 주가 예측 조회

AI 모델의 주가 예측 결과를 가져옵니다.

**Endpoint**
```http
GET /predictions/{symbol}
```

**Parameters**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| symbol | string | Yes | 종목 코드 |
| days | integer | No | 예측 일수 (1-30) 기본값: 7 |

**Response**
```json
{
  "symbol": "005930",
  "currentPrice": 72500,
  "predictions": [
    {
      "date": "2024-11-02",
      "predictedPrice": 73000,
      "confidence": 0.85,
      "range": {
        "min": 71500,
        "max": 74500
      }
    }
  ],
  "modelVersion": "v1.2.0",
  "accuracy": 0.78
}
```

**예시**
```bash
curl "http://localhost:8080/api/predictions/005930?days=7"
```

---

## 🔔 알림

### 4. 알림 생성

가격 알림을 설정합니다.

**Endpoint**
```http
POST /alerts
```

**Request Body**
```json
{
  "symbol": "005930",
  "targetPrice": 75000,
  "condition": "above",
  "email": "user@example.com"
}
```

**Parameters**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| symbol | string | Yes | 종목 코드 |
| targetPrice | number | Yes | 목표 가격 |
| condition | string | Yes | 조건 ("above", "below") |
| email | string | Yes | 알림 받을 이메일 |

**Response**
```json
{
  "alertId": "alert_abc123",
  "status": "active",
  "createdAt": "2024-11-01T10:00:00Z"
}
```

**예시**
```bash
curl -X POST http://localhost:8080/api/alerts \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "005930",
    "targetPrice": 75000,
    "condition": "above",
    "email": "user@example.com"
  }'
```

---

### 5. 알림 목록 조회

사용자의 모든 알림을 조회합니다.

**Endpoint**
```http
GET /alerts
```

**Parameters**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| email | string | Yes | 사용자 이메일 |
| status | string | No | 상태 필터 ("active", "triggered", "all") |

**Response**
```json
{
  "alerts": [
    {
      "alertId": "alert_abc123",
      "symbol": "005930",
      "targetPrice": 75000,
      "condition": "above",
      "status": "active",
      "createdAt": "2024-11-01T10:00:00Z"
    }
  ]
}
```

---

### 6. 알림 삭제

특정 알림을 삭제합니다.

**Endpoint**
```http
DELETE /alerts/{alertId}
```

**Response**
```json
{
  "message": "Alert deleted successfully"
}
```

---

## 📈 검색

### 7. 종목 검색

종목 이름 또는 코드로 검색합니다.

**Endpoint**
```http
GET /stocks/search
```

**Parameters**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| q | string | Yes | 검색어 |
| limit | integer | No | 결과 개수 (기본값: 10) |

**Response**
```json
{
  "results": [
    {
      "symbol": "005930",
      "name": "삼성전자",
      "market": "KOSPI"
    }
  ]
}
```

**예시**
```bash
curl "http://localhost:8080/api/stocks/search?q=삼성&limit=5"
```

---

## ⚠️ 에러 응답

모든 에러는 다음 형식으로 반환됩니다:
```json
{
  "error": {
    "code": "STOCK_NOT_FOUND",
    "message": "종목을 찾을 수 없습니다",
    "details": "Symbol '999999' not found in database"
  }
}
```

### 에러 코드

| Code | HTTP Status | Description |
|------|-------------|-------------|
| STOCK_NOT_FOUND | 404 | 종목을 찾을 수 없음 |
| INVALID_SYMBOL | 400 | 잘못된 종목 코드 |
| PREDICTION_FAILED | 500 | 예측 실패 |
| RATE_LIMIT_EXCEEDED | 429 | 요청 한도 초과 |

---

## 📊 Rate Limiting

API 요청 제한:
- **인증 없음**: 100 requests/hour
- **인증 있음**: 1000 requests/hour (예정)

---

## 🔄 변경 이력

### v1.0.0 (2024-11-01)
- 초기 API 문서 작성
- 기본 엔드포인트 정의

---

## 📞 문의

API 관련 문의사항은 akma0050@naver.com로 연락주세요.
```

### 🟦 여기까지 복사 끝 🟦

---

## Step 4: 커밋하기

### 📌 커밋 메시지:

**첫 번째 칸:**
```
docs: API 문서 추가
```

**두 번째 칸:**
```
비워두거나

REST API 엔드포인트 상세 문서화
- 주식 데이터 조회 API
- 예측 및 알림 API
```

**Commit new file** 클릭!

---

## ✅ 완료!

이제 모든 주요 문서가 완성되었습니다! 🎉
```
stock-prediction-app/
├── README.md            ✅
├── CONTRIBUTING.md      ✅
├── CHANGELOG.md         ✅
├── LICENSE              ✅
└── docs/
    ├── GIT_WORKFLOW.md  ✅
    └── API.md           ✅
