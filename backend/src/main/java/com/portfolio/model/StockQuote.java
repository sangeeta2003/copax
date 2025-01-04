package com.portfolio.model;

import lombok.Data;

@Data
public class StockQuote {
    private Double currentPrice;
    private Double highPrice;
    private Double lowPrice;
    private Double openPrice;
    private Double previousClose;
} 