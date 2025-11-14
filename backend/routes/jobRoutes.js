const express = require('express');
const multer = require('multer');
const path = require('path');
const Job = require('../models/jobModel');
const Application = require('../models/applicationModel');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// --- Multer Setup for Resume Uploads ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/')); // Store files in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    // Create a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Allow only specific file types (pdf, doc, docx)
    const filetypes = /pdf|doc|docx/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      new Error(
        'File upload error: Only .pdf, .doc, and .docx files are allowed.'
      )
    );
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

// --- GET /api/jobs ---
// Get all job listings (public route)
router.get('/', async (req, res) => {
  try {
    // Add filtering/searching logic here later (e.g., ?keyword=React)
    const jobs = await Job.find().sort({ postedDate: -1 }); // Newest first
    res.status(200).json({
      status: 'success',
      results: jobs.length,
      data: { jobs },
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// --- GET /api/jobs/:id ---
// Get a single job by its ID (public route)
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('employer', 'name company'); // Show employer name
    if (!job) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'No job found with that ID' });
    }
    res.status(200).json({ status: 'success', data: { job } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// --- POST /api/jobs ---
// Post a new job (protected employer route)
router.post('/', protect, async (req, res) => {
  try {
    // 1) Check if user is an employer
    if (req.user.role !== 'employer') {
      return res.status(403).json({
        status: 'fail',
        message: 'Only employers can post jobs.',
      });
    }

    const {
      title,
      location,
      type,
      description,
      requirements,
      locationType,
    } = req.body;

    const newJob = await Job.create({
      title,
      company: req.user.company, // Get company from logged-in user
      location,
      type,
      description,
      requirements,
      locationType,
      employer: req.user.id, // Link to the employer
    });

    res.status(201).json({
      status: 'success',
      data: {
        job: newJob,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

// --- POST /api/jobs/:id/apply ---
// Apply for a job (protected candidate route)
router.post(
  '/:id/apply',
  protect,
  upload.single('resume'),
  async (req, res) => {
    try {
      // 1) Check if user is a candidate
      if (req.user.role !== 'candidate') {
        return res.status(403).json({
          status: 'fail',
          message: 'Only candidates can apply for jobs.',
        });
      }

      // 2) Check if resume was uploaded
      if (!req.file) {
        return res
          .status(400)
          .json({ status: 'fail', message: 'Resume file is required.' });
      }

      const { name, email, coverLetter } = req.body;
      const jobId = req.params.id;
      const candidateId = req.user.id;
      const resumePath = req.file.path; // Path to the uploaded file

      // 3) Check if job exists
      const job = await Job.findById(jobId);
      if (!job) {
        return res
          .status(404)
          .json({ status: 'fail', message: 'No job found with that ID.' });
      }

      // 4) Check if user has already applied
      const existingApplication = await Application.findOne({
        job: jobId,
        candidate: candidateId,
      });
      if (existingApplication) {
        return res
          .status(400)
          .json({ status: 'fail', message: 'You have already applied for this job.' });
      }
      
      // 5) Create new application
      const newApplication = await Application.create({
        job: jobId,
        candidate: candidateId,
        name,
        email,
        coverLetter,
        resume: resumePath,
      });

      // 6) Send Email Notification (Simulated)
      console.log(`--- New Application ---`);
      console.log(`User ${email} applied for job ${job.title}`);
      console.log(`Resume saved at: ${resumePath}`);
      console.log(`------------------------`);
      // In a real app, you would use a service like SendGrid or Nodemailer here

      res.status(201).json({
        status: 'success',
        message: 'Application submitted successfully!',
        data: {
          application: newApplication,
        },
      });
    } catch (err) {
      res.status(400).json({ status: 'fail', message: err.message });
    }
  }
);

module.exports = router;