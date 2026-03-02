const Job = require('../models/Job');
const { successResponse, errorResponse } = require('../utils/apiResponse');

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const buildJobsQuery = ({ search, category, location }) => {
  const query = {};

  if (search) {
    const regex = new RegExp(escapeRegex(search), 'i');
    query.$or = [{ title: regex }, { company: regex }];
  }

  if (category) {
    query.category = new RegExp(`^${escapeRegex(category)}$`, 'i');
  }

  if (location) {
    query.location = new RegExp(`^${escapeRegex(location)}$`, 'i');
  }

  return query;
};

const getJobs = async (req, res, next) => {
  try {
    const { search = '', category = '', location = '' } = req.validated.query;
    const jobs = await Job.find(buildJobsQuery({ search, category, location })).sort({ createdAt: -1 });

    return successResponse(res, jobs);
  } catch (error) {
    return next(error);
  }
};

const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.validated.params.id);

    if (!job) {
      return errorResponse(res, 404, 'Job not found');
    }

    return successResponse(res, job);
  } catch (error) {
    return next(error);
  }
};

const createJob = async (req, res, next) => {
  try {
    const job = await Job.create(req.validated.body);
    return successResponse(res, job, 'Job created successfully');
  } catch (error) {
    return next(error);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.validated.params.id);

    if (!job) {
      return errorResponse(res, 404, 'Job not found');
    }

    return successResponse(res, job, 'Job deleted successfully');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  deleteJob,
};
