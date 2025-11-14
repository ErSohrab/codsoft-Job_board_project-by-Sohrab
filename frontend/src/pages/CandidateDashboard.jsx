import React from 'react';
import { useAppContext } from '../context/AppContext';

export default function CandidateDashboard() {
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

