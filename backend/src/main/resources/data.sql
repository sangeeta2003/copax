-- Create sample users
INSERT INTO users (username, email, password) VALUES
('john_doe', 'john@example.com', 'password123'),
('jane_smith', 'jane@example.com', 'password456');

-- Create portfolios for users
INSERT INTO portfolios (name, user_id) VALUES
('Tech Portfolio', 1),
('Dividend Stocks', 1),
('Growth Stocks', 2);

-- Add sample stocks
INSERT INTO stocks (name, ticker, quantity, buy_price, purchase_date, portfolio_id) VALUES
('Apple Inc.', 'AAPL', 10, 150.00, NOW(), 1),
('Microsoft', 'MSFT', 5, 280.00, NOW(), 1),
('Johnson & Johnson', 'JNJ', 8, 160.00, NOW(), 2),
('Tesla', 'TSLA', 3, 200.00, NOW(), 3); 