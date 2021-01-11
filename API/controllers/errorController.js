const APIError = require('../helpers/apiError');

function devError(res, err) {
  res.status(err.statusCode).json({
    status: err.status,
    name: err.name,
    message: err.message,
    stack: err.stack,
  });
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fault';

  // res.status(500).json({ err });
  if (process.env.NODE_ENV === 'development ') {
    devError(res, err);
  } else if (process.env.NODE_ENV === 'production ') {
    next();
  }
};
