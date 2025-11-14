import React from 'react';
import { useAppContext } from '../context/AppContext';

export default function Login() {
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
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Don't have an account?{' '}
          <button
            onClick={() => navigateTo('register')}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}

