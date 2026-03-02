const Application = require('../models/Application');
const Job = require('../models/Job');
const { successResponse, errorResponse } = require('../utils/apiResponse');

const getApplications = async (req, res, next) => {
  try {
    const applications = await Application.find()
      .populate('job_id', 'title company location category')
      .sort({ createdAt: -1 });

    return successResponse(res, applications);
  } catch (error) {
    return next(error);
  }
};

const createApplication = async (req, res, next) => {
  try {
    const { job_id } = req.validated.body;
    const job = await Job.findById(job_id);

    if (!job) {
      return errorResponse(res, 404, 'Job not found');
    }

    const application = await Application.create(req.validated.body);
    return successResponse(res, application, 'Application submitted successfully');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getApplications,
  createApplication,
};
