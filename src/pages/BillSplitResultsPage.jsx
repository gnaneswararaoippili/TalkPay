import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BillSplitResultsPage = () => {
  const { state } = useLocation();
  const { billAmount, numPeople } = state || {};

  if (!billAmount || !numPeople) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-semibold text-red-500">Invalid Data</h1>
        <p className="text-gray-600 mt-2">Please enter bill details again.</p>
        <Link to="/bill-splitter">
          <button className="w-full py-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600 transition">
            Go Back
          </button>
        </Link>
      </div>
    );
  }

  const amountPerPerson = (billAmount / numPeople).toFixed(2);
  const formattedBill = parseFloat(billAmount).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  const formattedAmountPerPerson = parseFloat(amountPerPerson).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  const handleShare = () => {
    const message = `💰 *Bill Split Results* 💰\n\nTotal Bill: ${formattedBill}\nPeople: ${numPeople}\nEach Person Pays: ${formattedAmountPerPerson}`;
    navigator.share ? navigator.share({ text: message }) : alert("Sharing not supported on this device.");
  };

  return (
    <motion.div 
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg text-center"
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Bill Split Results</h1>

      <div className="mb-4">
        <p className="text-lg font-medium">Total Bill:</p>
        <motion.p 
          className="text-3xl text-blue-600 font-bold"
          initial={{ scale: 0.8 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 0.3 }}
        >
          {formattedBill}
        </motion.p>
      </div>

      <div className="mb-4">
        <p className="text-lg font-medium">Number of People:</p>
        <p className="text-2xl text-blue-600">{numPeople}</p>
      </div>

      <div className="mb-6">
        <p className="text-lg font-medium">Amount per Person:</p>
        <motion.p 
          className="text-3xl text-green-600 font-bold"
          initial={{ scale: 0.8 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 0.3 }}
        >
          {formattedAmountPerPerson}
        </motion.p>
      </div>

      <motion.button
        onClick={handleShare}
        className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition shadow-md mb-3"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        📤 Share Results
      </motion.button>

      <Link to="/bill-splitter">
        <motion.button
          className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Split Another Bill
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default BillSplitResultsPage;
