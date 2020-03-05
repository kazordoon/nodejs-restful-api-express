module.exports = (app) => {
  const notFound = (req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
  };

  const handleErrors = (error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
      error: {
        statusCode: res.statusCode,
        message: error.message,
        path: req.url,
      },
    });
  };

  return {
    notFound,
    handleErrors,
  };
};
