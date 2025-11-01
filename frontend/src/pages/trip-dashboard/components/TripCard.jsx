import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const TripCard = ({ trip, onViewDetails, onQuickAction }) => {
  const [collaborativeCursors, setCollaborativeCursors] = useState([]);
  const [showInvitePopup, setShowInvitePopup] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  useEffect(() => {
    // Simulate collaborative cursors
    const cursors =
      trip?.activeMembers?.map((member, index) => ({
        id: member?.id,
        name: member?.name,
        avatar: member?.avatar,
        position: { x: 20 + index * 30, y: 10 + index * 15 },
        lastSeen: new Date(Date.now() - Math.random() * 300000),
      })) || [];
    setCollaborativeCursors(cursors);
  }, [trip?.activeMembers]);

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return "bg-success";
    if (percentage >= 50) return "bg-accent";
    return "bg-primary";
  };

  const formatBudget = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // ✅ Send Invite API (Spring Boot backend)
  const handleSendInvite = async () => {
    if (!inviteEmail) {
      setResponseMsg("Please enter an email address!");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("jwtToken");

      const response = await fetch("http://localhost:8080/api/trips/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tripId: trip?.id,
          email: inviteEmail,
          message: inviteMessage,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMsg("✅ Invitation sent successfully!");
        setInviteEmail("");
        setInviteMessage("");
        setTimeout(() => setShowInvitePopup(false), 1500);
      } else {
        setResponseMsg(`❌ Failed: ${data?.message || "Try again later"}`);
      }
    } catch (error) {
      console.error("Invite Error:", error);
      setResponseMsg("⚠️ Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-card border border-border rounded-xl p-6 shadow-collaborative hover:shadow-lg transition-organic group">
      {/* Collaborative cursors */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-xl">
        {collaborativeCursors?.map((cursor) => (
          <div
            key={cursor?.id}
            className="absolute collaborative-cursor"
            style={{
              left: `${cursor?.position?.x}%`,
              top: `${cursor?.position?.y}%`,
              animationDelay: `${Math.random() * 0.5}s`,
            }}
          >
            <div className="flex items-center space-x-1 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium shadow-soft">
              <Image
                src={cursor?.avatar}
                alt={cursor?.name}
                className="w-4 h-4 rounded-full"
              />
              <span>{cursor?.name?.split(" ")?.[0]}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-poppins font-bold text-xl text-foreground group-hover:text-primary transition-organic">
              {trip?.destination}
            </h3>
            {trip?.isNew && (
              <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                New
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} />
              <span>{trip?.dates}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} />
              <span>{trip?.memberCount} travelers</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${
              trip?.status === "active"
                ? "bg-success animate-pulse"
                : "bg-muted"
            }`}
          ></div>
        </div>
      </div>

      {/* Destination Image */}
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <Image
          src={trip?.image}
          alt={trip?.destination}
          className="w-full h-32 object-cover group-hover:scale-105 transition-organic"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Members + Invite */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-foreground">
            Planning with:
          </span>
          <div className="flex -space-x-2">
            {trip?.members?.slice(0, 4)?.map((m) => (
              <Image
                key={m?.id}
                src={m?.avatar}
                alt={m?.name}
                className="w-8 h-8 rounded-full border-2 border-background"
              />
            ))}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="UserPlus"
          iconSize={14}
          onClick={() => setShowInvitePopup(true)}
          className="text-xs"
        >
          Invite
        </Button>
      </div>

      {/* Trip ID */}
      <div className="mb-4">
        <span className="text-sm font-medium text-foreground">Trip ID:</span>{" "}
        <span className="text-sm text-muted-foreground">{trip?.id}</span>
      </div>

      {/* ✅ Budget Status */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Budget Progress
          </span>
          <span className="text-sm text-muted-foreground">
            {formatBudget(trip?.budget?.spent)} /{" "}
            {formatBudget(trip?.budget?.total)}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(
              trip?.budget?.percentage
            )}`}
            style={{
              width: `${Math.min(trip?.budget?.percentage, 100)}%`,
            }}
          ></div>
        </div>
        <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
          <span>{trip?.budget?.percentage}% allocated</span>
          <span>{trip?.budget?.contributors} contributors</span>
        </div>
      </div>

      {/* Invite Friend Popup */}
      {showInvitePopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg shadow-lg w-[400px]">
            <h3 className="text-lg font-semibold mb-3">Invite a Friend</h3>
            <input
              type="email"
              placeholder="Enter friend's email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 mb-3 text-sm"
            />
            <textarea
              placeholder="Add a message (optional)"
              value={inviteMessage}
              onChange={(e) => setInviteMessage(e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 mb-3 text-sm"
              rows={3}
            />
            {responseMsg && (
              <p className="text-xs mb-2 text-muted-foreground">{responseMsg}</p>
            )}
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowInvitePopup(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleSendInvite}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Invite"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Buttons */}
      <div className="flex items-center space-x-2 mt-3">
        <Button
          variant="default"
          size="sm"
          iconName="Eye"
          onClick={() => onViewDetails(trip?.id)}
          className="flex-1"
        >
          View Details
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="MessageCircle"
          onClick={() => onQuickAction(trip?.id, "chat")}
        />
        <Button
          variant="outline"
          size="sm"
          iconName="Vote"
          onClick={() => onQuickAction(trip?.id, "vote")}
        />
      </div>
    </div>
  );
};

export default TripCard;
