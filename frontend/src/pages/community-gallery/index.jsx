import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import TripCard from './components/TripCard';
import FilterBar from './components/FilterBar';
import TripDetailModal from './components/TripDetailModal';
import UserProfileCard from './components/UserProfileCard';
import StatsOverview from './components/StatsOverview';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CommunityGallery = () => {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [featuredUsers, setFeaturedUsers] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('masonry');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    destination: '',
    budget: '',
    groupSize: '',
    tripType: '',
    sortBy: 'recent'
  });

  // Mock trip data
  const mockTrips = [
    {
      id: 1,
      destination: "Santorini, Greece",
      duration: "7 days",
      groupSize: 6,
      organizer: "Sarah Chen",
      tripType: "Beach",
      mainImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
        "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800",
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800"
      ],
      groupPhotos: [
        "https://randomuser.me/api/portraits/women/32.jpg",
        "https://randomuser.me/api/portraits/men/45.jpg",
        "https://randomuser.me/api/portraits/women/67.jpg",
        "https://randomuser.me/api/portraits/men/23.jpg"
      ],
      highlights: [
        "Discovered 3 hidden sunset spots",
        "Stayed 20% under budget",
        "Found authentic local tavernas",
        "Perfect weather every day"
      ],
      totalBudget: 4200,
      rating: 4.9,
      likes: 234,
      comments: 45,
      planningDays: 12,
      decisionsCount: 28,
      consensusRate: 95,
      budgetSavings: 20,
      cardHeight: 520,
      itinerary: [
        {
          title: "Arrival & Oia Exploration",
          date: "Day 1",
          activities: ["Airport pickup", "Check-in to villa", "Sunset at Oia Castle", "Welcome dinner"]
        },
        {
          title: "Beach Day & Wine Tasting",
          date: "Day 2", 
          activities: ["Red Beach morning", "Akrotiri archaeological site", "Wine tasting tour", "Perissa Beach sunset"]
        }
      ],
      budgetBreakdown: [
        { category: "Accommodation", amount: 1800, icon: "Home" },
        { category: "Flights", amount: 1200, icon: "Plane" },
        { category: "Food & Dining", amount: 800, icon: "Utensils" },
        { category: "Activities", amount: 400, icon: "Camera" }
      ],
      planningTimeline: [
        { event: "Trip idea proposed", date: "March 1, 2024" },
        { event: "Group formed & dates agreed", date: "March 3, 2024" },
        { event: "Accommodation booked", date: "March 8, 2024" },
        { event: "Final itinerary confirmed", date: "March 12, 2024" }
      ]
    },
    {
      id: 2,
      destination: "Tokyo, Japan",
      duration: "10 days",
      groupSize: 4,
      organizer: "Mike Rodriguez",
      tripType: "Cultural",
      mainImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
        "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800"
      ],
      groupPhotos: [
        "https://randomuser.me/api/portraits/men/32.jpg",
        "https://randomuser.me/api/portraits/women/45.jpg",
        "https://randomuser.me/api/portraits/men/67.jpg",
        "https://randomuser.me/api/portraits/women/23.jpg"
      ],
      highlights: [
        "Experienced authentic tea ceremony",
        "Visited 5 different districts",
        "Tried 20+ local dishes",
        "Made friends with locals"
      ],
      totalBudget: 6800,
      rating: 4.8,
      likes: 189,
      comments: 32,
      planningDays: 18,
      decisionsCount: 35,
      consensusRate: 88,
      budgetSavings: 15,
      cardHeight: 480,
      itinerary: [
        {
          title: "Arrival & Shibuya",
          date: "Day 1",
          activities: ["Land at Narita", "Train to Shibuya", "Shibuya Crossing experience", "Ramen dinner"]
        }
      ],
      budgetBreakdown: [
        { category: "Accommodation", amount: 2400, icon: "Home" },
        { category: "Flights", amount: 2800, icon: "Plane" },
        { category: "Food & Dining", amount: 1200, icon: "Utensils" },
        { category: "Transportation", amount: 400, icon: "Train" }
      ],
      planningTimeline: [
        { event: "Trip idea proposed", date: "February 15, 2024" },
        { event: "Visa applications started", date: "February 20, 2024" },
        { event: "Flights booked", date: "March 1, 2024" }
      ]
    },
    {
      id: 3,
      destination: "Iceland Road Trip",
      duration: "14 days",
      groupSize: 8,
      organizer: "Emma Thompson",
      tripType: "Adventure",
      mainImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        "https://images.unsplash.com/photo-1531168556467-80aace4d0144?w=800"
      ],
      groupPhotos: [
        "https://randomuser.me/api/portraits/women/12.jpg",
        "https://randomuser.me/api/portraits/men/34.jpg",
        "https://randomuser.me/api/portraits/women/56.jpg",
        "https://randomuser.me/api/portraits/men/78.jpg",
        "https://randomuser.me/api/portraits/women/90.jpg"
      ],
      highlights: [
        "Saw Northern Lights 4 nights",
        "Hiked 6 different glaciers",
        "Discovered secret hot springs",
        "Perfect group chemistry"
      ],
      totalBudget: 12800,
      rating: 5.0,
      likes: 456,
      comments: 78,
      planningDays: 25,
      decisionsCount: 42,
      consensusRate: 92,
      budgetSavings: 18,
      cardHeight: 580,
      itinerary: [
        {
          title: "Reykjavik Arrival",
          date: "Day 1",
          activities: ["Airport pickup", "City walking tour", "Traditional Icelandic dinner"]
        }
      ],
      budgetBreakdown: [
        { category: "Car Rental", amount: 3200, icon: "Car" },
        { category: "Accommodation", amount: 4800, icon: "Home" },
        { category: "Flights", amount: 3600, icon: "Plane" },
        { category: "Food & Supplies", amount: 1200, icon: "ShoppingCart" }
      ],
      planningTimeline: [
        { event: "Epic road trip idea born", date: "January 10, 2024" },
        { event: "Route planning completed", date: "January 25, 2024" },
        { event: "All accommodations booked", date: "February 10, 2024" }
      ]
    }
  ];

  // Mock featured users
  const mockUsers = [
    {
      id: 1,
      name: "Sarah Chen",
      location: "San Francisco, CA",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 4.9,
      reviewCount: 47,
      tripsOrganized: 23,
      friendsCount: 156,
      countriesVisited: 34,
      specialties: ["Beach Destinations", "Budget Planning", "Group Coordination"],
      recentAchievement: "Organized a perfect 12-person trip to Bali with 100% satisfaction rate",
      isOnline: true,
      isTopCollaborator: true
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      location: "Austin, TX",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 4.8,
      reviewCount: 32,
      tripsOrganized: 18,
      friendsCount: 89,
      countriesVisited: 28,
      specialties: ["Cultural Experiences", "Food Tours", "City Breaks"],
      recentAchievement: "Led an amazing culinary journey through Japan for 6 friends",
      isOnline: false,
      isTopCollaborator: true
    },
    {
      id: 3,
      name: "Emma Thompson",
      location: "Denver, CO",
      avatar: "https://randomuser.me/api/portraits/women/67.jpg",
      rating: 5.0,
      reviewCount: 28,
      tripsOrganized: 15,
      friendsCount: 124,
      countriesVisited: 22,
      specialties: ["Adventure Travel", "Hiking", "Photography"],
      recentAchievement: "Coordinated an epic 2-week Iceland adventure with perfect weather timing",
      isOnline: true,
      isTopCollaborator: false
    }
  ];

  useEffect(() => {
    setTrips(mockTrips);
    setFilteredTrips(mockTrips);
    setFeaturedUsers(mockUsers);
  }, []);

  useEffect(() => {
    filterTrips();
  }, [searchQuery, filters, trips]);

  const filterTrips = () => {
    let filtered = [...trips];

    // Search filter
    if (searchQuery) {
      filtered = filtered?.filter(trip =>
        trip?.destination?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        trip?.organizer?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        trip?.highlights?.some(highlight => 
          highlight?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        )
      );
    }

    // Destination filter
    if (filters?.destination) {
      filtered = filtered?.filter(trip => {
        const destination = trip?.destination?.toLowerCase();
        switch (filters?.destination) {
          case 'europe':
            return destination?.includes('greece') || destination?.includes('iceland');
          case 'asia':
            return destination?.includes('japan') || destination?.includes('tokyo');
          default:
            return true;
        }
      });
    }

    // Budget filter
    if (filters?.budget) {
      filtered = filtered?.filter(trip => {
        const budget = trip?.totalBudget;
        switch (filters?.budget) {
          case '0-1000':
            return budget <= 1000;
          case '1000-3000':
            return budget > 1000 && budget <= 3000;
          case '3000-5000':
            return budget > 3000 && budget <= 5000;
          case '5000+':
            return budget > 5000;
          default:
            return true;
        }
      });
    }

    // Group size filter
    if (filters?.groupSize) {
      filtered = filtered?.filter(trip => {
        const size = trip?.groupSize;
        switch (filters?.groupSize) {
          case '2-3':
            return size >= 2 && size <= 3;
          case '4-6':
            return size >= 4 && size <= 6;
          case '7-10':
            return size >= 7 && size <= 10;
          case '10+':
            return size > 10;
          default:
            return true;
        }
      });
    }

    // Trip type filter
    if (filters?.tripType) {
      filtered = filtered?.filter(trip => trip?.tripType === filters?.tripType);
    }

    // Sort
    switch (filters?.sortBy) {
      case 'popular':
        filtered?.sort((a, b) => b?.likes - a?.likes);
        break;
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'budget-low':
        filtered?.sort((a, b) => a?.totalBudget - b?.totalBudget);
        break;
      case 'budget-high':
        filtered?.sort((a, b) => b?.totalBudget - a?.totalBudget);
        break;
      default:
        filtered?.sort((a, b) => b?.id - a?.id);
    }

    setFilteredTrips(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      destination: '',
      budget: '',
      groupSize: '',
      tripType: '',
      sortBy: 'recent'
    });
    setSearchQuery('');
  };

  const handleTripDetails = (trip) => {
    setSelectedTrip(trip);
    setIsModalOpen(true);
  };

  const handleViewProfile = (user) => {
    console.log('View profile:', user);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-foreground mb-4">
              Community Gallery
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Get inspired by real travel stories from our collaborative planning community. 
              See how friends transform ideas into unforgettable journeys together.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                variant="default"
                size="lg"
                iconName="Plus"
                iconPosition="left"
                iconSize={20}
              >
                Share Your Trip Story
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="Users"
                iconPosition="left"
                iconSize={20}
              >
                Start Planning Together
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <StatsOverview />

          {/* Filter Bar */}
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          {/* Main Content */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Trip Gallery */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-poppins font-bold text-foreground">
                  Inspiring Trip Stories
                </h2>
                <span className="text-sm text-muted-foreground">
                  {filteredTrips?.length} {filteredTrips?.length === 1 ? 'story' : 'stories'} found
                </span>
              </div>

              {filteredTrips?.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No trips found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    iconName="RotateCcw"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className={
                  viewMode === 'masonry' 
                    ? "columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6" :"space-y-6"
                }>
                  {filteredTrips?.map((trip) => (
                    <div key={trip?.id} className="break-inside-avoid">
                      <TripCard
                        trip={trip}
                        onViewDetails={handleTripDetails}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Featured Travel Planners */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-poppins font-semibold text-foreground">
                    Featured Planners
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ArrowRight"
                    iconPosition="right"
                    iconSize={14}
                  >
                    View All
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {featuredUsers?.map((user) => (
                    <UserProfileCard
                      key={user?.id}
                      user={user}
                      onViewProfile={handleViewProfile}
                    />
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6">
                <h3 className="font-poppins font-semibold text-lg text-foreground mb-4">
                  Ready to Plan?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start your own collaborative travel planning journey and create memories that last a lifetime.
                </p>
                <div className="space-y-3">
                  <Button
                    variant="default"
                    fullWidth
                    iconName="MapPin"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Create New Trip
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Users"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Join Planning Group
                  </Button>
                </div>
              </div>

              {/* Community Guidelines */}
              <div className="bg-card rounded-xl p-6 shadow-soft">
                <h3 className="font-poppins font-semibold text-lg text-foreground mb-4">
                  Community Guidelines
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                    <span>Share authentic travel experiences</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                    <span>Respect privacy and group decisions</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                    <span>Provide helpful planning insights</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                    <span>Celebrate collaborative successes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Trip Detail Modal */}
      <TripDetailModal
        trip={selectedTrip}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CommunityGallery;