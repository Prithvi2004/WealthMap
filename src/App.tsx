import React, { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import "leaflet/dist/leaflet.css";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import LoginPage from "./components/auth/LoginPage";
import MapView from "./components/map/MapView";
import PropertyDetail from "./components/property/PropertyDetail";
import WealthAnalysis from "./components/analysis/WealthAnalysis";
import AdminPanel from "./components/dashboard/AdminPanel";
import PropertiesPage from "./components/dashboard/PropertiesPage";
import OwnersPage from "./components/dashboard/OwnersPage";
import ReportsPage from "./components/dashboard/ReportsPage";
import DataExportPage from "./components/dashboard/DataExportPage";
import SharingPage from "./components/dashboard/SharingPage";
import SettingsPage from "./components/dashboard/SettingsPage";
import { AppContextProvider } from "./context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Utility function for theme-aware toast styling
const getToastStyle = (theme: string) => {
  return theme === "dark"
    ? "bg-green-800 text-white border-green-500 shadow-lg"
    : "bg-green-100 text-green-800 border-green-500 shadow-md";
};

// Define all available views including admin
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
  | "settings"
  | "admin";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<View>("login");
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [selectedOwnerId, setSelectedOwnerId] = useState<string | null>(null);
  const [theme, setTheme] = useState("light");

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView("dashboard");

    const options = {
      className: getToastStyle(theme),
      progressClassName: `h-1 bg-gradient-to-r from-green-400 to-emerald-500`,
      autoClose: 3000,
    };

    toast.success(
      <div className="flex items-center">
        <span className="text-lg font-semibold">✅ Login successful!</span>
      </div>,
      options
    );
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
          {currentView === "export" && <DataExportPage />}
          {currentView === "owners" && <OwnersPage />}
          {currentView === "properties" && <PropertiesPage />}
          {currentView === "reports" && <ReportsPage />}
          {currentView === "settings" && <SettingsPage />}
          {currentView === "sharing" && <SharingPage />}

          {/* Admin Panel - Only for users with admin role */}
          {currentView === "admin" && <AdminPanel />}
        </Layout>
        <ToastContainer />
      </AppContextProvider>
    </ThemeProvider>
  );
};

export default App;
