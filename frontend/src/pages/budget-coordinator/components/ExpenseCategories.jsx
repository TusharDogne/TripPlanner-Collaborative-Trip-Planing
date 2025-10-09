import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ExpenseCategories = ({ categories, onCategoryUpdate, currency = 'USD' }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    })?.format(amount);
  };

  const getCategoryIcon = (categoryType) => {
    const icons = {
      flights: 'Plane',
      accommodation: 'Home',
      activities: 'MapPin',
      food: 'UtensilsCrossed',
      transport: 'Car',
      shopping: 'ShoppingBag',
      other: 'MoreHorizontal'
    };
    return icons?.[categoryType] || 'MoreHorizontal';
  };

  const getVarianceColor = (variance) => {
    if (variance > 0) return 'text-error';
    if (variance < -100) return 'text-success';
    return 'text-warning';
  };

  const getVarianceIcon = (variance) => {
    if (variance > 0) return 'TrendingUp';
    if (variance < -100) return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-poppins font-semibold text-foreground">Expense Categories</h2>
        <div className="flex items-center space-x-2">
          <Icon name="PieChart" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Budget breakdown</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories?.map((category) => {
          const variance = category?.actual - category?.predicted;
          const variancePercentage = category?.predicted > 0 ? (variance / category?.predicted) * 100 : 0;
          const isExpanded = expandedCategory === category?.id;

          return (
            <div 
              key={category?.id}
              className="border border-border rounded-lg p-4 hover:shadow-soft transition-organic cursor-pointer"
              onClick={() => setExpandedCategory(isExpanded ? null : category?.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg bg-${category?.color}/10 flex items-center justify-center`}>
                    <Icon 
                      name={getCategoryIcon(category?.type)} 
                      size={20} 
                      className={`text-${category?.color}`}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{category?.name}</h3>
                    <p className="text-sm text-muted-foreground">{category?.description}</p>
                  </div>
                </div>
                <Icon 
                  name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-muted-foreground"
                />
              </div>
              <div className="space-y-3">
                {/* Budget vs Actual */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Predicted</span>
                  <span className="font-medium text-foreground">
                    {formatCurrency(category?.predicted)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Actual</span>
                  <span className="font-medium text-foreground">
                    {formatCurrency(category?.actual)}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 bg-${category?.color}`}
                    style={{ 
                      width: `${Math.min((category?.actual / category?.predicted) * 100, 100)}%` 
                    }}
                  />
                </div>

                {/* Variance */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Icon 
                      name={getVarianceIcon(variance)} 
                      size={14} 
                      className={getVarianceColor(variance)}
                    />
                    <span className={`text-sm font-medium ${getVarianceColor(variance)}`}>
                      {variance > 0 ? '+' : ''}{formatCurrency(variance)}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {variancePercentage > 0 ? '+' : ''}{Math.round(variancePercentage)}%
                  </span>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-border space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Confidence Level</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-muted rounded-full h-1">
                          <div 
                            className="h-full bg-success rounded-full"
                            style={{ width: `${category?.confidence}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {category?.confidence}%
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Last Updated</span>
                      <span className="text-sm text-foreground">{category?.lastUpdated}</span>
                    </div>

                    {category?.alternatives && category?.alternatives?.length > 0 && (
                      <div>
                        <span className="text-sm text-muted-foreground mb-2 block">
                          Cost-saving alternatives:
                        </span>
                        <div className="space-y-1">
                          {category?.alternatives?.map((alt, index) => (
                            <div key={index} className="text-sm text-primary hover:text-primary/80 cursor-pointer">
                              • {alt?.name} - Save {formatCurrency(alt?.savings)}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseCategories;