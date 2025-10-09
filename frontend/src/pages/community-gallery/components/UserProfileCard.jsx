import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserProfileCard = ({ user, onViewProfile }) => {
  return (
    <div className="bg-card rounded-xl shadow-soft hover:shadow-collaborative transition-organic p-6">
      {/* User Header */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={user?.avatar}
              alt={user?.name}
              className="w-full h-full object-cover"
            />
          </div>
          {user?.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success border-2 border-background rounded-full" />
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-poppins font-semibold text-lg text-foreground">
            {user?.name}
          </h3>
          <p className="text-muted-foreground text-sm">{user?.location}</p>
          <div className="flex items-center space-x-1 mt-1">
            <Icon name="Star" size={14} color="#FFE66D" className="fill-current" />
            <span className="text-sm font-medium">{user?.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({user?.reviewCount} reviews)
            </span>
          </div>
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-xl font-bold text-primary">{user?.tripsOrganized}</p>
          <p className="text-xs text-muted-foreground">Trips Organized</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-secondary">{user?.friendsCount}</p>
          <p className="text-xs text-muted-foreground">Travel Friends</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-accent-foreground">{user?.countriesVisited}</p>
          <p className="text-xs text-muted-foreground">Countries</p>
        </div>
      </div>
      {/* Specialties */}
      <div className="mb-4">
        <p className="text-sm font-medium text-foreground mb-2">Travel Specialties</p>
        <div className="flex flex-wrap gap-2">
          {user?.specialties?.map((specialty, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
      {/* Recent Achievement */}
      <div className="bg-accent/10 rounded-lg p-3 mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Trophy" size={16} className="text-accent-foreground" />
          <span className="text-sm font-medium text-accent-foreground">
            Recent Achievement
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {user?.recentAchievement}
        </p>
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="User"
          iconPosition="left"
          iconSize={14}
          onClick={() => onViewProfile(user)}
        >
          View Profile
        </Button>
        
        <Button
          variant="default"
          size="sm"
          fullWidth
          iconName="UserPlus"
          iconPosition="left"
          iconSize={14}
        >
          Connect
        </Button>
      </div>
      {/* Collaboration Badge */}
      {user?.isTopCollaborator && (
        <div className="mt-3 flex items-center justify-center space-x-2 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
          <Icon name="Users" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">Top Collaborator</span>
        </div>
      )}
    </div>
  );
};

export default UserProfileCard;