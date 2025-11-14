import React from 'react';
import { useAppContext } from '../context/AppContext';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';

export default function Home() {
  const { jobs, navigateTo, currentUser } = useAppContext();
  const featuredJobs = jobs.slice(0, 4);

  return (
    <div>
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

      <div className="relative -mt-16 z-10">
        <SearchBar />
      </div>

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

