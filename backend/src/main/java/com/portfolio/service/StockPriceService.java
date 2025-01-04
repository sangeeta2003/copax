package com.portfolio.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class StockPriceService {
    
    @Value("${stock.api.key}")
    private String apiKey;
    
    @Value("${stock.api.base-url}")
    private String baseUrl;
    
    private final RestTemplate restTemplate = new RestTemplate();

    public Double getCurrentPrice(String ticker) {
        try {
            String url = String.format("%s/quote?symbol=%s&token=%s", baseUrl, ticker, apiKey);
            var response = restTemplate.getForObject(url, QuoteResponse.class);
            return response != null ? response.getCurrentPrice() : null;
        } catch (Exception e) {
            System.err.println("Error fetching price for " + ticker + ": " + e.getMessage());
            // Return a mock price for development
            return 150.0;
        }
    }

    private static class QuoteResponse {
        private Double c; // Current price

        public Double getCurrentPrice() {
            return c;
        }

        public void setC(Double c) {
            this.c = c;
        }
    }
} 