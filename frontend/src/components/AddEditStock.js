import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStocks } from '../context/StockContext';
import { getStockLogo } from '../utils/stockLogos';

function AddEditStock() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addStock, updateStock, stocks } = useStocks();
    const [formData, setFormData] = useState({
        name: '',
        ticker: '',
        quantity: '',
        buyPrice: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            const stock = stocks.find(s => s.id === parseInt(id));
            if (stock) {
                setFormData({
                    name: stock.name,
                    ticker: stock.ticker,
                    quantity: stock.quantity,
                    buyPrice: stock.buyPrice
                });
            }
        }
    }, [id, stocks]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const stockData = {
                ...formData,
                quantity: parseInt(formData.quantity),
                buyPrice: parseFloat(formData.buyPrice)
            };

            if (id) {
                await updateStock(parseInt(id), stockData);
            } else {
                await addStock(stockData);
            }
            navigate('/stocks');
        } catch (err) {
            setError('Failed to save stock');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-8"
            >
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    {id ? 'Edit Stock' : 'Add New Stock'}
                </h2>

                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-red-50 text-red-600 p-4 rounded-lg mb-6"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                required
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ticker Symbol
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="ticker"
                                    value={formData.ticker}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    required
                                />
                                {formData.ticker && (
                                    <img
                                        src={getStockLogo(formData.ticker)}
                                        alt={formData.ticker}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 object-contain"
                                    />
                                )}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Quantity
                            </label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                required
                                min="1"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Buy Price
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                    $
                                </span>
                                <input
                                    type="number"
                                    name="buyPrice"
                                    value={formData.buyPrice}
                                    onChange={handleChange}
                                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    required
                                    min="0.01"
                                    step="0.01"
                                />
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-end space-x-4"
                    >
                        <button
                            type="button"
                            onClick={() => navigate('/stocks')}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center ${
                                loading ? 'opacity-75 cursor-not-allowed' : ''
                            }`}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                'Save Stock'
                            )}
                        </button>
                    </motion.div>
                </form>
            </motion.div>
        </div>
    );
}

export default AddEditStock; 