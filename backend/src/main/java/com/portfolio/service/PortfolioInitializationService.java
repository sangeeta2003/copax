package com.portfolio.service;

import com.portfolio.model.Portfolio;
import com.portfolio.model.Stock;
import com.portfolio.model.User;
import com.portfolio.repository.PortfolioRepository;
import com.portfolio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PortfolioInitializationService {

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StockService stockService;

    @PostConstruct
    @Transactional
    public void init() {
        if (portfolioRepository.count() == 0) {
            // Create default user
            User defaultUser = new User();
            defaultUser.setUsername("default");
            defaultUser.setEmail("default@example.com");
            defaultUser.setPassword("password");
            defaultUser = userRepository.save(defaultUser);

            // Create default portfolio
            Portfolio portfolio = new Portfolio();
            portfolio.setName("Default Portfolio");
            portfolio.setUser(defaultUser);
            portfolio = portfolioRepository.save(portfolio);

            // Create sample stock
            Stock stock = new Stock();
            stock.setName("Apple Inc.");
            stock.setTicker("AAPL");
            stock.setQuantity(10);
            stock.setBuyPrice(150.0);
            stock.setPortfolio(portfolio);
            
            stockService.createStock(stock);
        }
    }
} 