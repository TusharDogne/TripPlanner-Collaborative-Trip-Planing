import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommunityGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Trips', icon: 'Globe' },
    { id: 'adventure', label: 'Adventure', icon: 'Mountain' },
    { id: 'cultural', label: 'Cultural', icon: 'Camera' },
    { id: 'food', label: 'Food & Drink', icon: 'Coffee' },
    { id: 'beach', label: 'Beach', icon: 'Sun' }
  ];

  const communityTrips = [
    {
      id: 1,
      title: "Himalayan Base Camp Trek",
      category: "adventure",
      location: "Nepal",
      groupSize: 6,
      duration: "14 days",
      budget: "$2,800",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      achievements: ["First Timer", "Budget Master", "Group Leader"],
      likes: 234,
      saves: 89,
      author: {
        name: "Alex Chen",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        trips: 12
      },
      highlights: [
        "Reached Everest Base Camp",
        "Zero altitude sickness",
        "Under budget by $200"
      ]
    },
    {
      id: 2,
      title: "Japanese Cultural Immersion",
      category: "cultural",
      location: "Japan",
      groupSize: 4,
      duration: "10 days",
      budget: "$3,200",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
      achievements: ["Culture Enthusiast", "Language Learner", "Temple Hopper"],
      likes: 189,
      saves: 156,
      author: {
        name: "Yuki Tanaka",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        trips: 8
      },
      highlights: [
        "Stayed in traditional ryokan",
        "Tea ceremony experience",
        "Cherry blossom season"
      ]
    },
    {
      id: 3,
      title: "Mediterranean Food Tour",
      category: "food",
      location: "Italy & Greece",
      groupSize: 8,
      duration: "12 days",
      budget: "$2,400",
      image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=400&h=300&fit=crop",
      achievements: ["Foodie Explorer", "Wine Connoisseur", "Local Favorite"],
      likes: 312,
      saves: 203,
      author: {
        name: "Maria Rossi",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
        trips: 15
      },
      highlights: [
        "Cooking classes in Tuscany",
        "Wine tasting in Santorini",
        "Hidden tavernas discovered"
      ]
    },
    {
      id: 4,
      title: "Bali Beach & Wellness Retreat",
      category: "beach",
      location: "Indonesia",
      groupSize: 5,
      duration: "8 days",
      budget: "$1,800",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
      achievements: ["Zen Master", "Surf Rookie", "Wellness Warrior"],
      likes: 267,
      saves: 178,
      author: {
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/35.jpg",
        trips: 9
      },
      highlights: [
        "Daily yoga sessions",
        "Learned to surf",
        "Spa treatments galore"
      ]
    },
    {
      id: 5,
      title: "Patagonia Wilderness Adventure",
      category: "adventure",
      location: "Chile & Argentina",
      groupSize: 4,
      duration: "16 days",
      budget: "$3,800",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
      achievements: ["Wilderness Expert", "Photographer", "Endurance Champion"],
      likes: 445,
      saves: 298,
      author: {
        name: "Carlos Rodriguez",
        avatar: "https://randomuser.me/api/portraits/men/40.jpg",
        trips: 22
      },
      highlights: [
        "Torres del Paine trek",
        "Glacier photography",
        "Wild camping experience"
      ]
    },
    {
      id: 6,
      title: "Moroccan Souk & Sahara",
      category: "cultural",
      location: "Morocco",
      groupSize: 6,
      duration: "9 days",
      budget: "$2,100",
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop",
      achievements: ["Desert Navigator", "Haggling Pro", "Spice Master"],
      likes: 198,
      saves: 134,
      author: {
        name: "Fatima Al-Zahra",
        avatar: "https://randomuser.me/api/portraits/women/30.jpg",
        trips: 11
      },
      highlights: [
        "Camel trek in Sahara",
        "Marrakech market tours",
        "Berber village stay"
      ]
    }
  ];

  const filteredTrips = selectedCategory === 'all' 
    ? communityTrips 
    : communityTrips?.filter(trip => trip?.category === selectedCategory);

  const getAchievementColor = (achievement) => {
    const colorMap = {
      "First Timer": "bg-accent text-accent-foreground",
      "Budget Master": "bg-success text-success-foreground",
      "Group Leader": "bg-primary text-primary-foreground",
      "Culture Enthusiast": "bg-secondary text-secondary-foreground",
      "Language Learner": "bg-accent text-accent-foreground",
      "Temple Hopper": "bg-primary text-primary-foreground",
      "Foodie Explorer": "bg-warning text-warning-foreground",
      "Wine Connoisseur": "bg-destructive text-destructive-foreground",
      "Local Favorite": "bg-success text-success-foreground",
      "Zen Master": "bg-secondary text-secondary-foreground",
      "Surf Rookie": "bg-accent text-accent-foreground",
      "Wellness Warrior": "bg-success text-success-foreground",
      "Wilderness Expert": "bg-primary text-primary-foreground",
      "Photographer": "bg-accent text-accent-foreground",
      "Endurance Champion": "bg-warning text-warning-foreground",
      "Desert Navigator": "bg-warning text-warning-foreground",
      "Haggling Pro": "bg-success text-success-foreground",
      "Spice Master": "bg-destructive text-destructive-foreground"
    };
    return colorMap?.[achievement] || "bg-muted text-muted-foreground";
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
            Community Adventures
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Get inspired by real trips from our community. See how others planned, budgeted, and created unforgettable memories together.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories?.map((category) => (
              <button
                key={category?.id}
                onClick={() => setSelectedCategory(category?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category?.id
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'bg-muted text-muted-foreground hover:bg-card hover:text-foreground'
                }`}
              >
                <Icon name={category?.icon} size={16} />
                <span>{category?.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrips?.map((trip, index) => (
            <motion.div
              key={trip?.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-collaborative transition-all duration-300"
            >
              {/* Trip Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={trip?.image}
                  alt={trip?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay Info */}
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white rounded-lg px-3 py-1 text-sm">
                  {trip?.location}
                </div>
                
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white rounded-lg px-3 py-1 text-sm">
                  {trip?.duration}
                </div>

                {/* Engagement Stats */}
                <div className="absolute bottom-4 right-4 flex items-center space-x-3">
                  <div className="flex items-center space-x-1 bg-black/70 backdrop-blur-sm text-white rounded-full px-2 py-1 text-xs">
                    <Icon name="Heart" size={12} />
                    <span>{trip?.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-black/70 backdrop-blur-sm text-white rounded-full px-2 py-1 text-xs">
                    <Icon name="Bookmark" size={12} />
                    <span>{trip?.saves}</span>
                  </div>
                </div>
              </div>

              {/* Trip Content */}
              <div className="p-6">
                {/* Title & Basic Info */}
                <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {trip?.title}
                </h3>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Icon name="Users" size={14} className="mr-1" />
                      {trip?.groupSize} friends
                    </span>
                    <span className="flex items-center">
                      <Icon name="DollarSign" size={14} className="mr-1" />
                      {trip?.budget}
                    </span>
                  </div>
                </div>

                {/* Achievements */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {trip?.achievements?.slice(0, 2)?.map((achievement, i) => (
                    <span
                      key={i}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getAchievementColor(achievement)}`}
                    >
                      {achievement}
                    </span>
                  ))}
                  {trip?.achievements?.length > 2 && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                      +{trip?.achievements?.length - 2} more
                    </span>
                  )}
                </div>

                {/* Highlights */}
                <div className="space-y-1 mb-4">
                  {trip?.highlights?.slice(0, 2)?.map((highlight, i) => (
                    <div key={i} className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Check" size={12} className="text-success" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={trip?.author?.avatar}
                      alt={trip?.author?.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-sm text-foreground">
                        {trip?.author?.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {trip?.author?.trips} trips completed
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm" iconName="ExternalLink">
                    View Trip
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" iconName="Plus" iconPosition="left">
            Load More Adventures
          </Button>
          
          <p className="text-sm text-muted-foreground mt-4">
            Join our community and share your own travel stories
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityGallery;