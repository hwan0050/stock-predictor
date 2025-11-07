package com.stock.predictor.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/stocks")
public class StockController {

    @GetMapping("/{symbol}")
    public Map<String, Object> getStock(@PathVariable String symbol) {
        // 임시 Mock 데이터
        Map<String, Object> stock = new HashMap<>();
        stock.put("symbol", symbol);
        stock.put("name", getStockName(symbol));
        stock.put("price", 150.25);
        stock.put("change", 2.50);
        stock.put("changePercent", 1.69);
        stock.put("volume", 45678900);
        stock.put("marketCap", 2500000000000L);

        return stock;
    }

    @GetMapping("/{symbol}/history")
    public Map<String, Object> getStockHistory(@PathVariable String symbol) {
        Map<String, Object> response = new HashMap<>();
        response.put("symbol", symbol);
        response.put("period", "1m");

        // 임시 30일 데이터
        java.util.List<Map<String, Object>> data = new java.util.ArrayList<>();
        double basePrice = 140.0;

        for (int i = 29; i >= 0; i--) {
            Map<String, Object> dayData = new HashMap<>();

            // 날짜 계산
            java.time.LocalDate date = java.time.LocalDate.now().minusDays(i);
            dayData.put("date", date.toString());

            // 랜덤 가격 변동
            double change = (Math.random() - 0.5) * 10;
            basePrice = Math.max(basePrice + change, 100);

            dayData.put("open", Math.round(basePrice * 100) / 100.0);
            dayData.put("high", Math.round((basePrice + Math.random() * 5) * 100) / 100.0);
            dayData.put("low", Math.round((basePrice - Math.random() * 5) * 100) / 100.0);
            dayData.put("close", Math.round(basePrice * 100) / 100.0);
            dayData.put("volume", (int)(Math.random() * 10000000) + 5000000);

            data.add(dayData);
        }

        response.put("data", data);
        return response;
    }

    @GetMapping("/search")
    public Map<String, Object> searchStock(@RequestParam String q) {
        Map<String, Object> response = new HashMap<>();
        java.util.List<Map<String, String>> results = new java.util.ArrayList<>();

        // 임시 검색 결과
        if (q.toLowerCase().contains("apple") || q.contains("AAPL")) {
            Map<String, String> result = new HashMap<>();
            result.put("symbol", "AAPL");
            result.put("name", "Apple Inc.");
            result.put("market", "NASDAQ");
            results.add(result);
        }

        if (q.contains("삼성") || q.contains("005930")) {
            Map<String, String> result = new HashMap<>();
            result.put("symbol", "005930");
            result.put("name", "삼성전자");
            result.put("market", "KOSPI");
            results.add(result);
        }

        response.put("results", results);
        return response;
    }

    private String getStockName(String symbol) {
        switch (symbol.toUpperCase()) {
            case "AAPL":
                return "Apple Inc.";
            case "005930":
                return "삼성전자";
            case "GOOGL":
                return "Alphabet Inc.";
            case "MSFT":
                return "Microsoft Corporation";
            default:
                return symbol;
        }
    }
}