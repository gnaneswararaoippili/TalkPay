import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const exchangeRates = {
  USD: { EUR: 0.85, INR: 74.5, GBP: 0.73 },
  EUR: { USD: 1.18, INR: 87.9, GBP: 0.86 },
  INR: { USD: 0.013, EUR: 0.011, GBP: 0.0098 },
  GBP: { USD: 1.37, EUR: 1.16, INR: 101.2 },
};

const MultiCurrency = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('INR');
  const [currencyAmount, setCurrencyAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState('');

  const handleCurrencyConversion = () => {
    if (!currencyAmount || isNaN(currencyAmount) || currencyAmount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    setError('');
    
    const rate = exchangeRates[selectedCurrency]?.[targetCurrency] || 1;
    setConvertedAmount((currencyAmount * rate).toFixed(2));
  };

  return (
    <motion.div
      className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Multi-Currency Converter
      </h2>

      {/* Currency Selection */}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium">From Currency</label>
        <select
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
          className="border rounded p-2 w-full mt-1"
        >
          {Object.keys(exchangeRates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 font-medium">To Currency</label>
        <select
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
          className="border rounded p-2 w-full mt-1"
        >
          {Object.keys(exchangeRates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      {/* Amount Input */}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium">Amount</label>
        <input
          type="number"
          value={currencyAmount}
          onChange={(e) => setCurrencyAmount(e.target.value)}
          className="border rounded p-2 w-full mt-1"
          placeholder="Enter amount"
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-3">{error}</p>}

      {/* Convert Button */}
      <motion.button
        onClick={handleCurrencyConversion}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Convert Currency
      </motion.button>

      {/* Converted Amount Display */}
      {convertedAmount !== null && (
        <motion.div
          className="mt-5 p-4 bg-green-100 text-green-700 rounded-md text-center font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Converted Amount: {convertedAmount} {targetCurrency}
        </motion.div>
      )}
    </motion.div>
  );
};

export default MultiCurrency;
