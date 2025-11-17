import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import TripCard from "./components/TripCard";
import ActivityFeed from "./components/ActivityFeed";
import TimelineView from "./components/TimelineView";
import BudgetOverview from "./components/BudgetOverview";
import QuickActions from "./components/QuickActions";
import NotificationToast from "./components/NotificationToast";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

const TripDashboard = () => {
  const navigate = useNavigate();
  const [activeTrips, setActiveTrips] = useState([]);
  const [activities, setActivities] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [budgetData, setBudgetData] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState(null);
  const [dashboardStats, setDashboardStats] = useState({});

  // 🌟 NEW FUNCTION: Handles the deletion event triggered by TripCard
  const handleTripDelete = (deletedTripId) => {
    console.log(`🗑️ Dynamically removing trip ID: ${deletedTripId} from state.`);
    
    // 1. Update activeTrips: Filter out the trip with the matching ID
    setActiveTrips(prevTrips => 
      prevTrips.filter(trip => trip.id !== deletedTripId)
    );

    // 2. Update selectedTripId if the deleted trip was the currently selected one
    setSelectedTripId(prevSelectedId => {
      if (prevSelectedId === deletedTripId) {
        // Automatically select a new trip (e.g., the first one remaining)
        const remainingTrips = activeTrips.filter(trip => trip.id !== deletedTripId);
        return remainingTrips.length > 0 ? remainingTrips[0].id : null;
      }
      return prevSelectedId;
    });

    // Note: Budget and Milestones would also need to be reset/updated based on the new selectedTripId
  };

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/trips", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch trips");
        }

        const tripData = await response.json();
        console.log("Fetched trips:", tripData);

        // ✅ Reverse trips to show latest first
        const reversedTrips = [...tripData].reverse();
        setActiveTrips(reversedTrips);

        // ✅ Automatically select the latest trip
        if (reversedTrips.length > 0) {
          setSelectedTripId(reversedTrips[0].id);
          setBudgetData(reversedTrips[0].budget);
          setMilestones(reversedTrips[0].milestones);
        }
      } catch (error) {
        console.error("Error fetching trips:", error);
        setActiveTrips([]); // prevent crash
      }
    };

    fetchTrips();

    // Mock activities, notifications, and stats loading...
    const mockActivities = [
      // ... (Mock activities content remains the same)
      {
        id: "act-1",
        type: "vote",
        user: {
          name: "Sarah Chen",
          avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        },
        action: "voted on hotel options",
        content: "Preferred the downtown location for better access to attractions",
        timestamp: new Date(Date.now() - 300000),
        tripName: "Tokyo Adventure",
        actionable: true,
        liked: false,
        metadata: { votes: 3 },
      },
      {
        id: "act-2",
        type: "budget",
        user: {
          name: "Mike Rodriguez",
          avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        action: "added expense",
        content: "Flight booking confirmation received",
        timestamp: new Date(Date.now() - 900000),
        tripName: "Tokyo Adventure",
        actionable: false,
        liked: true,
        metadata: { amount: 1200 },
      },
      {
        id: "act-3",
        type: "suggestion",
        user: {
          name: "Emma Wilson",
          avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        },
        action: "suggested activity",
        content:
          "How about visiting the TeamLab Borderless digital art museum? It looks amazing!",
        timestamp: new Date(Date.now() - 1800000),
        tripName: "Tokyo Adventure",
        actionable: true,
        liked: false,
        metadata: { location: "Odaiba" },
      },
      {
        id: "act-4",
        type: "join",
        user: {
          name: "Lisa Park",
          avatar: "https://randomuser.me/api/portraits/women/6.jpg",
        },
        action: "joined the trip",
        content: "Excited to explore Paris with everyone!",
        timestamp: new Date(Date.now() - 3600000),
        tripName: "European Explorer",
        actionable: false,
        liked: true,
      },
      {
        id: "act-5",
        type: "comment",
        user: {
          name: "David Kim",
          avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        },
        action: "commented on itinerary",
        content:
          "Should we add a day trip to Mount Fuji? The weather looks perfect that week.",
        timestamp: new Date(Date.now() - 7200000),
        tripName: "Tokyo Adventure",
        actionable: true,
        liked: false,
      },
    ];

    const mockNotifications = [
      // ... (Mock notifications content remains the same)
      {
        id: "notif-1",
        type: "vote",
        title: "New Vote",
        message: "Sarah voted on hotel options. 3 out of 4 votes received.",
        timestamp: new Date(Date.now() - 60000),
        user: { name: "Sarah Chen" },
        actions: [
          {
            id: "view-vote",
            label: "View Vote",
            icon: "Eye",
            primary: true,
            dismissOnClick: true,
          },
          {
            id: "cast-vote",
            label: "Vote Now",
            icon: "Vote",
            primary: false,
            dismissOnClick: false,
          },
        ],
      },
      {
        id: "notif-2",
        type: "consensus",
        title: "Consensus Reached",
        message: "Group agreed on Tokyo accommodation budget of $2,500",
        timestamp: new Date(Date.now() - 300000),
        progress: { current: 4, total: 4 },
        actions: [
          {
            id: "view-consensus",
            label: "View Details",
            icon: "CheckCircle",
            primary: true,
            dismissOnClick: true,
          },
        ],
      },
    ];

    const mockStats = {
      totalTrips: 2,
      activeTrips: 1,
      upcomingDeadlines: 3,
      pendingVotes: 2,
      totalBudget: 20000,
      friendsPlanning: 8,
    };

    setActivities(mockActivities);
    setNotifications(mockNotifications);
    setDashboardStats(mockStats);
  }, []);

  const handleTripViewDetails = (tripId) => {
    navigate("/collaborative-planner", { state: { tripId } });
  };

  const handleTripQuickAction = (tripId, action) => {
    console.log("Trip quick action:", tripId, action);
  };

  const handleActivityAction = (activityId, action) => {
    console.log("Activity action:", activityId, action);
  };

  const handleMilestoneAction = (milestoneId, action) => {
    console.log("Milestone action:", milestoneId, action);
  };

  const handleBudgetAction = (action) => {
    console.log("Budget action:", action);
    if (action === "settings") {
      navigate("/budget-coordinator");
    }
  };

  const handleQuickAction = (actionId) => {
    console.log("Quick action:", actionId);
  };

  const handleNotificationDismiss = (notificationId) => {
    setNotifications((prev) => prev?.filter((n) => n?.id !== notificationId));
  };

  const handleNotificationAction = (notificationId, actionId) => {
    console.log("Notification action:", notificationId, actionId);
  };

  const selectedTrip = activeTrips?.find((trip) => trip?.id === selectedTripId);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NotificationToast
        notifications={notifications}
        onDismiss={handleNotificationDismiss}
        onAction={handleNotificationAction}
      />
      <main className="pt-16">
        <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-poppins font-bold text-3xl lg:text-4xl text-foreground mb-2">
                  Trip Dashboard
                </h1>
                <p className="text-lg text-muted-foreground">
                  Your mission control for collaborative travel planning
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:hidden gap-4 mb-8">
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-xl font-bold text-primary">
                  {dashboardStats?.activeTrips}
                </div>
                <div className="text-sm text-muted-foreground">Active Trips</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-xl font-bold text-secondary">
                  {dashboardStats?.friendsPlanning}
                </div>
                <div className="text-sm text-muted-foreground">
                  Friends Planning
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-poppins font-bold text-2xl text-foreground">
                      Active Trips
                    </h2>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Plus"
                      iconPosition="left"
                      iconSize={16}
                      onClick={() => navigate("/smart-recommendations")}
                    >
                      New Trip
                    </Button>
                  </div>

                  {/* ✅ Trips shown in reverse order */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {activeTrips?.map((trip) => (
                      // src/pages/trip-dashboard/index.jsx (around line 327)

// 🌟 NEW PROP PASSED HERE 🌟
<TripCard
    key={trip?.id}
    trip={trip}
    onViewDetails={handleTripViewDetails}
    onQuickAction={handleTripQuickAction}
    onDelete={handleTripDelete}
/>
                    ))}
                  </div>
                </div>

                {selectedTrip && (
                  <TimelineView
                    milestones={milestones}
                    onMilestoneAction={handleMilestoneAction}
                  />
                )}
              </div>

              <div className="space-y-8">
                <ActivityFeed
                  activities={activities}
                  onActivityAction={handleActivityAction}
                />

                {selectedTrip && (
                  <BudgetOverview
                    budgetData={budgetData}
                    onBudgetAction={handleBudgetAction}
                  />
                )}

                <QuickActions onAction={handleQuickAction} />
              </div>
            </div>
          </div>
        </section>

        {activeTrips?.length === 0 && (
          <section className="py-20">
            <div className="max-w-md mx-auto text-center px-6">
              <Icon
                name="Plane"
                size={64}
                className="text-muted-foreground mx-auto mb-6"
              />
              <h3 className="font-poppins font-bold text-xl text-foreground mb-2">
                No Active Trips
              </h3>
              <p className="text-muted-foreground mb-6">
                Start planning your next adventure with friends
              </p>
              <Button
                variant="default"
                size="lg"
                iconName="Plus"
                iconPosition="left"
                iconSize={20}
                onClick={() => navigate("/collaborative-planner")}
              >
                Create Your First Trip
              </Button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default TripDashboard;