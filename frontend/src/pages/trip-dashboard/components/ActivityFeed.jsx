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
    <div>
      
    </div>
  );
};

export default ActivityFeed;