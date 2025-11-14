import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { icons } from '../utils/icons';

export default function Header({ isMenuOpen, setIsMenuOpen }) {
  const { currentUser, logout, navigateTo } = useAppContext();
  const { theme, toggleTheme } = useTheme();

  const navItemClasses = "cursor-pointer px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-blue-400";
  const mobileNavItemClasses = "cursor-pointer block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-blue-400";

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md fixed w-full z-50 top-0 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
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

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
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
                    onClick={() => navigateTo('login')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-200"
                  >
                    Post A Job
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-3">
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
                  onClick={() => navigateTo('login')}
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

