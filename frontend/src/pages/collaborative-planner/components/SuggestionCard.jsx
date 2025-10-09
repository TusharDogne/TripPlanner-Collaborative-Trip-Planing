import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SuggestionCard = ({ suggestion, onVote, onComment, isSelected, onSelect }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleVote = (type) => {
    onVote(suggestion?.id, type);
  };

  const handleComment = () => {
    if (newComment?.trim()) {
      onComment(suggestion?.id, newComment);
      setNewComment("");
    }
  };

  const getBudgetColor = (impact) => {
    switch (impact) {
      case 'low': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'high': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getVoteEmoji = (type) => {
    const emojis = {
      love: '❤️',
      like: '👍',
      excited: '🤩',
      maybe: '🤔',
      dislike: '👎'
    };
    return emojis?.[type] || '👍';
  };

  return (
    <div
      className={`bg-card border border-border rounded-lg p-4 transition-organic cursor-pointer ${
        isSelected ? 'ring-2 ring-primary shadow-collaborative' : 'hover:shadow-soft'
      }`}
      onClick={() => onSelect(suggestion)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Image
            src={suggestion?.addedBy?.avatar}
            alt={suggestion?.addedBy?.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <h3 className="font-poppins font-semibold text-foreground">
              {suggestion?.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              Added by {suggestion?.addedBy?.name}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBudgetColor(suggestion?.budgetImpact)}`}>
            {suggestion?.budgetImpact} cost
          </span>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="text-accent fill-current" />
            <span className="text-sm font-medium text-foreground">
              {suggestion?.rating}
            </span>
          </div>
        </div>
      </div>
      {/* Image */}
      <div className="relative mb-3 overflow-hidden rounded-lg">
        <Image
          src={suggestion?.image}
          alt={suggestion?.name}
          className="w-full h-32 object-cover"
        />
        <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-xs font-medium text-foreground">
            ${suggestion?.estimatedCost}
          </span>
        </div>
      </div>
      {/* Description */}
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {suggestion?.description}
      </p>
      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {suggestion?.tags?.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      {/* Voting Section */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-1">
          {Object.entries(suggestion?.reactions)?.map(([type, count]) => (
            count > 0 && (
              <button
                key={type}
                onClick={(e) => {
                  e?.stopPropagation();
                  handleVote(type);
                }}
                className="flex items-center space-x-1 px-2 py-1 bg-muted hover:bg-muted/80 rounded-full transition-organic vote-bounce"
              >
                <span className="text-sm">{getVoteEmoji(type)}</span>
                <span className="text-xs font-medium text-muted-foreground">
                  {count}
                </span>
              </button>
            )
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="MessageCircle"
          iconSize={14}
          onClick={(e) => {
            e?.stopPropagation();
            setShowComments(!showComments);
          }}
        >
          {suggestion?.comments?.length}
        </Button>
      </div>
      {/* Quick Vote Buttons */}
      <div className="flex items-center space-x-2 mb-3">
        {['love', 'like', 'excited', 'maybe']?.map((type) => (
          <button
            key={type}
            onClick={(e) => {
              e?.stopPropagation();
              handleVote(type);
            }}
            className="flex-1 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-organic text-center vote-bounce"
          >
            <span className="text-lg">{getVoteEmoji(type)}</span>
          </button>
        ))}
      </div>
      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-border pt-3 space-y-3">
          {suggestion?.comments?.map((comment) => (
            <div key={comment?.id} className="flex space-x-2">
              <Image
                src={comment?.user?.avatar}
                alt={comment?.user?.name}
                className="w-6 h-6 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="bg-muted rounded-lg px-3 py-2">
                  <p className="text-xs font-medium text-foreground mb-1">
                    {comment?.user?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {comment?.content}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {comment?.timestamp?.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {/* Add Comment */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e?.target?.value)}
              placeholder="Add a comment..."
              className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              onKeyPress={(e) => e?.key === 'Enter' && handleComment()}
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Send"
              iconSize={14}
              onClick={handleComment}
              disabled={!newComment?.trim()}
            />
          </div>
        </div>
      )}
      {/* Consensus Indicator */}
      {suggestion?.consensusLevel > 70 && (
        <div className="mt-3 flex items-center space-x-2 px-3 py-2 bg-success/10 border border-success/20 rounded-lg">
          <Icon name="CheckCircle" size={16} className="text-success" />
          <span className="text-sm font-medium text-success">
            Group consensus reached! ({suggestion?.consensusLevel}%)
          </span>
        </div>
      )}
    </div>
  );
};

export default SuggestionCard;