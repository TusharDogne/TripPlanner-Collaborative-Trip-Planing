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
      
    </div>
  );
};

export default NotificationToast;