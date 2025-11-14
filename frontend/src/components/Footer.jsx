import React from 'react';

export default function Footer() {
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

