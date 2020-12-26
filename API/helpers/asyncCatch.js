const asyncCatch = (fx) => {
  return (req, res, next) => {
    fx(req, res, next).catch((err) => next(err));
  };
};

module.exports = asyncCatch;
