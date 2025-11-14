import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { icons } from '../utils/icons';

export default function SearchBar({ onSearch, initialKeyword = '', initialLocation = '' }) {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState(initialLocation);
  const { navigateTo } = useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ keyword, location });
    } else {
      navigateTo('jobs', { filters: { keyword, location } });
    }
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

