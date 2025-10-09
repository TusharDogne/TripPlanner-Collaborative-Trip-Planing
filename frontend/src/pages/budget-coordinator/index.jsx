import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import BudgetOverview from './components/BudgetOverview';
import ExpenseCategories from './components/ExpenseCategories';
import ExpenseTracker from './components/ExpenseTracker';
import PaymentManager from './components/PaymentManager';
import CostPrediction from './components/CostPrediction';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const BudgetCoordinator = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [tripData, setTripData] = useState({
    totalBudget: 4500,
    totalSpent: 3200,
    currency: 'USD'
  });

  // Mock data for budget overview
  const contributions = [
    {
      id: 1,
      name: "Sarah Johnson",
      contributed: 1200,
      expected: 1125,
      status: "paid"
    },
    {
      id: 2,
      name: "Mike Chen",
      contributed: 800,
      expected: 1125,
      status: "pending"
    },
    {
      id: 3,
      name: "Emma Davis",
      contributed: 1125,
      expected: 1125,
      status: "paid"
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      contributed: 275,
      expected: 1125,
      status: "pending"
    }
  ];

  // Mock data for expense categories
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Flights",
      type: "flights",
      color: "primary",
      description: "Round-trip flights for 4 people",
      predicted: 1800,
      actual: 1650,
      confidence: 85,
      lastUpdated: "2 hours ago",
      alternatives: [
        { name: "Economy Plus instead of Business", savings: 400 },
        { name: "Flexible dates (±3 days)", savings: 200 }
      ]
    },
    {
      id: 2,
      name: "Accommodation",
      type: "accommodation",
      color: "secondary",
      description: "Hotel for 5 nights",
      predicted: 1200,
      actual: 1350,
      confidence: 92,
      lastUpdated: "1 day ago",
      alternatives: [
        { name: "Airbnb apartment", savings: 300 },
        { name: "Hotel outside city center", savings: 150 }
      ]
    },
    {
      id: 3,
      name: "Activities",
      type: "activities",
      color: "accent",
      description: "Tours, attractions, and experiences",
      predicted: 800,
      actual: 450,
      confidence: 70,
      lastUpdated: "3 hours ago",
      alternatives: [
        { name: "Group discounts available", savings: 120 },
        { name: "Free walking tours", savings: 80 }
      ]
    },
    {
      id: 4,
      name: "Food & Dining",
      type: "food",
      color: "warning",
      description: "Meals and dining experiences",
      predicted: 600,
      actual: 520,
      confidence: 78,
      lastUpdated: "5 hours ago",
      alternatives: [
        { name: "Local markets vs restaurants", savings: 200 },
        { name: "Lunch specials", savings: 100 }
      ]
    },
    {
      id: 5,
      name: "Transportation",
      type: "transport",
      color: "success",
      description: "Local transport and transfers",
      predicted: 300,
      actual: 230,
      confidence: 88,
      lastUpdated: "1 hour ago",
      alternatives: [
        { name: "Public transport passes", savings: 50 },
        { name: "Walking + metro combo", savings: 30 }
      ]
    }
  ]);

  // Mock data for expenses
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: "Flight booking - United Airlines",
      amount: 1650,
      category: "flights",
      paidBy: "Sarah Johnson",
      splitWith: ["Mike Chen", "Emma Davis", "Alex Rodriguez"],
      date: "2025-01-15T10:30:00Z",
      status: "approved",
      receipt: true
    },
    {
      id: 2,
      description: "Hotel reservation - Grand Plaza",
      amount: 1350,
      category: "accommodation",
      paidBy: "Mike Chen",
      splitWith: ["Sarah Johnson", "Emma Davis", "Alex Rodriguez"],
      date: "2025-01-14T15:45:00Z",
      status: "approved",
      receipt: true
    },
    {
      id: 3,
      description: "City tour booking",
      amount: 280,
      category: "activities",
      paidBy: "Emma Davis",
      splitWith: ["Sarah Johnson", "Mike Chen", "Alex Rodriguez"],
      date: "2025-01-16T09:20:00Z",
      status: "pending",
      receipt: false
    },
    {
      id: 4,
      description: "Airport transfer",
      amount: 120,
      category: "transport",
      paidBy: "Alex Rodriguez",
      splitWith: ["Sarah Johnson", "Mike Chen", "Emma Davis"],
      date: "2025-01-16T14:10:00Z",
      status: "pending",
      receipt: true
    }
  ]);

  // Mock data for payment requests
  const paymentRequests = [
    {
      id: 1,
      fromUser: "Sarah Johnson",
      description: "Flight booking split",
      amount: 412.50,
      dueDate: "2025-01-20T00:00:00Z",
      status: "pending",
      lastReminder: "2025-01-15T10:00:00Z"
    },
    {
      id: 2,
      fromUser: "Mike Chen",
      description: "Hotel reservation split",
      amount: 337.50,
      dueDate: "2025-01-18T00:00:00Z",
      status: "pending",
      lastReminder: null
    },
    {
      id: 3,
      fromUser: "Emma Davis",
      description: "City tour booking",
      amount: 70,
      dueDate: "2025-01-22T00:00:00Z",
      status: "pending",
      lastReminder: null
    }
  ];

  // Mock data for cost predictions
  const predictions = {
    current: {
      total: 4650,
      confidence: 82,
      lastUpdated: "2 hours ago",
      categories: [
        {
          name: "Flights",
          icon: "Plane",
          color: "primary",
          predicted: 1650,
          min: 1400,
          max: 1900,
          trend: "stable",
          change: 0
        },
        {
          name: "Accommodation",
          icon: "Home",
          color: "secondary",
          predicted: 1350,
          min: 1200,
          max: 1600,
          trend: "up",
          change: 5
        },
        {
          name: "Activities",
          icon: "MapPin",
          color: "accent",
          predicted: 800,
          min: 600,
          max: 1000,
          trend: "down",
          change: -10
        },
        {
          name: "Food",
          icon: "UtensilsCrossed",
          color: "warning",
          predicted: 600,
          min: 450,
          max: 800,
          trend: "stable",
          change: 2
        },
        {
          name: "Transport",
          icon: "Car",
          color: "success",
          predicted: 250,
          min: 200,
          max: 350,
          trend: "down",
          change: -5
        }
      ],
      factors: [
        {
          name: "Peak Season",
          description: "Traveling during high-demand period",
          impact: "positive",
          percentage: 15
        },
        {
          name: "Group Booking",
          description: "Discounts available for 4+ people",
          impact: "negative",
          percentage: 8
        },
        {
          name: "Early Booking",
          description: "Booked 2 months in advance",
          impact: "negative",
          percentage: 12
        },
        {
          name: "Currency Exchange",
          description: "USD to EUR exchange rate trends",
          impact: "positive",
          percentage: 3
        }
      ],
      recommendations: [
        {
          text: "Book activities 1 week before travel for better rates",
          savings: 120
        },
        {
          text: "Consider lunch specials instead of dinner at high-end restaurants",
          savings: 200
        },
        {
          text: "Use public transport day passes instead of individual tickets",
          savings: 50
        },
        {
          text: "Book museum tickets online for group discounts",
          savings: 80
        }
      ]
    },
    optimal: {
      total: 3900,
      confidence: 75,
      lastUpdated: "1 day ago",
      categories: [
        {
          name: "Flights",
          icon: "Plane",
          color: "primary",
          predicted: 1400,
          min: 1200,
          max: 1600,
          trend: "down",
          change: -15
        },
        {
          name: "Accommodation",
          icon: "Home",
          color: "secondary",
          predicted: 1100,
          min: 950,
          max: 1300,
          trend: "down",
          change: -18
        },
        {
          name: "Activities",
          icon: "MapPin",
          color: "accent",
          predicted: 700,
          min: 550,
          max: 850,
          trend: "down",
          change: -12
        },
        {
          name: "Food",
          icon: "UtensilsCrossed",
          color: "warning",
          predicted: 500,
          min: 400,
          max: 650,
          trend: "down",
          change: -16
        },
        {
          name: "Transport",
          icon: "Car",
          color: "success",
          predicted: 200,
          min: 150,
          max: 280,
          trend: "down",
          change: -20
        }
      ],
      factors: [
        {
          name: "Off-Peak Season",
          description: "Traveling during low-demand period",
          impact: "negative",
          percentage: 25
        },
        {
          name: "Flexible Dates",
          description: "Can adjust travel dates by ±1 week",
          impact: "negative",
          percentage: 15
        },
        {
          name: "Advance Booking",
          description: "Book 3-4 months ahead",
          impact: "negative",
          percentage: 18
        }
      ],
      recommendations: [
        {
          text: "Travel in shoulder season (April-May or September-October)",
          savings: 750
        },
        {
          text: "Book Tuesday-Thursday flights for lower prices",
          savings: 300
        },
        {
          text: "Stay in neighborhoods outside tourist areas",
          savings: 400
        }
      ]
    },
    peak: {
      total: 5800,
      confidence: 88,
      lastUpdated: "6 hours ago",
      categories: [
        {
          name: "Flights",
          icon: "Plane",
          color: "primary",
          predicted: 2200,
          min: 2000,
          max: 2500,
          trend: "up",
          change: 33
        },
        {
          name: "Accommodation",
          icon: "Home",
          color: "secondary",
          predicted: 1800,
          min: 1600,
          max: 2100,
          trend: "up",
          change: 33
        },
        {
          name: "Activities",
          icon: "MapPin",
          color: "accent",
          predicted: 1000,
          min: 850,
          max: 1200,
          trend: "up",
          change: 25
        },
        {
          name: "Food",
          icon: "UtensilsCrossed",
          color: "warning",
          predicted: 600,
          min: 500,
          max: 750,
          trend: "stable",
          change: 0
        },
        {
          name: "Transport",
          icon: "Car",
          color: "success",
          predicted: 200,
          min: 150,
          max: 280,
          trend: "stable",
          change: -20
        }
      ],
      factors: [
        {
          name: "Holiday Season",
          description: "Christmas/New Year premium pricing",
          impact: "positive",
          percentage: 40
        },
        {
          name: "High Demand",
          description: "Popular destination during peak time",
          impact: "positive",
          percentage: 25
        },
        {
          name: "Limited Availability",
          description: "Fewer options available",
          impact: "positive",
          percentage: 20
        }
      ],
      recommendations: [
        {
          text: "Book immediately to secure current prices",
          savings: 0
        },
        {
          text: "Consider alternative destinations with similar attractions",
          savings: 1200
        }
      ]
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'categories', label: 'Categories', icon: 'PieChart' },
    { id: 'expenses', label: 'Expenses', icon: 'Receipt' },
    { id: 'payments', label: 'Payments', icon: 'CreditCard' },
    { id: 'predictions', label: 'Predictions', icon: 'TrendingUp' }
  ];

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const handleApproveExpense = (expenseId, status) => {
    setExpenses(expenses?.map(expense => 
      expense?.id === expenseId ? { ...expense, status } : expense
    ));
  };

  const handleSendReminder = (requestId) => {
    console.log(`Sending reminder for payment request ${requestId}`);
    // In a real app, this would send a notification
  };

  const handleProcessPayment = (requestId, method) => {
    console.log(`Processing payment ${requestId} via ${method}`);
    // In a real app, this would integrate with payment processors
  };

  const handleUpdatePrediction = (predictionData) => {
    console.log('Updating prediction:', predictionData);
    // In a real app, this would update the prediction model
  };

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setTripData(prev => ({
        ...prev,
        totalSpent: prev?.totalSpent + Math.random() * 10 - 5
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-poppins font-bold text-foreground mb-4">
                Budget Coordinator
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Transform expense coordination from stressful to transparent with visual tracking, 
                automated calculations, and intelligent cost predictions for your group trip.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-4 bg-card/50 rounded-lg border border-border">
                <Icon name="DollarSign" size={24} className="text-primary mx-auto mb-2" />
                <div className="text-2xl font-poppins font-bold text-foreground">
                  ${tripData?.totalBudget?.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Budget</div>
              </div>
              
              <div className="text-center p-4 bg-card/50 rounded-lg border border-border">
                <Icon name="TrendingUp" size={24} className="text-secondary mx-auto mb-2" />
                <div className="text-2xl font-poppins font-bold text-foreground">
                  ${tripData?.totalSpent?.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Spent</div>
              </div>
              
              <div className="text-center p-4 bg-card/50 rounded-lg border border-border">
                <Icon name="Users" size={24} className="text-accent mx-auto mb-2" />
                <div className="text-2xl font-poppins font-bold text-foreground">
                  {contributions?.length}
                </div>
                <div className="text-sm text-muted-foreground">Contributors</div>
              </div>
              
              <div className="text-center p-4 bg-card/50 rounded-lg border border-border">
                <Icon name="Clock" size={24} className="text-warning mx-auto mb-2" />
                <div className="text-2xl font-poppins font-bold text-foreground">
                  {paymentRequests?.filter(p => p?.status === 'pending')?.length}
                </div>
                <div className="text-sm text-muted-foreground">Pending Payments</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-card border-b border-border sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex space-x-1 overflow-x-auto py-4">
              {tabs?.map((tab) => (
                <Button
                  key={tab?.id}
                  variant={activeTab === tab?.id ? "default" : "ghost"}
                  size="sm"
                  iconName={tab?.icon}
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => setActiveTab(tab?.id)}
                  className="whitespace-nowrap"
                >
                  {tab?.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <BudgetOverview
                totalBudget={tripData?.totalBudget}
                totalSpent={tripData?.totalSpent}
                contributions={contributions}
                currency={tripData?.currency}
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ExpenseCategories
                  categories={categories?.slice(0, 3)}
                  onCategoryUpdate={handleUpdatePrediction}
                  currency={tripData?.currency}
                />
                <PaymentManager
                  paymentRequests={paymentRequests?.slice(0, 2)}
                  onSendReminder={handleSendReminder}
                  onProcessPayment={handleProcessPayment}
                  currency={tripData?.currency}
                />
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <ExpenseCategories
              categories={categories}
              onCategoryUpdate={handleUpdatePrediction}
              currency={tripData?.currency}
            />
          )}

          {activeTab === 'expenses' && (
            <ExpenseTracker
              expenses={expenses}
              onAddExpense={handleAddExpense}
              onApproveExpense={handleApproveExpense}
              currency={tripData?.currency}
            />
          )}

          {activeTab === 'payments' && (
            <PaymentManager
              paymentRequests={paymentRequests}
              onSendReminder={handleSendReminder}
              onProcessPayment={handleProcessPayment}
              currency={tripData?.currency}
            />
          )}

          {activeTab === 'predictions' && (
            <CostPrediction
              predictions={predictions}
              onUpdatePrediction={handleUpdatePrediction}
              currency={tripData?.currency}
            />
          )}
        </div>

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="text-center">
              <p className="text-muted-foreground">
                © {new Date()?.getFullYear()} TripSync. Making group travel budgeting transparent and stress-free.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BudgetCoordinator;