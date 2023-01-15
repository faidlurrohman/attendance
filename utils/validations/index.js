const { onError } = require("../responses");

exports.id = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return onError(res, { message: "Numeric ID expected" }, 200);
    }
    next();
  } catch (err) {
    next(err);
  }
};
