import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { OverviewPage } from './pages/dashboard/OverviewPage';
import { SimulationsPage } from './pages/dashboard/SimulationsPage';
import { KPIsPage } from './pages/dashboard/KPIsPage';
import { ScenariosPage } from './pages/dashboard/ScenariosPage';
import { ReportsPage } from './pages/dashboard/ReportsPage';
import { SettingsPage } from './pages/dashboard/SettingsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#ffffff',
                border: '1px solid #334155'
              }
            }}
          />
          
          <Routes>
            {/* Public Auth Routes */}
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
            
            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<OverviewPage />} />
              <Route path="simulations" element={<SimulationsPage />} />
              <Route path="kpis" element={<KPIsPage />} />
              <Route path="scenarios" element={<ScenariosPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            
            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;