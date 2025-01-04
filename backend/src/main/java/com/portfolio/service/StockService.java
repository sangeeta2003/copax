package com.portfolio.service;

import com.portfolio.dto.StockDTO;
import com.portfolio.model.Stock;
import com.portfolio.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private StockPriceService stockPriceService;

    public List<StockDTO> getAllStocks() {
        List<Stock> stocks = stockRepository.findAll();
        System.out.println("Found " + stocks.size() + " stocks");
        return stocks.stream()
            .map(this::convertToDTO)
            .peek(dto -> {
                Double currentPrice = stockPriceService.getCurrentPrice(dto.getTicker());
                dto.setCurrentPrice(currentPrice);
                dto.setTotalValue(currentPrice * dto.getQuantity());
            })
            .collect(Collectors.toList());
    }

    @Transactional
    public Stock createStock(Stock stock) {
        System.out.println("Creating stock: " + stock.getName());
        Stock savedStock = stockRepository.save(stock);
        System.out.println("Created stock with ID: " + savedStock.getId());
        return savedStock;
    }

    public StockDTO getStock(Long id) {
        Stock stock = stockRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Stock not found"));
        return convertToDTO(stock);
    }

    @Transactional
    public StockDTO updateStock(Long id, Stock stockDetails) {
        Stock stock = stockRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Stock not found"));
        
        stock.setName(stockDetails.getName());
        stock.setTicker(stockDetails.getTicker());
        stock.setQuantity(stockDetails.getQuantity());
        stock.setBuyPrice(stockDetails.getBuyPrice());
        
        return convertToDTO(stockRepository.save(stock));
    }

    public void deleteStock(Long id) {
        stockRepository.deleteById(id);
    }

    public Double getPortfolioValue() {
        return stockRepository.findAll().stream()
            .mapToDouble(stock -> {
                Double currentPrice = stockPriceService.getCurrentPrice(stock.getTicker());
                return currentPrice != null ? currentPrice * stock.getQuantity() : 0.0;
            })
            .sum();
    }

    private StockDTO convertToDTO(Stock stock) {
        StockDTO dto = new StockDTO();
        dto.setId(stock.getId());
        dto.setName(stock.getName());
        dto.setTicker(stock.getTicker());
        dto.setQuantity(stock.getQuantity());
        dto.setBuyPrice(stock.getBuyPrice());
        dto.setPurchaseDate(stock.getPurchaseDate());
        
        // Calculate current value
        Double currentPrice = stockPriceService.getCurrentPrice(stock.getTicker());
        dto.setCurrentPrice(currentPrice);
        dto.setTotalValue(currentPrice * stock.getQuantity());
        
        return dto;
    }
} 