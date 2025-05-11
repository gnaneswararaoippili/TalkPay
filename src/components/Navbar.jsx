import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mic } from "lucide-react"; // ✅ Import Mic icon

const Navbar = ({ onLogout }) => {
  return (
    <motion.nav
      className="bg-gradient-to-r from-blue-700 to-indigo-800 p-4 flex justify-between items-center shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo / Title */}
      <motion.h2
        className="text-white text-2xl font-extrabold tracking-wide cursor-pointer"
        whileHover={{ scale: 1.1 }}
      >
        
      </motion.h2>

      {/* Unique TalkPay Feature */}
      <Link
        to="/talkpay"
        className="flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-lg shadow-md hover:bg-blue-50 transition transform hover:scale-105"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Mic className="w-6 h-6 text-blue-700" />
        </motion.div>
        <span className="font-bold hidden sm:inline">TalkPay</span>
      </Link>

      {/* Logout Button */}
      <motion.button
        onClick={onLogout}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 hover:scale-105 transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Logout
      </motion.button>
    </motion.nav>
  );
};

export default Navbar;
