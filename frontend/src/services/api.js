import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';

const api = {
  getAllStocks: () => axios.get(`${API_BASE_URL}/stocks`),
  getStock: (id) => axios.get(`${API_BASE_URL}/stocks/${id}`),
  createStock: async (stock) => {
    try {
      console.log('Sending stock data:', {
        ...stock,
        quantity: parseInt(stock.quantity),
        buyPrice: parseFloat(stock.buyPrice)
      });
      
      const response = await axios.post(`${API_BASE_URL}/stocks?portfolioId=1`, {
        ...stock,
        quantity: parseInt(stock.quantity),
        buyPrice: parseFloat(stock.buyPrice)
      });
      
      console.log('Response:', response.data);
      return response;
    } catch (error) {
      console.error('Error details:', error.response?.data);
      throw error;
    }
  },
  updateStock: (id, stock) => axios.put(`${API_BASE_URL}/stocks/${id}`, stock),
  deleteStock: (id) => axios.delete(`${API_BASE_URL}/stocks/${id}`),
  getPortfolioValue: () => axios.get(`${API_BASE_URL}/stocks/portfolio-value`),
};

export default api; 