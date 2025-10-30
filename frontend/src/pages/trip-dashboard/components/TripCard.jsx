import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { useNavigate } from "react-router-dom";

const TripCard = ({ trip, onViewDetails, onQuickAction }) => {
  const [collaborativeCursors, setCollaborativeCursors] = useState([]);

  useEffect(() => {
    // Simulate collaborative cursors
    const cursors = trip?.activeMembers?.map((member, index) => ({
      id: member?.id,
      name: member?.name,
      avatar: member?.avatar,
      position: { x: 20 + (index * 30), y: 10 + (index * 15) },
      lastSeen: new Date(Date.now() - Math.random() * 300000)
    })) || [];
    setCollaborativeCursors(cursors);
  }, [trip?.activeMembers]);

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 50) return 'bg-accent';
    return 'bg-primary';
  };

  // ✅ Change currency from Dollar ($) to Rupee (₹)
  const formatBudget = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    })?.format(amount);
  };

  return (
    <div className="relative bg-card border border-border rounded-xl p-6 shadow-collaborative hover:shadow-lg transition-organic group">
      {/* Collaborative Cursors */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-xl">
        {collaborativeCursors?.map((cursor) => (
          <div
            key={cursor?.id}
            className="absolute collaborative-cursor"
            style={{
              left: `${cursor?.position?.x}%`,
              top: `${cursor?.position?.y}%`,
              animationDelay: `${Math.random() * 0.5}s`
            }}
          >
            <div className="flex items-center space-x-1 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium shadow-soft">
              <Image
                src={cursor?.avatar}
                alt={cursor?.name}
                className="w-4 h-4 rounded-full"
              />
              <span>{cursor?.name?.split(' ')?.[0]}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-poppins font-bold text-xl text-foreground group-hover:text-primary transition-organic">
              {trip?.destination}
            </h3>
            {trip?.isNew && (
              <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                New
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} />
              <span>{trip?.dates}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} />
              <span>{trip?.memberCount} travelers</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${trip?.status === 'active' ? 'bg-success animate-pulse' : 'bg-muted'}`}></div>
          <Button
            variant="ghost"
            size="icon"
            iconName="MoreVertical"
            iconSize={16}
            onClick={() => onQuickAction(trip?.id, 'menu')}
          />
        </div>
      </div>
      {/* Destination Image */}
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <Image
          src={trip?.image}
          alt={trip?.destination}
          className="w-full h-32 object-cover group-hover:scale-105 transition-organic"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute bottom-2 left-2 flex items-center space-x-1 text-white text-xs">
          <Icon name="MapPin" size={12} />
          <span>{trip?.location}</span>
        </div>
      </div>
      {/* Group Members */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-foreground">Planning with:</span>
          <div className="flex -space-x-2">
            {trip?.members?.slice(0, 4)?.map((member, index) => (
              <div
                key={member?.id}
                className="relative w-8 h-8 rounded-full border-2 border-background shadow-soft"
                title={member?.name}
              >
                <Image
                  src={member?.avatar}
                  alt={member?.name}
                  className="w-full h-full rounded-full object-cover"
                />
                {member?.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success border-2 border-background rounded-full"></div>
                )}
              </div>
            ))}
            {trip?.members?.length > 4 && (
              <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium text-muted-foreground">
                +{trip?.members?.length - 4}
              </div>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="UserPlus"
          iconSize={14}
          onClick={() => onQuickAction(trip?.id, 'invite')}
          className="text-xs"
        >
          Invite
        </Button>
      </div>
      {/* Budget Status */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Budget Progress</span>
          <span className="text-sm text-muted-foreground">
            {formatBudget(trip?.budget?.spent)} / {formatBudget(trip?.budget?.total)}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(trip?.budget?.percentage)}`}
            style={{ width: `${Math.min(trip?.budget?.percentage, 100)}%` }}
          ></div>
        </div>
        <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
          <span>{trip?.budget?.percentage}% allocated</span>
          <span>{trip?.budget?.contributors} contributors</span>
        </div>
      </div>
      {/* Next Actions */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-foreground mb-2">Next Actions</h4>
        <div className="space-y-2">
          {trip?.nextActions?.slice(0, 2)?.map((action, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${action?.priority === 'high' ? 'bg-error' : action?.priority === 'medium' ? 'bg-warning' : 'bg-success'}`}></div>
                <span className="text-sm text-foreground">{action?.title}</span>
              </div>
              {action?.hasVoting && (
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={12} className="text-primary" />
                  <span className="text-xs text-primary font-medium">{action?.votes}/4</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="flex items-center space-x-2">
        <Button
          variant="default"
          size="sm"
          iconName="Eye"
          iconPosition="left"
          iconSize={14}
          onClick={() => onViewDetails(trip?.id)}
          className="flex-1"
        >
          View Details
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="MessageCircle"
          iconSize={14}
          onClick={() => onQuickAction(trip?.id, 'chat')}
        />
        <Button
          variant="outline"
          size="sm"
          iconName="Vote"
          iconSize={14}
          onClick={() => onQuickAction(trip?.id, 'vote')}
        />
      </div>
      {/* Live Activity Indicator */}
      {trip?.liveActivity && (
        <div className="absolute top-4 right-4 flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-full text-xs font-medium">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span>Live</span>
        </div>
      )}
    </div>
  );
};

export default TripCard;