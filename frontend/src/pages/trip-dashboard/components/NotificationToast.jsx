import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationToast = ({ notifications, onDismiss, onAction }) => {
  const [visibleNotifications, setVisibleNotifications] = useState([]);
  const [animatingOut, setAnimatingOut] = useState(new Set());

  useEffect(() => {
    // Show new notifications with staggered animation
    notifications?.forEach((notification, index) => {
      if (!visibleNotifications?.find(n => n?.id === notification?.id)) {
        setTimeout(() => {
          setVisibleNotifications(prev => [...prev, notification]);
        }, index * 200);
      }
    });
  }, [notifications, visibleNotifications]);

  const handleDismiss = (notificationId) => {
    setAnimatingOut(prev => new Set([...prev, notificationId]));
    
    setTimeout(() => {
      setVisibleNotifications(prev => prev?.filter(n => n?.id !== notificationId));
      setAnimatingOut(prev => {
        const newSet = new Set(prev);
        newSet?.delete(notificationId);
        return newSet;
      });
      onDismiss?.(notificationId);
    }, 300);
  };

  const getNotificationIcon = (type) => {
    const iconMap = {
      vote: 'Vote',
      comment: 'MessageCircle',
      budget: 'DollarSign',
      consensus: 'CheckCircle',
      achievement: 'Trophy',
      reminder: 'Clock',
      invitation: 'UserPlus',
      booking: 'Calendar'
    };
    return iconMap?.[type] || 'Bell';
  };

  const getNotificationColor = (type) => {
    const colorMap = {
      vote: 'border-primary bg-primary/10 text-primary',
      comment: 'border-secondary bg-secondary/10 text-secondary',
      budget: 'border-success bg-success/10 text-success',
      consensus: 'border-success bg-success/10 text-success',
      achievement: 'border-accent bg-accent/10 text-accent',
      reminder: 'border-warning bg-warning/10 text-warning',
      invitation: 'border-primary bg-primary/10 text-primary',
      booking: 'border-warning bg-warning/10 text-warning'
    };
    return colorMap?.[type] || 'border-muted bg-muted/10 text-muted-foreground';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  if (visibleNotifications?.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      {visibleNotifications?.map((notification) => {
        const isAnimatingOut = animatingOut?.has(notification?.id);
        
        return (
          <div
            key={notification?.id}
            className={`transform transition-all duration-300 ${
              isAnimatingOut 
                ? 'translate-x-full opacity-0 scale-95' :'translate-x-0 opacity-100 scale-100 slide-in-right'
            }`}
          >
            <div className={`bg-background border-2 rounded-lg p-4 shadow-collaborative ${getNotificationColor(notification?.type)}`}>
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon name={getNotificationIcon(notification?.type)} size={16} />
                  <span className="font-medium text-sm">{notification?.title}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-xs opacity-70">
                    {formatTimeAgo(notification?.timestamp)}
                  </span>
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="X"
                    iconSize={12}
                    onClick={() => handleDismiss(notification?.id)}
                    className="opacity-50 hover:opacity-100"
                  />
                </div>
              </div>

              {/* Content */}
              <p className="text-sm opacity-90 mb-3">
                {notification?.message}
              </p>

              {/* User Info */}
              {notification?.user && (
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                    {notification?.user?.name?.charAt(0)}
                  </div>
                  <span className="text-xs opacity-70">{notification?.user?.name}</span>
                </div>
              )}

              {/* Actions */}
              {notification?.actions && notification?.actions?.length > 0 && (
                <div className="flex items-center space-x-2">
                  {notification?.actions?.map((action, index) => (
                    <Button
                      key={index}
                      variant={action?.primary ? "default" : "outline"}
                      size="xs"
                      iconName={action?.icon}
                      iconPosition="left"
                      iconSize={12}
                      onClick={() => {
                        onAction?.(notification?.id, action?.id);
                        if (action?.dismissOnClick) {
                          handleDismiss(notification?.id);
                        }
                      }}
                    >
                      {action?.label}
                    </Button>
                  ))}
                </div>
              )}

              {/* Progress Bar for Consensus */}
              {notification?.type === 'consensus' && notification?.progress && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs opacity-70">Consensus Progress</span>
                    <span className="text-xs font-medium">
                      {notification?.progress?.current}/{notification?.progress?.total}
                    </span>
                  </div>
                  <div className="w-full bg-current/20 rounded-full h-1.5">
                    <div
                      className="bg-current h-1.5 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(notification?.progress?.current / notification?.progress?.total) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Achievement Celebration */}
              {notification?.type === 'achievement' && (
                <div className="mt-2 text-center">
                  <div className="inline-flex items-center space-x-1 text-xs font-medium">
                    <Icon name="Sparkles" size={12} className="animate-pulse" />
                    <span>Achievement Unlocked!</span>
                    <Icon name="Sparkles" size={12} className="animate-pulse" />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationToast;