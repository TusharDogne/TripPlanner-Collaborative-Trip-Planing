import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RecommendationCard from './components/RecommendationCard';
import FilterPanel from './components/FilterPanel';
import WeatherWidget from './components/WeatherWidget';
import HiddenGemsSection from './components/HiddenGemsSection';
import BudgetOptimizer from './components/BudgetOptimizer';
import SwipeDiscovery from './components/SwipeDiscovery';



const SmartRecommendations = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'swipe'
  const [filters, setFilters] = useState({
    search: '',
    categories: [],
    budgetRange: '',
    groupSize: '',
    duration: '',
    accessibility: false,
    hiddenGems: false,
    weatherOptimal: false,
    distance: 50
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [groupVotes, setGroupVotes] = useState([]);
  const [savedRecommendations, setSavedRecommendations] = useState([]);
  const [learningData, setLearningData] = useState({
    preferences: [],
    votingHistory: [],
    groupPatterns: []
  });

  // Mock recommendations data
  const mockRecommendations = [
  {
    id: 1,
    title: "Indore City Heritage Tour",
    location: "Indore, Madhya Pradesh",
    category: "destination",
    image: "https://images.unsplash.com/photo-1608454897042-7b6bdbb8b948?w=600",
    rating: 4.8,
    duration: "1 Day",
    priceRange: "₹800 - ₹1200",
    groupSize: "2-10 people",
    aiReasoning: "Perfect for your group’s cultural and local food interests. Covers top heritage and food spots.",
    description: `Explore Rajwada Palace, Lal Bagh Palace, and Sarafa Bazaar's famous street food scene. Ideal for history and food lovers.`,
    tags: ["Cultural", "Food", "Historical"],
    weather: { temp: 29, condition: "Sunny" },
    socialProof: "Rated 4.8★ by 1,200+ travelers as a must-do in Indore.",
    isSaved: false,
  },
  {
    id: 2,
    title: "Goa Sunset Cruise",
    location: "Goa, India",
    category: "activity",
    image: "https://images.unsplash.com/photo-1518593921323-3f122ce4874e?w=600",
    rating: 4.7,
    duration: "2 Hours",
    priceRange: "₹1500 - ₹2500",
    groupSize: "2-12 people",
    aiReasoning: "Best for leisure seekers who love scenic views and relaxing evenings.",
    description: `Enjoy live music, Goan snacks, and breathtaking sunset views over Mandovi River. A perfect evening getaway.`,
    tags: ["Beach", "Relaxing", "Romantic"],
    weather: { temp: 31, condition: "Clear" },
    socialProof: "92% travelers rated this cruise as their favorite Goa experience.",
    isSaved: false,
  },
  {
    id: 3,
    title: "Jaipur Heritage Walk",
    location: "Jaipur, Rajasthan",
    category: "destination",
    image: "https://images.unsplash.com/photo-1582631451531-df6ca7a2a7a3?w=600",
    rating: 4.9,
    duration: "3 Hours",
    priceRange: "₹1000 - ₹1800",
    groupSize: "4-10 people",
    aiReasoning: "Matches your love for architecture and royal culture.",
    description: `Visit Hawa Mahal, City Palace, and local bazaars. Learn about Jaipur’s royal legacy from local guides.`,
    tags: ["Architecture", "Culture", "Walking"],
    weather: { temp: 34, condition: "Sunny" },
    socialProof: "Top-rated experience for first-time Jaipur visitors.",
    isSaved: false,
  },
  {
    id: 4,
    title: "Manali Adventure Day",
    location: "Manali, Himachal Pradesh",
    category: "activity",
    image: "https://images.unsplash.com/photo-1559814043-0f3f63fbe0f8?w=600",
    rating: 4.7,
    duration: "Full Day",
    priceRange: "₹1800 - ₹2800",
    groupSize: "2-15 people",
    aiReasoning: "Great for adventure-loving groups who enjoy nature and snow activities.",
    description: `Try paragliding, river crossing, and snow sports at Solang Valley. Includes scenic drive and lunch.`,
    tags: ["Adventure", "Nature", "Snow"],
    weather: { temp: 16, condition: "Cool" },
    socialProof: "Chosen by 85% of young travelers visiting Himachal.",
    isSaved: false,
  },
  {
    id: 5,
    title: "Varanasi Ganga Aarti Experience",
    location: "Varanasi, Uttar Pradesh",
    category: "spiritual",
    image: "https://images.unsplash.com/photo-1601882925076-9c5a36bb87de?w=600",
    rating: 4.9,
    duration: "2 Hours",
    priceRange: "₹700 - ₹1200",
    groupSize: "2-8 people",
    aiReasoning: "Best suited for spiritual and cultural interest travelers.",
    description: `Witness the mesmerizing Ganga Aarti at Dashashwamedh Ghat with local commentary and boat view.`,
    tags: ["Spiritual", "Cultural", "Photography"],
    weather: { temp: 28, condition: "Pleasant" },
    socialProof: "Recommended by 97% travelers for its divine energy.",
    isSaved: false,
  },
  {
    id: 6,
    title: "Coorg Coffee Plantation Trail",
    location: "Coorg, Karnataka",
    category: "nature",
    image: "https://images.unsplash.com/photo-1570464197285-993f4c0c1c5e?w=600",
    rating: 4.6,
    duration: "Half Day",
    priceRange: "₹1200 - ₹2000",
    groupSize: "2-10 people",
    aiReasoning: "Ideal for nature lovers and coffee enthusiasts.",
    description: `Explore aromatic coffee estates and learn the art of coffee making. Includes tasting and local lunch.`,
    tags: ["Nature", "Food", "Relaxing"],
    weather: { temp: 24, condition: "Cloudy" },
    socialProof: "Loved by 88% of eco-travelers visiting South India.",
    isSaved: false,
  },
  {
    id: 7,
    title: "Rishikesh River Rafting",
    location: "Rishikesh, Uttarakhand",
    category: "adventure",
    image: "https://images.unsplash.com/photo-1561291386-5c9a0f5d5d4b?w=600",
    rating: 4.8,
    duration: "3 Hours",
    priceRange: "₹900 - ₹1500",
    groupSize: "4-12 people",
    aiReasoning: "Perfect for thrill seekers and nature explorers.",
    description: `Navigate the Ganga rapids with trained instructors. Includes safety gear and riverside refreshments.`,
    tags: ["Adventure", "Water Sports", "Group Fun"],
    weather: { temp: 27, condition: "Sunny" },
    socialProof: "Voted top rafting destination in India by 2024 travel polls.",
    isSaved: false,
  },
  {
    id: 8,
    title: "Udaipur Lake Palace Tour",
    location: "Udaipur, Rajasthan",
    category: "destination",
    image: "https://images.unsplash.com/photo-1600172454523-08b62c3b1a84?w=600",
    rating: 4.9,
    duration: "Half Day",
    priceRange: "₹2500 - ₹4000",
    groupSize: "2-8 people",
    aiReasoning: "Perfect for couples and luxury travelers.",
    description: `Enjoy a royal boat ride and guided palace tour with lake views and local Rajasthani cuisine.`,
    tags: ["Luxury", "Romantic", "Cultural"],
    weather: { temp: 30, condition: "Clear" },
    socialProof: "Highly rated by honeymooners and royal heritage fans.",
    isSaved: false,
  },
  {
    id: 9,
    title: "Leh-Ladakh Scenic Drive",
    location: "Ladakh, India",
    category: "adventure",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600",
    rating: 5.0,
    duration: "2 Days",
    priceRange: "₹4500 - ₹7500",
    groupSize: "2-6 people",
    aiReasoning: "Great match for adventure and photography lovers.",
    description: `Experience the breathtaking beauty of Pangong Lake and Khardung La pass. Includes meals and stay.`,
    tags: ["Adventure", "Scenic", "Photography"],
    weather: { temp: 12, condition: "Cold" },
    socialProof: "Rated 5★ by 98% adventure enthusiasts.",
    isSaved: false,
  },
  {
    id: 10,
    title: "Munnar Tea Garden Experience",
    location: "Munnar, Kerala",
    category: "nature",
    image: "https://images.unsplash.com/photo-1549887534-3db1bd59dcca?w=600",
    rating: 4.7,
    duration: "Half Day",
    priceRange: "₹1000 - ₹1600",
    groupSize: "2-10 people",
    aiReasoning: "Ideal for peaceful nature lovers and photography enthusiasts.",
    description: `Walk through lush tea estates, visit a tea factory, and enjoy tasting sessions in scenic surroundings.`,
    tags: ["Nature", "Relaxing", "Photography"],
    weather: { temp: 23, condition: "Mild" },
    socialProof: "Featured as ‘Most Serene Experience’ by Kerala Tourism.",
    isSaved: false,
  },
  {
    id: 11,
    title: "Khajuraho Temple Tour",
    location: "Khajuraho, Madhya Pradesh",
    category: "heritage",
    image: "https://images.unsplash.com/photo-1602763333177-2c853252b65d?w=600",
    rating: 4.8,
    duration: "2 Hours",
    priceRange: "₹700 - ₹1200",
    groupSize: "2-10 people",
    aiReasoning: "Perfect for history and architecture lovers.",
    description: `Discover UNESCO World Heritage temples with expert guides explaining ancient carvings and stories.`,
    tags: ["Historical", "Culture", "UNESCO"],
    weather: { temp: 32, condition: "Hot" },
    socialProof: "Visited by 1M+ tourists every year for its architectural brilliance.",
    isSaved: false,
  },
  {
    id: 12,
    title: "Andaman Island Snorkeling",
    location: "Havelock, Andaman & Nicobar",
    category: "water sports",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
    rating: 4.9,
    duration: "3 Hours",
    priceRange: "₹3000 - ₹4500",
    groupSize: "2-10 people",
    aiReasoning: "Great fit for adventure and sea-life lovers.",
    description: `Dive into turquoise waters to witness vibrant coral reefs and tropical fish with certified instructors.`,
    tags: ["Adventure", "Sea", "Scenic"],
    weather: { temp: 29, condition: "Sunny" },
    socialProof: "Top-rated water activity in Andaman by travel blogs.",
    isSaved: false,
  }
];


  // Mock hidden gems data
  const mockHiddenGems = [
    {
      id: 1,
      name: "Promenade Plantée",
      location: "12th Arrondissement",
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400",
      authenticityScore: 9.2,
      description: "An elevated park built on former railway tracks, offering a unique perspective of Paris away from tourist crowds.",
      recentVisitors: 23,
      lastUpdated: "2 days ago",
      localInsight: "Best visited early morning when locals jog here. The viaduct shops below are perfect for unique souvenirs.",
      localSource: "Marie, Local Guide",
      tags: ["Nature", "Walking", "Photography", "Peaceful"]
    },
    {
      id: 2,
      name: "Musée de la Chasse",
      location: "3rd Arrondissement",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
      authenticityScore: 8.7,
      description: "A quirky museum dedicated to hunting and nature in a beautiful 17th-century mansion.",
      recentVisitors: 12,
      lastUpdated: "1 week ago",
      localInsight: "The contemporary art exhibitions here are surprisingly thought-provoking. Don\'t miss the rooftop garden.",
      localSource: "Jean-Pierre, Art Critic",
      tags: ["Museums", "Art", "Unique", "Historical"]
    },
    {
      id: 3,
      name: "Marché des Enfants Rouges",
      location: "3rd Arrondissement",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
      authenticityScore: 9.5,
      description: "Paris's oldest covered market, serving authentic international cuisine in a vibrant atmosphere.",
      recentVisitors: 45,
      lastUpdated: "Yesterday",
      localInsight: "Try the Moroccan tagine at L\'Estaminet - it\'s been family-run for 30 years. Avoid lunch rush.",
      localSource: "Fatima, Market Vendor",
      tags: ["Food", "Markets", "Authentic", "International"]
    }
  ];

  // Mock group votes
  const mockGroupVotes = [
    { id: 1, recommendationId: 1, user: "Alex", type: "up", timestamp: new Date() },
    { id: 2, recommendationId: 1, user: "Sarah", type: "up", timestamp: new Date() },
    { id: 3, recommendationId: 2, user: "Mike", type: "up", timestamp: new Date() },
    { id: 4, recommendationId: 3, user: "Emma", type: "down", timestamp: new Date() }
  ];

  useEffect(() => {
    setGroupVotes(mockGroupVotes);
  }, []);

  const handleVote = (recommendationId, voteType) => {
    const newVote = {
      id: Date.now(),
      recommendationId,
      user: "You",
      type: voteType,
      timestamp: new Date()
    };
    setGroupVotes(prev => [...prev, newVote]);
    
    // Update learning data
    setLearningData(prev => ({
      ...prev,
      votingHistory: [...prev?.votingHistory, { recommendationId, voteType, timestamp: new Date() }]
    }));
  };

  const handleSave = (recommendationId) => {
    setSavedRecommendations(prev => 
      prev?.includes(recommendationId)
        ? prev?.filter(id => id !== recommendationId)
        : [...prev, recommendationId]
    );
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleFiltersReset = () => {
    setFilters({
      search: '',
      categories: [],
      budgetRange: '',
      groupSize: '',
      duration: '',
      accessibility: false,
      hiddenGems: false,
      weatherOptimal: false,
      distance: 50
    });
  };

  const handleSwipe = (recommendationId, direction) => {
    const voteType = direction === 'right' ? 'up' : 'down';
    handleVote(recommendationId, voteType);
  };

  const handleGemSelect = (gem) => {
    console.log('Selected gem:', gem);
  };

  const handleBudgetOptimize = (selectedAlternatives) => {
    console.log('Optimizing budget with:', selectedAlternatives);
  };

  const filteredRecommendations = mockRecommendations?.filter(rec => {
    if (filters?.search && !rec?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) && 
        !rec?.location?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
      return false;
    }
    if (filters?.categories?.length > 0 && !filters?.categories?.includes(rec?.category)) {
      return false;
    }
    if (filters?.hiddenGems && rec?.rating > 4.5) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="font-poppins font-bold text-3xl text-foreground mb-2">
                  Smart Recommendations
                </h1>
                <p className="text-muted-foreground">
                  AI-powered suggestions tailored for your group's perfect trip
                </p>
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  iconName="Grid3X3"
                  iconSize={16}
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'swipe' ? 'default' : 'ghost'}
                  size="sm"
                  iconName="Smartphone"
                  iconSize={16}
                  onClick={() => setViewMode('swipe')}
                >
                  Swipe
                </Button>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Sparkles" size={16} className="text-accent" />
                <span>{filteredRecommendations?.length} personalized suggestions</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-secondary" />
                <span>{groupVotes?.length} group votes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Heart" size={16} className="text-error" />
                <span>{savedRecommendations?.length} saved</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={16} className="text-success" />
                <span>Learning from your preferences</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <FilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onReset={handleFiltersReset}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
              />
              
              <WeatherWidget location="Paris, France" />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-8">
              {/* Recommendations */}
              {viewMode === 'grid' ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredRecommendations?.map((recommendation) => (
                      <RecommendationCard
                        key={recommendation?.id}
                        recommendation={recommendation}
                        onVote={handleVote}
                        onSave={handleSave}
                        groupVotes={groupVotes}
                        currentUserId={1}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex justify-center">
                  <SwipeDiscovery
                    recommendations={filteredRecommendations}
                    onSwipe={handleSwipe}
                    onVote={handleVote}
                  />
                </div>
              )}

              {/* Hidden Gems Section */}
              <HiddenGemsSection
                gems={mockHiddenGems}
                onGemSelect={handleGemSelect}
              />

              {/* Budget Optimizer */}
              <BudgetOptimizer
                recommendations={filteredRecommendations}
                groupBudget={2000}
                onOptimize={handleBudgetOptimize}
              />

              {/* Learning Insights */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon name="Brain" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-xl">Learning Insights</h3>
                    <p className="text-sm text-muted-foreground">
                      How we're personalizing your experience
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-background rounded-lg p-4 border border-border">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Heart" size={16} className="text-error" />
                      <span className="font-medium text-sm">Group Preferences</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your group loves cultural experiences and authentic local food
                    </p>
                  </div>
                  
                  <div className="bg-background rounded-lg p-4 border border-border">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Clock" size={16} className="text-accent" />
                      <span className="font-medium text-sm">Timing Patterns</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      You prefer 2-3 hour activities with flexible scheduling
                    </p>
                  </div>
                  
                  <div className="bg-background rounded-lg p-4 border border-border">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="DollarSign" size={16} className="text-success" />
                      <span className="font-medium text-sm">Budget Insights</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Sweet spot: $45-85 per person for premium experiences
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SmartRecommendations;