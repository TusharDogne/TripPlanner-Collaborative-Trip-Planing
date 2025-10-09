import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = () => {
  const [stats, setStats] = useState({
    totalTrips: 12847,
    activeUsers: 3421,
    countriesVisited: 195,
    totalBudgetSaved: 2840000
  });

  const [animatedStats, setAnimatedStats] = useState({
    totalTrips: 0,
    activeUsers: 0,
    countriesVisited: 0,
    totalBudgetSaved: 0
  });

  useEffect(() => {
    const animateNumbers = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        setAnimatedStats({
          totalTrips: Math.floor(stats?.totalTrips * easeOutQuart),
          activeUsers: Math.floor(stats?.activeUsers * easeOutQuart),
          countriesVisited: Math.floor(stats?.countriesVisited * easeOutQuart),
          totalBudgetSaved: Math.floor(stats?.totalBudgetSaved * easeOutQuart)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedStats(stats);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    const timer = setTimeout(animateNumbers, 500);
    return () => clearTimeout(timer);
  }, [stats]);

  const formatBudget = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US')?.format(num);
  };

  const statItems = [
    {
      icon: 'MapPin',
      label: 'Collaborative Trips',
      value: formatNumber(animatedStats?.totalTrips),
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Successfully planned together'
    },
    {
      icon: 'Users',
      label: 'Active Planners',
      value: formatNumber(animatedStats?.activeUsers),
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      description: 'Planning right now'
    },
    {
      icon: 'Globe',
      label: 'Countries Explored',
      value: animatedStats?.countriesVisited,
      color: 'text-accent-foreground',
      bgColor: 'bg-accent/10',
      description: 'Destinations discovered'
    },
    {
      icon: 'TrendingDown',
      label: 'Budget Saved',
      value: formatBudget(animatedStats?.totalBudgetSaved),
      color: 'text-success',
      bgColor: 'bg-success/10',
      description: 'Through smart collaboration'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-8 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-poppins font-bold text-foreground mb-2">
          Community Impact
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          See how our collaborative travel planning community is transforming the way people explore the world together
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems?.map((item, index) => (
          <div
            key={index}
            className="bg-background rounded-xl p-6 shadow-soft hover:shadow-collaborative transition-organic group"
          >
            <div className={`w-12 h-12 ${item?.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-organic`}>
              <Icon name={item?.icon} size={24} className={item?.color} />
            </div>
            
            <div className="space-y-2">
              <p className="text-2xl font-bold text-foreground group-hover:scale-105 transition-organic">
                {item?.value}
              </p>
              <p className="font-medium text-foreground">{item?.label}</p>
              <p className="text-sm text-muted-foreground">{item?.description}</p>
            </div>

            {/* Animated Progress Bar */}
            <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full ${item?.bgColor?.replace('/10', '')} transition-all duration-2000 ease-out`}
                style={{ width: `${(animatedStats?.[Object.keys(stats)?.[index]] / stats?.[Object.keys(stats)?.[index]]) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      {/* Live Activity Indicator */}
      <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span>127 people planning trips right now</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span>43 trips completed this week</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span>89% consensus rate achieved</span>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;