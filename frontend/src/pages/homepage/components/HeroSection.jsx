import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [activeUsers, setActiveUsers] = useState(1247);
  const [tripsToday, setTripsToday] = useState(89);
  const [collaborativeCursors, setCollaborativeCursors] = useState([]);

  useEffect(() => {
    // Simulate live counters
    const interval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 5) - 2);
      if (Math.random() > 0.7) {
        setTripsToday(prev => prev + 1);
      }
    }, 3000);

    // Simulate collaborative cursors
    const cursorInterval = setInterval(() => {
      const newCursors = Array.from({ length: 3 }, (_, i) => ({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
        user: ['Sarah', 'Mike', 'Emma']?.[i],
        color: ['#FF6B6B', '#4ECDC4', '#FFE66D']?.[i]
      }));
      setCollaborativeCursors(newCursors);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-card to-muted overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-secondary rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      <div className="relative z-10 container mx-auto px-6 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Live Activity Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2"
            >
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-accent-foreground">
                {activeUsers?.toLocaleString()} friends planning now
              </span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
              >
                Where friends become{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  co-creators
                </span>{' '}
                of unforgettable journeys
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl"
              >
                Transform trip planning from a stressful solo task into an engaging group experience. Plan together, budget smart, and discover more with real-time collaboration.
              </motion.p>
            </div>

            {/* Quick Trip Creation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-card border border-border rounded-2xl p-6 shadow-soft"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">Start planning in 30 seconds</h3>
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Where do you want to go?"
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <Button variant="default" size="lg" iconName="Search" iconPosition="left">
                    Explore
                  </Button>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Popular: Tokyo, Paris, Bali, New York</span>
                  <span className="text-success font-medium">{tripsToday} trips started today</span>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="default" size="lg" iconName="Users" iconPosition="left" className="flex-1 sm:flex-none">
                Start Planning Together
              </Button>
              <Button variant="outline" size="lg" iconName="Play" iconPosition="left" className="flex-1 sm:flex-none">
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Collaborative Planning Mockup */}
            <div className="relative bg-card border border-border rounded-2xl p-6 shadow-collaborative">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground">Tokyo Adventure 2024</h3>
                <div className="flex -space-x-2">
                  {['Sarah', 'Mike', 'Emma']?.map((name, i) => (
                    <div
                      key={name}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background flex items-center justify-center text-xs font-medium text-white"
                    >
                      {name?.[0]}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Destinations with Voting */}
              <div className="space-y-4">
                {[
                  { name: 'Shibuya Crossing', votes: 3, total: 3 },
                  { name: 'Tokyo Skytree', votes: 2, total: 3 },
                  { name: 'Senso-ji Temple', votes: 3, total: 3 }
                ]?.map((destination, i) => (
                  <motion.div
                    key={destination?.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + i * 0.2 }}
                    className="flex items-center justify-between p-3 bg-background rounded-lg border border-border"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name="MapPin" size={16} className="text-primary" />
                      <span className="font-medium text-foreground">{destination?.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {Array.from({ length: destination?.total })?.map((_, j) => (
                          <div
                            key={j}
                            className={`w-2 h-2 rounded-full ${
                              j < destination?.votes ? 'bg-success' : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {destination?.votes}/{destination?.total}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Live Chat Preview */}
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="MessageCircle" size={16} className="text-secondary" />
                  <span className="text-sm font-medium text-foreground">Live Chat</span>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium text-primary">Sarah:</span>
                    <span className="text-muted-foreground ml-2">Love the temple idea! 🏯</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-secondary">Mike:</span>
                    <span className="text-muted-foreground ml-2">Budget looks good so far 💰</span>
                  </div>
                </div>
              </div>

              {/* Collaborative Cursors */}
              {collaborativeCursors?.map((cursor) => (
                <motion.div
                  key={cursor?.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute pointer-events-none z-20"
                  style={{
                    left: `${cursor?.x}%`,
                    top: `${cursor?.y}%`,
                  }}
                >
                  <div className="flex items-center space-x-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill={cursor?.color}>
                      <path d="M0 0l6 14 2-6 6-2L0 0z" />
                    </svg>
                    <span className="text-xs bg-black text-white px-2 py-1 rounded">
                      {cursor?.user}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="absolute -bottom-6 -left-6 bg-success text-success-foreground rounded-xl p-4 shadow-soft"
            >
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={20} />
                <div>
                  <div className="font-bold text-lg">98%</div>
                  <div className="text-xs opacity-90">Trip Success Rate</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="absolute -top-6 -right-6 bg-accent text-accent-foreground rounded-xl p-4 shadow-soft"
            >
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={20} />
                <div>
                  <div className="font-bold text-lg">30s</div>
                  <div className="text-xs opacity-90">Avg. Setup Time</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;