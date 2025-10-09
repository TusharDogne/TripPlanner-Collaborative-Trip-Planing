import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeUsers, setActiveUsers] = useState(127);
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const navigationItems = [
    { path: '/trip-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/collaborative-planner', label: 'Plan Together', icon: 'Users' },
    { path: '/smart-recommendations', label: 'Discover', icon: 'Compass' },
    { path: '/budget-coordinator', label: 'Budget', icon: 'Calculator' },
  ];

  const secondaryItems = [
    { path: '/community-gallery', label: 'Community', icon: 'Image' },
    { path: '/settings', label: 'Settings', icon: 'Settings' },
    { path: '/help', label: 'Help', icon: 'HelpCircle' },
  ];

  const isActive = (path) => location?.pathname === path;

  const Logo = () => (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <svg width="32" height="32" viewBox="0 0 32 32" className="text-primary">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="var(--color-secondary)" />
            </linearGradient>
          </defs>
          <circle cx="16" cy="16" r="14" fill="url(#logoGradient)" />
          <path 
            d="M12 10l8 6-8 6V10z" 
            fill="white" 
            className="drop-shadow-sm"
          />
          <circle cx="24" cy="8" r="3" fill="var(--color-accent)" className="animate-pulse" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-poppins font-bold text-xl text-foreground tracking-tight">
          Trip Planner
        </span>
        <span className="font-inter text-xs text-muted-foreground -mt-1">
          Plan Together
        </span>
      </div>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo - No left padding */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <a
              key={item?.path}
              href={item?.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-organic ${
                isActive(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-soft'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={18} />
              <span className="font-inter font-medium text-sm">{item?.label}</span>
            </a>
          ))}
          
          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreHorizontal"
              iconSize={18}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-2"
            >
              More
            </Button>
            
            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-collaborative py-2 z-50">
                {secondaryItems?.map((item) => (
                  <a
                    key={item?.path}
                    href={item?.path}
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-organic"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Live Activity Indicator */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-accent/10 rounded-full">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="font-inter text-xs text-muted-foreground">
              {activeUsers} planning now
            </span>
          </div>

          {/* Collaborative Cursors Preview */}
          <div className="hidden lg:flex items-center space-x-1">
            <div className="flex -space-x-2">
              {[1, 2, 3]?.map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background shadow-soft collaborative-cursor"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-full h-full rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-xs font-medium text-white">
                      {String.fromCharCode(64 + i)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <Button
            variant="default"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
            className="hidden sm:flex"
          >
            Start Planning
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            iconName={isMenuOpen ? "X" : "Menu"}
            iconSize={20}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden"
          />
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <nav className="px-6 py-4 space-y-2">
            {[...navigationItems, ...secondaryItems]?.map((item) => (
              <a
                key={item?.path}
                href={item?.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-organic ${
                  isActive(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon name={item?.icon} size={20} />
                <span className="font-inter font-medium">{item?.label}</span>
              </a>
            ))}
            
            <div className="pt-4 border-t border-border">
              <Button
                variant="default"
                fullWidth
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
              >
                Start Planning Together
              </Button>
            </div>
          </nav>
        </div>
      )}
      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;