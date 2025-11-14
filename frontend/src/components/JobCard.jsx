import React from 'react';
import { useAppContext } from '../context/AppContext';
import { icons } from '../utils/icons';

export default function JobCard({ job }) {
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

