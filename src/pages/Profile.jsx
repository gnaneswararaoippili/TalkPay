import React, { useState } from "react";
import { FiEdit, FiCamera } from "react-icons/fi";
import { motion } from "framer-motion";

const Profile = () => {
  const [name, setName] = useState("Your Name");
  const [phone, setPhone] = useState("1234567890");
  const [email, setEmail] = useState("youremail@example.com");
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
        Profile
      </h2>

      {/* Profile Picture Upload */}
      <div className="relative w-24 h-24 mx-auto mb-4">
        <img
          src={profileImage || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-24 h-24 object-cover rounded-full border-4 border-blue-600"
        />
        <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer">
          <FiCamera className="text-xl" />
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </label>
      </div>

      <FiEdit
        className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 cursor-pointer text-xl"
        onClick={() => setIsEditing(true)}
      />

      {/* Name Field */}
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300">Name:</label>
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
        ) : (
          <p className="text-gray-800 dark:text-white">{name}</p>
        )}
      </div>

      {/* Phone Field */}
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300">Phone:</label>
        {isEditing ? (
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
        ) : (
          <p className="text-gray-800 dark:text-white">{phone}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300">Email:</label>
        {isEditing ? (
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
        ) : (
          <p className="text-gray-800 dark:text-white">{email}</p>
        )}
      </div>

      {/* Save Button */}
      {isEditing && (
        <motion.button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full mt-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Save
        </motion.button>
      )}
    </motion.div>
  );
};

export default Profile;
