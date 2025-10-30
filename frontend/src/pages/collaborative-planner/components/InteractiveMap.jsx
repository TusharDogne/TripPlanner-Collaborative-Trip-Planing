import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const InteractiveMap = ({ suggestions, onSuggestionClick, activeUsers, selectedSuggestion }) => {
  // 🌍 Default location set to Goa, India
  const [mapCenter, setMapCenter] = useState({ lat: 15.2993, lng: 74.1240 });
  const [zoomLevel, setZoomLevel] = useState(12);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 8));
  };

  const getSuggestionColor = (userId) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38BA8'];
    return colors?.[userId % colors?.length];
  };

  if (isLoading) {
    return (
      <div className="h-full bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading interactive map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full bg-card rounded-lg overflow-hidden border border-border">
      {/* Map Container */}
      <div className="absolute inset-0">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Trip Planning Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=${zoomLevel}&output=embed`}
          className="border-0"
        />
      </div>
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 bg-background border border-border rounded-lg shadow-soft flex items-center justify-center hover:bg-muted transition-organic"
        >
          <Icon name="Plus" size={16} />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-10 h-10 bg-background border border-border rounded-lg shadow-soft flex items-center justify-center hover:bg-muted transition-organic"
        >
          <Icon name="Minus" size={16} />
        </button>
      </div>
      {/* Suggestion Pins Overlay */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {suggestions?.map((suggestion, index) => (
          <div
            key={suggestion?.id}
            className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-full"
            style={{
              left: `${30 + (index * 15) % 60}%`,
              top: `${40 + (index * 10) % 40}%`,
            }}
            onClick={() => onSuggestionClick(suggestion)}
          >
            <div
              className={`relative w-8 h-8 rounded-full border-2 border-white shadow-collaborative transition-transform hover:scale-110 ${
                selectedSuggestion?.id === suggestion?.id ? 'scale-125 ring-2 ring-primary' : ''
              }`}
              style={{ backgroundColor: getSuggestionColor(suggestion?.addedBy?.id) }}
            >
              <Image
                src={suggestion?.addedBy?.avatar}
                alt={suggestion?.addedBy?.name}
                className="w-full h-full rounded-full object-cover"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border border-white flex items-center justify-center">
                <span className="text-xs font-bold text-accent-foreground">
                  {suggestion?.votes}
                </span>
              </div>
            </div>
            {/* Pin stem */}
            <div
              className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-4"
              style={{ backgroundColor: getSuggestionColor(suggestion?.addedBy?.id) }}
            />
          </div>
        ))}
      </div>
      {/* Active Users Indicator */}
      <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 z-10">
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            {activeUsers?.slice(0, 3)?.map((user) => (
              <div
                key={user?.id}
                className="w-6 h-6 rounded-full border-2 border-background collaborative-cursor"
                style={{ backgroundColor: getSuggestionColor(user?.id) }}
              >
                <Image
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground font-medium">
              {activeUsers?.length} exploring
            </span>
          </div>
        </div>
      </div>
      {/* Map Legend */}
      <div className="absolute bottom-4 right-4 bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 z-10">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-xs text-muted-foreground">Attractions</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary rounded-full" />
            <span className="text-xs text-muted-foreground">Restaurants</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full" />
            <span className="text-xs text-muted-foreground">Hidden Gems</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
