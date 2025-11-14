import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function Register() {
  const { navigateTo, login } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'candidate',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate registration - in production, this would call an API
    console.log('Registration data:', formData);
    // For demo purposes, just log in the user
    login(formData.userType);
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Create Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="userType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              I want to
            </label>
            <select
              name="userType"
              id="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="candidate">Find Jobs</option>
              <option value="employer">Post Jobs</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{' '}
          <button
            onClick={() => navigateTo('login')}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Log in here
          </button>
        </p>
      </div>
    </div>
  );
}

