import React, { useState } from "react";
import { motion } from "framer-motion";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, type: "Deposit", amount: 200, date: "2024-02-01", status: "Completed" },
    { id: 2, type: "Withdrawal", amount: 150, date: "2024-02-03", status: "Pending" },
    { id: 3, type: "Transfer", amount: 300, date: "2024-02-05", status: "Completed" },
    { id: 4, type: "Payment", amount: 50, date: "2024-02-07", status: "Failed" },
  ]);

  const [filter, setFilter] = useState("All");

  const filteredTransactions =
    filter === "All" ? transactions : transactions.filter((t) => t.status === filter);

  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">📜 Transaction History</h2>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        {["All", "Completed", "Pending", "Failed"].map((status) => (
          <motion.button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-md font-medium ${
              filter === status ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {status}
          </motion.button>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Amount ($)</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((t, index) => (
                <motion.tr
                  key={t.id}
                  className="border-b hover:bg-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <td className="py-3 px-4">{t.type}</td>
                  <td className="py-3 px-4 font-medium">${t.amount}</td>
                  <td className="py-3 px-4">{t.date}</td>
                  <td
                    className={`py-3 px-4 font-semibold ${
                      t.status === "Completed"
                        ? "text-green-600"
                        : t.status === "Pending"
                        ? "text-yellow-500"
                        : "text-red-600"
                    }`}
                  >
                    {t.status}
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default TransactionHistory;
