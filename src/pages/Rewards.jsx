import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Rewards = () => {
  const [rewardPoints, setRewardPoints] = useState(500); // Example reward points
  const [message, setMessage] = useState('');

  const handleRedeemRewards = (pointsToRedeem) => {
    if (rewardPoints >= pointsToRedeem) {
      setRewardPoints(rewardPoints - pointsToRedeem);
      setMessage(`🎉 Successfully redeemed ${pointsToRedeem} points!`);
    } else {
      setMessage(`❌ Not enough points to redeem ${pointsToRedeem}.`);
    }

    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <motion.div
      className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎁 Rewards Program</h2>

      <motion.p
        className="text-lg font-medium text-gray-700 mb-6"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Your current reward points: <span className="text-blue-600 font-bold">{rewardPoints}</span>
      </motion.p>

      {/* Redemption Options */}
      <div className="grid grid-cols-2 gap-4">
        {[100, 200, 500].map((points) => (
          <motion.button
            key={points}
            onClick={() => handleRedeemRewards(points)}
            className={`px-4 py-2 rounded-md font-medium ${
              rewardPoints >= points ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
            disabled={rewardPoints < points}
            whileHover={{ scale: rewardPoints >= points ? 1.05 : 1 }}
            whileTap={{ scale: 0.95 }}
          >
            Redeem {points} Points
          </motion.button>
        ))}
      </div>

      {/* Success/Error Message */}
      {message && (
        <motion.p
          className="mt-4 text-lg font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {message}
        </motion.p>
      )}
    </motion.div>
  );
};

export default Rewards;
