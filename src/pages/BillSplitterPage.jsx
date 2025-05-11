import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const BillSplitterPage = () => {
  const [billAmount, setBillAmount] = useState('');
  const [numPeople, setNumPeople] = useState('');
  const [splitAmount, setSplitAmount] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSplitBill = () => {
    if (!billAmount || !numPeople) {
      setError("Both fields are required.");
      setSplitAmount(null);
      return;
    }
    if (billAmount <= 0 || numPeople <= 0) {
      setError("Bill amount and number of people must be greater than zero.");
      setSplitAmount(null);
      return;
    }

    setError('');
    const amountPerPerson = (parseFloat(billAmount) / parseInt(numPeople)).toFixed(2);
    setSplitAmount(amountPerPerson);
  };

  const handleNavigate = () => {
    navigate('/bill-split-results', { state: { billAmount, numPeople, splitAmount } });
  };

  return (
    <motion.div 
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg"
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Bill Splitter</h1>

      <div className="mb-4">
        <label className="block text-lg font-medium">Bill Amount</label>
        <input
          type="number"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
          placeholder="Enter total bill"
          className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium">Number of People</label>
        <input
          type="number"
          value={numPeople}
          onChange={(e) => setNumPeople(e.target.value)}
          placeholder="Enter number of people"
          className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-blue-500"
        />
      </div>

      {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

      <motion.button
        onClick={handleSplitBill}
        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Calculate Split
      </motion.button>

      {splitAmount !== null && (
        <motion.div 
          className="mt-6 p-4 bg-gray-100 rounded-lg text-center"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg text-gray-700">Each person pays:</p>
          <p className="text-2xl font-bold text-blue-600">${splitAmount}</p>

          <motion.button
            onClick={handleNavigate}
            className="mt-4 w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Proceed to Payment
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BillSplitterPage;
