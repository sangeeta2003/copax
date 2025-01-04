package com.portfolio.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "stocks")
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Stock name is required")
    private String name;

    @NotBlank(message = "Ticker symbol is required")
    private String ticker;

    @Positive(message = "Quantity must be positive")
    private Integer quantity;

    @Positive(message = "Buy price must be positive")
    private Double buyPrice;

    @Column(name = "purchase_date")
    private LocalDateTime purchaseDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "portfolio_id")
    @JsonIgnoreProperties({"stocks", "user", "hibernateLazyInitializer"})
    private Portfolio portfolio;

    @PrePersist
    protected void onCreate() {
        purchaseDate = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "Stock{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", ticker='" + ticker + '\'' +
            ", quantity=" + quantity +
            ", buyPrice=" + buyPrice +
            ", portfolioId=" + (portfolio != null ? portfolio.getId() : "null") +
            '}';
    }
} 