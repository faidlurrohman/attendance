exports.onSuccess = (res, data = [], code = 200, rest = {}) => {
  return res.status(code).json({
    code,
    status: "success",
    data,
    ...rest,
  });
};

exports.onError = (res, err, code = 400) => {
  return res.status(code).json({
    code,
    status: "error",
    message: err.message,
  });
};

exports.onFailed = (res, errors, code = 403) => {
  const message = errors[0].msg;

  return res.status(code).json({
    code,
    status: "failed",
    message,
    errors,
  });
};
