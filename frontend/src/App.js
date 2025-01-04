import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import StockList from './components/StockList';
import AddEditStock from './components/AddEditStock';
import { StockProvider } from './context/StockContext';

function App() {
  return (
    <StockProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-8"
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/stocks" element={<StockList />} />
              <Route path="/add-stock" element={<AddEditStock />} />
              <Route path="/edit-stock/:id" element={<AddEditStock />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </motion.div>
        </div>
      </Router>
    </StockProvider>
  );
}

export default App; 