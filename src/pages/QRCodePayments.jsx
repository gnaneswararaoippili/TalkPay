import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdCheckCircle } from "react-icons/md";

const QRCodePayments = () => {
  const [qrCodeData, setQrCodeData] = useState("");
  const [scanned, setScanned] = useState(false);

  const handleQRCodePayment = () => {
    if (qrCodeData.trim()) {
      alert(`✅ Payment successful for QR code: ${qrCodeData}`);
      setQrCodeData("");
      setScanned(false);
    } else {
      alert("⚠️ Please scan a valid QR code!");
    }
  };

  const handleScan = (e) => {
    setQrCodeData(e.target.value);
    setScanned(true);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">QR Code Payments</h2>
      
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <label className="block text-gray-600 mb-1">Scan QR Code</label>
        <input
          type="text"
          value={qrCodeData}
          onChange={handleScan}
          className="border rounded-md p-3 w-full text-gray-800"
          placeholder="Enter scanned QR code data"
        />
      </motion.div>

      {scanned && qrCodeData && (
        <motion.div
          className="p-3 bg-green-100 text-green-800 rounded-md flex items-center mt-2"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <MdCheckCircle className="text-green-600 mr-2 text-xl" />
          <span className="font-medium">{qrCodeData}</span>
        </motion.div>
      )}

      <motion.button
        onClick={handleQRCodePayment}
        className="bg-blue-600 text-white px-4 py-3 rounded-md mt-4 w-full hover:bg-blue-700 transition-all"
        whileTap={{ scale: 0.95 }}
      >
        Make Payment
      </motion.button>
    </div>
  );
};

export default QRCodePayments;
