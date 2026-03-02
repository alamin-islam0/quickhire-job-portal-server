const { errorResponse } = require('../utils/apiResponse');

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query,
  });

  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));

    return errorResponse(res, 400, 'Validation failed', errors);
  }

  req.validated = result.data;
  next();
};

module.exports = validate;
