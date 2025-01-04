package com.portfolio.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "portfolios")
public class Portfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"portfolios", "hibernateLazyInitializer"})
    private User user;

    @OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"portfolio", "hibernateLazyInitializer"})
    private List<Stock> stocks = new ArrayList<>();

    @Override
    public String toString() {
        return "Portfolio{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", userId=" + (user != null ? user.getId() : "null") +
            '}';
    }
} 