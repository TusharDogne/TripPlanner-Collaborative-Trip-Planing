// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./AuthPage";
import Homepage from "./pages/homepage/index";
import Dashboard from "./pages/trip-dashboard/index";
import CollaborativePlanner from "./pages/collaborative-planner/index";
import BudgetCoordinator from "./pages/budget-coordinator/index";
import CommunityGallery from "./pages/community-gallery/index";
import NotFound from "./pages/NotFound";
import Header from "./components/ui/Header";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Login / Signup Page */}
        <Route path="/" element={<AuthPage />} />

        {/* Main Pages with Header */}
        <Route
          path="/homepage"
          element={
            <>
              <Header />
              <Homepage />
            </>
          }
        />
        <Route
          path="/trip-dashboard"
          element={
            <>
              <Header />
              <dashboard />
            </>
          }
            />
            <Route
            path="/smart-recommendations"
            element={
            <>
              <Header />
              <Discover />
            </>
          }
        />
        <Route
          path="/collaborative-planner"
          element={
            <>
              <Header />
              <CollaborativePlanner />
            </>
          }
        />
        <Route
          path="/budget-coordinator"
          element={
            <>
              <Header />
              <BudgetCoordinator />
            </>
          }
        />
        <Route
          path="/community-gallery"
          element={
            <>
              <Header />
              <CommunityGallery />
            </>
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
