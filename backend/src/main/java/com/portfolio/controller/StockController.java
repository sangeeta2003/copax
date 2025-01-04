package com.portfolio.controller;

import com.portfolio.dto.StockDTO;
import com.portfolio.model.Stock;
import com.portfolio.service.StockService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import org.springframework.http.HttpStatus;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/stocks")
public class StockController {

    @Autowired
    private StockService stockService;

    @GetMapping
    public List<StockDTO> getAllStocks() {
        return stockService.getAllStocks();
    }

    @GetMapping("/{id}")
    public StockDTO getStock(@PathVariable Long id) {
        return stockService.getStock(id);
    }

    @PostMapping
    public ResponseEntity<?> createStock(@Valid @RequestBody Stock stock, @RequestParam Long portfolioId) {
        try {
            System.out.println("Received request to create stock: " + stock);
            System.out.println("Portfolio ID: " + portfolioId);
            
            StockDTO createdStock = stockService.createStock(stock, portfolioId);
            return ResponseEntity.ok(createdStock);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            response.put("timestamp", LocalDateTime.now());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
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