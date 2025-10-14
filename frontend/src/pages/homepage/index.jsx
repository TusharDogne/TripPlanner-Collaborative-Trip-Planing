import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import ValuePropositionCards from './components/ValuePropositionCards';
import InteractiveDemo from './components/InteractiveDemo';
import SocialProofCarousel from './components/SocialProofCarousel';
import CommunityGallery from './components/CommunityGallery';
import Footer from './components/Footer';

const Homepage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'TripSync - Where Friends Become Co-Creators of Unforgettable Journeys';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription?.setAttribute('content', 'Transform trip planning from a stressful solo task into an engaging group experience. Plan together, budget smart, and discover more with real-time collaboration.');
    }

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Value Proposition Cards */}
        <ValuePropositionCards />

        {/* Interactive Demo */}
        <InteractiveDemo />

        {/* Social Proof Carousel */}
        <SocialProofCarousel />

        {/* Community Gallery */}
        <CommunityGallery />
      </main>
      {/* Footer */}
      <Footer />
      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-collaborative hover:shadow-lg transition-all duration-200 flex items-center justify-center z-40"
        aria-label="Scroll to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m18 15-6-6-6 6"/>
        </svg>
      </motion.button>
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
    </motion.div>
  );
};
// Example: fetch local JSON
async function fetchPlaces(query) {
  const res = await fetch('/places.json');
  const all = await res.json();
  if (!query) return all;
  const q = query.toLowerCase();
  return all.filter(p => 
    p.name.toLowerCase().includes(q) ||
    p.city.toLowerCase().includes(q) ||
    p.state.toLowerCase().includes(q) ||
    (p.tags || []).join(' ').toLowerCase().includes(q)
  );
}


export default Homepage;



