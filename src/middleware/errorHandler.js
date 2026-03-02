const { ZodError } = require('zod');
const mongoose = require('mongoose');
const { errorResponse } = require('../utils/apiResponse');

const errorHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    const errors = err.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));

    return errorResponse(res, 400, 'Validation failed', errors);
  }

  if (err instanceof mongoose.Error.CastError) {
    return errorResponse(res, 400, 'Invalid resource ID');
  }

  if (err.statusCode) {
    return errorResponse(res, err.statusCode, err.message, err.errors);
  }

  return errorResponse(res, 500, 'Internal server error');
};

module.exports = errorHandler;
