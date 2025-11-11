import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

// Utility component to display key details
const DetailItem = ({ iconName, label, value, className = 'text-muted-foreground' }) => (
    <div className="flex items-center space-x-3 p-3 bg-background rounded-lg border border-border">
        <Icon name={iconName} size={20} className="text-primary" />
        <div>
            <p className="text-xs font-medium uppercase tracking-wider text-primary">{label}</p>
            <p className={`text-base font-semibold ${className}`}>{value}</p>
        </div>
    </div>
);


const TripDetailPopup = ({ recommendation, onClose }) => {
    if (!recommendation) return null;

    // Modal Background and Overlay
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70 flex items-center justify-center p-4" onClick={onClose}>
            
            {/* Modal Content */}
            <div 
                className="bg-card rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100"
                onClick={(e) => e.stopPropagation()} // Clicks inside don't close the modal
            >
                {/* Close Button */}
                <div className="sticky top-0 right-0 z-10 p-4 flex justify-end">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={onClose}
                        className="bg-white/90 rounded-full hover:bg-white"
                    >
                        <Icon name="X" size={24} className="text-foreground" />
                    </Button>
                </div>

                {/* Header Image */}
                <div className="relative h-96">
                    <Image
                        src={recommendation?.image || 'placeholder-image-url'}
                        alt={recommendation?.title}
                        className="w-full h-full object-cover rounded-t-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-8 flex items-end">
                        <h2 className="font-poppins font-bold text-4xl text-white">
                            {recommendation?.title}
                        </h2>
                    </div>
                </div>

                {/* Details Section */}
                <div className="p-8 space-y-8">
                    
                    {/* Basic Info */}
                    <div className="flex items-center space-x-6 text-sm">
                        <span className="flex items-center space-x-2 text-yellow-500 font-semibold">
                            <Icon name="Star" size={18} className="fill-current" />
                            <span>{recommendation?.rating} Rating</span>
                        </span>
                        <span className="flex items-center space-x-2 text-primary font-semibold">
                            <Icon name="MapPin" size={18} />
                            <span>{recommendation?.location}</span>
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                            {recommendation?.category}
                        </span>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-b border-border py-4">
                        <DetailItem 
                            iconName="DollarSign" 
                            label="Price" 
                            value={recommendation?.priceRange || 'N/A'} 
                        />
                        <DetailItem 
                            iconName="Clock" 
                            label="Duration" 
                            value={recommendation?.duration || 'Full Day'} 
                        />
                        <DetailItem 
                            iconName="Users" 
                            label="Group Size" 
                            value={recommendation?.groupSize || 'Any'} 
                        />
                        <DetailItem 
                            iconName="Ruler" 
                            label="Distance" 
                            value={recommendation?.distance || '10 km'} 
                        />
                    </div>
                    
                    {/* Full Description */}
                    <div>
                        <h3 className="font-poppins font-semibold text-xl mb-3 text-foreground">Overview</h3>
                        <p className="text-base text-muted-foreground leading-relaxed">
                            {recommendation?.description || 'Detailed description not available.'}
                        </p>
                    </div>

                    {/* AI Reasoning (Highlight) */}
                    <div className="bg-primary/10 rounded-xl p-4 flex items-start space-x-3">
                        <Icon name="Sparkles" size={24} className="text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-poppins font-semibold text-lg text-primary">AI Reasoning</h4>
                            <p className="text-sm text-foreground">
                                {recommendation?.aiReasoning || "This recommendation was highly rated by groups with similar budget and interest in history."}
                            </p>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="pt-2">
                        <h4 className="font-semibold text-sm mb-2 text-foreground">Tags:</h4>
                        <div className="flex flex-wrap gap-2">
                            {recommendation?.tags?.map((tag, index) => (
                                <span key={index} className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Final Action (Add to Trip) */}
                    <div className="flex justify-center pt-6 border-t border-border">
                        <Button size="lg" iconName="PlusCircle" iconPosition="left">
                            Add to Trip Itinerary
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TripDetailPopup;