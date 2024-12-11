import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaUserAlt, FaLock, FaBuilding } from "react-icons/fa";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = login(username, password);
      if (success) {
        navigate("/");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-center bg-cover flex items-center justify-center p-6 relative"
      style={{
        backgroundImage: `url('/bg.webp')`,
        backgroundSize: "cover",
      }}
    >
      {/* Translucent gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/90 via-purple-500/40 to-pink-500/60" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white text-center relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <img src="/appartment.png" alt="logo" className="w-16 h-16" />
            </motion.div>
            <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
            <p className="text-blue-100">Sign in to continue to RentalPro</p>
          </div>

          {/* Form */}
          <div className="p-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUserAlt className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Username"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Password"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold 
                  ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:from-blue-700 hover:to-blue-800"} 
                  transition-all duration-200 transform`}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </motion.button>
            </form>

            <div className="p-4">
              <p className="text-center text-sm">
                Forgot your password?{" "}
                <a href="#" className="text-blue-500 font-bold">
                  Click here
                </a>
              </p>
            </div>

            <div className="mt-2 p-1  bg-blue-50 rounded-lg">
              
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-2 text-blue-700">
                  <span className="font-semibold">Admin:</span>
                  <span>username: "admin" / password: "admin123"</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-700">
                  <span className="font-semibold">Tenant:</span>
                  <span>username: "tenant" / password: "tenant123"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
