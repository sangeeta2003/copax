import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Navbar() {
  return (
    <nav className="bg-primary shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="text-white font-bold text-xl"
          >
            Portfolio Tracker
          </motion.div>
          <div className="flex space-x-4">
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/stocks">Stocks</NavLink>
            <NavLink to="/add-stock">Add Stock</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.div>
    </Link>
  );
}

export default Navbar; 