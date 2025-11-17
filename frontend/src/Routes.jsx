import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import TripDashboard from "./pages/trip-dashboard";
import SmartRecommendations from "./pages/smart-recommendations";
import BudgetCoordinator from "./pages/budget-coordinator";
import CollaborativePlanner from "./pages/collaborative-planner";
import CommunityGallery from "./pages/community-gallery";
import Homepage from "./pages/homepage";
import AuthPage from "./components/ui/AuthPage.jsx";
import TripDetails from "./pages/trip-details/TripDetails";
window.global = window;




const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<BudgetCoordinator />} />
          <Route path="/trip-dashboard" element={<TripDashboard />} />
          <Route path="/smart-recommendations" element={<SmartRecommendations />} />
          <Route path="/budget-coordinator" element={<BudgetCoordinator />} />
          <Route path="/collaborative-planner" element={<CollaborativePlanner />} />
          <Route path="/community-gallery" element={<CommunityGallery />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/trip/:tripId" element={<TripDetails />} />

          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
