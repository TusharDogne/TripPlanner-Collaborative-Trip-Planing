import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import axios from "axios";

const QuickActions = ({ onAction }) => {
  const [activeAction, setActiveAction] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const quickActions = [
    { id: "create-poll", title: "Create Poll", description: "Get group consensus on decisions", icon: "Vote", color: "bg-primary text-primary-foreground", shortcut: "P" },
    { id: "add-expense", title: "Add Expense", description: "Track shared costs instantly", icon: "DollarSign", color: "bg-success text-success-foreground", shortcut: "E" },
    { id: "message-group", title: "Message Group", description: "Chat with all trip members", icon: "MessageCircle", color: "bg-secondary text-secondary-foreground", shortcut: "M" },
    { id: "suggest-activity", title: "Suggest Activity", description: "Recommend something fun to do", icon: "Lightbulb", color: "bg-accent text-accent-foreground", shortcut: "S" },
    { id: "invite-friend", title: "Invite Friend", description: "Add someone to the trip", icon: "UserPlus", color: "bg-primary text-primary-foreground", shortcut: "I" },
    { id: "book-activity", title: "Book Activity", description: "Reserve tickets or experiences", icon: "Calendar", color: "bg-warning text-warning-foreground", shortcut: "B" },
  ];

  const handleActionClick = (actionId) => {
    setActiveAction(actionId);
    if (actionId === "invite-friend") {
      setShowInviteModal(true);
      return;
    }
    onAction?.(actionId);
    setTimeout(() => setActiveAction(null), 200);
  };

  // 🧠 Handle invite submit
  const handleInviteSubmit = async (e) => {
    e.preventDefault();
    const tripId = e.target.tripId.value;
    const toEmail = e.target.email.value;

    if (!tripId || !toEmail) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("jwtToken"); // 🟢 JWT token pick from localStorage
      console.log(token)

      const response = await axios.post(
        "http://localhost:8080/myTrip/invite", // ⚙️ Replace with your backend API endpoint
        {
          tripId,
          toEmail   
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 🟢 Token send to backend
            "Content-Type": "application/json",
          },
        }
      );

      alert(`Invitation sent successfully to ${toEmail}! 🎉`);
      setShowInviteModal(false);
    } catch (error) {
      console.error("Error sending invite:", error);
      alert("Failed to send invite. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-soft relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-poppins font-bold text-lg text-foreground">Quick Actions</h3>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <Icon name="Zap" size={12} />
          <span>Keyboard shortcuts</span>
        </div>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleActionClick(action.id)}
            className={`group relative p-4 rounded-lg border border-border hover:border-primary/50 transition-all duration-200 text-left ${
              activeAction === action.id ? "scale-95" : "hover:scale-105"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <Icon name={action.icon} size={20} />
              </div>
              <h4 className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors">{action.title}</h4>
              <p className="text-xs text-muted-foreground line-clamp-2">{action.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Invite Friend Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-2xl w-[90%] max-w-md relative">
            <button
              onClick={() => setShowInviteModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-4 text-center text-foreground">
              Invite a Friend to Join Trip ✈️
            </h3>
            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Trip Id</label>
                <input
                  type="text"
                  name="tripId"
                  className="w-full border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter Trip Id"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter email"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-all disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send Invite 🚀"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActions;
