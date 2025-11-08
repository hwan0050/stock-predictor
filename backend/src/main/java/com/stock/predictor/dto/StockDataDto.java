package com.stock.predictor.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StockDataDto {
    private String symbol;              // 종목 코드 (예: AAPL, 005930.KS)
    private String name;                // 종목명
    private BigDecimal currentPrice;    // 현재가
    private BigDecimal open;            // 시가
    private BigDecimal dayHigh;         // 고가
    private BigDecimal dayLow;          // 저가
    private BigDecimal previousClose;   // 전일 종가
    private BigDecimal change;          // 변동금액
    private BigDecimal changePercent;   // 변동률 (%)
    private Long volume;                // 거래량
    private Long avgVolume;             // 평균 거래량
    private BigDecimal marketCap;       // 시가총액
    private String currency;            // 통화
    private String exchange;            // 거래소
    private LocalDateTime lastTradeTime; // 마지막 거래 시간
    private LocalDateTime timestamp;    // 조회 시간
}