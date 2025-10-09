import React from 'react';
import Icon from '../../../components/AppIcon';

const BudgetOverview = ({ totalBudget, totalSpent, contributions, currency = 'USD' }) => {
  const remaining = totalBudget - totalSpent;
  const spentPercentage = (totalSpent / totalBudget) * 100;
  const isOverBudget = totalSpent > totalBudget;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    })?.format(amount);
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-poppins font-semibold text-foreground">Trip Budget Overview</h2>
        <div className="flex items-center space-x-2 px-3 py-1 bg-accent/10 rounded-full">
          <Icon name="Users" size={16} className="text-accent-foreground" />
          <span className="text-sm font-medium text-accent-foreground">
            {contributions?.length} contributors
          </span>
        </div>
      </div>
      {/* Main Budget Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="text-center">
          <div className="text-3xl font-poppins font-bold text-foreground mb-1">
            {formatCurrency(totalBudget)}
          </div>
          <div className="text-sm text-muted-foreground">Total Budget</div>
        </div>
        
        <div className="text-center">
          <div className={`text-3xl font-poppins font-bold mb-1 ${
            isOverBudget ? 'text-error' : 'text-primary'
          }`}>
            {formatCurrency(totalSpent)}
          </div>
          <div className="text-sm text-muted-foreground">Total Spent</div>
        </div>
        
        <div className="text-center">
          <div className={`text-3xl font-poppins font-bold mb-1 ${
            remaining < 0 ? 'text-error' : 'text-success'
          }`}>
            {formatCurrency(Math.abs(remaining))}
          </div>
          <div className="text-sm text-muted-foreground">
            {remaining < 0 ? 'Over Budget' : 'Remaining'}
          </div>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">Budget Progress</span>
          <span className="text-sm text-muted-foreground">
            {Math.round(spentPercentage)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${
              isOverBudget 
                ? 'bg-error' 
                : spentPercentage > 80 
                  ? 'bg-warning' :'bg-success'
            }`}
            style={{ width: `${Math.min(spentPercentage, 100)}%` }}
          />
          {isOverBudget && (
            <div 
              className="h-full bg-error/50 -mt-3"
              style={{ width: `${Math.min(spentPercentage - 100, 20)}%` }}
            />
          )}
        </div>
      </div>
      {/* Contribution Status */}
      <div className="space-y-3">
        <h3 className="font-medium text-foreground mb-3">Contribution Status</h3>
        {contributions?.map((contributor) => (
          <div key={contributor?.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-xs font-medium text-white">
                  {contributor?.name?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              <div>
                <div className="font-medium text-foreground">{contributor?.name}</div>
                <div className="text-sm text-muted-foreground">
                  {formatCurrency(contributor?.contributed)} of {formatCurrency(contributor?.expected)}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-muted rounded-full h-2">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    contributor?.contributed >= contributor?.expected 
                      ? 'bg-success' :'bg-primary'
                  }`}
                  style={{ 
                    width: `${Math.min((contributor?.contributed / contributor?.expected) * 100, 100)}%` 
                  }}
                />
              </div>
              <Icon 
                name={contributor?.contributed >= contributor?.expected ? "CheckCircle" : "Clock"} 
                size={16} 
                className={
                  contributor?.contributed >= contributor?.expected 
                    ? "text-success" :"text-warning"
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetOverview;