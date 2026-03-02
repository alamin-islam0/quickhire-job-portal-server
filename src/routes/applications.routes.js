const express = require('express');
const { z } = require('zod');
const { getApplications, createApplication } = require('../controllers/applications.controller');
const validate = require('../middleware/validate');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

const createApplicationSchema = z.object({
  body: z.object({
    job_id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid job ID'),
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Email must be valid'),
    resume_link: z.string().url('Resume link must be a valid URL'),
    cover_note: z.string().min(1, 'Cover note is required'),
  }),
  params: z.any().optional(),
  query: z.any().optional(),
});

router.get('/', adminAuth, getApplications);
router.post('/', validate(createApplicationSchema), createApplication);

module.exports = router;
