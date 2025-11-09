
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScamListPage from './pages/ScamListPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ReportScamPage from './pages/ReportScamPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import { ROLES } from './constants';
import VisionPage from './pages/VisionPage';
import VerifiedAgenciesPage from './pages/VerifiedAgenciesPage';
import AllScamsPage from './pages/AllScamsPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<ScamListPage />} />
              <Route path="/all-scams" element={<AllScamsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/vision" element={<VisionPage />} />
              <Route path="/verified-agencies" element={<VerifiedAgenciesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              
              {/* User Protected Route */}
              <Route 
                path="/report-scam" 
                element={
                  <ProtectedRoute allowedRoles={[ROLES.USER, ROLES.ADMIN]}>
                    <ReportScamPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Admin Protected Route */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                    <AdminDashboardPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;