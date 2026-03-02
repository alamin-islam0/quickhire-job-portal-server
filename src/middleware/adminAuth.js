const env = require('../config/env');
const { errorResponse } = require('../utils/apiResponse');

const adminAuth = (req, res, next) => {
  const token = req.headers['x-admin-token'];

  if (!token || token !== env.ADMIN_TOKEN) {
    return errorResponse(res, 401, 'Unauthorized: invalid admin token');
  }

  next();
};

module.exports = adminAuth;
