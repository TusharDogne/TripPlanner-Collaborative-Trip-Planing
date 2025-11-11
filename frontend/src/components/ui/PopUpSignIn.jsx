import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Mail, X, Plane, MapPin, Globe, Loader, Compass, Cloud } from "lucide-react";
import axios from "axios";

// Placeholder for useNavigate - Uncomment and import if using react-router-dom
const useNavigate = () => (path) => console.log(`Navigating to: ${path}`); 

// Google Logo SVG Component (simplified for embedding)
const GoogleLogo = () => (
  <svg viewBox="0 0 48 48" className="h-5 w-5 mr-3" role="img" aria-label="Google logo">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.23l6.57-6.57c-3.66-3.23-8.88-5.16-15.78-5.16C11.53 1.01 1.73 13.9 1.73 24s9.8 22.99 22.27 22.99c6.45 0 11.96-2.13 16.03-5.83l-6.2-4.7c-2.43 1.63-5.59 2.58-9.83 2.58-7.96 0-14.54-6.47-14.54-14.54S16.04 9.5 24 9.5z"></path>
    <path fill="#34A853" d="M12.72 23.51V28h7.94c-.21 1.1-.9 2.15-1.92 3.03l5.5 4.3c3.27-3.03 5.16-7.46 5.16-12.83 0-1.87-.2-3.67-.58-5.38H24v4.51h-11.28z"></path>
    <path fill="#4285F4" d="M24 45c6.64 0 12.5-2.73 16.71-7.14l-6.2-4.7c-2.43 1.63-5.59 2.58-9.83 2.58-7.96 0-14.54-6.47-14.54-14.54S16.04 9.5 24 9.5c3.54 0 6.71 1.22 9.21 3.23l6.57-6.57c-3.66-3.23-8.88-5.16-15.78-5.16C11.53 1.01 1.73 13.9 1.73 24s9.8 22.99 22.27 22.99z"></path>
  </svg>
);

// Framer Motion variant for the entire form content transition (Slide and Fade)
const formContentVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
};


const PopupSignIn = ({ show, onClose }) => {
  const [isLogin, setIsLogin] = useState(true); 
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        userName: formData.fullName, 
        password: formData.password,
      });

      if (response.data.token) {
        localStorage.setItem("jwtToken", response.data.token);
        localStorage.setItem("username", formData.fullName);
        alert("Login Successful ✅");
        navigate("/homepage");
        onClose();
      } else {
        alert("Login successful but token not received");
      }
    } catch (error) {
      alert("Login failed: " + (error.response?.data?.message || error.message || "Server error"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        userName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      if (response.data.token) {
        localStorage.setItem("jwtToken", response.data.token);
        localStorage.setItem("username", formData.fullName);
        alert("Signup Successful 🎉");
        navigate("/homepage");
        onClose();
      } else {
        alert("Signup successful, please login");
        setIsLogin(true); 
      }
    } catch (error) {
       alert("Signup failed: " + (error.response?.data?.message || error.message || "Server error"));
    } finally {
      setIsLoading(false);
    }
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 h-screen bg-gradient-to-br from-[#020617]/90 to-[#0f172a]/80 backdrop-blur-xl flex items-center justify-center z-[999]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        
        {/* Floating Icons: Spread Across Screen with varied animations */}
        {/* Plane Icon: Top-Left to Bottom-Right */}
        <motion.div
          className="absolute text-cyan-400/15" 
          initial={{ x: '-40vw', y: '-40vh', rotate: 0 }} 
          animate={{ x: '100vw', y: '100vh', rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
        >
          <Plane size={90} />
        </motion.div>
        
        {/* MapPin Icon: Top-Right to Bottom-Left */}
        <motion.div
          className="absolute text-blue-400/15"
          initial={{ x: '110vw', y: '-30vh', rotate: 0 }} 
          animate={{ x: '-20vw', y: '110vh', rotate: -360 }} 
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          <MapPin size={80} />
        </motion.div>

        {/* Compass Icon: Bottom-Left to Top-Right */}
        <motion.div
          className="absolute text-purple-400/15"
          initial={{ x: '-20vw', y: '110vh', rotate: 0 }} 
          animate={{ x: '110vw', y: '-30vh', rotate: 720 }}
          transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
        >
          <Compass size={70} />
        </motion.div>

        {/* Cloud Icon: Center-Top to Center-Bottom (bouncy effect) */}
        <motion.div
          className="absolute text-gray-400/15"
          initial={{ x: '50vw', y: '-20vh', opacity: 0.2 }} 
          animate={{ x: '50vw', y: '120vh', opacity: 0.1 }} 
          transition={{ repeat: Infinity, duration: 50, ease: "easeInOut" }}
        >
          <Cloud size={100} />
        </motion.div>
        
        {/* Main Popup Card */}
        <motion.div
          className="relative w-[90%] max-w-md bg-white/15 border border-white/30 backdrop-blur-2xl rounded-2xl p-8 shadow-2xl overflow-hidden text-white"
          initial={{ scale: 0.8, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          style={{
            boxShadow:
              "0 0 80px rgba(0, 255, 255, 0.15), inset 0 0 20px rgba(255, 255, 255, 0.08)",
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition"
          >
            <X size={24} />
          </button>

          {/* Heading */}
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold text-white drop-shadow-md">
              {isLogin ? "Welcome Back" : "Start Your Journey"}
            </h2>
            <p className="text-white/70 text-base mt-2">
              {isLogin
                ? "Sign in to plan your next dream trip ✈️"
                : "Create your account and explore the world 🌍"}
            </p>
          </motion.div>

          {/* Social Login Section */}
          <div className="space-y-4 mb-7">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(255,255,255,0.2)" }}
              className="w-full py-3 flex items-center justify-center rounded-xl bg-white text-gray-800 font-semibold border border-gray-300 shadow-lg transition-all"
            >
              <GoogleLogo />
              Continue with Google
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(0,255,255,0.2)" }}
              className="w-full py-3 flex items-center justify-center rounded-xl bg-gray-900 text-white font-semibold border border-gray-700 shadow-lg transition-all"
            >
              <Globe size={18} className="mr-3 text-cyan-400" />
              Continue with Microsoft Account
            </motion.button>
          </div>
          
          {/* Separator */}
          <div className="relative flex justify-center items-center my-7">
            <hr className="w-full border-gray-600/50" />
            <span className="absolute px-3 bg-[#0f172a] text-white/70 text-sm rounded-full">
              OR
            </span>
          </div>

          {/* Form and Inputs */}
          <form onSubmit={isLogin ? handleLogin : handleSignUp} className="text-left"> {/* Removed space-y-4 here */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isLogin ? "login-fields" : "signup-fields"}
                variants={formContentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              >
              
                {/* Conditional Email Input */}
                {!isLogin && (
                  <div className="relative mb-4"> {/* ⭐️ Added mb-4 ⭐️ */}
                    <Mail className="absolute left-3 top-3 text-white/50" size={18} />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required={!isLogin}
                      className="w-full pl-10 pr-3 py-2.5 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
                    />
                  </div>
                )}
                
                {/* Username Input */}
                <div className="relative mb-4"> {/* ⭐️ Added mb-4 for spacing below Username ⭐️ */}
                  <User className="absolute left-3 top-3 text-white/50" size={18} />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Username"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-3 py-2.5 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
                  />
                </div>

                {/* Password Input */}
                <div className="relative mb-0"> {/* Adjusted to control spacing relative to the button */}
                  <Lock className="absolute left-3 top-3 text-white/50" size={18} />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-3 py-2.5 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02, boxShadow: isLoading ? 'none' : "0 0 25px rgba(34,211,238,0.6)" }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className={`mt-6 w-full py-3 rounded-xl text-white font-semibold shadow-xl transition-all flex items-center justify-center ${
                isLoading 
                ? 'bg-gray-500/80 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 hover:shadow-cyan-400/40'
              }`}
            >
              {isLoading ? (
                <Loader size={20} className="animate-spin text-white" />
              ) : (
                isLogin ? "Login to My Trips" : "Sign Up & Get Started"
              )}
            </motion.button>
          </form>

          {/* Toggle */}
          <p className="text-white/70 text-sm mt-6 text-center">
            {isLogin ? "New here? Get started!" : "Already have an account?"}{" "}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-cyan-400 font-semibold cursor-pointer hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
 
export default PopupSignIn;