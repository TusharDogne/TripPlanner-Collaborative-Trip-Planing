import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [votes, setVotes] = useState({});
  const [chatMessages, setChatMessages] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const demoSteps = [
    {
      title: "Create Your Trip",
      description: "Start by adding your destination and inviting friends",
      action: "destination"
    },
    {
      title: "Collaborate in Real-Time",
      description: "Watch as friends join and start adding suggestions",
      action: "collaborate"
    },
    {
      title: "Vote Together",
      description: "Use our voting system to make group decisions",
      action: "vote"
    },
    {
      title: "Track Budget",
      description: "Keep everyone on the same page with transparent budgeting",
      action: "budget"
    }
  ];

  const sampleDestinations = [
    { id: 1, name: "Shibuya Crossing", type: "Attraction", cost: "$0", votes: 0 },
    { id: 2, name: "Tokyo Skytree", type: "Landmark", cost: "$25", votes: 0 },
    { id: 3, name: "Senso-ji Temple", type: "Cultural", cost: "$0", votes: 0 },
    { id: 4, name: "Tsukiji Fish Market", type: "Food", cost: "$30", votes: 0 }
  ];

  const sampleUsers = [
    { id: 1, name: "You", avatar: "👤", color: "#FF6B6B" },
    { id: 2, name: "Sarah", avatar: "👩", color: "#4ECDC4" },
    { id: 3, name: "Mike", avatar: "👨", color: "#FFE66D" },
    { id: 4, name: "Emma", avatar: "👩‍🦰", color: "#95E1D3" }
  ];

  const initialMessages = [
    { id: 1, user: "Sarah", message: "Excited for Tokyo! 🗾", timestamp: "2m ago" },
    { id: 2, user: "Mike", message: "Should we visit the fish market?", timestamp: "1m ago" },
    { id: 3, user: "Emma", message: "Love the temple idea! 🏯", timestamp: "30s ago" }
  ];

  useEffect(() => {
    setChatMessages(initialMessages);
  }, []);

  const handleVote = (destinationId) => {
    setVotes(prev => ({
      ...prev,
      [destinationId]: (prev?.[destinationId] || 0) + 1
    }));

    // Add chat message
    const newMessage = {
      id: Date.now(),
      user: "You",
      message: `Voted for ${sampleDestinations?.find(d => d?.id === destinationId)?.name}! 👍`,
      timestamp: "now"
    };
    setChatMessages(prev => [...prev, newMessage]);
  };

  const startDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setVotes({});
    setChatMessages(initialMessages);

    // Simulate demo progression
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= demoSteps?.length - 1) {
          setIsPlaying(false);
          clearInterval(interval);
          return 0;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-card/50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Experience Collaborative Planning
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Try our interactive demo and see how easy it is to plan trips together. No signup required!
          </p>
          
          <Button
            variant="default"
            size="lg"
            iconName={isPlaying ? "Pause" : "Play"}
            iconPosition="left"
            onClick={startDemo}
            disabled={isPlaying}
          >
            {isPlaying ? "Demo Running..." : "Start Interactive Demo"}
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Demo Steps */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-foreground mb-8">How it works</h3>
            
            {demoSteps?.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-start space-x-4 p-4 rounded-xl transition-all duration-300 ${
                  currentStep === index && isPlaying
                    ? 'bg-primary/10 border border-primary/20' :'hover:bg-card'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  currentStep >= index && isPlaying
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {index + 1}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{step?.title}</h4>
                  <p className="text-muted-foreground text-sm">{step?.description}</p>
                </div>
                
                {currentStep === index && isPlaying && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3 h-3 bg-success rounded-full animate-pulse"
                  />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Interactive Demo Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-2xl shadow-collaborative overflow-hidden"
          >
            {/* Demo Header */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground">Tokyo Adventure 2024</h3>
                <div className="flex -space-x-2">
                  {sampleUsers?.map((user) => (
                    <div
                      key={user?.id}
                      className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-sm"
                      style={{ backgroundColor: user?.color }}
                    >
                      {user?.avatar}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={16} />
                  <span>Dec 15-22, 2024</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="DollarSign" size={16} />
                  <span>$2,400 budget</span>
                </div>
              </div>
            </div>

            {/* Demo Content */}
            <div className="p-6">
              {/* Destinations List */}
              <div className="mb-6">
                <h4 className="font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="MapPin" size={18} className="mr-2 text-primary" />
                  Places to Visit
                </h4>
                
                <div className="space-y-3">
                  {sampleDestinations?.map((destination) => (
                    <motion.div
                      key={destination?.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-3 bg-background rounded-lg border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name="MapPin" size={16} className="text-muted-foreground" />
                        <div>
                          <span className="font-medium text-foreground">{destination?.name}</span>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <span>{destination?.type}</span>
                            <span>•</span>
                            <span>{destination?.cost}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Icon name="Heart" size={14} className="text-success" />
                          <span className="text-sm font-medium">{votes?.[destination?.id] || 0}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="ThumbsUp"
                          onClick={() => handleVote(destination?.id)}
                          className="text-xs"
                        >
                          Vote
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Live Chat */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3 flex items-center">
                  <Icon name="MessageCircle" size={18} className="mr-2 text-secondary" />
                  Group Chat
                </h4>
                
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  <AnimatePresence>
                    {chatMessages?.map((message) => (
                      <motion.div
                        key={message?.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm"
                      >
                        <span className="font-medium text-primary">{message?.user}:</span>
                        <span className="text-muted-foreground ml-2">{message?.message}</span>
                        <span className="text-xs text-muted-foreground ml-2">({message?.timestamp})</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                
                <div className="mt-3 flex space-x-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <Button variant="default" size="sm" iconName="Send">
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;