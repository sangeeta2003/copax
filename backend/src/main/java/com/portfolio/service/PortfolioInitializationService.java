package com.portfolio.service;

import com.portfolio.model.Stock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class PortfolioInitializationService {
    private final String[] AVAILABLE_STOCKS = {"AAPL", "MSFT", "GOOGL", "AMZN", "META", "TSLA", "NVDA", "JPM"};
    
    @Autowired
    private StockService stockService;

    public void initializePortfolio(Long portfolioId) {
        List<String> selectedStocks = selectRandomStocks(5);
        for (String ticker : selectedStocks) {
            Stock stock = new Stock();
            stock.setTicker(ticker);
            stock.setQuantity(1);
            stockService.createStock(stock, portfolioId);
        }
    }

    private List<String> selectRandomStocks(int count) {
        List<String> stocks = Arrays.asList(AVAILABLE_STOCKS);
        Collections.shuffle(stocks);
        return stocks.subList(0, count);
    }
} 