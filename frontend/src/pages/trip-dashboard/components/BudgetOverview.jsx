import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import axios from 'axios';

const BudgetOverview = ({ budgetData, onBudgetAction }) => {
  const [animatedValues, setAnimatedValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tripId, setTripId] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
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

  // 🔸 Submit expense to backend
  const handleSubmitExpense = async () => {
    try {
      if (!tripId || !amount) {
        alert('Trip ID and Amount are required.');
        return;
      }

      setLoading(true);
      const token = localStorage.getItem("jwtToken");

      const response = await axios.post(
        'http://localhost:8080/api/budget/add-expense',
        { tripId, amount: Number(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message || 'Expense added successfully!');
      setShowModal(false);
      setTripId('');
      setAmount('');
      onBudgetAction?.('refresh', response.data.updatedBudget);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ---------- Main Budget Card ---------- */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <h3 className="font-poppins font-bold text-lg text-foreground">Budget Overview</h3>
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${status.color} bg-current/10`}>
              <Icon name={status.icon} size={12} />
              <span>{status.text}</span>
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
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted opacity-20" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${spentPercentage * 2.827} 282.7`}
                className={`transition-all duration-1000 ${getProgressColor(spentPercentage)?.replace('bg-', 'stroke-')}`}
                style={{ strokeDashoffset: 0, transition: 'stroke-dasharray 1s ease-in-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-foreground">{Math.round(spentPercentage)}%</span>
              <span className="text-xs text-muted-foreground">spent</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl font-bold text-foreground">
              {formatCurrency(animatedValues.spent || 0)}
            </div>
            <div className="text-sm text-muted-foreground">
              of {formatCurrency(animatedValues.totalBudget || 0)} total budget
            </div>
            <div className="text-lg font-medium text-success">
              {formatCurrency(animatedValues.remaining || 0)} remaining
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            iconSize={14}
            onClick={() => setShowModal(true)}
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

      {/* ---------- POPUP MODAL ---------- */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-card rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold text-foreground mb-4">Add New Expense</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Trip ID</label>
                <input
                  type="text"
                  value={tripId}
                  onChange={(e) => setTripId(e.target.value)}
                  placeholder="Enter Trip ID"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Amount (₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter Amount"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>

              <Button
                variant="default"
                size="sm"
                onClick={handleSubmitExpense}
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Submit'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BudgetOverview;
