import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SwipeDiscovery = ({ recommendations, onSwipe, onVote }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef(null);

  const currentRecommendation = recommendations?.[currentIndex];

  const handleSwipe = (direction) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSwipeDirection(direction);
    
    setTimeout(() => {
      onSwipe(currentRecommendation?.id, direction);
      setCurrentIndex((prev) => (prev + 1) % recommendations?.length);
      setSwipeDirection(null);
      setIsAnimating(false);
    }, 300);
  };

  const handleVote = (type) => {
    onVote(currentRecommendation?.id, type);
    handleSwipe(type === 'up' ? 'right' : 'left');
  };

  if (!currentRecommendation) {
    return (
      <div className="bg-card rounded-xl border border-border p-8 text-center">
        <Icon name="RefreshCw" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="font-poppins font-semibold text-lg mb-2">No more recommendations</h3>
        <p className="text-muted-foreground mb-4">You've seen all available suggestions!</p>
        <Button variant="default" iconName="RotateCcw" iconPosition="left">
          Start Over
        </Button>
      </div>
    );
  }

  return (
    <div className="relative max-w-sm mx-auto">
      {/* Card Stack Preview */}
      <div className="relative h-96">
        {/* Background Cards */}
        {recommendations?.slice(currentIndex + 1, currentIndex + 3)?.map((rec, index) => (
          <div
            key={rec?.id}
            className="absolute inset-0 bg-card rounded-xl border border-border shadow-soft"
            style={{
              transform: `scale(${0.95 - index * 0.05}) translateY(${index * 8}px)`,
              zIndex: 10 - index,
              opacity: 0.7 - index * 0.2
            }}
          />
        ))}

        {/* Main Card */}
        <div
          ref={cardRef}
          className={`absolute inset-0 bg-card rounded-xl border border-border shadow-collaborative overflow-hidden cursor-grab active:cursor-grabbing transition-transform duration-300 ${
            isAnimating ? (swipeDirection === 'right' ? 'translate-x-full rotate-12' : 
                          swipeDirection === 'left' ? '-translate-x-full -rotate-12' : '') : ''
          }`}
          style={{ zIndex: 20 }}
        >
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={currentRecommendation?.image}
              alt={currentRecommendation?.title}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay Indicators */}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
              swipeDirection === 'right' ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="bg-success/90 backdrop-blur-sm rounded-full p-4">
                <Icon name="Heart" size={32} className="text-white" />
              </div>
            </div>
            
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
              swipeDirection === 'left' ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="bg-error/90 backdrop-blur-sm rounded-full p-4">
                <Icon name="X" size={32} className="text-white" />
              </div>
            </div>

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                currentRecommendation?.category === 'destination' ?'bg-primary text-primary-foreground'
                  : currentRecommendation?.category === 'activity' ?'bg-secondary text-secondary-foreground' :'bg-accent text-accent-foreground'
              }`}>
                {currentRecommendation?.category}
              </span>
            </div>

            {/* Rating */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-accent fill-current" />
                <span className="text-sm font-medium">{currentRecommendation?.rating}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 h-48 overflow-y-auto">
            <h3 className="font-poppins font-semibold text-lg mb-1">
              {currentRecommendation?.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              {currentRecommendation?.location}
            </p>

            {/* AI Reasoning */}
            <div className="bg-accent/10 rounded-lg p-3 mb-3">
              <div className="flex items-start space-x-2">
                <Icon name="Sparkles" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                <p className="text-xs text-foreground">
                  {currentRecommendation?.aiReasoning}
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} className="text-muted-foreground" />
                <span className="text-xs">{currentRecommendation?.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="DollarSign" size={14} className="text-muted-foreground" />
                <span className="text-xs">{currentRecommendation?.priceRange}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={14} className="text-muted-foreground" />
                <span className="text-xs">{currentRecommendation?.groupSize}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} className="text-muted-foreground" />
                <span className="text-xs">{currentRecommendation?.distance}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-muted-foreground line-clamp-3">
              {currentRecommendation?.description}
            </p>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-center space-x-6 mt-6">
        <Button
          variant="outline"
          size="lg"
          iconName="X"
          iconSize={24}
          onClick={() => handleVote('down')}
          className="w-14 h-14 rounded-full border-error text-error hover:bg-error hover:text-white transition-organic"
          disabled={isAnimating}
        />
        
        <Button
          variant="ghost"
          size="lg"
          iconName="Info"
          iconSize={20}
          className="w-12 h-12 rounded-full"
          disabled={isAnimating}
        />
        
        <Button
          variant="outline"
          size="lg"
          iconName="Heart"
          iconSize={24}
          onClick={() => handleVote('up')}
          className="w-14 h-14 rounded-full border-success text-success hover:bg-success hover:text-white transition-organic"
          disabled={isAnimating}
        />
      </div>
      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-2 mt-4">
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} of {recommendations?.length}
        </span>
        <div className="w-24 h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / recommendations?.length) * 100}%` }}
          />
        </div>
      </div>
      {/* Swipe Instructions */}
      <div className="text-center mt-4">
        <p className="text-xs text-muted-foreground">
          Swipe right to like • Swipe left to pass
        </p>
      </div>
    </div>
  );
};

export default SwipeDiscovery;