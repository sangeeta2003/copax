package com.portfolio.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import javax.sql.DataSource;
import java.sql.Connection;

@Component
public class DatabaseConnectionTest implements CommandLineRunner {

    @Autowired
    private DataSource dataSource;

    @Override
    public void run(String... args) throws Exception {
        try (Connection connection = dataSource.getConnection()) {
            System.out.println("Database connection successful!");
            System.out.println("Database: " + connection.getCatalog());
        } catch (Exception e) {
            System.err.println("Database connection failed!");
            e.printStackTrace();
        }
    }
} 