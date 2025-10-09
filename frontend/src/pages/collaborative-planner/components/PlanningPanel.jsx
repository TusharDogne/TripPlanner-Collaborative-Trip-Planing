import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import SuggestionCard from './SuggestionCard';

const PlanningPanel = ({ 
  suggestions, 
  onAddSuggestion, 
  onVote, 
  onComment, 
  selectedSuggestion, 
  onSelectSuggestion,
  activeTab,
  onTabChange 
}) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newSuggestion, setNewSuggestion] = useState({
    name: '',
    description: '',
    estimatedCost: '',
    category: 'attraction'
  });

  const tabs = [
    { id: 'suggestions', label: 'Suggestions', icon: 'Lightbulb', count: suggestions?.length },
    { id: 'timeline', label: 'Timeline', icon: 'Calendar', count: 0 },
    { id: 'budget', label: 'Budget', icon: 'DollarSign', count: 0 },
    { id: 'chat', label: 'Chat', icon: 'MessageCircle', count: 3 }
  ];

  const handleAddSuggestion = () => {
    if (newSuggestion?.name && newSuggestion?.description) {
      onAddSuggestion({
        ...newSuggestion,
        id: Date.now(),
        addedBy: {
          id: 1,
          name: "You",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg"
        },
        rating: 4.5,
        budgetImpact: newSuggestion?.estimatedCost > 100 ? 'high' : newSuggestion?.estimatedCost > 50 ? 'medium' : 'low',
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
        tags: [newSuggestion?.category],
        reactions: { love: 0, like: 0, excited: 0, maybe: 0, dislike: 0 },
        comments: [],
        consensusLevel: 0,
        timestamp: new Date()
      });
      setNewSuggestion({ name: '', description: '', estimatedCost: '', category: 'attraction' });
      setIsAddingNew(false);
    }
  };

  const filteredSuggestions = suggestions?.filter(suggestion => {
    if (activeTab === 'suggestions') return true;
    return false;
  });

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Tab Navigation */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex space-x-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => onTabChange(tab?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-organic ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="text-sm font-medium">{tab?.label}</span>
              {tab?.count > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${
                  activeTab === tab?.id
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {tab?.count}
                </span>
              )}
            </button>
          ))}
        </div>
        
        {activeTab === 'suggestions' && (
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            iconSize={14}
            onClick={() => setIsAddingNew(true)}
          >
            Add
          </Button>
        )}
      </div>
      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'suggestions' && (
          <div className="h-full flex flex-col">
            {/* Add New Suggestion Form */}
            {isAddingNew && (
              <div className="p-4 border-b border-border bg-muted/30">
                <div className="space-y-3">
                  <Input
                    label="Place Name"
                    type="text"
                    placeholder="Enter place name..."
                    value={newSuggestion?.name}
                    onChange={(e) => setNewSuggestion(prev => ({ ...prev, name: e?.target?.value }))}
                  />
                  <Input
                    label="Description"
                    type="text"
                    placeholder="Why should we visit here?"
                    value={newSuggestion?.description}
                    onChange={(e) => setNewSuggestion(prev => ({ ...prev, description: e?.target?.value }))}
                  />
                  <div className="flex space-x-3">
                    <Input
                      label="Estimated Cost ($)"
                      type="number"
                      placeholder="0"
                      value={newSuggestion?.estimatedCost}
                      onChange={(e) => setNewSuggestion(prev => ({ ...prev, estimatedCost: e?.target?.value }))}
                      className="flex-1"
                    />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Category
                      </label>
                      <select
                        value={newSuggestion?.category}
                        onChange={(e) => setNewSuggestion(prev => ({ ...prev, category: e?.target?.value }))}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="attraction">Attraction</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="activity">Activity</option>
                        <option value="accommodation">Hotel</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleAddSuggestion}
                      disabled={!newSuggestion?.name || !newSuggestion?.description}
                    >
                      Add Suggestion
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsAddingNew(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Suggestions List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {filteredSuggestions?.length > 0 ? (
                filteredSuggestions?.map((suggestion) => (
                  <SuggestionCard
                    key={suggestion?.id}
                    suggestion={suggestion}
                    onVote={onVote}
                    onComment={onComment}
                    isSelected={selectedSuggestion?.id === suggestion?.id}
                    onSelect={onSelectSuggestion}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <Icon name="Lightbulb" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-poppins font-semibold text-foreground mb-2">
                    No suggestions yet
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Be the first to add a place to visit!
                  </p>
                  <Button
                    variant="default"
                    iconName="Plus"
                    iconPosition="left"
                    onClick={() => setIsAddingNew(true)}
                  >
                    Add First Suggestion
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="p-4 text-center py-12">
            <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="font-poppins font-semibold text-foreground mb-2">
              Timeline Builder
            </h3>
            <p className="text-muted-foreground">
              Drag and drop suggestions to create your itinerary
            </p>
          </div>
        )}

        {activeTab === 'budget' && (
          <div className="p-4 text-center py-12">
            <Icon name="DollarSign" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="font-poppins font-semibold text-foreground mb-2">
              Budget Tracker
            </h3>
            <p className="text-muted-foreground">
              Track expenses and split costs with your group
            </p>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="p-4 text-center py-12">
            <Icon name="MessageCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="font-poppins font-semibold text-foreground mb-2">
              Group Chat
            </h3>
            <p className="text-muted-foreground">
              Discuss plans and make decisions together
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanningPanel;