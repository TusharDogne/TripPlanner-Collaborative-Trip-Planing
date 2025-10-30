import React, { useState } from "react";
import axios from "axios";
import { Mail, Send, UserPlus } from "lucide-react";

const InviteFriend = () => {
  const [email, setEmail] = useState("");
  const [tripId, setTripId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInvite = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const token = localStorage.getItem("jwtToken"); // <-- Token from login
      const res = await axios.post(
        "http://localhost:8080/api/invite",
        { email, tripId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Friend invited successfully!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to invite friend. Check details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <div className="flex items-center justify-center mb-6">
          <UserPlus className="text-blue-500 w-8 h-8 mr-2" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Invite Your Friend
          </h2>
        </div>

        <form onSubmit={handleInvite} className="space-y-5">
          <div>
            <label className="text-gray-700 text-sm font-medium mb-1 block">
              Friend's Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="Enter friend's email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-700 text-sm font-medium mb-1 block">
              Trip ID
            </label>
            <input
              type="text"
              placeholder="Enter Trip ID"
              value={tripId}
              onChange={(e) => setTripId(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 mt-2 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition 
            ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <Send size={18} />
            {loading ? "Sending Invite..." : "Send Invite"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-5 text-center font-medium ${
              message.includes("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default InviteFriend;
