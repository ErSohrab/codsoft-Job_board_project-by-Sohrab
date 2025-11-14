const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Application = require('../models/applicationModel');
const Job = require('../models/jobModel');

const router = express.Router();

// --- GET /api/dashboard/candidate ---
// Get all applications for the logged-in candidate
router.get('/candidate', protect, async (req, res) => {
  try {
    if (req.user.role !== 'candidate') {
      return res.status(403).json({
        status: 'fail',
        message: 'Access denied. Candidate only.',
      });
    }

    const applications = await Application.find({
      candidate: req.user.id,
    }).populate({
      path: 'job', // Populate the 'job' field
      select: 'title company location', // Select only these fields from the Job model
    });

    res.status(200).json({
      status: 'success',
      results: applications.length,
      data: {
        applications,
      },
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// --- GET /api/dashboard/employer ---
// Get all jobs posted by the logged-in employer
router.get('/employer', protect, async (req, res) => {
  try {
    if (req.user.role !== 'employer') {
      return res.status(403).json({
        status: 'fail',
        message: 'Access denied. Employer only.',
      });
    }

    const jobs = await Job.find({ employer: req.user.id }).sort({
      postedDate: -1,
    });
    
    // You could also fetch applications for your jobs here
    // const jobIds = jobs.map(job => job._id);
    // const applications = await Application.find({ job: { $in: jobIds } });

    res.status(200).json({
      status: 'success',
      results: jobs.length,
      data: {
        jobs,
      },
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

module.exports = router;