const successResponse = (res, data, message = '') => {
  const payload = { success: true, data };

  if (message) {
    payload.message = message;
  }

  return res.json(payload);
};

const errorResponse = (res, statusCode, message, errors) => {
  const payload = { success: false, message };

  if (errors) {
    payload.errors = errors;
  }

  return res.status(statusCode).json(payload);
};

module.exports = {
  successResponse,
  errorResponse,
};
