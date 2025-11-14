const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required.'],
  },
  company: {
    type: String,
    required: [true, 'Company name is required.'],
  },
  location: {
    type: String,
    required: [true, 'Location is required.'],
  },
  locationType: {
    type: String,
    enum: ['On-site', 'Remote', 'Hybrid'],
    default: 'On-site',
  },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    default: 'Full-time',
  },
  description: {
    type: String,
    required: [true, 'Job description is required.'],
  },
  requirements: [
    {
      type: String,
    },
  ],
  postedDate: {
    type: Date,
    default: Date.now,
  },
  // Link to the employer who posted the job
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;