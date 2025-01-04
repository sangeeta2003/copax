import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const StockContext = createContext();

export const StockProvider = ({ children }) => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [portfolioValue, setPortfolioValue] = useState(0);

    // Fetch stocks and calculate portfolio value
    const fetchStocks = async () => {
        try {
            setLoading(true);
            const response = await api.getAllStocks();
            setStocks(response.data);
            
            // Calculate total portfolio value
            const total = response.data.reduce((sum, stock) => 
                sum + (stock.quantity * stock.buyPrice), 0
            );
            setPortfolioValue(total);
            
            setError(null);
        } catch (err) {
            setError('Error fetching stocks');
            console.error('Error fetching stocks:', err);
        } finally {
            setLoading(false);
        }
    };

    // Add stock and update portfolio value
    const addStock = async (stockData) => {
        try {
            const response = await api.createStock(stockData);
            setStocks(prevStocks => [...prevStocks, response.data]);
            
            // Update portfolio value
            setPortfolioValue(prev => prev + (response.data.quantity * response.data.buyPrice));
            
            return response.data;
        } catch (err) {
            console.error('Error adding stock:', err);
            throw err;
        }
    };

    // Delete stock and update portfolio value
    const deleteStock = async (id) => {
        try {
            const stockToDelete = stocks.find(stock => stock.id === id);
            await api.deleteStock(id);
            setStocks(prevStocks => prevStocks.filter(stock => stock.id !== id));
            
            // Update portfolio value
            if (stockToDelete) {
                setPortfolioValue(prev => prev - (stockToDelete.quantity * stockToDelete.buyPrice));
            }
        } catch (err) {
            console.error('Error deleting stock:', err);
            throw err;
        }
    };

    // Update stock and portfolio value
    const updateStock = async (id, stockData) => {
        try {
            const oldStock = stocks.find(stock => stock.id === id);
            const response = await api.updateStock(id, stockData);
            
            setStocks(prevStocks =>
                prevStocks.map(stock =>
                    stock.id === id ? response.data : stock
                )
            );

            // Update portfolio value
            if (oldStock) {
                const oldValue = oldStock.quantity * oldStock.buyPrice;
                const newValue = response.data.quantity * response.data.buyPrice;
                setPortfolioValue(prev => prev - oldValue + newValue);
            }
            
            return response.data;
        } catch (err) {
            console.error('Error updating stock:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchStocks();
    }, []);

    return (
        <StockContext.Provider value={{
            stocks,
            loading,
            error,
            portfolioValue,
            addStock,
            deleteStock,
            updateStock,
            fetchStocks
        }}>
            {children}
        </StockContext.Provider>
    );
};

export const useStocks = () => {
    const context = useContext(StockContext);
    if (!context) {
        throw new Error('useStocks must be used within a StockProvider');
    }
    return context;
}; 