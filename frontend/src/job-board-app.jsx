import React, { useState, createContext, useContext, useMemo, useEffect } from 'react';

// --- THEME CONTEXT ---
const ThemeContext = createContext();

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// --- MOCK DATA ---
// We'll use this to simulate our database
const MOCK_JOBS = [
  {
    id: 1,
    title: 'Senior React Developer',
    company: 'TechCorp',
    location: 'New York, NY',
    type: 'Full-time',
    postedDate: '2025-11-12',
    description: 'We are looking for a Senior React Developer to build world-class user interfaces. You will be responsible for leading frontend development, mentoring junior developers, and working closely with product managers.',
    requirements: ['5+ years of React experience', 'Expert in JavaScript, HTML, CSS', 'Experience with Redux or similar state management', 'Strong problem-solving skills'],
    employerId: 1,
  },
  {
    id: 2,
    title: 'UX/UI Designer',
    company: 'DesignHub',
    location: 'San Francisco, CA',
    locationType: 'Remote',
    type: 'Contract',
    postedDate: '2025-11-11',
    description: 'DesignHub is seeking a creative UX/UI Designer to craft beautiful and intuitive web and mobile applications. You will work on all stages of the design process, from user research to high-fidelity mockups.',
    requirements: ['3+ years of UX/UI design experience', 'Strong portfolio showcasing your work', 'Proficiency in Figma, Sketch, or Adobe XD', 'Excellent communication skills'],
    employerId: 2,
  },
  {
    id: 3,
    title: 'Node.js Backend Engineer',
    company: 'ServerSide Solutions',
    location: 'Austin, TX',
    type: 'Full-time',
    postedDate: '2025-11-10',
    description: 'Join our backend team to build scalable and efficient APIs using Node.js. You will work on a microservices architecture and interact with MongoDB databases.',
    requirements: ['4+ years of Node.js experience', 'Experience with Express.js or similar frameworks', 'Knowledge of MongoDB and Mongoose', 'Understanding of RESTful APIs'],
    employerId: 1,
  },
  {
    id: 4,
    title: 'Marketing Manager',
    company: 'GrowFast Inc.',
    location: 'Chicago, IL',
    locationType: 'Hybrid',
    type: 'Full-time',
    postedDate: '2025-11-09',
    description: 'We are looking for a data-driven Marketing Manager to lead our growth strategy. You will be responsible for SEO, SEM, content marketing, and email campaigns.',
    requirements: ['5+ years of digital marketing experience', 'Proven track record of successful campaigns', 'Expertise in Google Analytics and SEO tools', 'Strong leadership skills'],
    employerId: 2,
  },
];

const MOCK_USERS = {
  candidate: { id: 101, type: 'candidate', name: 'Alex Johnson', email: 'alex@email.com' },
  employer: { id: 1, type: 'employer', name: 'TechCorp Admin', email: 'admin@techcorp.com', company: 'TechCorp' },
};

// --- ICONS ---
// Using SVG icons for simplicity
const icons = {
  moon: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  ),
  sun: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.83-2.83a1 1 0 00-1.414 1.414l2.83 2.83a1 1 0 001.414-1.414zM2.05 6.464a1 1 0 000-1.414L.464 3.05a1 1 0 00-1.414 1.414l1.586 1.586a1 1 0 001.414 0zm12.12 0l1.586-1.586a1 1 0 00-1.414-1.414l-1.586 1.586a1 1 0 001.414 1.414zM9 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
  ),
  briefcase: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v1.5a.5.5 0 00.5.5h11a.5.5 0 00.5-.5V4a2 2 0 00-2-2H6zM3.5 8.5A.5.5 0 003 9v6a2 2 0 002 2h10a2 2 0 002-2V9a.5.5 0 00-.5-.5h-13zM6 6.5a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h8a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5H6z" clipRule="evenodd" />
    </svg>
  ),
  location: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 10.166a5.96 5.96 0 011.64-4.224 6.002 6.002 0 018.056 0 5.96 5.96 0 011.64 4.224 6.002 6.002 0 01-4.868 5.736A1.503 1.503 0 0110 14.5c-.828 0-1.5-.672-1.5-1.5 0-.175.03-.344.086-.5a5.96 5.96 0 01-4.254-2.334z" clipRule="evenodd" />
    </svg>
  ),
  calendar: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
    </svg>
  ),
  search: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
    </svg>
  ),
  user: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 6a3 3 0 116 0 3 3 0 01-6 0zM5.646 13.354a5.5 5.5 0 018.708 0A6.974 6.974 0 0110 16a6.974 6.974 0 01-4.354-2.646z" clipRule="evenodd" />
    </svg>
  ),
  logout: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V5.414l4.293 4.293a1 1 0 001.414-1.414L5.414 3H12a1 1 0 100-2H4a1 1 0 00-1 1z" clipRule="evenodd" />
      <path fillRule="evenodd" d="M16 3a1 1 0 011 1v12a1 1 0 01-1 1h-6a1 1 0 110-2h5V4.414l-4.293 4.293a1 1 0 11-1.414-1.414L14.586 3H16z" clipRule="evenodd" />
    </svg>
  ),
  menu: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  ),
  close: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
};

// --- CONTEXT ---
// We use context to pass global state (like user, jobs, navigation)
// to all components without prop drilling.
const AppContext = createContext();

const useAppContext = () => useContext(AppContext);

// --- APP COMPONENT (MAIN) ---
export default function App() {
  const [theme, setTheme] = useState(() => {
    // Check localStorage for saved theme preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const themeValue = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={themeValue}>
      <AppContent />
    </ThemeContext.Provider>
  );
}

function AppContent() {
  const [page, setPage] = useState({ currentPage: 'home', props: {} });
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [currentUser, setCurrentUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Simulate navigation
  const navigateTo = (pageName, props = {}) => {
    setPage({ currentPage: pageName, props });
    setIsMenuOpen(false);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  // Simulate login
  const login = (userType) => {
    setCurrentUser(MOCK_USERS[userType]);
    navigateTo('home');
  };

  // Simulate logout
  const logout = () => {
    setCurrentUser(null);
    navigateTo('home');
  };

  // Simulate applying for a job
  const applyForJob = (jobId, applicationDetails) => {
    const newApplication = {
      jobId,
      ...applicationDetails,
      date: new Date().toISOString().split('T')[0],
      job: jobs.find(j => j.id === jobId) // Add job details to application
    };
    setApplications(prev => [...prev, newApplication]);
    // Simulate email notification
    console.log('Application submitted!', newApplication);
    // In a real app, this would trigger a backend API call.
  };

  // Simulate posting a new job
  const postNewJob = (jobDetails) => {
    const newJob = {
      ...jobDetails,
      id: jobs.length + 100, // Simple ID generation
      employerId: currentUser.id,
      company: currentUser.company,
      postedDate: new Date().toISOString().split('T')[0],
    };
    setJobs(prev => [newJob, ...prev]);
    // In a real app, this would POST to /api/jobs
  };

  // Value to provide to all components via context
  const contextValue = {
    jobs,
    currentUser,
    applications,
    navigateTo,
    login,
    logout,
    applyForJob,
    postNewJob,
  };

  // Render the correct page component based on state
  const renderPage = () => {
    switch (page.currentPage) {
      case 'home':
        return <HomePage />;
      case 'jobs':
        return <JobListPage />;
      case 'jobDetail':
        return <JobDetailPage jobId={page.props.jobId} />;
      case 'login':
        return <LoginPage />;
      case 'candidateDashboard':
        return <CandidateDashboard />;
      case 'employerDashboard':
        return <EmployerDashboard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-inter text-gray-800 dark:text-gray-100 transition-colors duration-200">
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main className="pt-20">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

// --- COMPONENTS ---

function Header({ isMenuOpen, setIsMenuOpen }) {
  const { currentUser, logout, navigateTo } = useAppContext();
  const { theme, toggleTheme } = useTheme();

  const navItemClasses = "cursor-pointer px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-blue-400";
  const mobileNavItemClasses = "cursor-pointer block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-blue-400";

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md fixed w-full z-50 top-0 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex-shrink-0 flex items-center cursor-pointer"
            onClick={() => navigateTo('home')}
          >
            <span className="bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl">
              JB
            </span>
            <span className="font-bold text-2xl ml-3 text-gray-900 dark:text-white">
              Job Board
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <span onClick={() => navigateTo('home')} className={navItemClasses}>Home</span>
              <span onClick={() => navigateTo('jobs')} className={navItemClasses}>Browse Jobs</span>
              {currentUser?.type === 'candidate' && (
                <span onClick={() => navigateTo('candidateDashboard')} className={navItemClasses}>My Dashboard</span>
              )}
              {currentUser?.type === 'employer' && (
                <span onClick={() => navigateTo('employerDashboard')} className={navItemClasses}>Employer Dashboard</span>
              )}
            </div>
          </div>

          {/* Login/Logout, Theme Toggle & Post Job Buttons (Desktop) */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <icons.moon className="h-5 w-5" />
                ) : (
                  <icons.sun className="h-5 w-5" />
                )}
              </button>

              {currentUser ? (
                <>
                  <span className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                    <icons.user className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <span>{currentUser.name}</span>
                  </span>
                  <button
                    onClick={logout}
                    className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigateTo('login')}
                    className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => currentUser ? navigateTo('employerDashboard') : navigateTo('login')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-200"
                  >
                    Post A Job
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Theme Toggle Button (Mobile) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <icons.moon className="h-5 w-5" />
              ) : (
                <icons.sun className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMenuOpen ? (
                <icons.close className="h-6 w-6" />
              ) : (
                <icons.menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden shadow-lg bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <span onClick={() => navigateTo('home')} className={mobileNavItemClasses}>Home</span>
            <span onClick={() => navigateTo('jobs')} className={mobileNavItemClasses}>Browse Jobs</span>
            {currentUser?.type === 'candidate' && (
              <span onClick={() => navigateTo('candidateDashboard')} className={mobileNavItemClasses}>My Dashboard</span>
            )}
            {currentUser?.type === 'employer' && (
              <span onClick={() => navigateTo('employerDashboard')} className={mobileNavItemClasses}>Employer Dashboard</span>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            {currentUser ? (
              <div className="px-5">
                <div className="flex items-center space-x-3">
                  <icons.user className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                  <div>
                    <div className="text-base font-medium text-gray-800 dark:text-white">{currentUser.name}</div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{currentUser.email}</div>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="w-full text-left mt-3 block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-blue-400"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="px-2 space-y-2">
                <button
                  onClick={() => navigateTo('login')}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-blue-400"
                >
                  Log In
                </button>
                <button
                  onClick={() => currentUser ? navigateTo('employerDashboard') : navigateTo('login')}
                  className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg text-base font-medium hover:bg-blue-700 transition duration-200"
                >
                  Post A Job
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function HomePage() {
  const { jobs, navigateTo, currentUser } = useAppContext();
  const featuredJobs = jobs.slice(0, 4); // Show first 4 jobs as featured

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-blue-600 dark:bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Find your Dream Job
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100 dark:text-blue-200">
              We have {jobs.length}+ jobs listed. Find the one that's right for you.
            </p>
            {currentUser?.type === 'candidate' && (
              <button
                onClick={() => navigateTo('candidateDashboard')}
                className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-blue-700 bg-white hover:bg-blue-50 dark:text-blue-600 dark:bg-gray-100"
              >
                Upload Your Resume
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="relative -mt-16 z-10">
        <JobSearchInput />
      </div>

      {/* Featured Jobs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Featured Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {featuredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => navigateTo('jobs')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-blue-700 transition duration-200"
          >
            Browse All Jobs
          </button>
        </div>
      </div>

      {/* Simple illustration section */}
      <div className="bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Get Started in Minutes</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Create your profile, upload your resume, and start applying for jobs. Or, if you're an employer, post a job and find the perfect candidate.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => navigateTo('jobs')}
                  className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600"
                >
                  Find a Job
                </button>
                <button
                  onClick={() => currentUser ? navigateTo('employerDashboard') : navigateTo('login')}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Post a Job
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              {/* Placeholder for illustration */}
              <div className="bg-blue-100 dark:bg-gray-700 rounded-lg w-full max-w-md h-64 flex items-center justify-center text-blue-500 dark:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2.25 2.25 0 00-2.242-2.242H6.812a2.25 2.25 0 00-2.242 2.242v.003a2.25 2.25 0 002.242 2.242h10.374a2.25 2.25 0 002.242-2.242v-.003z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 7.5a2.25 2.25 0 00-2.242-2.242H6.812a2.25 2.25 0 00-2.242 2.242v.003a2.25 2.25 0 002.242 2.242h5.196a2.25 2.25 0 002.242-2.242v-.003z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 12.75a2.25 2.25 0 00-2.242-2.242H6.812a2.25 2.25 0 00-2.242 2.242v.003a2.25 2.25 0 002.242 2.242h8.946a2.25 2.25 0 002.242-2.242v-.003z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function JobSearchInput() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const { navigateTo } = useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    navigateTo('jobs', { filters: { keyword, location } });
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <form
        onSubmit={handleSearch}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 transition-colors duration-200"
      >
        <div className="flex-1 w-full">
          <label htmlFor="keyword" className="sr-only">Keyword</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <icons.search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              id="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Search keyword (e.g. 'React')"
            />
          </div>
        </div>
        <div className="flex-1 w-full">
          <label htmlFor="location" className="sr-only">Location</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <icons.location className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Location (e.g. 'New York')"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg text-base font-medium hover:bg-blue-700 transition duration-200"
        >
          Find Job
        </button>
      </form>
    </div>
  );
}

function JobCard({ job }) {
  const { navigateTo } = useAppContext();
  const { id, title, company, location, type, postedDate, description, locationType } = job;

  return (
    <div
      onClick={() => navigateTo('jobDetail', { jobId: id })}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-start space-x-0 md:space-x-6"
    >
      <div className="flex-shrink-0 w-16 h-16 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center font-bold text-2xl mb-4 md:mb-0">
        {company.charAt(0)}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-3">{company}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="flex items-center space-x-1.5">
            <icons.location className="h-4 w-4" />
            <span>{location}</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <icons.briefcase className="h-4 w-4" />
            <span>{type}</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <icons.calendar className="h-4 w-4" />
            <span>{postedDate}</span>
          </span>
          {locationType && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
              {locationType}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function JobListPage() {
  const { jobs, navigateTo } = useAppContext();
  // In a real app, we'd use page.props.filters to filter
  // For this demo, we'll just show all jobs.
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  // A more robust filter implementation
  const handleFilter = ({ keyword, location }) => {
    const lowerKeyword = keyword.toLowerCase();
    const lowerLocation = location.toLowerCase();

    const result = jobs.filter(job => {
      const titleMatch = job.title.toLowerCase().includes(lowerKeyword);
      const companyMatch = job.company.toLowerCase().includes(lowerKeyword);
      const descMatch = job.description.toLowerCase().includes(lowerKeyword);
      const locationMatch = job.location.toLowerCase().includes(lowerLocation);

      return (titleMatch || companyMatch || descMatch) && locationMatch;
    });
    setFilteredJobs(result);
  };
  
  // This is a small hack to pass the filter function to JobSearchInput
  // A better way would be to lift state or use context differently
  const PatchedJobSearchInput = () => {
      const [keyword, setKeyword] = useState('');
      const [location, setLocation] = useState('');

      const handleSubmit = (e) => {
        e.preventDefault();
        handleFilter({ keyword, location });
      };
      
      return (
        <div className="max-w-4xl mx-auto px-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 transition-colors duration-200"
          >
            <div className="flex-1 w-full">
              <label htmlFor="keyword" className="sr-only">Keyword</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <icons.search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="text"
                  id="keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Search keyword (e.g. 'React')"
                />
              </div>
            </div>
            <div className="flex-1 w-full">
              <label htmlFor="location" className="sr-only">Location</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <icons.location className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Location (e.g. 'New York')"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg text-base font-medium hover:bg-blue-700 transition duration-200"
            >
              Find Job
            </button>
          </form>
        </div>
      );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-200 min-h-screen">
      <div className="mb-12">
        <PatchedJobSearchInput />
      </div>
      
      <h1 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Showing {filteredJobs.length} Jobs
      </h1>
      
      {/* Filters (Sidebar - simplified) */}
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Filters</h3>
            {/* Simple filter examples. Not functional in this demo. */}
            <div>
              <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Job Type</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Full-time</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Contract</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Part-time</span>
                </label>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Location Type</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Remote</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Hybrid</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">On-site</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Job List */}
        <div className="w-full lg:w-3/4">
          <div className="space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => <JobCard key={job.id} job={job} />)
            ) : (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center text-gray-500 dark:text-gray-400">
                <p>No jobs found matching your criteria. Try adjusting your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function JobDetailPage({ jobId }) {
  const { jobs, currentUser, applications, navigateTo } = useAppContext();
  const [showApplyForm, setShowApplyForm] = useState(false);
  const job = jobs.find(j => j.id === jobId);

  const hasApplied = useMemo(() => {
    return applications.some(app => app.jobId === jobId);
  }, [applications, jobId]);

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Job not found</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 mb-4">The job you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigateTo('jobs')}
          className="mt-4 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-200"
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-200 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => navigateTo('jobs')}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4 transition-colors"
          >
            &larr; Back to all jobs
          </button>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{job.title}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">{job.company}</p>
            </div>
            <div className="flex-shrink-0 w-20 h-20 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center font-bold text-3xl mt-4 md:mt-0 transition-colors">
              {job.company.charAt(0)}
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-base text-gray-600 dark:text-gray-300 mt-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            <span className="flex items-center space-x-1.5">
              <icons.location className="h-5 w-5" />
              <span>{job.location}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <icons.briefcase className="h-5 w-5" />
              <span>{job.type}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <icons.calendar className="h-5 w-5" />
              <span>Posted: {job.postedDate}</span>
            </span>
            {job.locationType && (
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                {job.locationType}
              </span>
            )}
          </div>
        </div>

        {/* Apply Button */}
        <div className="mb-12">
          {currentUser?.type === 'candidate' && (
            <>
              {hasApplied ? (
                <div className="bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-200 px-4 py-3 rounded-lg text-center transition-colors">
                  You applied for this job on {applications.find(a => a.jobId === jobId).date}.
                </div>
              ) : (
                <button
                  onClick={() => setShowApplyForm(!showApplyForm)}
                  className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-200"
                >
                  {showApplyForm ? 'Cancel Application' : 'Apply for this job'}
                </button>
              )}
            </>
          )}
          {currentUser?.type === 'employer' && (
            <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 px-4 py-3 rounded-lg text-center transition-colors">
              You are logged in as an employer. Log in as a candidate to apply.
            </div>
          )}
          {!currentUser && (
            <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-lg text-center transition-colors">
              Please{' '}
              <button
                onClick={() => navigateTo('login')}
                className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                log in as a candidate
              </button>{' '}
              to apply.
            </div>
          )}
        </div>

        {/* Application Form */}
        {showApplyForm && !hasApplied && (
          <ApplicationForm job={job} onSuccess={() => setShowApplyForm(false)} />
        )}

        {/* Job Description */}
        <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert">
          <h2 className="font-bold text-gray-900 dark:text-white">Job Description</h2>
          <p className="text-gray-700 dark:text-gray-300">{job.description}</p>
          
          <h2 className="font-bold text-gray-900 dark:text-white mt-6">Requirements</h2>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            {job.requirements.map((req, index) => (
              <li key={index} className="mb-1">{req}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ApplicationForm({ job, onSuccess }) {
  const { applyForJob, currentUser } = useAppContext();
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    coverLetter: '',
    resume: null,
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful application
    applyForJob(job.id, {
      name: formData.name,
      email: formData.email,
      coverLetter: formData.coverLetter,
      resume: formData.resume?.name || 'resume.pdf' // Just storing the name
    });
    setSuccess(true);
    onSuccess(); // Hide the form
  };

  if (success) {
    return (
      <div className="bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-200 px-4 py-3 rounded-lg text-center mb-12 transition-colors">
        Your application for "{job.title}" has been successfully submitted!
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-inner mb-12 border border-gray-200 dark:border-gray-700 transition-colors">
      <h3 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-white">Apply for {job.title}</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cover Letter (Optional)</label>
          <textarea
            name="coverLetter"
            id="coverLetter"
            rows="4"
            value={formData.coverLetter}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tell us why you're a great fit..."
          ></textarea>
        </div>
        <div>
          <label htmlFor="resume" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Upload Resume</label>
          <input
            type="file"
            name="resume"
            id="resume"
            onChange={handleChange}
            required
            accept=".pdf,.doc,.docx"
            className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-800 transition-colors"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PDF, DOC, or DOCX (Max 5MB)</p>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-200"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}

function LoginPage() {
  const { login, navigateTo } = useAppContext();

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          This is a simulated login. Choose a role to continue.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => login('candidate')}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-200"
          >
            Log in as Candidate
          </button>
          <button
            onClick={() => login('employer')}
            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition duration-200"
          >
            Log in as Employer
          </button>
        </div>
      </div>
    </div>
  );
}

function CandidateDashboard() {
  const { currentUser, applications, navigateTo } = useAppContext();

  if (currentUser?.type !== 'candidate') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Access Denied</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 mb-4">You must be logged in as a candidate to view this page.</p>
        <button
          onClick={() => navigateTo('login')}
          className="mt-4 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-200"
        >
          Log In
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-200 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Welcome, {currentUser.name}!</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">My Profile</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</p>
                <p className="text-lg text-gray-900 dark:text-white">{currentUser.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                <p className="text-lg text-gray-900 dark:text-white">{currentUser.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">My Resume</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-base text-gray-900 dark:text-white">resume_alex_johnson.pdf</p>
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Applications Section */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">My Applications ({applications.length})</h2>
            <div className="space-y-6">
              {applications.length > 0 ? (
                applications.map(app => (
                  <div key={app.jobId} className="border border-gray-200 dark:border-gray-600 p-4 rounded-lg flex flex-col md:flex-row justify-between md:items-center">
                    <div>
                      <h3
                        onClick={() => navigateTo('jobDetail', { jobId: app.jobId })}
                        className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                      >
                        {app.job.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">{app.job.company}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Applied on: {app.date}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        Application Sent
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                  <p>You haven't applied for any jobs yet.</p>
                  <button
                    onClick={() => navigateTo('jobs')}
                    className="mt-4 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700"
                  >
                    Find Jobs
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmployerDashboard() {
  const { currentUser, jobs, postNewJob, navigateTo } = useAppContext();
  const [showPostForm, setShowPostForm] = useState(false);

  if (currentUser?.type !== 'employer') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Access Denied</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 mb-4">You must be logged in as an employer to view this page.</p>
        <button
          onClick={() => navigateTo('login')}
          className="mt-4 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-200"
        >
          Log In
        </button>
      </div>
    );
  }

  const myJobs = jobs.filter(job => job.employerId === currentUser.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-200 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Employer Dashboard</h1>
        <button
          onClick={() => setShowPostForm(!showPostForm)}
          className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-blue-700 transition duration-200"
        >
          {showPostForm ? 'Cancel' : 'Post a New Job'}
        </button>
      </div>

      {showPostForm && (
        <JobPostForm
          onPostJob={(jobDetails) => {
            postNewJob(jobDetails);
            setShowPostForm(false);
          }}
        />
      )}

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">My Job Postings ({myJobs.length})</h2>
        <div className="space-y-6">
          {myJobs.length > 0 ? (
            myJobs.map(job => (
              <div key={job.id} className="border border-gray-200 dark:border-gray-600 p-4 rounded-lg flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <h3
                    onClick={() => navigateTo('jobDetail', { jobId: job.id })}
                    className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    {job.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{job.location}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Posted on: {job.postedDate}</p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                    Active
                  </span>
                  <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">Edit</button>
                  <button className="text-sm font-medium text-red-600 dark:text-red-400 hover:underline">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 py-12">
              <p>You haven't posted any jobs yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function JobPostForm({ onPostJob }) {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: 'Full-time',
    description: '',
    requirements: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobDetails = {
      ...formData,
      // Convert requirements textarea to array
      requirements: formData.requirements.split('\n').filter(req => req.trim() !== ''),
    };
    onPostJob(jobDetails);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-12 transition-colors duration-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Job Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Job Type</label>
          <select
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Job Description</label>
          <textarea
            name="description"
            id="description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          ></textarea>
        </div>
        <div>
          <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Requirements</label>
          <textarea
            name="requirements"
            id="requirements"
            rows="5"
            value={formData.requirements}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter one requirement per line..."
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-400 dark:text-gray-500 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold text-white dark:text-gray-100 mb-4">Job Board</h4>
            <p className="text-sm">Find your next career opportunity.</p>
          </div>
          <div>
            <h5 className="font-semibold text-white dark:text-gray-100 mb-4">For Candidates</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white dark:hover:text-gray-300">Browse Jobs</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-300">Candidate Dashboard</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-300">Upload Resume</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white dark:text-gray-100 mb-4">For Employers</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white dark:hover:text-gray-300">Post a Job</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-300">Employer Dashboard</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-300">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white dark:text-gray-100 mb-4">Company</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white dark:hover:text-gray-300">About Us</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-300">Contact</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-300">Blog</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 dark:border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Job Board. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}