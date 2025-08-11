import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import DashboardPage from "./pages/user/DashboardPage";
import CounsellorListPage from "./pages/user/CounsellorListPage";
import BookingPage from "./pages/user/BookingPage";
import ResourcesPage from "./pages/user/ResourcesPage";
import JournalPage from "./pages/user/JournalPage";
import ProfilePage from "./pages/user/ProfilePage";
import CounsellorDashboardPage from "./pages/counsellor/CounsellorDashboardPage";
import MySessionsPage from "./pages/counsellor/MySessionsPage";
import ProfileEditPage from "./pages/counsellor/ProfileEditPage";
import ResourcesUploadPage from "./pages/counsellor/ResourcesUploadPage";
import EarningsPage from "./pages/counsellor/EarningsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* User Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute requiredRole="user">
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/counsellors" 
                element={
                  <ProtectedRoute requiredRole="user">
                    <CounsellorListPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/booking/:counsellorId" 
                element={
                  <ProtectedRoute requiredRole="user">
                    <BookingPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/resources" 
                element={
                  <ProtectedRoute requiredRole="user">
                    <ResourcesPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/journal" 
                element={
                  <ProtectedRoute requiredRole="user">
                    <JournalPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute requiredRole="user">
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />

              {/* Counsellor Protected Routes */}
              <Route 
                path="/counsellor/dashboard" 
                element={
                  <ProtectedRoute requiredRole="counsellor">
                    <CounsellorDashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/counsellor/sessions" 
                element={
                  <ProtectedRoute requiredRole="counsellor">
                    <MySessionsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/counsellor/profile" 
                element={
                  <ProtectedRoute requiredRole="counsellor">
                    <ProfileEditPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/counsellor/resources" 
                element={
                  <ProtectedRoute requiredRole="counsellor">
                    <ResourcesUploadPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/counsellor/earnings" 
                element={
                  <ProtectedRoute requiredRole="counsellor">
                    <EarningsPage />
                  </ProtectedRoute>
                } 
              />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
