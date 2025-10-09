import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CostPrediction = ({ predictions, onUpdatePrediction, currency = 'USD' }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('current');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    })?.format(amount);
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'success';
    if (confidence >= 60) return 'warning';
    return 'error';
  };

  const timeframes = [
    { id: 'current', label: 'Current Season', description: 'Based on current market prices' },
    { id: 'optimal', label: 'Optimal Time', description: 'Best time to book for savings' },
    { id: 'peak', label: 'Peak Season', description: 'Highest expected prices' }
  ];

  const currentPrediction = predictions?.[selectedTimeframe] || predictions?.current;

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-poppins font-semibold text-foreground">Cost Predictions</h2>
        <div className="flex items-center space-x-2 px-3 py-1 bg-accent/10 rounded-full">
          <Icon name="TrendingUp" size={16} className="text-accent-foreground" />
          <span className="text-sm font-medium text-accent-foreground">AI Powered</span>
        </div>
      </div>
      {/* Timeframe Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {timeframes?.map((timeframe) => (
          <div
            key={timeframe?.id}
            className={`p-4 rounded-lg border cursor-pointer transition-organic ${
              selectedTimeframe === timeframe?.id
                ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/30'
            }`}
            onClick={() => setSelectedTimeframe(timeframe?.id)}
          >
            <h3 className="font-medium text-foreground mb-1">{timeframe?.label}</h3>
            <p className="text-sm text-muted-foreground">{timeframe?.description}</p>
            <div className="mt-2 text-lg font-semibold text-primary">
              {formatCurrency(predictions?.[timeframe?.id]?.total || 0)}
            </div>
          </div>
        ))}
      </div>
      {/* Prediction Details */}
      <div className="space-y-6">
        {/* Total Prediction */}
        <div className="text-center p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-border">
          <div className="text-4xl font-poppins font-bold text-foreground mb-2">
            {formatCurrency(currentPrediction?.total)}
          </div>
          <p className="text-muted-foreground mb-4">Predicted Total Cost</p>
          
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full bg-${getConfidenceColor(currentPrediction?.confidence)}/10`}>
              <Icon 
                name="Target" 
                size={16} 
                className={`text-${getConfidenceColor(currentPrediction?.confidence)}`}
              />
              <span className={`text-sm font-medium text-${getConfidenceColor(currentPrediction?.confidence)}`}>
                {currentPrediction?.confidence}% confidence
              </span>
            </div>
            
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-muted/50">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Updated {currentPrediction?.lastUpdated}
              </span>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div>
          <h3 className="font-medium text-foreground mb-4">Category Breakdown</h3>
          <div className="space-y-3">
            {currentPrediction?.categories?.map((category) => (
              <div key={category?.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg bg-${category?.color}/10 flex items-center justify-center`}>
                    <Icon name={category?.icon} size={16} className={`text-${category?.color}`} />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{category?.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Range: {formatCurrency(category?.min)} - {formatCurrency(category?.max)}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-semibold text-foreground">
                    {formatCurrency(category?.predicted)}
                  </div>
                  <div className={`text-sm text-${category?.trend === 'up' ? 'error' : category?.trend === 'down' ? 'success' : 'muted-foreground'}`}>
                    {category?.trend === 'up' && '↗'} 
                    {category?.trend === 'down' && '↘'} 
                    {category?.trend === 'stable' && '→'} 
                    {category?.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Factors Affecting Price */}
        <div>
          <h3 className="font-medium text-foreground mb-4">Factors Affecting Prices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentPrediction?.factors?.map((factor, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                <Icon 
                  name={factor?.impact === 'positive' ? 'TrendingUp' : factor?.impact === 'negative' ? 'TrendingDown' : 'Minus'} 
                  size={16} 
                  className={`mt-1 ${
                    factor?.impact === 'positive' ? 'text-error' : 
                    factor?.impact === 'negative'? 'text-success' : 'text-muted-foreground'
                  }`}
                />
                <div>
                  <div className="font-medium text-foreground">{factor?.name}</div>
                  <div className="text-sm text-muted-foreground">{factor?.description}</div>
                  <div className={`text-sm font-medium mt-1 ${
                    factor?.impact === 'positive' ? 'text-error' : 
                    factor?.impact === 'negative'? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {factor?.impact === 'positive' ? '+' : factor?.impact === 'negative' ? '-' : ''}
                    {factor?.percentage}% impact
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Lightbulb" size={20} className="text-accent-foreground" />
            <h3 className="font-medium text-accent-foreground">Money-Saving Recommendations</h3>
          </div>
          <div className="space-y-2">
            {currentPrediction?.recommendations?.map((rec, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Icon name="ArrowRight" size={14} className="text-accent-foreground mt-1" />
                <div>
                  <span className="text-sm text-accent-foreground">{rec?.text}</span>
                  {rec?.savings && (
                    <span className="ml-2 text-sm font-medium text-success">
                      Save {formatCurrency(rec?.savings)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostPrediction;