const express = require('express');
const { z } = require('zod');
const {
  getJobs,
  getJobById,
  createJob,
  deleteJob,
} = require('../controllers/jobs.controller');
const validate = require('../middleware/validate');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid job ID');

const getJobsSchema = z.object({
  query: z.object({
    search: z.string().optional(),
    category: z.string().optional(),
    location: z.string().optional(),
  }),
  body: z.any().optional(),
  params: z.any().optional(),
});

const getJobSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z.any().optional(),
  query: z.any().optional(),
});

const createJobSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    company: z.string().min(1, 'Company is required'),
    location: z.string().min(1, 'Location is required'),
    category: z.string().min(1, 'Category is required'),
    description: z.string().min(1, 'Description is required'),
  }),
  params: z.any().optional(),
  query: z.any().optional(),
});

router.get('/', validate(getJobsSchema), getJobs);
router.get('/:id', validate(getJobSchema), getJobById);
router.post('/', adminAuth, validate(createJobSchema), createJob);
router.delete('/:id', adminAuth, validate(getJobSchema), deleteJob);

module.exports = router;
