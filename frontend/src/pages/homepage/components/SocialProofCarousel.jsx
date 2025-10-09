import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SocialProofCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      tripTitle: "Bali Adventure Squad",
      groupSize: 6,
      duration: "10 days",
      budget: "$1,800",
      savings: "$400",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
      testimonial: `TripSync made planning our Bali trip so much easier! We saved hours of back-and-forth messages and actually saved money by finding better deals together.`,
      author: "Jessica Chen",
      location: "San Francisco, CA",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      highlights: [
        "Saved $400 on group bookings",
        "Planned in 3 days vs usual 3 weeks",
        "Zero payment conflicts"
      ],
      rating: 5
    },
    {
      id: 2,
      tripTitle: "European Backpacking",
      groupSize: 4,
      duration: "21 days",
      budget: "$3,200",
      savings: "$600",
      image: "https://images.unsplash.com/photo-1471919743851-c4df8b6ee133?w=400&h=300&fit=crop",
      testimonial: `The collaborative planning feature is genius! Everyone could contribute ideas and we made decisions together. No more one person doing all the work.`,
      author: "Marcus Rodriguez",
      location: "Austin, TX",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      highlights: [
        "Visited 8 countries seamlessly",
        "Perfect budget tracking",
        "Everyone felt heard"
      ],
      rating: 5
    },
    {
      id: 3,
      tripTitle: "Tokyo Food Tour",
      groupSize: 8,
      duration: "7 days",
      budget: "$2,100",
      savings: "$350",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
      testimonial: `Best group trip ever! The voting system helped us choose restaurants everyone loved, and the budget splitting was transparent and fair.`,
      author: "Sarah Kim",
      location: "Seattle, WA",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      highlights: [
        "Discovered 15+ hidden gems",
        "Fair expense splitting",
        "Real-time collaboration"
      ],
      rating: 5
    },
    {
      id: 4,
      tripTitle: "Costa Rica Eco Adventure",
      groupSize: 5,
      duration: "12 days",
      budget: "$2,800",
      savings: "$500",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      testimonial: `TripSync's recommendations were spot-on! We found amazing eco-lodges and activities that perfectly matched our group's interests and budget.`,
      author: "David Thompson",
      location: "Denver, CO",
      avatar: "https://randomuser.me/api/portraits/men/35.jpg",
      highlights: [
        "Perfect activity matching",
        "Eco-friendly options",
        "Stress-free planning"
      ],
      rating: 5
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials?.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials?.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-card to-background">
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
            Real Stories, Real Adventures
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how TripSync has transformed group travel planning for thousands of adventurers
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-card border border-border rounded-2xl shadow-collaborative overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={testimonials?.[currentIndex]?.image}
                      alt={testimonials?.[currentIndex]?.tripTitle}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Trip Stats Overlay */}
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white rounded-lg p-3">
                      <div className="text-sm font-medium mb-1">
                        {testimonials?.[currentIndex]?.tripTitle}
                      </div>
                      <div className="flex items-center space-x-4 text-xs opacity-90">
                        <span className="flex items-center">
                          <Icon name="Users" size={12} className="mr-1" />
                          {testimonials?.[currentIndex]?.groupSize} friends
                        </span>
                        <span className="flex items-center">
                          <Icon name="Calendar" size={12} className="mr-1" />
                          {testimonials?.[currentIndex]?.duration}
                        </span>
                      </div>
                    </div>

                    {/* Savings Badge */}
                    <div className="absolute top-4 right-4 bg-success text-success-foreground rounded-full px-3 py-1 text-sm font-medium">
                      Saved {testimonials?.[currentIndex]?.savings}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8">
                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-4">
                      {Array.from({ length: testimonials?.[currentIndex]?.rating })?.map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-accent fill-current" />
                      ))}
                    </div>

                    {/* Testimonial */}
                    <blockquote className="text-lg text-foreground mb-6 leading-relaxed">
                      "{testimonials?.[currentIndex]?.testimonial}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center space-x-3 mb-6">
                      <Image
                        src={testimonials?.[currentIndex]?.avatar}
                        alt={testimonials?.[currentIndex]?.author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-foreground">
                          {testimonials?.[currentIndex]?.author}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {testimonials?.[currentIndex]?.location}
                        </div>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2">
                      {testimonials?.[currentIndex]?.highlights?.map((highlight, i) => (
                        <div key={i} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Icon name="Check" size={14} className="text-success" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Trip Budget */}
                    <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Total Budget</span>
                        <span className="font-bold text-foreground">
                          {testimonials?.[currentIndex]?.budget}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center shadow-soft hover:shadow-collaborative transition-all duration-200 hover:bg-card"
          >
            <Icon name="ChevronLeft" size={20} className="text-foreground" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center shadow-soft hover:shadow-collaborative transition-all duration-200 hover:bg-card"
          >
            <Icon name="ChevronRight" size={20} className="text-foreground" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-primary scale-125' :'bg-muted hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          {[
            { label: "Happy Travelers", value: "50,000+", icon: "Users" },
            { label: "Successful Trips", value: "12,500+", icon: "MapPin" },
            { label: "Money Saved", value: "$2.3M+", icon: "DollarSign" },
            { label: "Planning Time Saved", value: "85%", icon: "Clock" }
          ]?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name={stat?.icon} size={24} className="text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat?.value}</div>
              <div className="text-sm text-muted-foreground">{stat?.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofCarousel;