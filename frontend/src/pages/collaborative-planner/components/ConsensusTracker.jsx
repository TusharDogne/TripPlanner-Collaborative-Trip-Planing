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
    <div>
      
    </div>
  );
};

export default ConsensusTracker;