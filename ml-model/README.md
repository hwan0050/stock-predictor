# ML Model

Python 기반 주가 예측 머신러닝 모델

---

## 🚀 Quick Start

### Prerequisites

- Python 3.8 이상
- pip 또는 conda
- (선택) GPU 환경 (CUDA)

### Installation
```bash
cd ml-model
pip install -r requirements.txt
```

### 데이터 수집
```bash
python scripts/fetch_data.py --symbol 005930 --period 5y
```

### 모델 학습
```bash
python train.py --symbol 005930 --model lstm
```

### 예측 실행
```bash
python predict.py --symbol 005930 --days 7
```

---

## 📦 Tech Stack

### Core Libraries
- **Python 3.8+** - 프로그래밍 언어
- **NumPy** - 수치 계산
- **pandas** - 데이터 처리 및 분석

### Machine Learning
- **scikit-learn** - 전통적 ML 알고리즘
- **TensorFlow 2.x** - 딥러닝 프레임워크
- **Keras** - 고수준 신경망 API
- **PyTorch** *(예정)* - 대체 딥러닝 프레임워크

### Data Processing
- **yfinance** - Yahoo Finance 데이터 수집
- **pandas-ta** - 기술적 지표 계산
- **ta-lib** *(선택)* - 고급 기술적 분석

### Visualization
- **matplotlib** - 기본 시각화
- **seaborn** - 통계 시각화
- **plotly** - 인터랙티브 차트

### Model Management
- **MLflow** *(예정)* - 모델 실험 추적
- **joblib** - 모델 직렬화

### Development Tools
- **Jupyter Notebook** - 데이터 분석 및 실험
- **pytest** - 테스트 프레임워크
- **black** - 코드 포맷팅

---

## 📁 Project Structure
```
ml-model/
├── data/                       # 데이터 저장
│   ├── raw/                   # 원본 데이터
│   │   └── 005930.csv
│   ├── processed/             # 전처리된 데이터
│   │   └── 005930_processed.csv
│   └── features/              # 피처 엔지니어링 결과
│
├── models/                     # 저장된 모델
│   ├── lstm_005930_v1.h5
│   ├── scaler_005930.pkl
│   └── model_config.json
│
├── notebooks/                  # Jupyter 노트북
│   ├── 01_data_exploration.ipynb
│   ├── 02_feature_engineering.ipynb
│   ├── 03_model_training.ipynb
│   └── 04_evaluation.ipynb
│
├── src/                        # 소스 코드
│   ├── __init__.py
│   ├── data/                  # 데이터 처리
│   │   ├── __init__.py
│   │   ├── fetcher.py        # 데이터 수집
│   │   ├── processor.py      # 전처리
│   │   └── features.py       # 피처 생성
│   │
│   ├── models/                # 모델 구현
│   │   ├── __init__.py
│   │   ├── lstm.py           # LSTM 모델
│   │   ├── gru.py            # GRU 모델
│   │   └── transformer.py    # Transformer 모델
│   │
│   ├── training/              # 학습 관련
│   │   ├── __init__.py
│   │   ├── trainer.py        # 학습 로직
│   │   └── callbacks.py      # 콜백 함수
│   │
│   ├── evaluation/            # 평가 메트릭
│   │   ├── __init__.py
│   │   └── metrics.py
│   │
│   └── utils/                 # 유틸리티
│       ├── __init__.py
│       ├── visualizer.py     # 시각화
│       └── logger.py         # 로깅
│
├── scripts/                    # 실행 스크립트
│   ├── fetch_data.py         # 데이터 수집 스크립트
│   ├── preprocess.py         # 전처리 스크립트
│   └── evaluate.py           # 평가 스크립트
│
├── tests/                      # 테스트
│   ├── test_data.py
│   ├── test_models.py
│   └── test_utils.py
│
├── config/                     # 설정 파일
│   ├── model_config.yaml
│   └── training_config.yaml
│
├── requirements.txt            # Python 의존성
├── setup.py                    # 패키지 설정
├── train.py                    # 학습 진입점
├── predict.py                  # 예측 진입점
└── README.md                   # 이 문서
```

---

## 🎯 Features

### 구현 완료
- [ ] 데이터 수집 파이프라인
- [ ] 기본 전처리 로직
- [ ] LSTM 모델 구현

### 개발 중
- [ ] 특성 엔지니어링 고도화
- [ ] 모델 하이퍼파라미터 튜닝
- [ ] 성능 평가 지표

### 예정
- [ ] Transformer 모델 구현
- [ ] 앙상블 모델
- [ ] AutoML 통합
- [ ] 실시간 예측 API
- [ ] 모델 모니터링 시스템

---

## 🧠 Model Architecture

### LSTM (Long Short-Term Memory)
```python
model = Sequential([
    LSTM(128, return_sequences=True, input_shape=(sequence_length, features)),
    Dropout(0.2),
    LSTM(64, return_sequences=False),
    Dropout(0.2),
    Dense(32, activation='relu'),
    Dense(1)
])

model.compile(
    optimizer='adam',
    loss='mse',
    metrics=['mae', 'mape']
)
```

### 입력 특성 (Features)

- **가격 데이터**: Open, High, Low, Close, Volume
- **기술적 지표**:
  - 이동평균: SMA(5, 20, 60), EMA(12, 26)
  - 모멘텀: RSI, MACD, Stochastic
  - 볼린저 밴드
  - 거래량 지표: OBV, Volume MA
- **시간 특성**: 요일, 월, 분기
- **외부 요인**: *(예정)* 환율, 금리, 뉴스 감성

---

## 📊 Data Processing

### 데이터 수집
```python
from src.data.fetcher import StockDataFetcher

fetcher = StockDataFetcher()
data = fetcher.fetch(
    symbol='005930',
    start_date='2019-01-01',
    end_date='2024-01-01'
)
```

### 전처리
```python
from src.data.processor import DataProcessor

processor = DataProcessor()
processed_data = processor.process(
    data,
    normalize=True,
    handle_missing='interpolate',
    remove_outliers=True
)
```

### 특성 생성
```python
from src.data.features import FeatureEngineering

fe = FeatureEngineering()
features = fe.create_features(
    processed_data,
    include_technical_indicators=True,
    window_sizes=[5, 20, 60]
)
```

---

## 🎓 Model Training

### 기본 학습
```bash
python train.py \
    --symbol 005930 \
    --model lstm \
    --epochs 100 \
    --batch-size 32 \
    --sequence-length 60
```

### 하이퍼파라미터 튜닝
```bash
python train.py \
    --symbol 005930 \
    --model lstm \
    --tune \
    --trials 50
```

### 학습 모니터링
```python
from src.training.trainer import ModelTrainer

trainer = ModelTrainer(
    model=lstm_model,
    callbacks=[
        EarlyStopping(patience=10),
        ModelCheckpoint('best_model.h5'),
        TensorBoard(log_dir='./logs')
    ]
)

history = trainer.train(X_train, y_train, X_val, y_val)
```

---

## 🔮 Prediction

### 단일 예측
```python
from src.models.lstm import LSTMPredictor

predictor = LSTMPredictor.load('models/lstm_005930_v1.h5')
prediction = predictor.predict(
    symbol='005930',
    days_ahead=7
)

print(f"7일 후 예측 가격: {prediction['prices']}")
print(f"신뢰도: {prediction['confidence']}")
```

### 배치 예측
```bash
python predict.py \
    --symbols 005930,035720,051910 \
    --days 7 \
    --output predictions.csv
```

---

## 📈 Evaluation Metrics

### 회귀 메트릭

- **MSE (Mean Squared Error)**: 평균 제곱 오차
- **RMSE (Root Mean Squared Error)**: 평균 제곱근 오차
- **MAE (Mean Absolute Error)**: 평균 절대 오차
- **MAPE (Mean Absolute Percentage Error)**: 평균 절대 백분율 오차
- **R² Score**: 결정 계수

### 방향성 정확도
```python
def direction_accuracy(y_true, y_pred):
    """
    실제 가격 변동 방향과 예측 방향의 일치율
    """
    true_direction = np.sign(np.diff(y_true))
    pred_direction = np.sign(np.diff(y_pred))
    return np.mean(true_direction == pred_direction)
```

### 평가 실행
```bash
python scripts/evaluate.py \
    --model models/lstm_005930_v1.h5 \
    --test-data data/processed/test.csv
```

---

## 🧪 Testing

### 단위 테스트
```bash
pytest tests/
```

### 특정 테스트
```bash
pytest tests/test_models.py::test_lstm_prediction
```

### 커버리지
```bash
pytest --cov=src tests/
```

---

## 🔧 Configuration

### model_config.yaml
```yaml
lstm:
  layers:
    - type: LSTM
      units: 128
      return_sequences: true
    - type: Dropout
      rate: 0.2
    - type: LSTM
      units: 64
    - type: Dense
      units: 32
      activation: relu
    - type: Dense
      units: 1
  
  compile:
    optimizer: adam
    loss: mse
    metrics: [mae, mape]

training:
  sequence_length: 60
  batch_size: 32
  epochs: 100
  validation_split: 0.2
```

---

## 🚧 Development Guidelines

### Code Style
- **PEP 8** 준수
- **Type hints** 사용 권장
- **Docstring**: NumPy 스타일

### 예시
```python
def predict_price(
    symbol: str,
    days_ahead: int = 7,
    confidence_interval: float = 0.95
) -> Dict[str, Any]:
    """
    주식 가격 예측
    
    Parameters
    ----------
    symbol : str
        종목 코드
    days_ahead : int, default=7
        예측 일수
    confidence_interval : float, default=0.95
        신뢰 구간
    
    Returns
    -------
    Dict[str, Any]
        예측 결과 딕셔너리
    """
    pass
```

### Commit Convention
```
feat(model): LSTM 모델 구현
fix(data): 데이터 전처리 오류 수정
perf(training): 학습 속도 최적화
docs(readme): 사용 예시 추가
```

---

## 🐛 Troubleshooting

### GPU 메모리 부족
```python
# 메모리 성장 허용
gpus = tf.config.list_physical_devices('GPU')
if gpus:
    tf.config.experimental.set_memory_growth(gpus[0], True)
```

### 데이터 부족
```bash
# 더 긴 기간 데이터 수집
python scripts/fetch_data.py --symbol 005930 --period 10y
```

### 과적합
```python
# Dropout 비율 증가, Early Stopping 사용
model.add(Dropout(0.3))  # 0.2 → 0.3
```

---

## 📚 Learning Resources

- [TensorFlow 공식 문서](https://www.tensorflow.org/)
- [Keras 가이드](https://keras.io/guides/)
- [Time Series Forecasting](https://www.tensorflow.org/tutorials/structured_data/time_series)
- [pandas 문서](https://pandas.pydata.org/docs/)

---

## 🤝 Contributing

버그 리포트나 기능 제안은 [Issues](../../issues)에 등록해주세요.

자세한 기여 방법은 [CONTRIBUTING.md](../CONTRIBUTING.md)를 참조하세요.

---

## 📞 Contact

문의사항: akma0050@naver.com