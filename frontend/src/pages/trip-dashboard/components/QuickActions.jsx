import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const QuickActions = ({ onAction }) => {
  const [activeAction, setActiveAction] = useState(null);
  const [recentActions, setRecentActions] = useState([
    { action: "Created poll for restaurant choice", time: "2 minutes ago", user: "You" },
    { action: "Added $45 dinner expense", time: "15 minutes ago", user: "Sarah" },
    { action: "Suggested visiting local museum", time: "1 hour ago", user: "Mike" },
  ]);

  // Invite modal states
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteData, setInviteData] = useState({ email: "", tripId: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
    }
    onAction?.(actionId);
    setTimeout(() => setActiveAction(null), 200);
  };

  const handleInviteSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(inviteData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Invite sent successfully!");
        setRecentActions((prev) => [
          { action: `Invited ${inviteData.email} to trip ${inviteData.tripId}`, time: "Just now", user: "You" },
          ...prev,
        ]);
        setInviteData({ email: "", tripId: "" });
      } else {
        setMessage(data.message || "Failed to send invite.");
      }
    } catch (error) {
      setMessage("Error connecting to server.");
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
            } magnetic-pull`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <Icon name={action.icon} size={20} />
              </div>
              <h4 className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors">{action.title}</h4>
              <p className="text-xs text-muted-foreground line-clamp-2">{action.description}</p>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-6 h-6 bg-background border border-border rounded text-xs font-medium flex items-center justify-center text-muted-foreground">
                  {action.shortcut}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Invite Friend Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg w-80 relative animate-fadeIn">
            <button
              onClick={() => setShowInviteModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500"
            >
              ✖
            </button>
            <h3 className="text-lg font-semibold mb-3 text-center">Invite a Friend</h3>
            <form onSubmit={handleInviteSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Friend's Email"
                value={inviteData.email}
                onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring focus:ring-primary/30"
                required
              />
              <input
                type="text"
                placeholder="Trip ID"
                value={inviteData.tripId}
                onChange={(e) => setInviteData({ ...inviteData, tripId: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring focus:ring-primary/30"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-all"
              >
                {loading ? "Sending..." : "Send Invite"}
              </button>
            </form>
            {message && <p className="text-sm text-center mt-2">{message}</p>}
          </div>
        </div>
      )}

      {/* Recent Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Recent Actions</h4>
        <div className="space-y-2">
          {recentActions.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground">{item.action}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <span>{item.user}</span>
                <span>•</span>
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tip */}
      <div className="mt-4 p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Keyboard" size={14} className="text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">Pro Tip</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Use keyboard shortcuts (Cmd/Ctrl + letter) for faster access to actions
        </p>
      </div>
    </div>
  );
};

export default QuickActions;
