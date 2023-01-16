const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const _user = require("../services/user");
const { isValidPassword } = require("../utils/helper");
const { onError, onSuccess } = require("../utils/responses");

exports.login = async (req, res, next) => {
  try {
    const { username: unique, password } = req.body;
    const user = await _user.single({
      [Op.or]: [
        { username: unique },
        { email: unique },
        { nik: isNaN(unique) ? 0 : unique },
      ],
    });
    if (!user) return onError(res, { message: "User not found" });

    const isMatch = await isValidPassword(password, user.password);
    if (!isMatch) return onError(res, { message: "Wrong Password" });

    const token = jwt.sign({ id: user.id, unique }, process.env.SECRET_KEY, {
      expiresIn: 1 * 24 * 60 * 60 * 1000,
    });
    res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

    onSuccess(res, { ...user, token: token });
  } catch (err) {
    onError(res, err);
  }
};

exports.validateToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if ([null, undefined, ""].includes(authorization)) {
      return onFailed(
        res,
        {
          message:
            "Please login before continue eating some hamburger, cheers!!!",
        },
        401
      );
    }

    await jwt.verify(authorization.split(" ").pop(), process.env.SECRET_KEY);
    next();
  } catch (err) {
    onError(res, err);
  }
};
