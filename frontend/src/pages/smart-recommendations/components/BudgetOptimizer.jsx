import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BudgetOptimizer = ({ recommendations, groupBudget = 2000, onOptimize }) => {
  const [selectedAlternatives, setSelectedAlternatives] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  const budgetBreakdown = {
    accommodation: { current: 800, optimized: 600, savings: 200 },
    activities: { current: 600, optimized: 450, savings: 150 },
    dining: { current: 400, optimized: 350, savings: 50 },
    transport: { current: 200, optimized: 180, savings: 20 }
  };

  const totalSavings = Object.values(budgetBreakdown)?.reduce((sum, item) => sum + item?.savings, 0);
  const currentTotal = Object.values(budgetBreakdown)?.reduce((sum, item) => sum + item?.current, 0);
  const optimizedTotal = currentTotal - totalSavings;

  const alternatives = [
    {
      id: 1,
      category: "Accommodation",
      original: "Hotel Le Grand Paris",
      originalPrice: 200,
      alternative: "Boutique Hotel Marais",
      alternativePrice: 150,
      savings: 50,
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
      features: ["Free WiFi", "Breakfast included", "Central location"],
      tradeoffs: ["Smaller rooms", "No pool"]
    },
    {
      id: 2,
      category: "Activities",
      original: "Private Seine River Cruise",
      originalPrice: 80,
      alternative: "Group Seine River Tour",
      alternativePrice: 35,
      savings: 45,
      rating: 4.1,
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400",
      features: ["2-hour tour", "Audio guide", "Group discounts"],
      tradeoffs: ["Less personalized", "Fixed schedule"]
    },
    {
      id: 3,
      category: "Dining",
      original: "Michelin Star Restaurant",
      originalPrice: 120,
      alternative: "Local Bistro Experience",
      alternativePrice: 65,
      savings: 55,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
      features: ["Authentic cuisine", "Wine pairing", "Local atmosphere"],
      tradeoffs: ["No Michelin star", "Casual setting"]
    }
  ];

  const handleAlternativeToggle = (alternativeId) => {
    setSelectedAlternatives(prev => 
      prev?.includes(alternativeId)
        ? prev?.filter(id => id !== alternativeId)
        : [...prev, alternativeId]
    );
  };

  const calculateSelectedSavings = () => {
    return alternatives?.filter(alt => selectedAlternatives?.includes(alt?.id))?.reduce((sum, alt) => sum + alt?.savings, 0);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-success/10 rounded-lg">
            <Icon name="PiggyBank" size={24} className="text-success" />
          </div>
          <div>
            <h3 className="font-poppins font-semibold text-xl">Budget Optimizer</h3>
            <p className="text-sm text-muted-foreground">
              Save money without compromising experience
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName={showComparison ? "EyeOff" : "Eye"}
          iconSize={16}
          onClick={() => setShowComparison(!showComparison)}
        >
          {showComparison ? "Hide" : "Compare"}
        </Button>
      </div>
      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">${currentTotal}</div>
            <div className="text-sm text-muted-foreground">Current Budget</div>
          </div>
        </div>
        <div className="bg-success/5 rounded-lg p-4 border border-success/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">${optimizedTotal}</div>
            <div className="text-sm text-muted-foreground">Optimized Budget</div>
          </div>
        </div>
        <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">${totalSavings}</div>
            <div className="text-sm text-muted-foreground">Potential Savings</div>
          </div>
        </div>
      </div>
      {/* Budget Breakdown */}
      {showComparison && (
        <div className="mb-6">
          <h4 className="font-medium text-foreground mb-4">Budget Breakdown</h4>
          <div className="space-y-3">
            {Object.entries(budgetBreakdown)?.map(([category, data]) => (
              <div key={category} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={
                      category === 'accommodation' ? 'Bed' :
                      category === 'activities' ? 'MapPin' :
                      category === 'dining' ? 'Utensils' : 'Car'
                    } 
                    size={16} 
                    className="text-muted-foreground" 
                  />
                  <span className="font-medium capitalize">{category}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm line-through text-muted-foreground">${data?.current}</div>
                    <div className="text-sm font-medium text-success">${data?.optimized}</div>
                  </div>
                  <div className="text-accent font-medium">-${data?.savings}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Alternative Recommendations */}
      <div>
        <h4 className="font-medium text-foreground mb-4">Smart Alternatives</h4>
        <div className="space-y-4">
          {alternatives?.map((alternative) => (
            <div
              key={alternative?.id}
              className={`border rounded-lg p-4 transition-organic cursor-pointer ${
                selectedAlternatives?.includes(alternative?.id)
                  ? 'border-success bg-success/5' :'border-border bg-background hover:border-primary/50'
              }`}
              onClick={() => handleAlternativeToggle(alternative?.id)}
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={alternative?.image}
                    alt={alternative?.alternative}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wide">
                        {alternative?.category}
                      </div>
                      <h5 className="font-medium text-foreground">{alternative?.alternative}</h5>
                      <div className="flex items-center space-x-2 mt-1">
                        <Icon name="Star" size={14} className="text-accent fill-current" />
                        <span className="text-sm">{alternative?.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm line-through text-muted-foreground">
                        ${alternative?.originalPrice}
                      </div>
                      <div className="text-lg font-bold text-success">
                        ${alternative?.alternativePrice}
                      </div>
                      <div className="text-sm text-accent font-medium">
                        Save ${alternative?.savings}
                      </div>
                    </div>
                  </div>

                  {/* Features & Tradeoffs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div>
                      <div className="text-xs font-medium text-success mb-1">Includes:</div>
                      <ul className="text-xs text-muted-foreground space-y-0.5">
                        {alternative?.features?.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-1">
                            <Icon name="Check" size={12} className="text-success" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-warning mb-1">Consider:</div>
                      <ul className="text-xs text-muted-foreground space-y-0.5">
                        {alternative?.tradeoffs?.map((tradeoff, index) => (
                          <li key={index} className="flex items-center space-x-1">
                            <Icon name="AlertCircle" size={12} className="text-warning" />
                            <span>{tradeoff}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    selectedAlternatives?.includes(alternative?.id)
                      ? 'border-success bg-success' :'border-muted-foreground'
                  }`}>
                    {selectedAlternatives?.includes(alternative?.id) && (
                      <Icon name="Check" size={12} className="text-white" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Action Section */}
      {selectedAlternatives?.length > 0 && (
        <div className="mt-6 p-4 bg-success/5 border border-success/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-success">
                Total Savings: ${calculateSelectedSavings()}
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedAlternatives?.length} alternative{selectedAlternatives?.length > 1 ? 's' : ''} selected
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedAlternatives([])}
              >
                Clear
              </Button>
              <Button
                variant="default"
                size="sm"
                iconName="Check"
                iconPosition="left"
                iconSize={16}
                onClick={() => onOptimize(selectedAlternatives)}
              >
                Apply Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetOptimizer;