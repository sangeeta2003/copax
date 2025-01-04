package com.portfolio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class StockPriceService {
    private final String API_KEY = "YOUR_API_KEY";
    private final String BASE_URL = "https://finnhub.io/api/v1";

    @Autowired
    private RestTemplate restTemplate;

    public Double getCurrentPrice(String ticker) {
        String url = String.format("%s/quote?symbol=%s&token=%s", BASE_URL, ticker, API_KEY);
        StockQuote quote = restTemplate.getForObject(url, StockQuote.class);
        return quote != null ? quote.getCurrentPrice() : null;
    }
} 