package com.portfolio.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class StockDTO {
    private Long id;
    private String name;
    private String ticker;
    private Integer quantity;
    private Double buyPrice;
    private Double totalValue;
    private Long portfolioId;
    private LocalDateTime purchaseDate;
} 