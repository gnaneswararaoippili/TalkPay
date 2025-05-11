import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom"; // Use Link instead of <a>
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

const Signup = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onLogin();
      navigate("/home");
    } catch (err) {
      handleFirebaseError(err.code);
      console.error("Signup error:", err);
    }
  };

  const handleFirebaseError = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        setError("This email is already in use. Try logging in.");
        break;
      case "auth/weak-password":
        setError("Password should be at least 6 characters.");
        break;
      case "auth/invalid-email":
        setError("Please enter a valid email address.");
        break;
      default:
        setError("Signup failed. Please try again.");
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-md"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="space-y-4">
            {/* Email Input */}
            <motion.div
              className="flex items-center border border-gray-300 rounded-md p-3"
              whileHover={{ scale: 1.05 }}
            >
              <FaEnvelope className="text-gray-500 mr-3" />
              <input
                type="email"
                id="email"
                aria-label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </motion.div>

            {/* Password Input */}
            <motion.div
              className="flex items-center border border-gray-300 rounded-md p-3"
              whileHover={{ scale: 1.05 }}
            >
              <FaLock className="text-gray-500 mr-3" />
              <input
                type="password"
                id="password"
                aria-label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </motion.div>

            {/* Confirm Password Input */}
            <motion.div
              className="flex items-center border border-gray-300 rounded-md p-3"
              whileHover={{ scale: 1.05 }}
            >
              <FaLock className="text-gray-500 mr-3" />
              <input
                type="password"
                id="confirmPassword"
                aria-label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </motion.div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Sign Up Button */}
            <motion.button
              type="submit"
              className="w-full py-3 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </div>
        </form>

        {/* Login Redirect */}
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
