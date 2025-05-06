import React, { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import "leaflet/dist/leaflet.css";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import LoginPage from "./components/auth/LoginPage";
import MapView from "./components/map/MapView";
import PropertyDetail from "./components/property/PropertyDetail";
import WealthAnalysis from "./components/analysis/WealthAnalysis";

// Import placeholder components for new views
import PropertiesPage from "./components/dashboard/PropertiesPage";
import OwnersPage from "./components/dashboard/OwnersPage";
import AnalysisPage from "./components/dashboard/AnalysisPage"; // This may be redundant if it's WealthAnalysis
import ReportsPage from "./components/dashboard/ReportsPage";
import DataExportPage from "./components/dashboard/DataExportPage";
import SharingPage from "./components/dashboard/SharingPage"; // Fixed: was importing SettingsPage before
import SettingsPage from "./components/dashboard/SettingsPage";

import { AppContextProvider } from "./context/AppContext";

// Define all available views
type View =
  | "login"
  | "dashboard"
  | "map"
  | "property"
  | "analysis"
  | "properties"
  | "owners"
  | "reports"
  | "export"
  | "sharing"
  | "settings";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<View>("login");
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    null
  );
  const [selectedOwnerId, setSelectedOwnerId] = useState<string | null>(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView("login");
  };

  const handleViewChange = (view: View) => {
    setCurrentView(view);
  };

  const handlePropertySelect = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    setCurrentView("property");
  };

  const handleOwnerSelect = (ownerId: string) => {
    setSelectedOwnerId(ownerId);
    setCurrentView("analysis");
  };

  // Render login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <ThemeProvider>
      <AppContextProvider>
        <Layout
          onViewChange={handleViewChange}
          currentView={currentView}
          onLogout={handleLogout}
        >
          {/* Main Views */}
          {currentView === "dashboard" && (
            <Dashboard
              onPropertySelect={handlePropertySelect}
              onOwnerSelect={handleOwnerSelect}
            />
          )}

          {currentView === "map" && (
            <MapView onPropertySelect={handlePropertySelect} />
          )}

          {currentView === "property" && selectedPropertyId && (
            <PropertyDetail
              propertyId={selectedPropertyId}
              onOwnerSelect={handleOwnerSelect}
              onBack={() => setCurrentView("map")}
            />
          )}

          {currentView === "analysis" && selectedOwnerId && (
            <WealthAnalysis
              ownerId={selectedOwnerId}
              onPropertySelect={handlePropertySelect}
              onBack={() =>
                selectedPropertyId
                  ? setCurrentView("property")
                  : setCurrentView("dashboard")
              }
            />
          )}

          {/* Additional Pages */}
          {currentView === "properties" && <PropertiesPage />}
          {currentView === "owners" && <OwnersPage />}
          {currentView === "analysis" && <AnalysisPage />}
          {currentView === "owners" && <OwnersPage />}
          {currentView === "reports" && <ReportsPage />}
          {currentView === "export" && <DataExportPage />}
          {currentView === "sharing" && <SharingPage />}
          {currentView === "settings" && <SettingsPage />}
        </Layout>
      </AppContextProvider>
    </ThemeProvider>
  );
}

export default App;
