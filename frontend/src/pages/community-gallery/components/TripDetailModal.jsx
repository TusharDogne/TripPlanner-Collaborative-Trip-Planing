import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TripDetailModal = ({ trip, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !trip) return null;

  const formatBudget = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'itinerary', label: 'Itinerary', icon: 'MapPin' },
    { id: 'budget', label: 'Budget', icon: 'Calculator' },
    { id: 'collaboration', label: 'Planning Journey', icon: 'Users' }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === trip?.gallery?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? trip?.gallery?.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-background rounded-2xl shadow-collaborative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-poppins font-bold text-foreground">
              {trip?.destination}
            </h2>
            <p className="text-muted-foreground">
              {trip?.duration} • Organized by {trip?.organizer}
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={18} color="#FFE66D" className="fill-current" />
              <span className="font-semibold">{trip?.rating}</span>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              iconSize={20}
              onClick={onClose}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[calc(90vh-100px)]">
          {/* Image Gallery */}
          <div className="w-1/2 relative bg-black">
            <Image
              src={trip?.gallery?.[currentImageIndex]}
              alt={`${trip?.destination} photo ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Image Navigation */}
            {trip?.gallery?.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-organic"
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-organic"
                >
                  <Icon name="ChevronRight" size={20} />
                </button>
                
                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                  {currentImageIndex + 1} / {trip?.gallery?.length}
                </div>
              </>
            )}
          </div>

          {/* Details Panel */}
          <div className="w-1/2 flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-border">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-organic ${
                    activeTab === tab?.id
                      ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Trip Highlights */}
                  <div>
                    <h3 className="font-poppins font-semibold text-lg mb-3">Trip Highlights</h3>
                    <div className="space-y-2">
                      {trip?.highlights?.map((highlight, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-accent rounded-full" />
                          <span className="text-foreground">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Group Members */}
                  <div>
                    <h3 className="font-poppins font-semibold text-lg mb-3">Travel Group</h3>
                    <div className="flex flex-wrap gap-3">
                      {trip?.groupPhotos?.map((photo, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <Image
                              src={photo}
                              alt={`Traveler ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            Traveler {index + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trip Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <Icon name="Calendar" size={24} className="mx-auto mb-2 text-primary" />
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-semibold">{trip?.duration}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <Icon name="Users" size={24} className="mx-auto mb-2 text-secondary" />
                      <p className="text-sm text-muted-foreground">Group Size</p>
                      <p className="font-semibold">{trip?.groupSize} people</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'itinerary' && (
                <div className="space-y-4">
                  <h3 className="font-poppins font-semibold text-lg">Daily Itinerary</h3>
                  {trip?.itinerary?.map((day, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold">{day?.title}</h4>
                          <p className="text-sm text-muted-foreground">{day?.date}</p>
                        </div>
                      </div>
                      <div className="space-y-2 ml-11">
                        {day?.activities?.map((activity, actIndex) => (
                          <div key={actIndex} className="flex items-center space-x-2">
                            <Icon name="MapPin" size={14} className="text-accent" />
                            <span className="text-sm">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'budget' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="font-poppins font-semibold text-2xl text-foreground">
                      {formatBudget(trip?.totalBudget)}
                    </h3>
                    <p className="text-muted-foreground">Total Trip Cost</p>
                    <p className="text-sm text-success font-medium">
                      {formatBudget(trip?.totalBudget / trip?.groupSize)} per person
                    </p>
                  </div>

                  <div className="space-y-3">
                    {trip?.budgetBreakdown?.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Icon name={item?.icon} size={20} className="text-primary" />
                          <span className="font-medium">{item?.category}</span>
                        </div>
                        <span className="font-semibold">{formatBudget(item?.amount)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-accent/10 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="TrendingDown" size={20} className="text-success" />
                      <span className="font-semibold text-success">Budget Achievement</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Stayed {trip?.budgetSavings}% under the original budget through smart group decisions!
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'collaboration' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-primary/10 rounded-lg p-4">
                      <p className="text-2xl font-bold text-primary">{trip?.planningDays}</p>
                      <p className="text-sm text-muted-foreground">Planning Days</p>
                    </div>
                    <div className="bg-secondary/10 rounded-lg p-4">
                      <p className="text-2xl font-bold text-secondary">{trip?.decisionsCount}</p>
                      <p className="text-sm text-muted-foreground">Decisions Made</p>
                    </div>
                    <div className="bg-accent/10 rounded-lg p-4">
                      <p className="text-2xl font-bold text-accent-foreground">{trip?.consensusRate}%</p>
                      <p className="text-sm text-muted-foreground">Consensus Rate</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Planning Timeline</h4>
                    <div className="space-y-3">
                      {trip?.planningTimeline?.map((event, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-3 h-3 bg-primary rounded-full mt-2" />
                          <div>
                            <p className="font-medium">{event?.event}</p>
                            <p className="text-sm text-muted-foreground">{event?.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-success/10 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="CheckCircle" size={20} className="text-success" />
                      <span className="font-semibold text-success">Collaboration Success</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Everyone rated this trip planning experience 5 stars! The group reached consensus on all major decisions within the first week.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Footer */}
            <div className="border-t border-border p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Heart"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Save Trip
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Share"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Share
                  </Button>
                </div>
                
                <Button
                  variant="default"
                  iconName="Copy"
                  iconPosition="left"
                  iconSize={16}
                >
                  Use as Template
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetailModal;