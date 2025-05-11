import React from 'react';
import { motion } from 'framer-motion';
import { FaUtensils, FaBolt, FaShoppingBag, FaFilm, FaExchangeAlt } from 'react-icons/fa';

const categories = [
  { name: 'Food', icon: <FaUtensils className="text-red-500" /> },
  { name: 'Bills', icon: <FaBolt className="text-yellow-500" /> },
  { name: 'Shopping', icon: <FaShoppingBag className="text-blue-500" /> },
  { name: 'Entertainment', icon: <FaFilm className="text-purple-500" /> },
  { name: 'Transfer', icon: <FaExchangeAlt className="text-green-500" /> },
];

const TransactionCategories = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Transaction Categories</h2>
      
      <ul className="space-y-3">
        {categories.map((category, index) => (
          <motion.li
            key={index}
            className="flex items-center gap-3 p-3 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.icon}
            <span className="text-gray-700 font-medium">{category.name}</span>
          </motion.li>
        ))}
      </ul>

      <p className="mt-6 text-center text-gray-600">Select a category to view transactions.</p>
    </div>
  );
};

export default TransactionCategories;
