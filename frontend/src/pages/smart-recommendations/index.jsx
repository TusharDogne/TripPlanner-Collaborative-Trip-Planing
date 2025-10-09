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
      title: "Eiffel Tower Skip-the-Line Tour",
      location: "Paris, France",
      category: "destination",
      image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600",
      rating: 4.8,
      duration: "2-3 hours",
      priceRange: "$45-65",
      groupSize: "2-8 people",
      distance: "2.5km from center",
      aiReasoning: "Perfect for your group\'s adventure level and matches your cultural interests. Skip-the-line access saves valuable time for other activities.",
      description: `Experience Paris's most iconic landmark with priority access and expert guidance. This tour includes elevator access to the second floor with optional summit upgrade, providing breathtaking panoramic views of the City of Light. Learn about the tower's fascinating history and engineering marvels while avoiding the typical 2-hour queues.`,
      tags: ["Cultural", "Photography", "Must-see", "Skip-the-line"],
      weather: { temp: 22, condition: "Sunny" },
      socialProof: "87% of similar groups (friends aged 25-35) rated this experience as 'excellent' and would recommend it to others.",
      isSaved: false
    },
    {
      id: 2,
      title: "Seine River Sunset Cruise",
      location: "Paris, France",
      category: "activity",
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=600",
      rating: 4.6,
      duration: "1.5 hours",
      priceRange: "$25-40",
      groupSize: "2-12 people",
      distance: "1km from center",
      aiReasoning: "Ideal for your group\'s romantic preferences and budget-conscious approach. Golden hour timing creates perfect photo opportunities.",
      description: `Glide along the Seine River during the magical golden hour, witnessing Paris transform as the sun sets behind its historic monuments. Pass by Notre-Dame, the Louvre, and other iconic landmarks while enjoying complimentary champagne and French pastries. The boat features panoramic windows and an open-air deck for optimal viewing.`,
      tags: ["Romantic", "Photography", "Relaxing", "Scenic"],
      weather: { temp: 20, condition: "Clear" },
      socialProof: "Featured in \'Top 10 Paris Experiences\' by 3 travel blogs this month.",
      isSaved: true
    },
    {
      id: 3,
      title: "Montmartre Food Walking Tour",
      location: "Montmartre, Paris",
      category: "dining",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600",
      rating: 4.9,
      duration: "3 hours",
      priceRange: "$75-95",
      groupSize: "4-10 people",
      distance: "3.2km from center",
      aiReasoning: "Matches your group\'s foodie interests and desire for authentic local experiences. Small group size ensures personalized attention.",
      description: `Discover the culinary secrets of Montmartre through this immersive food tour led by local chefs. Visit traditional fromageries, boulangeries, and hidden bistros while learning about French culinary traditions. Includes tastings of artisanal cheeses, fresh pastries, wine pairings, and a full meal at a family-owned restaurant.`,
      tags: ["Food & Drink", "Local Culture", "Walking", "Authentic"],
      weather: { temp: 18, condition: "Partly Cloudy" },
      socialProof: "Rated #1 food tour in Paris by 2,400+ travelers on multiple platforms.",
      isSaved: false
    },
    {
      id: 4,
      title: "Versailles Palace Day Trip",
      location: "Versailles, France",
      category: "destination",
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=600",
      rating: 4.7,
      duration: "Full day",
      priceRange: "$65-85",
      groupSize: "2-15 people",
      distance: "35km from Paris",
      aiReasoning: "Perfect for your group\'s interest in history and architecture. Full-day format allows thorough exploration without rushing.",
      description: `Step into the opulent world of French royalty with this comprehensive Versailles experience. Explore the magnificent palace rooms, Hall of Mirrors, and the stunning gardens designed by André Le Nôtre. Includes round-trip transportation from Paris, skip-the-line tickets, and audio guide in multiple languages.`,
      tags: ["Historical", "Architecture", "Gardens", "Day Trip"],
      weather: { temp: 24, condition: "Sunny" },
      socialProof: "Consistently rated as a 'must-do' experience by 95% of visitors.",
      isSaved: false
    },
    {
      id: 5,
      title: "Latin Quarter Evening Stroll",
      location: "Latin Quarter, Paris",
      category: "activity",
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=600",
      rating: 4.4,
      duration: "2 hours",
      priceRange: "$15-25",
      groupSize: "2-6 people",
      distance: "1.8km from center",
      aiReasoning: "Budget-friendly option that aligns with your group\'s preference for authentic neighborhood experiences.",
      description: `Wander through the historic Latin Quarter's winding medieval streets, discovering hidden courtyards, ancient churches, and vibrant student life. This self-guided tour includes stops at Shakespeare and Company bookstore, Panthéon, and traditional cafés where Hemingway once wrote.`,
      tags: ["Walking", "Historical", "Budget-friendly", "Literary"],
      weather: { temp: 19, condition: "Clear" },
      socialProof: "Recommended by 78% of solo travelers and small groups.",
      isSaved: false
    },
    {
      id: 6,
      title: "Louvre Museum Private Tour",
      location: "Paris, France",
      category: "destination",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600",
      rating: 4.9,
      duration: "3 hours",
      priceRange: "$120-180",
      groupSize: "2-8 people",
      distance: "1.2km from center",
      aiReasoning: "Premium experience matching your group\'s art appreciation and preference for personalized tours.",
      description: `Navigate the world's largest art museum with an expert art historian guide. Focus on masterpieces including the Mona Lisa, Venus de Milo, and Winged Victory while learning fascinating stories behind each piece. Private tour ensures personalized pace and detailed explanations.`,
      tags: ["Art", "Museums", "Private Tour", "Premium"],
      weather: { temp: 21, condition: "Indoor" },
      socialProof: "Rated \'exceptional\' by 94% of art enthusiasts and cultural travelers.",
      isSaved: true
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