import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: false // Important for CORS
});

const api = {
    getAllStocks: () => axiosInstance.get('/stocks'),
    getStock: (id) => axiosInstance.get(`/stocks/${id}`),
    createStock: async (stock) => {
        try {
            const stockData = {
                ...stock,
                quantity: parseInt(stock.quantity),
                buyPrice: parseFloat(stock.buyPrice),
                purchaseDate: new Date().toISOString()
            };
            
            let portfolioId;
            try {
                const portfoliosResponse = await axiosInstance.get('/portfolios');
                if (portfoliosResponse.data && portfoliosResponse.data.length > 0) {
                    portfolioId = portfoliosResponse.data[0].id;
                } else {
                    const newPortfolio = await axiosInstance.post('/portfolios', { name: "Default Portfolio" });
                    portfolioId = newPortfolio.data.id;
                }
            } catch (error) {
                console.error('Error getting/creating portfolio:', error);
                portfolioId = 1;
            }
            
            console.log('Using portfolio ID:', portfolioId);
            console.log('Sending stock data:', stockData);
            
            const response = await axiosInstance.post(`/stocks?portfolioId=${portfolioId}`, stockData);
            console.log('Response:', response.data);
            return response;
        } catch (error) {
            console.error('Error details:', error.response?.data);
            throw error;
        }
    },
    updateStock: (id, stock) => axiosInstance.put(`/stocks/${id}`, stock),
    deleteStock: (id) => axiosInstance.delete(`/stocks/${id}`),
    getPortfolioValue: () => axiosInstance.get('/stocks/portfolio-value'),
};

export default api; 