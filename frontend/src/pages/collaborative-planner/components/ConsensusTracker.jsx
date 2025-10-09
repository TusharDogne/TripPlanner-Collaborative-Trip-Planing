import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ConsensusTracker = ({ suggestions, groupMembers, overallConsensus }) => {
  const getConsensusColor = (level) => {
    if (level >= 80) return 'text-success bg-success/10 border-success/20';
    if (level >= 60) return 'text-warning bg-warning/10 border-warning/20';
    return 'text-muted-foreground bg-muted/50 border-border';
  };

  const getConsensusIcon = (level) => {
    if (level >= 80) return 'CheckCircle';
    if (level >= 60) return 'Clock';
    return 'AlertCircle';
  };

  const topSuggestions = suggestions?.filter(s => s?.consensusLevel > 0)?.sort((a, b) => b?.consensusLevel - a?.consensusLevel)?.slice(0, 3);

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <h3 className="font-poppins font-semibold text-foreground">
            Group Consensus
          </h3>
        </div>
        <div className={`px-3 py-1 rounded-full border ${getConsensusColor(overallConsensus)}`}>
          <div className="flex items-center space-x-2">
            <Icon name={getConsensusIcon(overallConsensus)} size={14} />
            <span className="text-sm font-medium">
              {overallConsensus}% agreed
            </span>
          </div>
        </div>
      </div>
      {/* Overall Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Overall Progress</span>
          <span className="text-sm font-medium text-foreground">
            {overallConsensus}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-500 gradient-fill"
            style={{ width: `${overallConsensus}%` }}
          />
        </div>
      </div>
      {/* Top Consensus Items */}
      {topSuggestions?.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">
            Leading Suggestions
          </h4>
          {topSuggestions?.map((suggestion) => (
            <div
              key={suggestion?.id}
              className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg"
            >
              <Image
                src={suggestion?.image}
                alt={suggestion?.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {suggestion?.name}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex -space-x-1">
                    {Object.entries(suggestion?.reactions)?.filter(([_, count]) => count > 0)?.slice(0, 3)?.map(([type, count], index) => (
                        <div
                          key={type}
                          className="w-5 h-5 bg-background border border-border rounded-full flex items-center justify-center text-xs"
                        >
                          {type === 'love' && '❤️'}
                          {type === 'like' && '👍'}
                          {type === 'excited' && '🤩'}
                        </div>
                      ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {Object.values(suggestion?.reactions)?.reduce((a, b) => a + b, 0)} votes
                  </span>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getConsensusColor(suggestion?.consensusLevel)}`}>
                {suggestion?.consensusLevel}%
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Group Member Status */}
      <div className="mt-4 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">
          Member Activity
        </h4>
        <div className="space-y-2">
          {groupMembers?.map((member) => (
            <div key={member?.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image
                  src={member?.avatar}
                  alt={member?.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-sm text-foreground">{member?.name}</span>
                {member?.isOnline && (
                  <div className="w-2 h-2 bg-success rounded-full" />
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">
                  {member?.votesCount} votes
                </span>
                <div className={`w-2 h-2 rounded-full ${
                  member?.hasVotedRecently ? 'bg-success' : 'bg-muted'
                }`} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex space-x-2">
          <button className="flex-1 py-2 px-3 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-organic">
            Finalize Top Picks
          </button>
          <button className="flex-1 py-2 px-3 bg-muted text-muted-foreground rounded-lg text-sm font-medium hover:bg-muted/80 transition-organic">
            Need More Votes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsensusTracker;