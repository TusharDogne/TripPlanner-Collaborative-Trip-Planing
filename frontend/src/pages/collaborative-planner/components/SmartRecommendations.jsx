import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SmartRecommendations = ({ onAddSuggestion, groupPreferences, budget }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All', icon: 'Sparkles' },
    { id: 'attractions', label: 'Attractions', icon: 'Camera' },
    { id: 'restaurants', label: 'Food', icon: 'UtensilsCrossed' },
    { id: 'activities', label: 'Activities', icon: 'Activity' },
    { id: 'hidden', label: 'Hidden Gems', icon: 'Eye' }
  ];

  useEffect(() => {
    // Simulate AI recommendation loading
    const timer = setTimeout(() => {
      setRecommendations([
        {
          id: 'rec-1',
          name: 'Central Park Conservatory Garden',
          category: 'attractions',
          description: `A hidden oasis in Central Park featuring three distinct garden styles.\nPerfect for your group's love of photography and nature walks.`,
          image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
          rating: 4.7,
          estimatedCost: 0,
          budgetFit: 'perfect',
          aiReason: `Recommended because your group enjoys outdoor activities and photography.\nFree admission fits your budget perfectly.`,
          tags: ['Free', 'Photography', 'Nature', 'Peaceful'],
          weatherSuitability: 'excellent',
          crowdLevel: 'low',
          bestTime: 'Morning (8-10 AM)',
          confidence: 92
        },
        {
          id: 'rec-2',
          name: 'Joe\'s Pizza - Greenwich Village',
          category: 'restaurants',
          description: `Authentic NYC pizza experience loved by locals and visitors alike.\nMatches your group's preference for casual, authentic dining.`,
          image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
          rating: 4.5,
          estimatedCost: 25,
          budgetFit: 'good',
          aiReason: `Perfect for your group size and budget.\nHighly rated for authentic NYC experience.`,
          tags: ['Authentic', 'Casual', 'Local Favorite', 'Quick'],
          weatherSuitability: 'any',
          crowdLevel: 'medium',
          bestTime: 'Lunch (12-2 PM)',
          confidence: 88
        },
        {
          id: 'rec-3',
          name: 'Brooklyn Bridge at Sunrise',
          category: 'activities',
          description: `Iconic bridge walk with stunning city views and perfect lighting.\nIdeal for your group's early risers and photography enthusiasts.`,
          image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400',
          rating: 4.9,
          estimatedCost: 0,
          budgetFit: 'perfect',
          aiReason: `Free activity with incredible photo opportunities.\nBest experienced at sunrise for fewer crowds.`,
          tags: ['Free', 'Iconic', 'Photography', 'Exercise'],
          weatherSuitability: 'good',
          crowdLevel: 'low',
          bestTime: 'Sunrise (6-7 AM)',
          confidence: 95
        },
        {
          id: 'rec-4',
          name: 'The High Line Secret Garden',
          category: 'hidden',
          description: `Lesser-known section of the High Line with unique art installations.\nPerfect for your group's interest in art and unique experiences.`,
          image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400',
          rating: 4.6,
          estimatedCost: 0,
          budgetFit: 'perfect',
          aiReason: `Hidden gem that most tourists miss.\nCombines art, nature, and city views.`,
          tags: ['Hidden Gem', 'Art', 'Free', 'Unique'],
          weatherSuitability: 'excellent',
          crowdLevel: 'very low',
          bestTime: 'Late afternoon (4-6 PM)',
          confidence: 90
        }
      ]);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [groupPreferences, budget]);

  const getBudgetFitColor = (fit) => {
    switch (fit) {
      case 'perfect': return 'text-success bg-success/10 border-success/20';
      case 'good': return 'text-warning bg-warning/10 border-warning/20';
      case 'stretch': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getWeatherIcon = (suitability) => {
    switch (suitability) {
      case 'excellent': return 'Sun';
      case 'good': return 'CloudSun';
      case 'any': return 'Cloud';
      default: return 'CloudRain';
    }
  };

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations?.filter(rec => rec?.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="font-poppins font-semibold text-foreground mb-2">
            AI is analyzing your preferences...
          </h3>
          <p className="text-muted-foreground text-sm">
            Finding perfect matches for your group
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Sparkles" size={20} className="text-primary" />
            <h3 className="font-poppins font-semibold text-foreground">
              Smart Recommendations
            </h3>
          </div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Zap" size={14} />
            <span>AI-powered</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex space-x-1 overflow-x-auto">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-organic ${
                selectedCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={category?.icon} size={14} />
              <span className="text-sm font-medium">{category?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Recommendations List */}
      <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
        {filteredRecommendations?.map((rec) => (
          <div
            key={rec?.id}
            className="border border-border rounded-lg p-4 hover:shadow-soft transition-organic"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-poppins font-semibold text-foreground">
                    {rec?.name}
                  </h4>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} className="text-accent fill-current" />
                    <span className="text-xs font-medium text-foreground">
                      {rec?.rating}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getBudgetFitColor(rec?.budgetFit)}`}>
                    {rec?.budgetFit} fit
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ${rec?.estimatedCost} per person
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Confidence</div>
                  <div className="text-sm font-medium text-primary">
                    {rec?.confidence}%
                  </div>
                </div>
              </div>
            </div>

            {/* Image and Description */}
            <div className="flex space-x-3 mb-3">
              <Image
                src={rec?.image}
                alt={rec?.name}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {rec?.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {rec?.tags?.slice(0, 3)?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Reasoning */}
            <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 mb-3">
              <div className="flex items-start space-x-2">
                <Icon name="Brain" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-primary mb-1">
                    Why this matches your group:
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {rec?.aiReason}
                  </p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="text-center">
                <Icon name={getWeatherIcon(rec?.weatherSuitability)} size={16} className="text-muted-foreground mx-auto mb-1" />
                <div className="text-xs text-muted-foreground">Weather</div>
                <div className="text-xs font-medium text-foreground capitalize">
                  {rec?.weatherSuitability}
                </div>
              </div>
              <div className="text-center">
                <Icon name="Users" size={16} className="text-muted-foreground mx-auto mb-1" />
                <div className="text-xs text-muted-foreground">Crowds</div>
                <div className="text-xs font-medium text-foreground capitalize">
                  {rec?.crowdLevel}
                </div>
              </div>
              <div className="text-center">
                <Icon name="Clock" size={16} className="text-muted-foreground mx-auto mb-1" />
                <div className="text-xs text-muted-foreground">Best Time</div>
                <div className="text-xs font-medium text-foreground">
                  {rec?.bestTime}
                </div>
              </div>
            </div>

            {/* Action */}
            <Button
              variant="outline"
              size="sm"
              fullWidth
              iconName="Plus"
              iconPosition="left"
              iconSize={14}
              onClick={() => onAddSuggestion({
                id: rec?.id,
                name: rec?.name,
                description: rec?.description,
                image: rec?.image,
                rating: rec?.rating,
                estimatedCost: rec?.estimatedCost,
                budgetImpact: rec?.budgetFit === 'perfect' ? 'low' : rec?.budgetFit === 'good' ? 'medium' : 'high',
                tags: rec?.tags,
                addedBy: {
                  id: 'ai',
                  name: 'AI Assistant',
                  avatar: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100'
                },
                reactions: { love: 0, like: 0, excited: 0, maybe: 0, dislike: 0 },
                comments: [],
                consensusLevel: 0,
                timestamp: new Date()
              })}
            >
              Add to Suggestions
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartRecommendations;