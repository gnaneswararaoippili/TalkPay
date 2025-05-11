import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPlusCircle } from "react-icons/fi";
import { MdCheckCircle } from "react-icons/md";
import { AiOutlineQrcode } from "react-icons/ai";

const AddMoney = ({ onAddMoney }) => {
  const [amount, setAmount] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid amount to add.");
      return;
    }

    onAddMoney(parsedAmount);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      navigate("/");
    }, 2000);
  };

  const handleQRCodeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Simulating QR Code Scanning (Extendable to Live QR Scanner)
      setTimeout(() => {
        setQrCodeData("upi://pay?pa=sample@upi&pn=SampleUser&mc=1234");
        setAmount("500"); // Example auto-fill amount from QR
        alert("UPI QR Code scanned successfully! Amount auto-filled.");
      }, 1000);
    }
  };

  return (
    <div className="container mx-auto my-12 px-4">
      <motion.div
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-md mx-auto"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <FiPlusCircle className="text-green-600" /> Add Money
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount (₹)"
            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
            required
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          
          <div className="relative">
            <motion.input
              type="text"
              value={qrCodeData || ""}
              placeholder="UPI Payment Link (optional)"
              className="w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white"
              disabled
            />
            <label htmlFor="qrCodeUpload" className="absolute right-3 top-3 text-gray-500 cursor-pointer">
              <AiOutlineQrcode className="text-2xl hover:text-green-600" />
            </label>
            <input type="file" id="qrCodeUpload" className="hidden" accept="image/*" onChange={handleQRCodeUpload} />
          </div>

          <motion.button
            type="submit"
            className="bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition w-full flex items-center justify-center gap-2"
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            <FiPlusCircle />
            Add Money
          </motion.button>
        </form>
      </motion.div>

      {/* Success Modal */}
      {showSuccess && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <MdCheckCircle className="text-green-500 text-5xl mb-3" />
            <p className="text-lg font-semibold dark:text-white">
              ₹{amount} added successfully!
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AddMoney;
