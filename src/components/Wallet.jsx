import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Wallet = ({ onLogout, user, balance, transactions }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Wallet Balance */}
      <motion.div 
        className="container mx-auto mt-8 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Wallet Balance</h3>
          <p className="text-3xl font-bold text-blue-600">₹ {balance}</p>
        </div>
      </motion.div>

      {/* Add space between Wallet Balance and Buttons */}
      <div className="mt-4"></div>  

      {/* Action Buttons */}
      <motion.div 
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex justify-center gap-4">
          <motion.button
            onClick={() => navigate("/send")}
            className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Send Money
          </motion.button>
          <motion.button
            onClick={() => navigate("/add")}
            className="bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Add Money
          </motion.button>
        </div>
      </motion.div>

      {/* Transactions History */}
      <motion.div 
        className="container mx-auto px-4 my-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Transactions</h3>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ul className="space-y-4">
            {transactions.length === 0 ? (
              <p className="text-gray-500">No transactions yet</p>
            ) : (
              transactions.map((transaction, index) => (
                <motion.li 
                  key={index} 
                  className="flex justify-between items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div>
                    <p className="font-semibold text-gray-700">
                      {transaction.type} ₹{transaction.amount}
                    </p>
                    <p className="text-sm text-gray-500">{transaction.timestamp}</p>
                  </div>
                  <div>
                    {transaction.type.startsWith("Sent") && (
                      <p className="text-red-600">To: {transaction.recipient}</p>
                    )}
                    {transaction.type.startsWith("Received") && (
                      <p className="text-green-600">From: {transaction.sender}</p>
                    )}
                  </div>
                </motion.li>
              ))
            )}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Wallet;
