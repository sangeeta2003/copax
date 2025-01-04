package com.portfolio.service;

import com.portfolio.dto.StockDTO;
import com.portfolio.exception.StockNotFoundException;
import com.portfolio.model.Stock;
import com.portfolio.model.Portfolio;
import com.portfolio.repository.StockRepository;
import com.portfolio.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.time.LocalDateTime;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private PortfolioRepository portfolioRepository;

    public List<StockDTO> getAllStocks() {
        return stockRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public StockDTO getStock(Long id) {
        Stock stock = stockRepository.findById(id)
                .orElseThrow(() -> new StockNotFoundException("Stock not found with id: " + id));
        return convertToDTO(stock);
    }

    public StockDTO createStock(Stock stock, Long portfolioId) {
        try {
            System.out.println("Creating stock with portfolioId: " + portfolioId);
            System.out.println("Stock details - Name: " + stock.getName() + 
                ", Ticker: " + stock.getTicker() + 
                ", Quantity: " + stock.getQuantity() + 
                ", Price: " + stock.getBuyPrice());
            
            if (portfolioId == null) {
                throw new RuntimeException("Portfolio ID is required");
            }
            
            Portfolio portfolio = portfolioRepository.findById(portfolioId)
                .orElseThrow(() -> new RuntimeException("Portfolio not found with id: " + portfolioId));
            
            System.out.println("Found portfolio with ID: " + portfolio.getId());
            
            stock.setPortfolio(portfolio);
            stock.setPurchaseDate(LocalDateTime.now());
            
            Stock savedStock = stockRepository.save(stock);
            System.out.println("Stock saved with ID: " + savedStock.getId());
            
            StockDTO dto = convertToDTO(savedStock);
            return dto;
        } catch (Exception e) {
            System.err.println("Error creating stock: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Error creating stock: " + e.getMessage());
        }
    }

    public StockDTO updateStock(Long id, Stock stockDetails) {
        Stock stock = stockRepository.findById(id)
                .orElseThrow(() -> new StockNotFoundException("Stock not found with id: " + id));

        stock.setName(stockDetails.getName());
        stock.setTicker(stockDetails.getTicker());
        stock.setQuantity(stockDetails.getQuantity());
        stock.setBuyPrice(stockDetails.getBuyPrice());

        Stock updatedStock = stockRepository.save(stock);
        return convertToDTO(updatedStock);
    }

    public void deleteStock(Long id) {
        Stock stock = stockRepository.findById(id)
                .orElseThrow(() -> new StockNotFoundException("Stock not found with id: " + id));
        stockRepository.delete(stock);
    }

    public Double getPortfolioValue() {
        return stockRepository.findAll().stream()
                .mapToDouble(stock -> stock.getQuantity() * stock.getBuyPrice())
                .sum();
    }

    private StockDTO convertToDTO(Stock stock) {
        StockDTO dto = new StockDTO();
        dto.setId(stock.getId());
        dto.setName(stock.getName());
        dto.setTicker(stock.getTicker());
        dto.setQuantity(stock.getQuantity());
        dto.setBuyPrice(stock.getBuyPrice());
        dto.setTotalValue(stock.getQuantity() * stock.getBuyPrice());
        dto.setPurchaseDate(stock.getPurchaseDate());
        if (stock.getPortfolio() != null) {
            dto.setPortfolioId(stock.getPortfolio().getId());
        }
        return dto;
    }
} 