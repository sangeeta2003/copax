import React, { useState } from 'react';
import { useStocks } from '../context/StockContext';
import { Link } from 'react-router-dom';

function StockList() {
    const { stocks, loading, error, deleteStock } = useStocks();
    const [deleteError, setDeleteError] = useState(null);

    const handleDelete = async (id) => {
        try {
            await deleteStock(id);
            setDeleteError(null);
        } catch (err) {
            setDeleteError('Failed to delete stock');
            console.error('Error deleting stock:', err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const calculateTotalValue = () => {
        return stocks.reduce((total, stock) => total + (stock.currentPrice * stock.quantity), 0);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Your Stocks</h2>
                    <p className="text-gray-600">Total Portfolio Value: ${calculateTotalValue().toFixed(2)}</p>
                </div>
                <Link
                    to="/add-stock"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Add Stock
                </Link>
            </div>
            {deleteError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {deleteError}
                </div>
            )}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticker</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buy Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {stocks.map((stock) => (
                            <tr key={stock.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{stock.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{stock.ticker}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{stock.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap">${stock.buyPrice}</td>
                                <td className="px-6 py-4 whitespace-nowrap">${stock.currentPrice}</td>
                                <td className="px-6 py-4 whitespace-nowrap">${(stock.currentPrice * stock.quantity).toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => handleDelete(stock.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StockList; 