import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BankLinkingPage = () => {
  const [bankDetails, setBankDetails] = useState([]);
  const [accountNumber, setAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [error, setError] = useState('');

  const handleLinkBank = (e) => {
    e.preventDefault();

    if (!accountNumber || !routingNumber || !bankName) {
      setError('⚠️ Please fill all fields!');
      return;
    }
    if (accountNumber.length < 10 || routingNumber.length < 9) {
      setError('⚠️ Invalid account or routing number!');
      return;
    }

    const newBankDetails = {
      bankName,
      accountNumber: accountNumber.slice(-4), // Mask all but last 4 digits
      routingNumber: routingNumber.replace(/\d(?=\d{4})/g, '*'), // Mask routing number
    };

    setBankDetails([...bankDetails, newBankDetails]);
    toast.success('✅ Bank account linked successfully!');

    // Reset form fields
    setAccountNumber('');
    setRoutingNumber('');
    setBankName('');
    setError('');
  };

  const handleDeleteBank = (index) => {
    const updatedBankDetails = bankDetails.filter((_, bankIndex) => bankIndex !== index);
    setBankDetails(updatedBankDetails);
    toast.info('ℹ️ Bank account removed.');
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">🔗 Link Your Bank</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleLinkBank}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">🏦 Bank Name</label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2 focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">💳 Account Number</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
            maxLength="16"
            className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2 focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">📞 Routing Number</label>
          <input
            type="text"
            value={routingNumber}
            onChange={(e) => setRoutingNumber(e.target.value)}
            required
            maxLength="9"
            className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2 focus:ring focus:ring-blue-200"
          />
        </div>

        <motion.button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-md mt-6 hover:bg-blue-600 transition shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ✅ Link Bank Account
        </motion.button>
      </form>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800">🔗 Linked Bank Accounts</h2>
      {bankDetails.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No bank accounts linked yet.</p>
      ) : (
        <motion.div>
          <ul>
            {bankDetails.map((bank, index) => (
              <motion.li
                key={index}
                className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm flex justify-between items-center border-l-4 border-blue-500"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div>
                  <h3 className="text-lg font-semibold">{bank.bankName}</h3>
                  <p className="text-sm text-gray-500">🔒 Account: ****{bank.accountNumber}</p>
                  <p className="text-sm text-gray-500">🔒 Routing: {bank.routingNumber}</p>
                </div>
                <motion.button
                  onClick={() => handleDeleteBank(index)}
                  className="text-red-500 hover:text-red-600 transition"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ❌ Delete
                </motion.button>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BankLinkingPage;
