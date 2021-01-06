function devError(res, err) {
  res.status(500).json({
    status: err.status,
    statusCode: err.statusCode,
    message: err.message,
  });
}

module.exports = (err, req, res, next) => {
  // res.status(500).json({ err });
  if (process.env.NODE_ENV === 'development ') {
    devError(res, err);
  } else if (process.env.NODE_ENV === 'production ') {
    next();
  }
};
