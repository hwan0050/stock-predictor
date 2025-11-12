package com.stock.predictor.service;

import com.stock.predictor.dto.StockDataDto;
import com.stock.predictor.dto.StockHistoryDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.cache.annotation.Cacheable;
import yahoofinance.Stock;
import yahoofinance.YahooFinance;
import yahoofinance.histquotes.HistoricalQuote;
import yahoofinance.histquotes.Interval;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
public class YahooFinanceService {

    /**
     * 실시간 주가 데이터 조회 (캐싱 적용)
     * @param symbol 종목 코드 (예: "AAPL", "005930.KS")
     * @return StockDataDto
     */
    @Cacheable(value = "stocks", key = "#symbol")
    public StockDataDto getRealtimeStockData(String symbol) {
        try {
            log.info("Fetching real-time stock data for symbol: {}", symbol);

            // Yahoo Finance API 호출
            Stock stock = YahooFinance.get(symbol);

            if (stock == null || stock.getQuote() == null) {
                log.error("Stock data not found for symbol: {}", symbol);
                throw new RuntimeException("Stock data not found for symbol: " + symbol);
            }

            // 변동금액 계산
            BigDecimal change = null;
            BigDecimal changePercent = null;
            if (stock.getQuote().getPrice() != null && stock.getQuote().getPreviousClose() != null) {
                change = stock.getQuote().getPrice().subtract(stock.getQuote().getPreviousClose());
                changePercent = change.divide(stock.getQuote().getPreviousClose(), 4, BigDecimal.ROUND_HALF_UP)
                        .multiply(BigDecimal.valueOf(100));
            }

            // DTO로 변환
            return StockDataDto.builder()
                    .symbol(stock.getSymbol())
                    .name(stock.getName())
                    .currentPrice(stock.getQuote().getPrice())
                    .open(stock.getQuote().getOpen())
                    .dayHigh(stock.getQuote().getDayHigh())
                    .dayLow(stock.getQuote().getDayLow())
                    .previousClose(stock.getQuote().getPreviousClose())
                    .change(change)
                    .changePercent(changePercent)
                    .volume(stock.getQuote().getVolume())
                    .avgVolume(stock.getQuote().getAvgVolume())
                    .marketCap(stock.getStats().getMarketCap())
                    .currency(stock.getCurrency())
                    .exchange(stock.getStockExchange())
                    .lastTradeTime(stock.getQuote().getLastTradeTime() != null
                            ? LocalDateTime.ofInstant(stock.getQuote().getLastTradeTime().toInstant(),
                            ZoneId.systemDefault())
                            : null)
                    .timestamp(LocalDateTime.now())
                    .build();

        } catch (IOException e) {
            log.error("Error fetching stock data for symbol: {}", symbol, e);
            throw new RuntimeException("Failed to fetch stock data: " + e.getMessage(), e);
        }
    }

    /**
     * 여러 종목 동시 조회
     * @param symbols 종목 코드 배열
     * @return List<StockDataDto>
     */
    public List<StockDataDto> getMultipleStocks(String[] symbols) {
        try {
            log.info("Fetching multiple stocks: {}", String.join(", ", symbols));

            Map<String, Stock> stocks = YahooFinance.get(symbols);

            return stocks.values().stream()
                    .filter(stock -> stock != null && stock.getQuote() != null)
                    .map(stock -> {
                        BigDecimal change = null;
                        BigDecimal changePercent = null;
                        if (stock.getQuote().getPrice() != null && stock.getQuote().getPreviousClose() != null) {
                            change = stock.getQuote().getPrice().subtract(stock.getQuote().getPreviousClose());
                            changePercent = change.divide(stock.getQuote().getPreviousClose(), 4, BigDecimal.ROUND_HALF_UP)
                                    .multiply(BigDecimal.valueOf(100));
                        }

                        return StockDataDto.builder()
                                .symbol(stock.getSymbol())
                                .name(stock.getName())
                                .currentPrice(stock.getQuote().getPrice())
                                .open(stock.getQuote().getOpen())
                                .dayHigh(stock.getQuote().getDayHigh())
                                .dayLow(stock.getQuote().getDayLow())
                                .previousClose(stock.getQuote().getPreviousClose())
                                .change(change)
                                .changePercent(changePercent)
                                .volume(stock.getQuote().getVolume())
                                .avgVolume(stock.getQuote().getAvgVolume())
                                .marketCap(stock.getStats().getMarketCap())
                                .currency(stock.getCurrency())
                                .exchange(stock.getStockExchange())
                                .lastTradeTime(stock.getQuote().getLastTradeTime() != null
                                        ? LocalDateTime.ofInstant(stock.getQuote().getLastTradeTime().toInstant(),
                                        ZoneId.systemDefault())
                                        : null)
                                .timestamp(LocalDateTime.now())
                                .build();
                    })
                    .collect(Collectors.toList());

        } catch (IOException e) {
            log.error("Error fetching multiple stocks", e);
            throw new RuntimeException("Failed to fetch stock data: " + e.getMessage(), e);
        }
    }

    /**
     * 주가 히스토리 데이터 조회 (캐싱 적용)
     * @param symbol 종목 코드
     * @param from 시작일
     * @param to 종료일
     * @return List<StockHistoryDto>
     */
    @Cacheable(value = "stocks", key = "#symbol")
    public List<StockHistoryDto> getStockHistory(String symbol, LocalDate from, LocalDate to) {
        try {
            log.info("Fetching history for symbol: {} from {} to {}", symbol, from, to);

            Stock stock = YahooFinance.get(symbol);

            if (stock == null) {
                throw new RuntimeException("Stock not found: " + symbol);
            }

            // LocalDate를 Calendar로 변환
            Calendar calFrom = Calendar.getInstance();
            calFrom.set(from.getYear(), from.getMonthValue() - 1, from.getDayOfMonth());

            Calendar calTo = Calendar.getInstance();
            calTo.set(to.getYear(), to.getMonthValue() - 1, to.getDayOfMonth());

            // 히스토리 데이터 조회
            List<HistoricalQuote> history = stock.getHistory(calFrom, calTo, Interval.DAILY);

            if (history == null || history.isEmpty()) {
                log.warn("No historical data found for symbol: {}", symbol);
                return new ArrayList<>();
            }

            // DTO로 변환
            return history.stream()
                    .map(quote -> StockHistoryDto.builder()
                            .date(quote.getDate().toInstant()
                                    .atZone(ZoneId.systemDefault())
                                    .toLocalDate())
                            .open(quote.getOpen())
                            .high(quote.getHigh())
                            .low(quote.getLow())
                            .close(quote.getClose())
                            .adjClose(quote.getAdjClose())
                            .volume(quote.getVolume())
                            .build())
                    .collect(Collectors.toList());

        } catch (IOException e) {
            log.error("Error fetching stock history for symbol: {}", symbol, e);
            throw new RuntimeException("Failed to fetch stock history: " + e.getMessage(), e);
        }
    }

    /**
     * 최근 N일간 히스토리 조회
     * @param symbol 종목 코드
     * @param days 조회할 일수
     * @return List<StockHistoryDto>
     */
    public List<StockHistoryDto> getRecentHistory(String symbol, int days) {
        LocalDate to = LocalDate.now();
        LocalDate from = to.minusDays(days);
        return getStockHistory(symbol, from, to);
    }
}