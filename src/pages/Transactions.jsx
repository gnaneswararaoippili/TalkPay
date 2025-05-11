import React, { useState } from "react";
import { motion } from "framer-motion";

const Transactions = ({ transactions }) => {
  const [filterType, setFilterType] = useState("All");
  const [filterDate, setFilterDate] = useState("");

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesType = filterType === "All" || transaction.type.includes(filterType);
    const matchesDate = !filterDate || transaction.timestamp.startsWith(filterDate);
    return matchesType && matchesDate;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Transactions</h2>
      
      <div className="flex space-x-4 mb-4">
        <select
          className="p-2 border rounded transition-all duration-300 ease-in-out hover:shadow-md"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Sent">Sent</option>
          <option value="Received">Received</option>
        </select>
        <input
          type="date"
          className="p-2 border rounded transition-all duration-300 ease-in-out hover:shadow-md"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <ul className="space-y-4">
          {filteredTransactions.length === 0 ? (
            <p className="text-gray-500">No transactions found</p>
          ) : (
            filteredTransactions.map((transaction, index) => (
              <motion.li 
                key={index} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex justify-between items-center border-b pb-2 hover:bg-gray-100 p-2 rounded-md transition-all"
              >
                <div>
                  <p className="font-semibold text-gray-700">
                    {transaction.type} ₹{transaction.amount}
                  </p>
                  <p className="text-sm text-gray-500">{transaction.timestamp}</p>
                </div>
                <div>
                  {transaction.type.startsWith("Sent") && (
                    <p className="text-red-600">To: {transaction.to}</p>
                  )}
                  {transaction.type.startsWith("Received") && (
                    <p className="text-green-600">
                      From: {transaction.from ? transaction.from : "Added to Wallet"}
                    </p>
                  )}
                </div>
              </motion.li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Transactions;
