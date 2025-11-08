package com.stock.predictor.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StockHistoryDto {
    private LocalDate date;             // 날짜
    private BigDecimal open;            // 시가
    private BigDecimal high;            // 고가
    private BigDecimal low;             // 저가
    private BigDecimal close;           // 종가
    private BigDecimal adjClose;        // 수정 종가
    private Long volume;                // 거래량
}