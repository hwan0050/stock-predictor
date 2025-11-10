package com.stock.predictor.controller;

import com.stock.predictor.dto.StockDataDto;
import com.stock.predictor.dto.StockHistoryDto;
import com.stock.predictor.service.YahooFinanceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/stocks")
@RequiredArgsConstructor
public class StockController {

    private final YahooFinanceService yahooFinanceService;

    /**
     * 실시간 주가 데이터 조회
     * GET /api/stocks/{symbol}
     * 예: /api/stocks/AAPL, /api/stocks/005930.KS
     */
    @GetMapping("/{symbol}")
    public ResponseEntity<StockDataDto> getStock(@PathVariable String symbol) {
        try {
            log.info("Received request for stock: {}", symbol);

            // TEST 심볼이면 Mock 데이터 반환
            if ("TEST".equalsIgnoreCase(symbol)) {
                return getTestMockData();
            }
            StockDataDto stockData = yahooFinanceService.getRealtimeStockData(symbol);
            return ResponseEntity.ok(stockData);
        } catch (Exception e) {
            log.error("Error fetching stock data for {}: {}", symbol, e.getMessage());
            throw new RuntimeException("Failed to fetch stock data: " + e.getMessage());
        }
    }

    /**
     * 여러 종목 동시 조회
     * GET /api/stocks?symbols=AAPL,GOOGL,MSFT
     */
    @GetMapping
    public ResponseEntity<List<StockDataDto>> getMultipleStocks(
            @RequestParam String[] symbols) {
        try {
            log.info("Received request for multiple stocks: {}", String.join(", ", symbols));
            List<StockDataDto> stockDataList = yahooFinanceService.getMultipleStocks(symbols);
            return ResponseEntity.ok(stockDataList);
        } catch (Exception e) {
            log.error("Error fetching multiple stocks: {}", e.getMessage());
            throw new RuntimeException("Failed to fetch stock data: " + e.getMessage());
        }
    }

    /**
     * 주가 히스토리 조회
     * GET /api/stocks/{symbol}/history?days=30
     * 또는
     * GET /api/stocks/{symbol}/history?from=2024-01-01&to=2024-12-31
     */
    @GetMapping("/{symbol}/history")
    public ResponseEntity<Map<String, Object>> getStockHistory(
            @PathVariable String symbol,
            @RequestParam(required = false) Integer days,
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to) {

        try {
            log.info("Received history request for stock: {}, days: {}, from: {}, to: {}",
                    symbol, days, from, to);

            List<StockHistoryDto> historyData;

            if (days != null) {
                // 최근 N일 조회
                historyData = yahooFinanceService.getRecentHistory(symbol, days);
            } else if (from != null && to != null) {
                // 기간 지정 조회
                LocalDate fromDate = LocalDate.parse(from);
                LocalDate toDate = LocalDate.parse(to);
                historyData = yahooFinanceService.getStockHistory(symbol, fromDate, toDate);
            } else {
                // 기본값: 최근 30일
                historyData = yahooFinanceService.getRecentHistory(symbol, 30);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("symbol", symbol);
            response.put("data", historyData);
            response.put("count", historyData.size());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error fetching stock history for {}: {}", symbol, e.getMessage());
            throw new RuntimeException("Failed to fetch stock history: " + e.getMessage());
        }
    }

    /**
     * 주식 검색 (Mock - 향후 실제 검색 API로 대체 예정)
     * GET /api/stocks/search?q=apple
     */
    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchStock(@RequestParam String q) {
        Map<String, Object> response = new HashMap<>();
        List<Map<String, String>> results = new java.util.ArrayList<>();

        // 임시 검색 결과 (향후 실제 API로 대체)
        if (q.toLowerCase().contains("apple") || q.toUpperCase().contains("AAPL")) {
            Map<String, String> result = new HashMap<>();
            result.put("symbol", "AAPL");
            result.put("name", "Apple Inc.");
            result.put("market", "NASDAQ");
            results.add(result);
        }

        if (q.contains("삼성") || q.contains("005930")) {
            Map<String, String> result = new HashMap<>();
            result.put("symbol", "005930.KS");
            result.put("name", "삼성전자");
            result.put("market", "KOSPI");
            results.add(result);
        }

        if (q.toLowerCase().contains("google") || q.toUpperCase().contains("GOOGL")) {
            Map<String, String> result = new HashMap<>();
            result.put("symbol", "GOOGL");
            result.put("name", "Alphabet Inc.");
            result.put("market", "NASDAQ");
            results.add(result);
        }

        if (q.toLowerCase().contains("microsoft") || q.toUpperCase().contains("MSFT")) {
            Map<String, String> result = new HashMap<>();
            result.put("symbol", "MSFT");
            result.put("name", "Microsoft Corporation");
            result.put("market", "NASDAQ");
            results.add(result);
        }

        response.put("query", q);
        response.put("results", results);
        response.put("count", results.size());

        return ResponseEntity.ok(response);
    }

    /**
     * 테스트용 Mock 데이터 (Yahoo API 없이 확인)
     * GET /api/stocks/test/mock
     */
    @GetMapping("/test/mock")
    public ResponseEntity<StockDataDto> getTestMockData() {
        StockDataDto mockData = StockDataDto.builder()
                .symbol("TEST")
                .name("Test Stock Inc.")
                .currentPrice(new BigDecimal("150.25"))
                .open(new BigDecimal("148.50"))
                .dayHigh(new BigDecimal("151.00"))
                .dayLow(new BigDecimal("147.80"))
                .previousClose(new BigDecimal("147.75"))
                .change(new BigDecimal("2.50"))
                .changePercent(new BigDecimal("1.69"))
                .volume(45678900L)
                .avgVolume(50000000L)
                .marketCap(new BigDecimal("2500000000000"))
                .currency("USD")
                .exchange("TEST")
                .timestamp(java.time.LocalDateTime.now())
                .build();

        return ResponseEntity.ok(mockData);
    }
}

