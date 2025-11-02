import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TripCard from './components/TripCard';
import ActivityFeed from './components/ActivityFeed';
import TimelineView from './components/TimelineView';
import BudgetOverview from './components/BudgetOverview';
import QuickActions from './components/QuickActions';
import NotificationToast from './components/NotificationToast';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TripDashboard = () => {
  const navigate = useNavigate();
  const [activeTrips, setActiveTrips] = useState([]);
  const [activities, setActivities] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [budgetData, setBudgetData] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState(null);
  const [dashboardStats, setDashboardStats] = useState({});

  // Mock data initialization
  useEffect(() => {
  const fetchTrips = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/trips", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch trips");
      }

      const tripData = await response.json();
      console.log("Fetched trips:", tripData);

      setActiveTrips(tripData);
      setSelectedTripId(tripData && tripData.length > 0 ? tripData[tripData.length-1].id : null);
      setBudgetData(tripData[tripData.length-1].budget);
      setMilestones(tripData[tripData.length-1].milestones);
    } catch (error) {
      console.error("Error fetching trips:", error);
      setActiveTrips([]); // prevent crash
    }
  };

  fetchTrips();

    // Mock activities
    const mockActivities = [
      {
        id: 'act-1',
        type: 'vote',
        user: { name: 'Sarah Chen', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
        action: 'voted on hotel options',
        content: 'Preferred the downtown location for better access to attractions',
        timestamp: new Date(Date.now() - 300000),
        tripName: 'Tokyo Adventure',
        actionable: true,
        liked: false,
        metadata: { votes: 3 }
      },
      {
        id: 'act-2',
        type: 'budget',
        user: { name: 'Mike Rodriguez', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
        action: 'added expense',
        content: 'Flight booking confirmation received',
        timestamp: new Date(Date.now() - 900000),
        tripName: 'Tokyo Adventure',
        actionable: false,
        liked: true,
        metadata: { amount: 1200 }
      },
      {
        id: 'act-3',
        type: 'suggestion',
        user: { name: 'Emma Wilson', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
        action: 'suggested activity',
        content: 'How about visiting the TeamLab Borderless digital art museum? It looks amazing!',
        timestamp: new Date(Date.now() - 1800000),
        tripName: 'Tokyo Adventure',
        actionable: true,
        liked: false,
        metadata: { location: 'Odaiba' }
      },
      {
        id: 'act-4',
        type: 'join',
        user: { name: 'Lisa Park', avatar: 'https://randomuser.me/api/portraits/women/6.jpg' },
        action: 'joined the trip',
        content: 'Excited to explore Paris with everyone!',
        timestamp: new Date(Date.now() - 3600000),
        tripName: 'European Explorer',
        actionable: false,
        liked: true
      },
      {
        id: 'act-5',
        type: 'comment',
        user: { name: 'David Kim', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
        action: 'commented on itinerary',
        content: 'Should we add a day trip to Mount Fuji? The weather looks perfect that week.',
        timestamp: new Date(Date.now() - 7200000),
        tripName: 'Tokyo Adventure',
        actionable: true,
        liked: false
      }
    ];

    // Mock milestones
    const mockMilestones = [
      {
        id: 'milestone-1',
        type: 'created',
        title: 'Trip Created',
        description: 'Tokyo Adventure planning started',
        completed: true,
        completedAt: new Date(Date.now() - 2592000000),
        contributors: [{ name: 'You' }]
      },
      {
        id: 'milestone-2',
        type: 'friends_joined',
        title: 'All Friends Joined',
        description: '4 travelers confirmed participation',
        completed: true,
        completedAt: new Date(Date.now() - 2160000000),
        progress: { current: 4, total: 4, label: 'Members joined' },
        contributors: [
          { name: 'Sarah Chen' },
          { name: 'Mike Rodriguez' },
          { name: 'Emma Wilson' },
          { name: 'David Kim' }
        ]
      },
      {
        id: 'milestone-3',
        type: 'budget_agreed',
        title: 'Budget Agreed',
        description: 'Group consensus on $8,000 total budget',
        completed: true,
        completedAt: new Date(Date.now() - 1728000000),
        contributors: [{ name: 'All Members' }]
      },
      {
        id: 'milestone-4',
        type: 'flights_booked',
        title: 'Flights Booked',
        description: 'Round-trip tickets secured for all travelers',
        completed: false,
        current: true,
        actionable: true,
        actionLabel: 'Book Now',
        progress: { current: 2, total: 4, label: 'Bookings confirmed' },
        dueDate: new Date(Date.now() + 604800000)
      },
      {
        id: 'milestone-5',
        type: 'accommodation_booked',
        title: 'Accommodation Booked',
        description: 'Hotel reservations for entire stay',
        completed: false,
        actionable: false,
        dueDate: new Date(Date.now() + 1209600000)
      },
      {
        id: 'milestone-6',
        type: 'activities_planned',
        title: 'Activities Planned',
        description: 'Daily itinerary with booked experiences',
        completed: false,
        actionable: false,
        dueDate: new Date(Date.now() + 1814400000)
      }
    ];

    // Mock budget data
    const mockBudgetData = {
      totalBudget: 8000,
      spent: 3200,
      remaining: 4800,
      predictedTotal: 7650,
      savingsOpportunity: 350,
      categories: [
        { name: 'Flights', budget: 3000, spent: 2400, color: 'bg-primary' },
        { name: 'Hotels', budget: 2500, spent: 800, color: 'bg-secondary' },
        { name: 'Food', budget: 1500, spent: 0, color: 'bg-accent' },
        { name: 'Activities', budget: 800, spent: 0, color: 'bg-success' },
        { name: 'Transport', budget: 200, spent: 0, color: 'bg-warning' }
      ],
      contributors: [
        { id: 1, name: 'Sarah Chen', contributed: 800, status: 'paid' },
        { id: 2, name: 'Mike Rodriguez', contributed: 1200, status: 'paid' },
        { id: 3, name: 'Emma Wilson', contributed: 600, status: 'pending' },
        { id: 4, name: 'David Kim', contributed: 600, status: 'pending' }
      ]
    };

    // Mock notifications
    const mockNotifications = [
      {
        id: 'notif-1',
        type: 'vote',
        title: 'New Vote',
        message: 'Sarah voted on hotel options. 3 out of 4 votes received.',
        timestamp: new Date(Date.now() - 60000),
        user: { name: 'Sarah Chen' },
        actions: [
          { id: 'view-vote', label: 'View Vote', icon: 'Eye', primary: true, dismissOnClick: true },
          { id: 'cast-vote', label: 'Vote Now', icon: 'Vote', primary: false, dismissOnClick: false }
        ]
      },
      {
        id: 'notif-2',
        type: 'consensus',
        title: 'Consensus Reached',
        message: 'Group agreed on Tokyo accommodation budget of $2,500',
        timestamp: new Date(Date.now() - 300000),
        progress: { current: 4, total: 4 },
        actions: [
          { id: 'view-consensus', label: 'View Details', icon: 'CheckCircle', primary: true, dismissOnClick: true }
        ]
      }
    ];

    // Mock dashboard stats
    const mockStats = {
      totalTrips: 2,
      activeTrips: 1,
      upcomingDeadlines: 3,
      pendingVotes: 2,
      totalBudget: 20000,
      friendsPlanning: 8
    };

    
    setActivities(mockActivities);
    
    setNotifications(mockNotifications);
    setDashboardStats(mockStats);
    // setSelectedTripId(tripData?.[0]?.id);
  }, []);

  // Event handlers
  const handleTripViewDetails = (tripId) => {
    navigate('/collaborative-planner', { state: { tripId } });
  };

  const handleTripQuickAction = (tripId, action) => {
    console.log('Trip quick action:', tripId, action);
    // Handle quick actions like chat, vote, invite, etc.
  };

  const handleActivityAction = (activityId, action) => {
    console.log('Activity action:', activityId, action);
    // Handle activity actions like vote, reply, like, etc.
  };

  const handleMilestoneAction = (milestoneId, action) => {
    console.log('Milestone action:', milestoneId, action);
    // Handle milestone actions
  };

  const handleBudgetAction = (action) => {
    console.log('Budget action:', action);
    if (action === 'settings') {
      navigate('/budget-coordinator');
    }
  };

  const handleQuickAction = (actionId) => {
    console.log('Quick action:', actionId);
    // Handle quick actions
  };

  const handleNotificationDismiss = (notificationId) => {
    setNotifications(prev => prev?.filter(n => n?.id !== notificationId));
  };

  const handleNotificationAction = (notificationId, actionId) => {
    console.log('Notification action:', notificationId, actionId);
    // Handle notification actions
  };

  const selectedTrip = activeTrips?.find(trip => trip?.id === selectedTripId);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Notifications */}
      <NotificationToast
        notifications={notifications}
        onDismiss={handleNotificationDismiss}
        onAction={handleNotificationAction}
      />
      <main className="pt-16">
        {/* Hero Section */}
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
              
              <div className="hidden lg:flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{dashboardStats?.activeTrips}</div>
                  <div className="text-sm text-muted-foreground">Active Trips</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">{dashboardStats?.friendsPlanning}</div>
                  <div className="text-sm text-muted-foreground">Friends Planning</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{dashboardStats?.pendingVotes}</div>
                  <div className="text-sm text-muted-foreground">Pending Votes</div>
                </div>
              </div>
            </div>

            {/* Quick Stats Cards - Mobile */}
            <div className="grid grid-cols-2 lg:hidden gap-4 mb-8">
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-xl font-bold text-primary">{dashboardStats?.activeTrips}</div>
                <div className="text-sm text-muted-foreground">Active Trips</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-xl font-bold text-secondary">{dashboardStats?.friendsPlanning}</div>
                <div className="text-sm text-muted-foreground">Friends Planning</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Trip Cards & Timeline */}
              <div className="lg:col-span-2 space-y-8">
                {/* Active Trips */}
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
                      onClick={() => navigate('/smart-recommendations')}
                    >
                      New Trip
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {activeTrips?.map(trip => (
                      <TripCard
                        key={trip?.id}
                        trip={trip}
                        onViewDetails={handleTripViewDetails}
                        onQuickAction={handleTripQuickAction}
                      />
                    ))}
                  </div>
                </div>

                {/* Timeline View */}
                {selectedTrip && (
                  <TimelineView
                    milestones={milestones}
                    onMilestoneAction={handleMilestoneAction}
                  />
                )}
              </div>

              {/* Right Column - Activity Feed, Budget, Quick Actions */}
              <div className="space-y-8">
                {/* Activity Feed */}
                <ActivityFeed
                  activities={activities}
                  onActivityAction={handleActivityAction}
                />

                {/* Budget Overview */}
                {selectedTrip && (
                  <BudgetOverview
                    budgetData={budgetData}
                    onBudgetAction={handleBudgetAction}
                  />
                )}

                {/* Quick Actions */}
                <QuickActions onAction={handleQuickAction} />
              </div>
            </div>
          </div>
        </section>

        {/* Empty State */}
        {activeTrips?.length === 0 && (
          <section className="py-20">
            <div className="max-w-md mx-auto text-center px-6">
              <Icon name="Plane" size={64} className="text-muted-foreground mx-auto mb-6" />
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
                onClick={() => navigate('/collaborative-planner')}
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