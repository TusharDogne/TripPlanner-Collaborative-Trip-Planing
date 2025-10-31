import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import InteractiveMap from './components/InteractiveMap';
import PlanningPanel from './components/PlanningPanel';
import ConsensusTracker from './components/ConsensusTracker';
import SmartRecommendations from './components/SmartRecommendations';
import Button from '../../components/ui/Button';

const CollaborativePlanner = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tripId = location?.state?.tripId; // ✅ Receiving tripId from previous page

  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [activeTab, setActiveTab] = useState('suggestions');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [overallConsensus, setOverallConsensus] = useState(0);
  const [activeTrip, setActiveTrip] = useState([]);

  // ✅ Redirect if no tripId received
  useEffect(() => {
    if (!tripId) {
      console.warn("No tripId found. Redirecting to trips page...");
      alert("No Active Trip found. Redirecting to Discover page where you can explore trips");
      // setTimeout(() => navigate('/smart-recommendations'), 0);
      return;
    }

    console.log("✅ TripId received: here check", tripId);

    // ✅ Fetching trip details with JWT token
    const token = localStorage.getItem("jwtToken");
    console.log("JWT Token (before API call):", token);

    fetch(`http://localhost:8080/api/trip/${tripId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        console.log("Response status:", res.status);
        if (!res.ok) throw new Error("Trip not found or unauthorized");
        return res.json();
      })
      .then(data => {
        console.log("Fetched trip details:", data);
        setActiveTrip(data);
      })
      .catch(err => console.error("❌ Error fetching trip:", err));
  }, [tripId, navigate]);

  // Mock active users
  const activeUsers = [
    { id: 1, name: "Sarah Chen", avatar: "https://randomuser.me/api/portraits/women/1.jpg", isOnline: true, votesCount: 12, hasVotedRecently: true },
    { id: 2, name: "Mike Rodriguez", avatar: "https://randomuser.me/api/portraits/men/2.jpg", isOnline: true, votesCount: 8, hasVotedRecently: true },
    { id: 3, name: "Emma Thompson", avatar: "https://randomuser.me/api/portraits/women/3.jpg", isOnline: false, votesCount: 5, hasVotedRecently: false },
    { id: 4, name: "David Kim", avatar: "https://randomuser.me/api/portraits/men/4.jpg", isOnline: true, votesCount: 15, hasVotedRecently: true }
  ];

  // Initialize mock suggestions
  useEffect(() => {
    setSuggestions([
      {
        id: 1,
        name: "Times Square",
        description: `The bustling heart of NYC with bright lights and endless entertainment.\nPerfect for first-time visitors and group photos.`,
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400",
        rating: 4.2,
        estimatedCost: 0,
        budgetImpact: 'low',
        tags: ['Iconic', 'Free', 'Photography', 'Tourist'],
        addedBy: { id: 1, name: "Sarah Chen", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
        reactions: { love: 3, like: 2, excited: 4, maybe: 1, dislike: 0 },
        comments: [
          { id: 1, user: { id: 2, name: "Mike Rodriguez", avatar: "https://randomuser.me/api/portraits/men/2.jpg" }, content: "Great for photos but might be too crowded", timestamp: new Date(Date.now() - 3600000) }
        ],
        consensusLevel: 75,
        timestamp: new Date(Date.now() - 7200000)
      },
      {
        id: 2,
        name: "Brooklyn Bridge",
        description: `Historic bridge offering stunning views of Manhattan skyline.\nBest experienced during sunrise or sunset for magical lighting.`,
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400",
        rating: 4.8,
        estimatedCost: 0,
        budgetImpact: 'low',
        tags: ['Historic', 'Free', 'Views', 'Walking'],
        addedBy: { id: 2, name: "Mike Rodriguez", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
        reactions: { love: 5, like: 3, excited: 2, maybe: 0, dislike: 0 },
        comments: [
          { id: 2, user: { id: 1, name: "Sarah Chen", avatar: "https://randomuser.me/api/portraits/women/1.jpg" }, content: "Perfect for sunrise photos! Let's plan for early morning.", timestamp: new Date(Date.now() - 1800000) }
        ],
        consensusLevel: 90,
        timestamp: new Date(Date.now() - 5400000)
      }
    ]);
  }, []);

  // Calculate overall consensus
  useEffect(() => {
    if (suggestions?.length > 0) {
      const avgConsensus = suggestions.reduce((sum, s) => sum + s?.consensusLevel, 0) / suggestions.length;
      setOverallConsensus(Math.round(avgConsensus));
    }
  }, [suggestions]);

  const handleAddSuggestion = (newSuggestion) => setSuggestions(prev => [...prev, newSuggestion]);

  const handleVote = (suggestionId, voteType) => {
    setSuggestions(prev =>
      prev.map(suggestion => {
        if (suggestion.id === suggestionId) {
          const updatedReactions = {
            ...suggestion.reactions,
            [voteType]: suggestion.reactions[voteType] + 1
          };
          const totalVotes = Object.values(updatedReactions).reduce((a, b) => a + b, 0);
          const positiveVotes = updatedReactions.love + updatedReactions.like + updatedReactions.excited;
          const consensusLevel = totalVotes > 0 ? Math.round((positiveVotes / totalVotes) * 100) : 0;
          return { ...suggestion, reactions: updatedReactions, consensusLevel };
        }
        return suggestion;
      })
    );
  };

  const handleComment = (suggestionId, commentText) => {
    setSuggestions(prev =>
      prev.map(suggestion => {
        if (suggestion.id === suggestionId) {
          const newComment = {
            id: Date.now(),
            user: { id: 1, name: "You", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
            content: commentText,
            timestamp: new Date()
          };
          return { ...suggestion, comments: [...suggestion.comments, newComment] };
        }
        return suggestion;
      })
    );
  };

  const handleSuggestionClick = (suggestion) => setSelectedSuggestion(suggestion);


  return (

    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 h-screen flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="font-poppins font-bold text-xl text-foreground">
                Collaborative Trip Planner
              </h1>
              <p className="text-sm text-muted-foreground">
                Trip ID: {tripId} • {activeUsers.length} members active
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant={showRecommendations ? "default" : "outline"}
              size="sm"
              iconName="Sparkles"
              iconPosition="left"
              iconSize={16}
              onClick={() => setShowRecommendations(!showRecommendations)}
            >
              AI Suggestions
            </Button>
            <Button variant="outline" size="sm" iconName="Share" iconPosition="left" iconSize={16}>
              Share Plan
            </Button>
            <Button variant="default" size="sm" iconName="Calendar" iconPosition="left" iconSize={16}>
              Create Timeline
            </Button>
          </div>
        </div>

        {/* 🚨 Show alert if tripId not found */}
        {
          !tripId && (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center text-muted-foreground">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                ⚠️ No Active Trip Found
              </h2>
              <p className="mb-6 max-w-md">
                You haven’t selected any active trip yet. Please go to the <strong>Dashboard</strong> page to select a trip, and if you don’t have any trips, go to the <strong>Discover</strong> page to explore and start planning a trip.
              </p>

              <div className="flex space-x-4">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => navigate('/trip-dashboard')}
                >
                  Go to Dashboard
                </Button>
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => navigate('/smart-recommendations')}
                >
                  Go to Discover
                </Button>
              </div>
            </div>
          )
        }


        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 p-4">
            <InteractiveMap
              suggestions={suggestions}
              onSuggestionClick={handleSuggestionClick}
              activeUsers={activeUsers}
              selectedSuggestion={selectedSuggestion}
              activeTrip={activeTrip}   // ✅ Add here (line ~236)
            />
          </div>

          <div className="w-96 border-l border-border flex flex-col">
            <PlanningPanel
              suggestions={suggestions}
              onAddSuggestion={handleAddSuggestion}
              onVote={handleVote}
              onComment={handleComment}
              selectedSuggestion={selectedSuggestion}
              onSelectSuggestion={setSelectedSuggestion}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          {showRecommendations && (
            <div className="w-80 border-l border-border p-4 bg-muted/30">
              <SmartRecommendations
                onAddSuggestion={handleAddSuggestion}
                groupPreferences={{
                  interests: ['photography', 'food', 'culture'],
                  activityLevel: 'moderate',
                  groupSize: 4
                }}
                budget={{ total: 500, perPerson: 125 }}
              />
            </div>
          )}
        </div>

        {/* Bottom Consensus Tracker */}
        <div className="lg:hidden border-t border-border p-4">
          <ConsensusTracker suggestions={suggestions} groupMembers={activeUsers} overallConsensus={overallConsensus} />
        </div>

        {/* Floating Consensus Tracker */}
        <div className="hidden lg:block fixed bottom-4 right-4 w-80">
          <ConsensusTracker suggestions={suggestions} groupMembers={activeUsers} overallConsensus={overallConsensus} />
        </div>
      </div>
    </div>
  );
};

export default CollaborativePlanner;
