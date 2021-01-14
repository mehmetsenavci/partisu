const devError = (res, err) => {
  res.status(err.statusCode).json({
    status: err.status,
    name: err.name,
    message: err.message,
    stack: err.stack,
  });
};

const prodError = (res, err) => {
  if (err.statusCode === 500) {
    res.status(err.statusCode).json({
      status: err.status,
      message: 'Something unexpected happend.',
    });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      name: err.name,
      message: err.message,
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fault';

  if (process.env.NODE_ENV === 'development ') {
    devError(res, err);
  } else if (process.env.NODE_ENV === 'production ') {
    prodError(res, err);
  }
};
