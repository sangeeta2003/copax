package com.portfolio.service;

import com.portfolio.model.Portfolio;
import com.portfolio.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class PortfolioService {
    
    @Autowired
    private PortfolioRepository portfolioRepository;

    @PostConstruct
    @Transactional
    public void init() {
        try {
            if (portfolioRepository.count() == 0) {
                Portfolio defaultPortfolio = new Portfolio();
                defaultPortfolio.setName("Default Portfolio");
                Portfolio saved = portfolioRepository.save(defaultPortfolio);
                System.out.println("Created default portfolio with ID: " + saved.getId());
            } else {
                List<Portfolio> portfolios = portfolioRepository.findAll();
                System.out.println("Existing portfolios: " + portfolios.size());
                portfolios.forEach(p -> System.out.println("Portfolio ID: " + p.getId()));
            }
        } catch (Exception e) {
            System.err.println("Error initializing portfolio: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Transactional(readOnly = true)
    public Portfolio getPortfolioById(Long id) {
        return portfolioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Portfolio not found with id: " + id));
    }

    @Transactional
    public Portfolio createPortfolio(String name) {
        Portfolio portfolio = new Portfolio();
        portfolio.setName(name);
        return portfolioRepository.save(portfolio);
    }

    @Transactional(readOnly = true)
    public List<Portfolio> getAllPortfolios() {
        return portfolioRepository.findAll();
    }
} 