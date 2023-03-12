// 2 common cases

exports.get404 = (req, res, next) => {
  const error = new Error("Not found.");
  error.statusCode = 404;
  next(error);
};

//final error handling
exports.get500 = (error, req, res, next) => {
  const data = error.data;
  res.status(error.statusCode || 500);
  res.json({
    error: {
      message: error.message,
      data: data,
    },
  });
};
