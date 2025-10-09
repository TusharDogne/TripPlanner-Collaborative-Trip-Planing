import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ExpenseTracker = ({ expenses, onAddExpense, onApproveExpense, currency = 'USD' }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'other',
    paidBy: '',
    splitWith: [],
    receipt: null
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    })?.format(amount);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      approved: 'success',
      rejected: 'error',
      paid: 'primary'
    };
    return colors?.[status] || 'muted';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: 'Clock',
      approved: 'CheckCircle',
      rejected: 'XCircle',
      paid: 'CreditCard'
    };
    return icons?.[status] || 'Circle';
  };

  const handleAddExpense = () => {
    if (newExpense?.description && newExpense?.amount && newExpense?.paidBy) {
      onAddExpense({
        ...newExpense,
        id: Date.now(),
        amount: parseFloat(newExpense?.amount),
        date: new Date()?.toISOString(),
        status: 'pending'
      });
      setNewExpense({
        description: '',
        amount: '',
        category: 'other',
        paidBy: '',
        splitWith: [],
        receipt: null
      });
      setShowAddForm(false);
    }
  };

  const categories = [
    { value: 'flights', label: 'Flights' },
    { value: 'accommodation', label: 'Accommodation' },
    { value: 'activities', label: 'Activities' },
    { value: 'food', label: 'Food & Drinks' },
    { value: 'transport', label: 'Transport' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-poppins font-semibold text-foreground">Expense Tracker</h2>
        <Button
          variant="default"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          Add Expense
        </Button>
      </div>
      {/* Add Expense Form */}
      {showAddForm && (
        <div className="bg-muted/30 rounded-lg p-4 mb-6 border border-border">
          <h3 className="font-medium text-foreground mb-4">Add New Expense</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Description"
              type="text"
              placeholder="What was this expense for?"
              value={newExpense?.description}
              onChange={(e) => setNewExpense({...newExpense, description: e?.target?.value})}
              required
            />
            
            <Input
              label="Amount"
              type="number"
              placeholder="0.00"
              value={newExpense?.amount}
              onChange={(e) => setNewExpense({...newExpense, amount: e?.target?.value})}
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Category</label>
              <select 
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground"
                value={newExpense?.category}
                onChange={(e) => setNewExpense({...newExpense, category: e?.target?.value})}
              >
                {categories?.map(cat => (
                  <option key={cat?.value} value={cat?.value}>{cat?.label}</option>
                ))}
              </select>
            </div>
            
            <Input
              label="Paid By"
              type="text"
              placeholder="Who paid for this?"
              value={newExpense?.paidBy}
              onChange={(e) => setNewExpense({...newExpense, paidBy: e?.target?.value})}
              required
            />
          </div>
          
          <div className="flex items-center space-x-3 mt-4">
            <Button variant="default" onClick={handleAddExpense}>
              Add Expense
            </Button>
            <Button variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
      {/* Expense List */}
      <div className="space-y-4">
        {expenses?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Receipt" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No expenses recorded yet</p>
            <p className="text-sm text-muted-foreground">Add your first expense to get started</p>
          </div>
        ) : (
          expenses?.map((expense) => (
            <div key={expense?.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-organic">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-foreground">{expense?.description}</h3>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full bg-${getStatusColor(expense?.status)}/10`}>
                      <Icon 
                        name={getStatusIcon(expense?.status)} 
                        size={12} 
                        className={`text-${getStatusColor(expense?.status)}`}
                      />
                      <span className={`text-xs font-medium text-${getStatusColor(expense?.status)} capitalize`}>
                        {expense?.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Amount:</span>
                      <div className="font-medium text-foreground">{formatCurrency(expense?.amount)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Paid by:</span>
                      <div className="font-medium text-foreground">{expense?.paidBy}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Category:</span>
                      <div className="font-medium text-foreground capitalize">{expense?.category}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Date:</span>
                      <div className="font-medium text-foreground">
                        {new Date(expense.date)?.toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {expense?.splitWith && expense?.splitWith?.length > 0 && (
                    <div className="mt-3">
                      <span className="text-sm text-muted-foreground">Split with: </span>
                      <span className="text-sm text-foreground">{expense?.splitWith?.join(', ')}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  {expense?.receipt && (
                    <Button variant="ghost" size="icon" iconName="Paperclip" />
                  )}
                  
                  {expense?.status === 'pending' && (
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="Check"
                        onClick={() => onApproveExpense(expense?.id, 'approved')}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="X"
                        onClick={() => onApproveExpense(expense?.id, 'rejected')}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;