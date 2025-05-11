import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaWallet, FaMoneyBillWave, FaQrcode, FaLock, FaBuilding, FaCoins, FaGift, FaHistory } from "react-icons/fa";
import { BsFillCreditCardFill, BsFillSendFill } from "react-icons/bs";
import { MdOutlineCategory, MdPayment } from "react-icons/md";
import { IoMdAddCircle, IoMdPeople } from "react-icons/io";

const Home = () => {
  const features = [
    { path: "/wallet", label: "Wallet", icon: <FaWallet /> },
    { path: "/transactions", label: "Transactions", icon: <FaHistory /> },
    { path: "/send", label: "Send Money", icon: <BsFillSendFill /> },
    { path: "/add", label: "Add Money", icon: <IoMdAddCircle /> },
    { path: "/bill-payments", label: "Bill Payments", icon: <MdPayment /> },
    { path: "/qr-payments", label: "QR Payments", icon: <FaQrcode /> },
    { path: "/categories", label: "Categories", icon: <MdOutlineCategory /> },
    { path: "/multi-currency", label: "Multi-Currency", icon: <FaCoins /> },
    { path: "/rewards", label: "Rewards", icon: <FaGift /> },
    { path: "/transaction-history", label: "Transaction History", icon: <FaHistory /> },
    { path: "/bill-splitter", label: "Bill Splitter", icon: <IoMdPeople /> },
    { path: "/payment-history", label: "Payment History", icon: <MdPayment /> },
    { path: "/save-cards", label: "Saved Cards", icon: <BsFillCreditCardFill /> },
    { path: "/security-settings", label: "Security", icon: <FaLock /> },
    { path: "/bank-link", label: "Bank Linking", icon: <FaBuilding /> },
    { path: "/crypto-wallet", label: "Crypto Wallet", icon: <FaMoneyBillWave /> },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-700 to-indigo-900 text-white p-8">
      {/* Title Section */}
      <motion.h1
        className="text-5xl font-extrabold mb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to Your Digital Wallet 🚀
      </motion.h1>

      <motion.p
        className="text-lg text-gray-200 mb-8 text-center max-w-2xl"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Manage your money with ease. Start by choosing an option below:
      </motion.p>

      {/* Feature Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {features.map((item, index) => (
          <Link key={index} to={item.path} className="w-full">
            <motion.div
              className="flex flex-col items-center justify-center p-6 bg-white text-blue-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center text-lg font-medium w-full h-28"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-3xl mb-2">{item.icon}</span>
              <span>{item.label}</span>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
