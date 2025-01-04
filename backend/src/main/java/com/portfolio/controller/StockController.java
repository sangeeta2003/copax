package com.portfolio.controller;

import com.portfolio.model.Portfolio;
import com.portfolio.dto.StockDTO;
import com.portfolio.model.Stock;
import com.portfolio.service.StockService;
import com.portfolio.service.PortfolioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class StockController {

    @Autowired
    private StockService stockService;

    @Autowired
    private PortfolioService portfolioService;

    @GetMapping("/stocks")
    public List<StockDTO> getAllStocks() {
        return stockService.getAllStocks();
    }

    @PostMapping("/stocks")
    public ResponseEntity<?> createStock(@RequestBody Stock stock, @RequestParam Long portfolioId) {
        try {
            Portfolio portfolio = portfolioService.getPortfolioById(portfolioId);
            if (portfolio == null) {
                portfolio = portfolioService.createPortfolio("Default Portfolio");
                System.out.println("Created new portfolio with ID: " + portfolio.getId());
            }
            
            stock.setPortfolio(portfolio);
            Stock savedStock = stockService.createStock(stock);
            return ResponseEntity.ok(savedStock);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(
                    "message", "Error creating stock: " + e.getMessage(),
                    "timestamp", LocalDateTime.now()
                ));
        }
    }

    @GetMapping("/{id}")
    public StockDTO getStock(@PathVariable Long id) {
        return stockService.getStock(id);
    }

    @PutMapping("/{id}")
    public StockDTO updateStock(@PathVariable Long id, @Valid @RequestBody Stock stock) {
        return stockService.updateStock(id, stock);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStock(@PathVariable Long id) {
        stockService.deleteStock(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/portfolio-value")
    public ResponseEntity<Map<String, Double>> getPortfolioValue() {
        Double value = stockService.getPortfolioValue();
        return ResponseEntity.ok(Map.of("portfolioValue", value));
    }
} 