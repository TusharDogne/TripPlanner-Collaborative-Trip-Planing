import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimelineView = ({ milestones, onMilestoneAction }) => {
  const [celebratingMilestone, setCelebratingMilestone] = useState(null);
  const [completedMilestones, setCompletedMilestones] = useState(new Set());

  useEffect(() => {
    // Check for newly completed milestones
    milestones?.forEach(milestone => {
      if (milestone?.completed && !completedMilestones?.has(milestone?.id)) {
        setCelebratingMilestone(milestone?.id);
        setCompletedMilestones(prev => new Set([...prev, milestone.id]));
        
        // Clear celebration after animation
        setTimeout(() => {
          setCelebratingMilestone(null);
        }, 2000);
      }
    });
  }, [milestones, completedMilestones]);

  const getMilestoneIcon = (type) => {
    const iconMap = {
      created: 'Plus',
      friends_joined: 'Users',
      budget_agreed: 'DollarSign',
      flights_booked: 'Plane',
      accommodation_booked: 'Building',
      activities_planned: 'Calendar',
      packing_started: 'Package',
      departure: 'MapPin'
    };
    return iconMap?.[type] || 'CheckCircle';
  };

  const getMilestoneColor = (milestone) => {
    if (milestone?.completed) return 'text-success border-success bg-success/10';
    if (milestone?.current) return 'text-primary border-primary bg-primary/10';
    return 'text-muted-foreground border-muted bg-muted/10';
  };

  const getConnectorColor = (milestone, nextMilestone) => {
    if (milestone?.completed && nextMilestone?.completed) return 'bg-success';
    if (milestone?.completed) return 'bg-gradient-to-b from-success to-muted';
    return 'bg-muted';
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-poppins font-bold text-lg text-foreground">Planning Timeline</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span>{milestones?.filter(m => m?.completed)?.length}/{milestones?.length} completed</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="MoreHorizontal"
            iconSize={16}
            onClick={() => onMilestoneAction?.('menu')}
          />
        </div>
      </div>
      {/* Timeline */}
      <div className="relative">
        {milestones?.map((milestone, index) => {
          const nextMilestone = milestones?.[index + 1];
          const isCelebrating = celebratingMilestone === milestone?.id;
          
          return (
            <div key={milestone?.id} className="relative">
              {/* Timeline Item */}
              <div className="flex items-start space-x-4 pb-6">
                {/* Icon */}
                <div className="relative flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${getMilestoneColor(milestone)} ${
                    isCelebrating ? 'celebration-particles scale-110' : ''
                  }`}>
                    <Icon 
                      name={getMilestoneIcon(milestone?.type)} 
                      size={18} 
                      className={isCelebrating ? 'animate-bounce' : ''}
                    />
                  </div>
                  
                  {/* Celebration Effect */}
                  {isCelebrating && (
                    <div className="absolute inset-0 rounded-full bg-success/20 animate-ping"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-medium ${milestone?.completed ? 'text-success' : milestone?.current ? 'text-primary' : 'text-foreground'}`}>
                        {milestone?.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {milestone?.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {milestone?.dueDate && (
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(milestone?.dueDate)}
                        </span>
                      )}
                      
                      {milestone?.actionable && !milestone?.completed && (
                        <Button
                          variant="outline"
                          size="xs"
                          iconName="ArrowRight"
                          iconSize={12}
                          onClick={() => onMilestoneAction?.(milestone?.id, 'action')}
                        >
                          {milestone?.actionLabel || 'Continue'}
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Progress Details */}
                  {milestone?.progress && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">
                          {milestone?.progress?.label}
                        </span>
                        <span className="text-xs font-medium text-foreground">
                          {milestone?.progress?.current}/{milestone?.progress?.total}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            milestone?.completed ? 'bg-success' : 'bg-primary'
                          }`}
                          style={{ 
                            width: `${(milestone?.progress?.current / milestone?.progress?.total) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Contributors */}
                  {milestone?.contributors && milestone?.contributors?.length > 0 && (
                    <div className="flex items-center space-x-2 mt-3">
                      <span className="text-xs text-muted-foreground">Contributors:</span>
                      <div className="flex -space-x-1">
                        {milestone?.contributors?.slice(0, 3)?.map((contributor, idx) => (
                          <div
                            key={idx}
                            className="w-6 h-6 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium"
                            title={contributor?.name}
                          >
                            {contributor?.name?.charAt(0)}
                          </div>
                        ))}
                        {milestone?.contributors?.length > 3 && (
                          <div className="w-6 h-6 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium">
                            +{milestone?.contributors?.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Completion Celebration */}
                  {milestone?.completed && milestone?.completedAt && (
                    <div className="flex items-center space-x-2 mt-2">
                      <Icon name="Party" size={14} className="text-success" />
                      <span className="text-xs text-success font-medium">
                        Completed {formatDate(milestone?.completedAt)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {/* Connector Line */}
              {nextMilestone && (
                <div className="absolute left-5 top-10 w-0.5 h-6 -translate-x-0.5">
                  <div className={`w-full h-full transition-all duration-500 ${getConnectorColor(milestone, nextMilestone)}`}></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Keep the momentum going!
          </span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              iconSize={14}
              onClick={() => onMilestoneAction?.('add')}
            >
              Add Milestone
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Zap"
              iconPosition="left"
              iconSize={14}
              onClick={() => onMilestoneAction?.('boost')}
            >
              Boost Progress
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineView;