import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TripCard = ({ trip, onViewDetails }) => {
  const [isLiked, setIsLiked] = useState(trip?.isLiked || false);
  const [likeCount, setLikeCount] = useState(trip?.likes || 0);

  const handleLike = (e) => {
    e?.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const formatBudget = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };


  return (
    <div 
      className="bg-card rounded-xl shadow-soft hover:shadow-collaborative transition-organic cursor-pointer group overflow-hidden"
      onClick={() => onViewDetails(trip)}
      style={{ height: `${trip?.cardHeight}px` }}
    >
      {/* Main Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={trip?.mainImage}
          alt={trip?.destination}
          className="w-full h-full object-cover group-hover:scale-105 transition-organic"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Like Button */}
        <button
          onClick={handleLike}
          className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-organic"
        >
          <Icon 
            name={isLiked ? "Heart" : "Heart"} 
            size={18} 
            color={isLiked ? "#FF6B6B" : "#718096"}
            className={isLiked ? "fill-current" : ""}
          />
        </button>

        {/* Trip Type Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-primary/90 backdrop-blur-sm rounded-full">
          <span className="text-xs font-medium text-primary-foreground">
            {trip?.tripType}
          </span>
        </div>

        {/* Destination */}
        <div className="absolute bottom-3 left-3 right-16">
          <h3 className="text-lg font-poppins font-bold text-white mb-1">
            {trip?.destination}
          </h3>
          <p className="text-sm text-white/80">
            {trip?.duration} • {trip?.groupSize} travelers
          </p>
        </div>
      </div>
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Group Photos */}
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            {trip?.groupPhotos?.slice(0, 4)?.map((photo, index) => (
              <div key={index} className="w-8 h-8 rounded-full border-2 border-background overflow-hidden">
                <Image
                  src={photo}
                  alt={`Traveler ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {trip?.groupPhotos?.length > 4 && (
              <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                <span className="text-xs font-medium text-muted-foreground">
                  +{trip?.groupPhotos?.length - 4}
                </span>
              </div>
            )}
          </div>
          <span className="text-sm text-muted-foreground">
            by {trip?.organizer}
          </span>
        </div>

        {/* Highlights */}
        <div className="space-y-2">
          {trip?.highlights?.slice(0, 2)?.map((highlight, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-sm text-foreground">{highlight}</span>
            </div>
          ))}
        </div>

        {/* Budget & Stats */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Budget</p>
              <p className="text-sm font-semibold text-foreground">
                {formatBudget(trip?.totalBudget)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Rating</p>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} color="#FFE66D" className="fill-current" />
                <span className="text-sm font-semibold text-foreground">
                  {trip?.rating}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Heart" size={14} />
              <span className="text-xs">{likeCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MessageCircle" size={14} />
              <span className="text-xs">{trip?.comments}</span>
            </div>
          </div>
        </div>

        {/* Collaboration Stats */}
        <div className="bg-muted/50 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Planning Time</span>
            <span className="text-xs font-medium text-foreground">{trip?.planningDays} days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Decisions Made</span>
            <span className="text-xs font-medium text-foreground">{trip?.decisionsCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Consensus Rate</span>
            <span className="text-xs font-medium text-success">{trip?.consensusRate}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;