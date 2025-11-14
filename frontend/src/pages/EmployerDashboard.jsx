import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import JobForm from '../components/JobForm';

export default function EmployerDashboard() {
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
        <JobForm
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

