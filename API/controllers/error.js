function devError(res, err) {
  res.status(500).json({ err });
}

module.exports = (err, req, res, next) => {
  // res.status(500).json({ err });
  console.log(process.env.NODE_ENV === 'development ');
  if (process.env.NODE_ENV === 'development ') {
    devError(res, err);
  } else if (process.env.NODE_ENV === 'production ') {
    next();
  }
};
