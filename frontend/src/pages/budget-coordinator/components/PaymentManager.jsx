import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentManager = ({ paymentRequests, onSendReminder, onProcessPayment, currency = 'USD' }) => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('venmo');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    })?.format(amount);
  };

  const getUrgencyColor = (daysOverdue) => {
    if (daysOverdue > 7) return 'error';
    if (daysOverdue > 3) return 'warning';
    if (daysOverdue > 0) return 'warning';
    return 'success';
  };

  const getPaymentMethodIcon = (method) => {
    const icons = {
      venmo: 'Smartphone',
      paypal: 'CreditCard',
      bank: 'Building',
      cash: 'Banknote',
      splitwise: 'Calculator'
    };
    return icons?.[method] || 'CreditCard';
  };

  const paymentMethods = [
    { id: 'venmo', name: 'Venmo', description: 'Quick peer-to-peer payments' },
    { id: 'paypal', name: 'PayPal', description: 'Secure online payments' },
    { id: 'bank', name: 'Bank Transfer', description: 'Direct bank transfer' },
    { id: 'cash', name: 'Cash', description: 'Pay in person' },
    { id: 'splitwise', name: 'Splitwise', description: 'Track and settle later' }
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-poppins font-semibold text-foreground">Payment Management</h2>
        <div className="flex items-center space-x-2 px-3 py-1 bg-warning/10 rounded-full">
          <Icon name="AlertCircle" size={16} className="text-warning" />
          <span className="text-sm font-medium text-warning">
            {paymentRequests?.filter(p => p?.status === 'pending')?.length} pending
          </span>
        </div>
      </div>
      {/* Payment Requests */}
      <div className="space-y-4 mb-6">
        {paymentRequests?.map((request) => {
          const daysOverdue = Math.floor((new Date() - new Date(request.dueDate)) / (1000 * 60 * 60 * 24));
          const urgencyColor = getUrgencyColor(daysOverdue);

          return (
            <div key={request?.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-organic">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {request?.fromUser?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-foreground">{request?.fromUser}</h3>
                    <p className="text-sm text-muted-foreground">{request?.description}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-lg font-semibold text-foreground">
                        {formatCurrency(request?.amount)}
                      </span>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full bg-${urgencyColor}/10`}>
                        <Icon 
                          name={daysOverdue > 0 ? "AlertTriangle" : "Clock"} 
                          size={12} 
                          className={`text-${urgencyColor}`}
                        />
                        <span className={`text-xs font-medium text-${urgencyColor}`}>
                          {daysOverdue > 0 
                            ? `${daysOverdue} days overdue` 
                            : `Due ${new Date(request.dueDate)?.toLocaleDateString()}`
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {request?.status === 'pending' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="MessageCircle"
                        onClick={() => onSendReminder(request?.id)}
                      >
                        Remind
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        iconName="CreditCard"
                        onClick={() => setSelectedPayment(request)}
                      >
                        Pay Now
                      </Button>
                    </>
                  )}
                  
                  {request?.status === 'paid' && (
                    <div className="flex items-center space-x-2 px-3 py-1 bg-success/10 rounded-full">
                      <Icon name="CheckCircle" size={16} className="text-success" />
                      <span className="text-sm font-medium text-success">Paid</span>
                    </div>
                  )}
                </div>
              </div>
              {request?.lastReminder && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Last reminder sent: {new Date(request.lastReminder)?.toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Payment Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl p-6 w-full max-w-md border border-border shadow-collaborative">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-poppins font-semibold text-foreground">
                Pay {selectedPayment?.fromUser}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                iconName="X"
                onClick={() => setSelectedPayment(null)}
              />
            </div>

            <div className="mb-6">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-3xl font-poppins font-bold text-foreground mb-1">
                  {formatCurrency(selectedPayment?.amount)}
                </div>
                <p className="text-sm text-muted-foreground">{selectedPayment?.description}</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">Choose Payment Method</h4>
              <div className="space-y-2">
                {paymentMethods?.map((method) => (
                  <div
                    key={method?.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-organic ${
                      paymentMethod === method?.id
                        ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/30'
                    }`}
                    onClick={() => setPaymentMethod(method?.id)}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      paymentMethod === method?.id ? 'bg-primary text-white' : 'bg-muted'
                    }`}>
                      <Icon name={getPaymentMethodIcon(method?.id)} size={16} />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{method?.name}</div>
                      <div className="text-sm text-muted-foreground">{method?.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="default"
                fullWidth
                iconName="CreditCard"
                iconPosition="left"
                onClick={() => {
                  onProcessPayment(selectedPayment?.id, paymentMethod);
                  setSelectedPayment(null);
                }}
              >
                Pay {formatCurrency(selectedPayment?.amount)}
              </Button>
              <Button
                variant="outline"
                onClick={() => setSelectedPayment(null)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Quick Actions */}
      <div className="border-t border-border pt-6">
        <h3 className="font-medium text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="outline" size="sm" iconName="Send" iconPosition="left">
            Send Request
          </Button>
          <Button variant="outline" size="sm" iconName="Calculator" iconPosition="left">
            Split Bill
          </Button>
          <Button variant="outline" size="sm" iconName="History" iconPosition="left">
            View History
          </Button>
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentManager;