import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function ApplicationForm({ job, onSuccess }) {
  const { applyForJob, currentUser } = useAppContext();
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    coverLetter: '',
    resume: null,
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyForJob(job.id, {
      name: formData.name,
      email: formData.email,
      coverLetter: formData.coverLetter,
      resume: formData.resume?.name || 'resume.pdf'
    });
    setSuccess(true);
    onSuccess();
  };

  if (success) {
    return (
      <div className="bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-200 px-4 py-3 rounded-lg text-center mb-12 transition-colors">
        Your application for "{job.title}" has been successfully submitted!
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-inner mb-12 border border-gray-200 dark:border-gray-700 transition-colors">
      <h3 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-white">Apply for {job.title}</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cover Letter (Optional)</label>
          <textarea
            name="coverLetter"
            id="coverLetter"
            rows="4"
            value={formData.coverLetter}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tell us why you're a great fit..."
          ></textarea>
        </div>
        <div>
          <label htmlFor="resume" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Upload Resume</label>
          <input
            type="file"
            name="resume"
            id="resume"
            onChange={handleChange}
            required
            accept=".pdf,.doc,.docx"
            className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-800 transition-colors"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PDF, DOC, or DOCX (Max 5MB)</p>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-200"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}

