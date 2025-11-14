import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import CandidateDashboard from './pages/CandidateDashboard';
import EmployerDashboard from './pages/EmployerDashboard';

function AppContent() {
  const { page, isMenuOpen, setIsMenuOpen } = useAppContext();

  const renderPage = () => {
    switch (page.currentPage) {
      case 'home':
        return <Home />;
      case 'jobs':
        return <Jobs />;
      case 'jobDetail':
        return <JobDetail jobId={page.props.jobId} />;
      case 'login':
        return <Login />;
      case 'register':
        return <Register />;
      case 'candidateDashboard':
        return <CandidateDashboard />;
      case 'employerDashboard':
        return <EmployerDashboard />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-inter text-gray-800 dark:text-gray-100 transition-colors duration-200">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main className="pt-20">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
}

