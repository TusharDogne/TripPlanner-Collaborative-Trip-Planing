import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BudgetOverview = ({ budgetData, onBudgetAction }) => {
  const [animatedValues, setAnimatedValues] = useState({});
  const [weatherImpact, setWeatherImpact] = useState(null);

  useEffect(() => {
    // Animate budget values
    const animate = () => {
      setAnimatedValues({
        totalBudget: budgetData?.total,
        spent: budgetData?.spent,
        remaining: budgetData?.remaining
      });
    };
    
    const timer = setTimeout(animate, 100);
    return () => clearTimeout(timer);
  }, [budgetData]);

  useEffect(() => {
    // Simulate weather impact on budget
    const impacts = [
      { type: 'rain', message: 'Rainy season may increase indoor activity costs', adjustment: '+$150' },
      { type: 'heat', message: 'Hot weather suggests higher AC and cooling costs', adjustment: '+$75' },
      { type: 'cold', message: 'Cold weather may require additional clothing budget', adjustment: '+$200' },
      null // No weather impact
    ];
    
    setWeatherImpact(impacts?.[Math.floor(Math.random() * impacts?.length)]);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    })?.format(amount);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-error';
    if (percentage >= 75) return 'bg-warning';
    if (percentage >= 50) return 'bg-accent';
    return 'bg-success';
  };

  const getBudgetStatus = () => {
    const percentage = (budgetData?.spent / budgetData?.total) * 100;
    if (percentage >= 90) return { text: 'Over Budget', color: 'text-error', icon: 'AlertTriangle' };
    if (percentage >= 75) return { text: 'Near Limit', color: 'text-warning', icon: 'AlertCircle' };
    if (percentage >= 50) return { text: 'On Track', color: 'text-accent', icon: 'TrendingUp' };
    return { text: 'Under Budget', color: 'text-success', icon: 'CheckCircle' };
  };

  const status = getBudgetStatus();
  const spentPercentage = (budgetData?.spent / budgetData?.total) * 100;

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-soft breathing-budget">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="font-poppins font-bold text-lg text-foreground">Budget Overview</h3>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${status?.color} bg-current/10`}>
            <Icon name={status?.icon} size={12} />
            <span>{status?.text}</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="Settings"
          iconSize={16}
          onClick={() => onBudgetAction?.('settings')}
        />
      </div>
      {/* Main Budget Display */}
      <div className="text-center mb-6">
        <div className="relative w-32 h-32 mx-auto mb-4">
          {/* Circular Progress */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted opacity-20"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${spentPercentage * 2.827} 282.7`}
              className={`transition-all duration-1000 ${getProgressColor(spentPercentage)?.replace('bg-', 'stroke-')}`}
              style={{
                strokeDashoffset: 0,
                transition: 'stroke-dasharray 1s ease-in-out'
              }}
            />
          </svg>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-foreground">
              {Math.round(spentPercentage)}%
            </span>
            <span className="text-xs text-muted-foreground">spent</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-3xl font-bold text-foreground">
            {formatCurrency(animatedValues?.spent || 0)}
          </div>
          <div className="text-sm text-muted-foreground">
            of {formatCurrency(animatedValues?.totalBudget || 0)} total budget
          </div>
          <div className="text-lg font-medium text-success">
            {formatCurrency(animatedValues?.remaining || 0)} remaining
          </div>
        </div>
      </div>
      {/* Budget Breakdown */}
      <div className="space-y-3 mb-6">
        {budgetData?.categories?.map((category, index) => (
          <div key={category?.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full`}></div>
              <span className="text-sm font-medium text-foreground">{category?.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {formatCurrency(category?.spent)} / {formatCurrency(category?.budget)}
              </span>
              <div className="w-16 bg-muted rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-500`}
                  style={{ width: `${Math.min((category?.spent / category?.budget) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Weather Impact */}
      
      {/* Quick Actions */}
      <div className="flex items-center space-x-2">
        <Button
          variant="default"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          iconSize={14}
          onClick={() => onBudgetAction?.('add-expense')}
          className="flex-1"
        >
          Add Expense
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Split"
          iconSize={14}
          onClick={() => onBudgetAction?.('split')}
        />
        <Button
          variant="outline"
          size="sm"
          iconName="Calculator"
          iconSize={14}
          onClick={() => onBudgetAction?.('calculate')}
        />
      </div>
    </div>
  );
};

export default BudgetOverview;