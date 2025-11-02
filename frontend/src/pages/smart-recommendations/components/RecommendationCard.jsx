import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecommendationCard = ({ 
  recommendation, 
  onVote, 
  onSave, 
  groupVotes = [], 
  currentUserId = 1 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (type) => {
    if (hasVoted) return;
    setHasVoted(true);
    onVote(recommendation?.id, type);
  };

  const voteCount = groupVotes?.filter(vote => vote?.recommendationId === recommendation?.id)?.length;
  const positiveVotes = groupVotes?.filter(vote => 
    vote?.recommendationId === recommendation?.id && vote?.type === 'up'
  )?.length;

  return (
    <div className="bg-card rounded-xl border border-border shadow-soft hover:shadow-collaborative transition-organic overflow-hidden">
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={recommendation?.image}
          alt={recommendation?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            recommendation?.category === 'destination' ?'bg-primary text-primary-foreground'
              : recommendation?.category === 'activity' ?'bg-secondary text-secondary-foreground' :'bg-accent text-accent-foreground'
          }`}>
            {recommendation?.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            iconName={recommendation?.isSaved ? "Heart" : "Heart"}
            iconSize={20}
            onClick={() => onSave(recommendation?.id)}
            className={`bg-white/90 backdrop-blur-sm ${
              recommendation?.isSaved ? 'text-error' : 'text-muted-foreground hover:text-error'
            }`}
          />
        </div>
        {recommendation?.weather && (
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
            <div className="flex items-center space-x-2">
              <Icon name="Sun" size={16} className="text-accent" />
              <span className="text-sm font-medium">{recommendation?.weather?.temp}°C</span>
              <span className="text-xs text-muted-foreground">{recommendation?.weather?.condition}</span>
            </div>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-poppins font-semibold text-lg text-foreground mb-1">
              {recommendation?.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {recommendation?.location}
            </p>
          </div>
          <div className="flex items-center space-x-1 ml-4">
            <Icon name="Star" size={16} className="text-accent fill-current" />
            <span className="text-sm font-medium">{recommendation?.rating}</span>
          </div>
        </div>

        {/* AI Reasoning */}
        <div className="bg-accent/10 rounded-lg p-3 mb-4">
          <div className="flex items-start space-x-2">
            <Icon name="Sparkles" size={16} className="text-accent mt-0.5 flex-shrink-0" />
            <p className="text-sm text-foreground">
              {recommendation?.aiReasoning}
            </p>
          </div>
        </div>

        {/* Key Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm">{recommendation?.duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="DollarSign" size={16} className="text-muted-foreground" />
            <span className="text-sm">{recommendation?.priceRange}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-muted-foreground" />
            <span className="text-sm">{recommendation?.groupSize}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={16} className="text-muted-foreground" />
            <span className="text-sm">{recommendation?.distance}</span>
          </div>
        </div>

        {/* Expandable Description */}
        <div className="mb-4">
          <p className={`text-sm text-muted-foreground ${
            isExpanded ? '' : 'line-clamp-2'
          }`}>
            {recommendation?.description}
          </p>
          {recommendation?.description?.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary text-sm font-medium mt-1 hover:underline"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {recommendation?.tags?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Social Proof */}
        {recommendation?.socialProof && (
          <div className="bg-muted/50 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Users" size={16} className="text-secondary" />
              <span className="text-sm font-medium">Similar groups chose this</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {recommendation?.socialProof}
            </p>
          </div>
        )}

        {/* Voting Section */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-4">
            <Button
              variant={hasVoted ? "secondary" : "outline"}
              size="sm"
              iconName="ThumbsUp"
              iconPosition="left"
              iconSize={16}
              onClick={() => handleVote('up')}
              disabled={hasVoted}
              className="vote-bounce"
            >
              Vote
            </Button>
            <Button
  variant="default"
  size="sm"
  onClick={async () => {
    try {
      // Trip ka id nikal lo (jo bhi field ka naam use ho raha ho)
      const tripId = recommendation?.id || recommendation?.tripId;

      if (!tripId) {
        alert("⚠️ Trip ID not found!");
        console.log("Trip object:", recommendation);
        return;
      }

      console.log("Sending trip ID:", tripId);

      const response = await fetch("http://localhost:8080/allTrips/addTripToMyTrips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // agar auth token chahiye backend me to uncomment karo
          "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify({ tripId: tripId }), // sirf id bhejna
      });

      if (response.ok) {
        alert(`✅ Trip "${recommendation?.title}" added successfully!`);
      } else {
        const text = await response.text();
        console.error("Error response:", text);
        alert("❌ Failed to add trip! Check backend logs or API.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("⚠️ Unable to connect to backend server!");
    }
  }}
>
  Add to My Trip
</Button>


          </div>
          
          {voteCount > 0 && (
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-1">
                {groupVotes?.filter(vote => vote?.recommendationId === recommendation?.id)?.slice(0, 3)?.map((vote, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full bg-primary border-2 border-background flex items-center justify-center"
                    >
                      <span className="text-xs text-primary-foreground font-medium">
                        {vote?.user?.charAt(0)}
                      </span>
                    </div>
                  ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {positiveVotes}/{voteCount} voted
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;