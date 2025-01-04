import React from 'react';
import { useStocks } from '../context/StockContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const Dashboard = () => {
    const { stocks, portfolioValue } = useStocks();

    const pieData = stocks.map(stock => ({
        name: stock.name,
        value: stock.quantity * stock.buyPrice
    }));

    return (
        <div className="p-8 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Portfolio Dashboard</h2>
            
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold mb-2 text-white opacity-90">Total Value</h3>
                    <p className="text-3xl font-bold text-white">
                        ${portfolioValue?.toFixed(2) || '0.00'}
                    </p>
                </div>
                <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold mb-2 text-white opacity-90">Total Stocks</h3>
                    <p className="text-3xl font-bold text-white">{stocks.length}</p>
                </div>
            </div>

            {/* Chart Section */}
            <div className="mt-8 bg-gray-50 rounded-xl p-6 shadow-inner">
                <h3 className="text-xl font-semibold mb-6 text-gray-700 text-center">
                    Portfolio Distribution
                </h3>
                <div className="h-[400px] w-full max-w-2xl mx-auto">
                    {stocks.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={true}
                                    outerRadius={150}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    formatter={(value) => [`$${value.toFixed(2)}`, 'Value']}
                                    contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        borderRadius: '8px',
                                        border: 'none',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                    }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500 text-lg">No stocks to display</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 