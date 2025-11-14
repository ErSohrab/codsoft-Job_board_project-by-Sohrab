import React, { createContext, useContext, useState } from 'react';
import { MOCK_JOBS, MOCK_USERS } from '../utils/constants';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [page, setPage] = useState({ currentPage: 'home', props: {} });
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [currentUser, setCurrentUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigateTo = (pageName, props = {}) => {
    setPage({ currentPage: pageName, props });
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const login = (userType) => {
    setCurrentUser(MOCK_USERS[userType]);
    navigateTo('home');
  };

  const logout = () => {
    setCurrentUser(null);
    navigateTo('home');
  };

  const applyForJob = (jobId, applicationDetails) => {
    const newApplication = {
      jobId,
      ...applicationDetails,
      date: new Date().toISOString().split('T')[0],
      job: jobs.find(j => j.id === jobId)
    };
    setApplications(prev => [...prev, newApplication]);
    console.log('Application submitted!', newApplication);
  };

  const postNewJob = (jobDetails) => {
    const newJob = {
      ...jobDetails,
      id: jobs.length + 100,
      employerId: currentUser.id,
      company: currentUser.company,
      postedDate: new Date().toISOString().split('T')[0],
    };
    setJobs(prev => [newJob, ...prev]);
  };

  const value = {
    page,
    jobs,
    currentUser,
    applications,
    isMenuOpen,
    setIsMenuOpen,
    navigateTo,
    login,
    logout,
    applyForJob,
    postNewJob,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

