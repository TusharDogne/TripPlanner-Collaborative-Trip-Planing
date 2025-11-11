import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

let stompClient = null;

const TripCard = ({ trip, onViewDetails, onQuickAction }) => {
  const [collaborativeCursors, setCollaborativeCursors] = useState([]);
  const [showInvitePopup, setShowInvitePopup] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [showChatBox, setShowChatBox] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  
  // ⭐️ NEW STATE: To track the user's vote status on this specific card ⭐️
  // (Assuming vote is persistent for the session for demonstration)
  const [hasVoted, setHasVoted] = useState(false);
  // ⭐️ NEW STATE: To simulate showing the voter's name on the card ⭐️
  const [votedBy, setVotedBy] = useState(null); 

  const messagesEndRef = useRef(null); 
  const currentUser = localStorage.getItem("username") || "You"; // Current user's name

  // Scroll to bottom when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);


  // Simulated collaborative cursors
  useEffect(() => {
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

  // Fetch old chat messages & WebSocket setup (rest of the code remains the same for chat logic)
  // ... (Chat logic useEffects)

  // Fetch old chat messages
  useEffect(() => {
    if (showChatBox && trip?.id) {
      const token = localStorage.getItem("jwtToken");

      fetch(`http://localhost:8080/chat/${trip.id}/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load chat history");
          return res.json();
        })
        .then((data) => {
          setMessages(data || []);
        })
        .catch((err) => {
          console.error("❌ Error loading chat history:", err);
        });
    }
  }, [showChatBox, trip?.id]);

  // WebSocket setup
  useEffect(() => {
    if (showChatBox) {
      const token = localStorage.getItem("jwtToken");
      const socket = new SockJS("http://localhost:8080/chat");
      stompClient = over(socket);

      const headers = { Authorization: `Bearer ${token}` };

      stompClient.connect(
        headers,
        () => {
          console.log("✅ WebSocket connected");
          stompClient.subscribe(`/topic/trip/${trip.id}`, (msg) => {
            const newMsg = JSON.parse(msg.body);
            setMessages((prev) => [...prev, newMsg]);
          });
        },
        (error) => {
          console.error("❌ WebSocket connection error:", error);
        }
      );
    }

    return () => {
      if (stompClient && stompClient.connected) stompClient.disconnect();
    };
  }, [showChatBox, trip?.id]);

  // Send message
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const msg = {
      sender: localStorage.getItem("username") || "You",
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    stompClient.send(`/app/chat/${trip.id}`, {}, JSON.stringify(msg));
    setInputMessage("");
  };

  // --- ⭐️ NEW VOTE LOGIC ⭐️ ---
  const handleVote = () => {
    if (hasVoted) {
      // Logic to unvote (optional, but good practice)
      console.log("Unvoting for trip:", trip?.id);
      setHasVoted(false);
      setVotedBy(null);
    } else {
      // Simulate API call to register vote
      console.log("Voting for trip:", trip?.id);
      
      // 1. Update State
      setHasVoted(true);
      // 2. Show user's name (Assuming current user is the voter)
      setVotedBy(currentUser); 
      
      // If you had an actual API call, it would look like this:
      /*
      // fetch('http://localhost:8080/trip/vote', {
      //   method: 'POST',
      //   body: JSON.stringify({ tripId: trip.id, userId: currentUserId }),
      //   headers: { 'Authorization': `Bearer ${token}`, ... }
      // })
      */
      
      // Call external handler if needed
      if (typeof onQuickAction === "function") {
        onQuickAction(trip?.id, "vote");
      }
    }
  };
  // -----------------------------
  

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

  // Invite friend
  const handleSendInvite = async () => {
  if (!inviteEmail) {
    setResponseMsg("Please enter an email address!");
    return;
  }

  try {
    setLoading(true);
    const token = localStorage.getItem("jwtToken");
    
    console.log("Sending invite to:", inviteEmail);

    const response = await fetch("http://localhost:8080/myTrip/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        tripId: trip?.id,
        toEmail: inviteEmail,
      }),
    });

    // Check if response is JSON
    let data;
    try {
      data = await response.json();
    } catch (err) {
      const text = await response.text();
      data = { message: text };
    }

    if (response.ok) {
      setResponseMsg("✅ Invitation sent successfully!");
      setInviteEmail("");
      setTimeout(() => setShowInvitePopup(false), 1500);
    } else {
      setResponseMsg(`❌ Failed: ${data?.message || "Try again later"}`);
    }
  } catch (error) {
    console.error("Invite Error:", error);
    setResponseMsg("⚠️ Server not reachable / Network error");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="relative bg-card border border-border rounded-xl p-6 shadow-collaborative hover:shadow-lg transition-organic group">
      {/* ... (Collaborative cursors and Header sections remain the same) ... */}
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
            className={`w-3 h-3 rounded-full ${trip?.status === "active" ? "bg-success animate-pulse" : "bg-muted"
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

      {/* ⭐️ VOTED STATUS DISPLAY ⭐️ */}
      {votedBy && (
        <div className="mb-4 p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300">
          <Icon name="CheckCircle" size={16} className="text-indigo-600 dark:text-indigo-400" />
          <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
            **{votedBy}** has voted for this trip! 🎉
          </p>
        </div>
      )}

      {/* Budget Progress */}
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
      </div>

      {/* Footer Buttons */}
      <div className="mt-3 space-y-2">
        {/* View Details Button */}
        <Button
          variant="default"
          size="sm"
          iconName="Eye"
          onClick={() => {
            if (typeof onViewDetails === "function") {
              onViewDetails(trip?.id);
            } else {
              console.log("View Details clicked for trip:", trip?.id);
            }
          }}
          className="w-full flex justify-center"
        >
          View Details
        </Button>

        {/* Chat and Vote Buttons Stacked */}
        <div className="flex space-x-2 justify-center">
          {/* Message / Chat Button */}
          <div className="flex flex-col items-center">
            <Button
              variant="outline"
              size="sm"
              iconName="MessageCircle"
              onClick={() => setShowChatBox((prev) => !prev)}
              className="p-3"
            />
            <span className="text-xs mt-1 text-muted-foreground">Chat</span>
          </div>

          {/* Vote / Quick Action Button: Conditional Rendering */}
          <div className="flex flex-col items-center">
            <Button
              // ⭐️ Conditional Variant, Icon and onClick ⭐️
              variant={hasVoted ? "success" : "outline"}
              size="sm"
              iconName={hasVoted ? "Check" : "Vote"}
              onClick={handleVote} // Use the new dedicated handler
              className={`p-3 transition-colors ${hasVoted ? "bg-success hover:bg-success/90 text-success-foreground" : ""}`}
            >
              {hasVoted ? "Voted!" : null} 
            </Button>
            <span className={`text-xs mt-1 font-medium ${hasVoted ? "text-success" : "text-muted-foreground"}`}>
              {hasVoted ? "Voted" : "Vote"}
            </span>
          </div>
        </div>
      </div>

      {/* ... (Invite Popup section remains the same) ... */}
      {showInvitePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h3 className="font-bold mb-2">Invite a friend</h3>
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full border px-3 py-2 rounded mb-4 text-gray-800"
            />
            <div className="flex justify-end space-x-2">
              <Button size="sm" onClick={() => setShowInvitePopup(false)}>Cancel</Button>
              <Button size="sm" onClick={handleSendInvite} disabled={loading}>
                {loading ? "Sending..." : "Send"}
              </Button>
            </div>
            {responseMsg && <p className="mt-2 text-sm">{responseMsg}</p>}
          </div>
        </div>
      )}


      {/* ... (Chatbox Popup section remains the same) ... */}
      {showChatBox && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white/80 dark:bg-gray-950/90 border border-blue-400/30 shadow-3xl rounded-3xl w-[480px] h-[640px] flex flex-col transition-all duration-300 overflow-hidden">
            
            {/* Header (Vibrant Gradient) */}
            <div className="flex justify-between items-center p-4 border-b border-blue-500/50 bg-gradient-to-br from-blue-700 to-cyan-500 shadow-lg">
              <h3 className="font-bold text-xl text-white">
                💬 Trip Chat – {trip?.destination || "Trip"}
              </h3>
              <button
                className="text-white/90 hover:text-white text-xl p-1 transition"
                onClick={() => setShowChatBox(false)}
              >
                ✕
              </button>
            </div>


            {/* Messages Section (Scrollable, Clean Background) */}
            <div className="flex-1 h-full overflow-y-auto p-4 space-y-4 bg-gray-50/70 dark:bg-gray-800/70">
              {Array.isArray(messages) && messages.length > 0 ? (
                messages.map((msg, index) => {
                  const currentUser = localStorage.getItem("username") || "You";
                  const isYou = msg?.sender === currentUser;

                  return (
                    <div
                      key={index}
                      className={`flex ${isYou ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`relative max-w-[75%] px-4 py-3 shadow-xl text-base ${isYou
                            // Sender's Bubble: Gradient, Rounded
                            ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-t-3xl rounded-l-3xl rounded-br-md"
                            // Receiver's Bubble: Clean, Soft Shadow
                            : "bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 rounded-t-3xl rounded-r-3xl rounded-bl-md"
                          }`}
                      >
                        <p className={`text-xs font-bold mb-1 ${isYou ? "text-blue-100" : "text-blue-400"}`}>
                          {isYou ? "You" : msg?.sender || "Unknown"}
                        </p>
                        <p className="leading-snug break-words">
                          {msg?.content || ""}
                        </p>
                        <p
                          className={`text-[10px] mt-1 text-right ${isYou ? "text-blue-200/80" : "text-gray-500/90"
                            }`}
                        >
                          {msg?.timestamp
                            ? new Date(msg.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                            : ""}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-base text-muted-foreground mt-12">
                  No messages yet. Say hello! 👋
                </p>
              )}
              {/* Auto-scroll anchor */}
              <div ref={messagesEndRef} /> 
            </div>

            {/* Input Area (Semi-transparent background) */}
            <div className="p-4 border-t border-blue-500/30 flex items-center space-x-3 bg-white/90 dark:bg-gray-900/90 shadow-inner">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => { // Added send on Enter
                    if (e.key === 'Enter') handleSendMessage();
                }}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-3 focus:ring-cyan-400/50 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 transition-all"
              />
              <Button
                size="md"
                className="rounded-full px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-lg transition-all"
                onClick={handleSendMessage}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripCard;