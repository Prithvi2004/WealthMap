import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate, Outlet } from "react-router-dom";
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
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Utility function for theme-aware toast styling
const getToastStyle = (theme: string) => {
  return theme === "dark"
    ? "bg-green-800 text-white border-green-500 shadow-lg"
    : "bg-green-100 text-green-800 border-green-500 shadow-md";
};

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Wrapper components to handle props
const PropertyDetailWrapper = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();

  const handleOwnerSelect = (ownerId: string) => {
    navigate(`/analysis/${ownerId}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <PropertyDetail
      propertyId={propertyId || ''}
      onOwnerSelect={handleOwnerSelect}
      onBack={handleBack}
    />
  );
};

const WealthAnalysisWrapper = () => {
  const { ownerId } = useParams();
  const navigate = useNavigate();

  const handlePropertySelect = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <WealthAnalysis
      ownerId={ownerId || ''}
      onPropertySelect={handlePropertySelect}
      onBack={handleBack}
    />
  );
};

const DashboardWrapper = () => {
  const navigate = useNavigate();

  const handlePropertySelect = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  const handleOwnerSelect = (ownerId: string) => {
    navigate(`/analysis/${ownerId}`);
  };

  return (
    <Dashboard
      onPropertySelect={handlePropertySelect}
      onOwnerSelect={handleOwnerSelect}
    />
  );
};

const MapViewWrapper = () => {
  const navigate = useNavigate();

  const handlePropertySelect = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  return <MapView onPropertySelect={handlePropertySelect} />;
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <AppContextProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Outlet />
                    </Layout>
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardWrapper />} />
                <Route path="map" element={<MapViewWrapper />} />
                <Route path="property/:propertyId" element={<PropertyDetailWrapper />} />
                <Route path="analysis/:ownerId" element={<WealthAnalysisWrapper />} />
                <Route path="properties" element={<PropertiesPage />} />
                <Route path="owners" element={<OwnersPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="export" element={<DataExportPage />} />
                <Route path="sharing" element={<SharingPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="admin" element={<AdminPanel />} />
              </Route>
            </Routes>
            <ToastContainer />
          </AppContextProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
