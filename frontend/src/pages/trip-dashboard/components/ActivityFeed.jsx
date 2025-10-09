import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActivityFeed = ({ activities, onActivityAction }) => {
  const [visibleActivities, setVisibleActivities] = useState(5);
  const [newActivityCount, setNewActivityCount] = useState(0);

  useEffect(() => {
    // Simulate new activities
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setNewActivityCount(prev => prev + 1);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type) => {
    const iconMap = {
      vote: 'Vote',
      suggestion: 'Lightbulb',
      comment: 'MessageCircle',
      budget: 'DollarSign',
      join: 'UserPlus',
      booking: 'Calendar',
      photo: 'Camera',
      location: 'MapPin'
    };
    return iconMap?.[type] || 'Bell';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      vote: 'text-primary',
      suggestion: 'text-accent',
      comment: 'text-secondary',
      budget: 'text-success',
      join: 'text-primary',
      booking: 'text-warning',
      photo: 'text-secondary',
      location: 'text-primary'
    };
    return colorMap?.[type] || 'text-muted-foreground';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const loadMoreActivities = () => {
    setVisibleActivities(prev => prev + 5);
  };

  const refreshFeed = () => {
    setNewActivityCount(0);
    // Simulate refresh
    onActivityAction?.('refresh');
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="font-poppins font-bold text-lg text-foreground">Recent Activity</h3>
          {newActivityCount > 0 && (
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full animate-pulse">
              {newActivityCount} new
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="RefreshCw"
          iconSize={16}
          onClick={refreshFeed}
          className="hover:rotate-180 transition-transform duration-500"
        />
      </div>
      {/* Activity List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities?.slice(0, visibleActivities)?.map((activity, index) => (
          <div
            key={activity?.id}
            className={`flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-organic ${
              index < newActivityCount ? 'bg-primary/5 border border-primary/20' : ''
            }`}
          >
            {/* User Avatar */}
            <div className="relative flex-shrink-0">
              <Image
                src={activity?.user?.avatar}
                alt={activity?.user?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background flex items-center justify-center ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={10} />
              </div>
            </div>

            {/* Activity Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{activity?.user?.name}</span>
                    <span className="text-muted-foreground ml-1">{activity?.action}</span>
                  </p>
                  
                  {activity?.content && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {activity?.content}
                    </p>
                  )}

                  {/* Activity Metadata */}
                  {activity?.metadata && (
                    <div className="flex items-center space-x-4 mt-2">
                      {activity?.metadata?.votes && (
                        <div className="flex items-center space-x-1 text-xs text-primary">
                          <Icon name="ThumbsUp" size={12} />
                          <span>{activity?.metadata?.votes} votes</span>
                        </div>
                      )}
                      {activity?.metadata?.amount && (
                        <div className="flex items-center space-x-1 text-xs text-success">
                          <Icon name="DollarSign" size={12} />
                          <span>${activity?.metadata?.amount}</span>
                        </div>
                      )}
                      {activity?.metadata?.location && (
                        <div className="flex items-center space-x-1 text-xs text-secondary">
                          <Icon name="MapPin" size={12} />
                          <span>{activity?.metadata?.location}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Trip Context */}
                  {activity?.tripName && (
                    <div className="flex items-center space-x-1 mt-2">
                      <Icon name="Plane" size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{activity?.tripName}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end space-y-1 ml-2">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatTimeAgo(activity?.timestamp)}
                  </span>
                  
                  {/* Quick Actions */}
                  {activity?.actionable && (
                    <div className="flex items-center space-x-1">
                      {activity?.type === 'vote' && (
                        <Button
                          variant="ghost"
                          size="xs"
                          iconName="Vote"
                          iconSize={12}
                          onClick={() => onActivityAction?.(activity?.id, 'vote')}
                        />
                      )}
                      {activity?.type === 'comment' && (
                        <Button
                          variant="ghost"
                          size="xs"
                          iconName="Reply"
                          iconSize={12}
                          onClick={() => onActivityAction?.(activity?.id, 'reply')}
                        />
                      )}
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Heart"
                        iconSize={12}
                        onClick={() => onActivityAction?.(activity?.id, 'like')}
                        className={activity?.liked ? 'text-error' : ''}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More */}
      {visibleActivities < activities?.length && (
        <div className="mt-4 text-center">
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronDown"
            iconPosition="right"
            iconSize={16}
            onClick={loadMoreActivities}
          >
            Load More Activities
          </Button>
        </div>
      )}
      {/* Empty State */}
      {activities?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-3" />
          <h4 className="font-medium text-foreground mb-1">No Recent Activity</h4>
          <p className="text-sm text-muted-foreground">
            Start planning your trip to see activity updates here
          </p>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;