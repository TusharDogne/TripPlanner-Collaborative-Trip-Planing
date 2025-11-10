import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaPlaneDeparture, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // ✅ handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ LOGIN handler with JWT token save
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        userName: formData.fullName,
        password: formData.password,
      });

      console.log("Login Response:", response.data);

      // 🟩 assuming backend sends { token: "..." }
      if (response.data.token) {
        localStorage.setItem("jwtToken", response.data.token);
        localStorage.setItem("username", formData.fullName);
        alert("Login Successful ✅");
        navigate("/homepage");
      } else {
        alert("Login successful but token not received");
      }
    } catch (error) {
      alert("Login failed: " + (error.response?.data || "Server error"));
      console.error(error);
    }
  };

  // ✅ SIGNUP handler with token save (if backend returns token)
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          userName: formData.fullName,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Signup Response:", response.data);

      if (response.data.token) {
        localStorage.setItem("jwtToken", response.data.token);
        alert("Signup Successful 🎉");
        navigate("/homepage");
      } else {
        alert("Signup successful, please login");
        setIsLogin(true);
      }
    } catch (error) {
      alert("Signup failed: " + (error.response?.data || "Server error"));
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 relative overflow-hidden">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-10 flex items-center gap-3 text-white text-4xl font-bold tracking-wide"
      >
        <FaPlaneDeparture className="text-yellow-300 animate-bounce" />
        Trip Planner
      </motion.div>

      <motion.div
        layout
        transition={{ duration: 0.6, type: "spring" }}
        className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-md relative"
      >
        <AnimatePresence mode="wait">
          {isLogin ? (
            // 🟦 LOGIN FORM
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
                Welcome Back, Explorer ✈
              </h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="flex items-center border border-gray-300 rounded-xl px-3">
                  <FaUser className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="User Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full p-3 focus:outline-none"
                  />
                </div>
                <div className="flex items-center border border-gray-300 rounded-xl px-3">
                  <FaLock className="text-gray-500 mr-2" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700 transition-all"
                >
                  Login
                </button>
              </form>
              <p className="text-center mt-4 text-gray-600">
                New here?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </motion.div>
          ) : (
            // 🟣 SIGNUP FORM
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 80 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
                Start Your Journey 🌍
              </h2>
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="flex items-center border border-gray-300 rounded-xl px-3">
                  <FaUser className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="User Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full p-3 focus:outline-none"
                  />
                </div>
                <div className="flex items-center border border-gray-300 rounded-xl px-3">
                  <FaEnvelope className="text-gray-500 mr-2" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 focus:outline-none"
                  />
                </div>
                <div className="flex items-center border border-gray-300 rounded-xl px-3">
                  <FaLock className="text-gray-500 mr-2" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white p-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all"
                >
                  Sign Up
                </button>
              </form>
              <p className="text-center mt-4 text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Login
                </button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}