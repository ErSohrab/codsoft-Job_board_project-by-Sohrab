import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import ApplicationForm from '../components/ApplicationForm';
import { icons } from '../utils/icons';

export default function JobDetail({ jobId }) {
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

        {showApplyForm && !hasApplied && (
          <ApplicationForm job={job} onSuccess={() => setShowApplyForm(false)} />
        )}

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

