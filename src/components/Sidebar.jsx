import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaWallet,
  FaUser,
  FaExchangeAlt,
  FaPaperPlane,
  FaPlus,
  FaReceipt,
  FaQrcode,
  FaTags,
  FaGlobe,
  FaTrophy,
  FaHome,
  FaBars, // Only keeping the hamburger menu
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-b from-blue-700 to-indigo-800 ${
        isOpen ? "w-64" : "w-20"
      } p-6 min-h-screen shadow-xl flex flex-col relative transition-all duration-300`}
    >
      {/* Toggle Button - Only Hamburger Menu (No Close Button) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-5 right-[-15px] bg-white text-blue-700 p-2 rounded-full shadow-md focus:outline-none transition-transform"
      >
        <FaBars />
      </button>

      {/* Logo & Branding */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-white text-2xl font-bold mb-8 flex items-center justify-center"
      >
        🎙️ {isOpen && "TalkPay Wallet"}
      </motion.h2>

      {/* Menu Items */}
      <ul className="space-y-4">
        <SidebarItem to="/home" icon={<FaHome />} label="Home" isOpen={isOpen} />
        <SidebarItem to="/wallet" icon={<FaWallet />} label="Wallet" isOpen={isOpen} />
        <SidebarItem to="/profile" icon={<FaUser />} label="Profile" isOpen={isOpen} />
        <SidebarItem to="/transactions" icon={<FaExchangeAlt />} label="Transactions" isOpen={isOpen} />
        <SidebarItem to="/send" icon={<FaPaperPlane />} label="Send Money" isOpen={isOpen} />
        <SidebarItem to="/add" icon={<FaPlus />} label="Add Money" isOpen={isOpen} />
        <SidebarItem to="/bill-payments" icon={<FaReceipt />} label="Bill Payments" isOpen={isOpen} />
        <SidebarItem to="/qr-payments" icon={<FaQrcode />} label="QR Code Payments" isOpen={isOpen} />
        <SidebarItem to="/categories" icon={<FaTags />} label="Transaction Categories" isOpen={isOpen} />
        <SidebarItem to="/multi-currency" icon={<FaGlobe />} label="Multi-Currency" isOpen={isOpen} />
        <SidebarItem to="/rewards" icon={<FaTrophy />} label="Rewards" isOpen={isOpen} />
      </ul>
    </motion.div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ to, icon, label, isOpen }) => (
  <motion.li
    whileHover={{ scale: 1.05 }}
    className="text-white hover:bg-blue-500 px-4 py-2 rounded-md transition duration-200 flex items-center"
  >
    <Link to={to} className="flex items-center gap-3 w-full">
      {icon}
      {isOpen && <span>{label}</span>}
    </Link>
  </motion.li>
);

export default Sidebar;
