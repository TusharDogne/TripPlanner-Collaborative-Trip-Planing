import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HiddenGemsSection = ({ gems, onGemSelect }) => {
  const [selectedGem, setSelectedGem] = useState(null);

  const handleGemClick = (gem) => {
    setSelectedGem(gem);
    onGemSelect(gem);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent/10 rounded-lg">
            <Icon name="Gem" size={24} className="text-accent" />
          </div>
          <div>
            <h3 className="font-poppins font-semibold text-xl">Hidden Gems</h3>
            <p className="text-sm text-muted-foreground">
              Discover authentic local experiences
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="RefreshCw"
          iconSize={16}
        >
          Refresh
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gems?.map((gem) => (
          <div
            key={gem?.id}
            className={`group cursor-pointer transition-organic ${
              selectedGem?.id === gem?.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => handleGemClick(gem)}
          >
            <div className="bg-background rounded-lg border border-border overflow-hidden hover:shadow-collaborative transition-organic">
              {/* Image */}
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={gem?.image}
                  alt={gem?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2">
                  <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <Icon name="Star" size={12} className="text-accent fill-current" />
                    <span className="text-xs font-medium">{gem?.authenticityScore}/10</span>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <div className="bg-success/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <span className="text-xs text-white font-medium">Local Favorite</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h4 className="font-poppins font-semibold text-sm mb-1 line-clamp-1">
                  {gem?.name}
                </h4>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                  {gem?.location}
                </p>
                
                <p className="text-xs text-foreground mb-3 line-clamp-2">
                  {gem?.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={12} />
                    <span>{gem?.recentVisitors} recent</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{gem?.lastUpdated}</span>
                  </div>
                </div>

                {/* Local Insights */}
                <div className="bg-accent/5 rounded-lg p-2 mb-3">
                  <div className="flex items-start space-x-2">
                    <Icon name="MessageCircle" size={12} className="text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-foreground italic">
                      "{gem?.localInsight}"
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 text-right">
                    - {gem?.localSource}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {gem?.tags?.slice(0, 2)?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-muted rounded-full text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                  {gem?.tags?.length > 2 && (
                    <span className="px-2 py-0.5 bg-muted rounded-full text-xs text-muted-foreground">
                      +{gem?.tags?.length - 2}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="xs"
                    iconName="Plus"
                    iconSize={12}
                    className="flex-1 text-xs"
                  >
                    Add to Trip
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Share"
                    iconSize={12}
                  />
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Bookmark"
                    iconSize={12}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Verification Badge */}
      <div className="mt-6 p-4 bg-success/5 border border-success/20 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-success/10 rounded-full">
            <Icon name="Shield" size={20} className="text-success" />
          </div>
          <div>
            <h4 className="font-medium text-success mb-1">Verified by Local Community</h4>
            <p className="text-sm text-muted-foreground">
              All hidden gems are verified by our network of local travel experts and recent visitors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiddenGemsSection;