import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';

export default function Jobs() {
  const { jobs } = useAppContext();
  const [filteredJobs, setFilteredJobs] = useState(jobs);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-200 min-h-screen">
      <div className="mb-12">
        <SearchBar onSearch={handleFilter} />
      </div>
      
      <h1 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Showing {filteredJobs.length} Jobs
      </h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Filters</h3>
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

