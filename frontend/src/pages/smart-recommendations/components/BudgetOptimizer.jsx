import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BudgetOptimizer = ({ recommendations, groupBudget = 2000, onOptimize }) => {
  const [selectedAlternatives, setSelectedAlternatives] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [loadingTripId, setLoadingTripId] = useState(null);
  const [addedTrips, setAddedTrips] = useState([]);

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
      tripId: "T001",
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
      tripId: "T002",
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
      tripId: "T003",
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
      prev.includes(alternativeId)
        ? prev.filter(id => id !== alternativeId)
        : [...prev, alternativeId]
    );
  };

  const calculateSelectedSavings = () => {
    return alternatives
      .filter(alt => selectedAlternatives.includes(alt.id))
      .reduce((sum, alt) => sum + alt.savings, 0);
  };

  // 🧩 Add to Trip API call (sirf tripId bhejna hai)
  const handleAddToTrip = async (tripId) => {
    try {
      setLoadingTripId(tripId);
      const response = await fetch("http://localhost:8080/allTrips/addTripToMyTrips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tripId }),
      });

      if (!response.ok) throw new Error("Failed to add trip");

      setAddedTrips((prev) => [...prev, tripId]);
    } catch (error) {
      console.error("Error adding trip:", error);
      alert("⚠️ Something went wrong while adding the trip!");
    } finally {
      setLoadingTripId(null);
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      {/* Header */}
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
        <div className="bg-background rounded-lg p-4 border border-border text-center">
          <div className="text-2xl font-bold text-foreground">${currentTotal}</div>
          <div className="text-sm text-muted-foreground">Current Budget</div>
        </div>
        <div className="bg-success/5 rounded-lg p-4 border border-success/20 text-center">
          <div className="text-2xl font-bold text-success">${optimizedTotal}</div>
          <div className="text-sm text-muted-foreground">Optimized Budget</div>
        </div>
        <div className="bg-accent/5 rounded-lg p-4 border border-accent/20 text-center">
          <div className="text-2xl font-bold text-accent">${totalSavings}</div>
          <div className="text-sm text-muted-foreground">Potential Savings</div>
        </div>
      </div>

      {/* Smart Alternatives */}
      <h4 className="font-medium text-foreground mb-4">Smart Alternatives</h4>
      <div className="space-y-4">
        {alternatives.map((alt) => (
          <div
            key={alt.id}
            className={`border rounded-lg p-4 transition-organic ${
              selectedAlternatives.includes(alt.id)
                ? 'border-success bg-success/5'
                : 'border-border bg-background hover:border-primary/50'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img src={alt.image} alt={alt.alternative} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">
                      {alt.category}
                    </div>
                    <h5 className="font-medium text-foreground">{alt.alternative}</h5>
                    <div className="flex items-center space-x-2 mt-1">
                      <Icon name="Star" size={14} className="text-accent fill-current" />
                      <span className="text-sm">{alt.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm line-through text-muted-foreground">${alt.originalPrice}</div>
                    <div className="text-lg font-bold text-success">${alt.alternativePrice}</div>
                    <div className="text-sm text-accent font-medium">Save ${alt.savings}</div>
                  </div>
                </div>

                {/* Includes & Tradeoffs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <div className="text-xs font-medium text-success mb-1">Includes:</div>
                    <ul className="text-xs text-muted-foreground space-y-0.5">
                      {alt.features.map((f, i) => (
                        <li key={i} className="flex items-center space-x-1">
                          <Icon name="Check" size={12} className="text-success" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-warning mb-1">Consider:</div>
                    <ul className="text-xs text-muted-foreground space-y-0.5">
                      {alt.tradeoffs.map((t, i) => (
                        <li key={i} className="flex items-center space-x-1">
                          <Icon name="AlertCircle" size={12} className="text-warning" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 🟢 Add to Trip Button */}
                <div className="mt-4">
                  <Button
                    variant={addedTrips.includes(alt.tripId) ? "success" : "secondary"}
                    size="sm"
                    iconName={addedTrips.includes(alt.tripId) ? "Check" : "PlusCircle"}
                    iconSize={14}
                    disabled={loadingTripId === alt.tripId || addedTrips.includes(alt.tripId)}
                    onClick={() => handleAddToTrip(alt.tripId)}
                  >
                    {loadingTripId === alt.tripId
                      ? "Adding..."
                      : addedTrips.includes(alt.tripId)
                      ? "Added ✅"
                      : "Add this to Trip"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      {selectedAlternatives.length > 0 && (
        <div className="mt-6 p-4 bg-success/5 border border-success/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-success">
                Total Savings: ${calculateSelectedSavings()}
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedAlternatives.length} alternative
                {selectedAlternatives.length > 1 ? 's' : ''} selected
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedAlternatives([])}>
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
