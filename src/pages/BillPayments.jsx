import React, { useState } from "react";
import { motion } from "framer-motion";

const BillPayments = () => {
  const [billAmount, setBillAmount] = useState("");
  const [billType, setBillType] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBillPayment = () => {
    if (!billAmount || !billType) {
      alert("Please select a bill type and enter an amount.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      alert(`✅ Successfully paid ₹${billAmount} for ${billType}!`);
      setBillAmount("");
      setBillType("");
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <motion.div
      className="p-6 bg-white shadow-lg rounded-md max-w-md mx-auto mt-10"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
        Bill Payments
      </h2>

      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Bill Type</label>
        <select
          value={billType}
          onChange={(e) => setBillType(e.target.value)}
          className="border rounded p-2 w-full bg-white"
        >
          <option value="">Select Bill Type</option>
          <option value="Electricity">Electricity</option>
          <option value="Water">Water</option>
          <option value="Internet">Internet</option>
          <option value="Gas">Gas</option>
          <option value="Phone">Phone</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Amount (₹)</label>
        <input
          type="number"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
          className="border rounded p-2 w-full"
          placeholder="Enter bill amount"
        />
      </div>

      <motion.button
        onClick={handleBillPayment}
        className={`w-full text-white py-3 rounded-md transition ${
          isProcessing ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
        whileTap={{ scale: 0.95 }}
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Pay Bill"}
      </motion.button>
    </motion.div>
  );
};

export default BillPayments;
