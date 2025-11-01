import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimelineView = ({ milestones, onMilestoneAction }) => {
  const [celebratingMilestone, setCelebratingMilestone] = useState(null);
  const [completedMilestones, setCompletedMilestones] = useState(new Set());
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    type: '',
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    actionLabel: '',
  });

  useEffect(() => {
    milestones?.forEach(milestone => {
      if (milestone?.completed && !completedMilestones?.has(milestone?.id)) {
        setCelebratingMilestone(milestone?.id);
        setCompletedMilestones(prev => new Set([...prev, milestone.id]));
        setTimeout(() => setCelebratingMilestone(null), 2000);
      }
    });
  }, [milestones, completedMilestones]);

  const handleAddMilestone = () => {
    console.log('New Milestone:', newMilestone);
    setShowAddPopup(false);
  };

  const getMilestoneIcon = (type) => {
    const iconMap = {
      created: 'Plus',
      friends_joined: 'Users',
      budget_agreed: 'DollarSign',
      flights_booked: 'Plane',
      accommodation_booked: 'Building',
      activities_planned: 'Calendar',
      packing_started: 'Package',
      departure: 'MapPin',
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
    return new Date(date)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-soft relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-poppins font-bold text-lg text-foreground">Planning Timeline</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span>{milestones?.filter(m => m?.completed)?.length}/{milestones?.length} completed</span>
          </div>
          <Button variant="ghost" size="sm" iconName="MoreHorizontal" iconSize={16} />
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {milestones?.map((milestone, index) => {
          const nextMilestone = milestones?.[index + 1];
          const isCelebrating = celebratingMilestone === milestone?.id;

          return (
            <div key={milestone?.id} className="relative">
              <div className="flex items-start space-x-4 pb-6">
                <div className="relative flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${getMilestoneColor(milestone)} ${isCelebrating ? 'celebration-particles scale-110' : ''}`}>
                    <Icon name={getMilestoneIcon(milestone?.type)} size={18} className={isCelebrating ? 'animate-bounce' : ''} />
                  </div>
                  {isCelebrating && <div className="absolute inset-0 rounded-full bg-success/20 animate-ping"></div>}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-medium ${milestone?.completed ? 'text-success' : milestone?.current ? 'text-primary' : 'text-foreground'}`}>{milestone?.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{milestone?.description}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {milestone?.dueDate && <span className="text-xs text-muted-foreground whitespace-nowrap">{formatDate(milestone?.dueDate)}</span>}
                    </div>
                  </div>
                </div>
              </div>
              {nextMilestone && <div className="absolute left-5 top-10 w-0.5 h-6 -translate-x-0.5"><div className={`w-full h-full transition-all duration-500 ${getConnectorColor(milestone, nextMilestone)}`}></div></div>}
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Keep the momentum going!</span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Plus" onClick={() => setShowAddPopup(true)}>
              Add Milestone
            </Button>
            <Button variant="default" size="sm" iconName="Zap">
              Boost Progress
            </Button>
          </div>
        </div>
      </div>

      {/* Popup Modal for Adding Milestone */}
      {showAddPopup && (
        <div className="absolute inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Add New Milestone</h3>

            {/* Type */}
            <label className="block text-sm text-gray-600 mb-1">Type</label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
              value={newMilestone.type}
              onChange={(e) => setNewMilestone({ ...newMilestone, type: e.target.value })}
            >
              <option value="">Select Type</option>
              <option value="friends_joined">Friends Joined</option>
              <option value="budget_agreed">Budget Agreed</option>
              <option value="flights_booked">Flights Booked</option>
              <option value="accommodation_booked">Accommodation Booked</option>
              <option value="activities_planned">Activities Planned</option>
              <option value="packing_started">Packing Started</option>
              <option value="departure">Departure</option>
            </select>

            {/* Title */}
            <label className="block text-sm text-gray-600 mb-1">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
              placeholder="Enter title"
              value={newMilestone.title}
              onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
            />

            {/* Description */}
            <label className="block text-sm text-gray-600 mb-1">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
              rows="3"
              placeholder="Enter description"
              value={newMilestone.description}
              onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
            ></textarea>

            {/* Action Label */}
            <label className="block text-sm text-gray-600 mb-1">Action Label</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
              placeholder="Enter action label (e.g. Continue, Update)"
              value={newMilestone.actionLabel}
              onChange={(e) => setNewMilestone({ ...newMilestone, actionLabel: e.target.value })}
            />

            {/* Start Date */}
            <label className="block text-sm text-gray-600 mb-1">Start Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
              value={newMilestone.startDate}
              onChange={(e) => setNewMilestone({ ...newMilestone, startDate: e.target.value })}
            />

            {/* End Date */}
            <label className="block text-sm text-gray-600 mb-1">End Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
              value={newMilestone.endDate}
              onChange={(e) => setNewMilestone({ ...newMilestone, endDate: e.target.value })}
            />

            {/* Buttons */}
            <div className="flex justify-end space-x-3 mt-4">
              <Button variant="outline" size="sm" onClick={() => setShowAddPopup(false)}>Cancel</Button>
              <Button variant="default" size="sm" onClick={handleAddMilestone}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineView;
