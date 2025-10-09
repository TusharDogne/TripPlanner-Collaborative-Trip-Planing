import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ValuePropositionCards = () => {
  const valueProps = [
    {
      id: 1,
      title: "Plan Together",
      description: "Real-time collaboration with friends. Vote on destinations, share ideas, and build consensus naturally.",
      icon: "Users",
      color: "primary",
      features: [
        "Live collaborative editing",
        "Group voting system",
        "Real-time chat integration",
        "Consensus tracking"
      ],
      animation: "collaborative-cursors"
    },
    {
      id: 2,
      title: "Budget Smart",
      description: "Transparent expense tracking and automatic splitting. No more awkward money conversations.",
      icon: "Calculator",
      color: "secondary",
      features: [
        "Automatic expense splitting",
        "Real-time budget tracking",
        "Cost prediction algorithms",
        "Payment reminders"
      ],
      animation: "expense-splitting"
    },
    {
      id: 3,
      title: "Discover More",
      description: "AI-powered recommendations based on group preferences, weather, and hidden local gems.",
      icon: "Compass",
      color: "accent",
      features: [
        "Personalized suggestions",
        "Weather integration",
        "Local insider tips",
        "Hidden gem discovery"
      ],
      animation: "ai-recommendations"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: "bg-primary/10",
        border: "border-primary/20",
        icon: "text-primary",
        accent: "bg-primary"
      },
      secondary: {
        bg: "bg-secondary/10",
        border: "border-secondary/20",
        icon: "text-secondary",
        accent: "bg-secondary"
      },
      accent: {
        bg: "bg-accent/10",
        border: "border-accent/20",
        icon: "text-accent-foreground",
        accent: "bg-accent"
      }
    };
    return colorMap?.[color];
  };

  const AnimatedIcon = ({ iconName, color, animation }) => {
    const colors = getColorClasses(color);
    
    return (
      <div className="relative">
        <div className={`w-16 h-16 ${colors?.bg} ${colors?.border} border rounded-2xl flex items-center justify-center mb-6`}>
          <Icon name={iconName} size={28} className={colors?.icon} />
        </div>
        {/* Animation Overlays */}
        {animation === 'collaborative-cursors' && (
          <div className="absolute -top-2 -right-2">
            <motion.div
              animate={{ 
                x: [0, 10, -5, 0],
                y: [0, -5, 10, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-3 h-3 bg-primary rounded-full"
            />
            <motion.div
              animate={{ 
                x: [0, -8, 12, 0],
                y: [0, 8, -3, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute top-1 left-1 w-2 h-2 bg-secondary rounded-full"
            />
          </div>
        )}
        {animation === 'expense-splitting' && (
          <div className="absolute -top-1 -right-1">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-4 h-4 bg-secondary rounded-full flex items-center justify-center"
            >
              <span className="text-xs text-white">$</span>
            </motion.div>
          </div>
        )}
        {animation === 'ai-recommendations' && (
          <div className="absolute -top-2 -right-2">
            <motion.div
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1.1, 0.8]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-4 h-4 bg-accent rounded-full"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="py-20 bg-background">
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
            Why choose TripSync?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of travel planning with features designed for modern group adventures
          </p>
        </motion.div>

        {/* Value Proposition Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {valueProps?.map((prop, index) => {
            const colors = getColorClasses(prop?.color);
            
            return (
              <motion.div
                key={prop?.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="h-full bg-card border border-border rounded-2xl p-8 shadow-soft hover:shadow-collaborative transition-all duration-300">
                  {/* Animated Icon */}
                  <AnimatedIcon 
                    iconName={prop?.icon} 
                    color={prop?.color} 
                    animation={prop?.animation}
                  />
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {prop?.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {prop?.description}
                  </p>
                  
                  {/* Features List */}
                  <ul className="space-y-2">
                    {prop?.features?.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-2 text-sm text-muted-foreground"
                      >
                        <div className={`w-1.5 h-1.5 ${colors?.accent} rounded-full`} />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  {/* Hover Effect Gradient */}
                  <div className={`absolute inset-0 ${colors?.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl -z-10`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-full px-6 py-3">
            <Icon name="Sparkles" size={20} className="text-primary" />
            <span className="font-medium text-foreground">
              Join 50,000+ travelers planning smarter
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValuePropositionCards;