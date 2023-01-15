const { validationResult } = require("express-validator");
const _user = require("../services/user");
const { hash } = require("../utils/helper");
const { onSuccess, onError, onFailed } = require("../utils/responses");

exports.getAllUsers = async (_, res) => {
  try {
    const results = await _user.all();
    onSuccess(res, results);
  } catch (err) {
    onError(res, err);
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;

    // check data exist
    const result = await _user.single({ id });
    if (!result) return onError(res, { message: "User not found" });

    onSuccess(res, result);
  } catch (err) {
    onError(res, err);
  }
};

exports.addUser = async (req, res) => {
  try {
    // validation input
    const errors = validationResult(req);
    if (!errors.isEmpty()) return onFailed(res, errors.array());

    // do add
    await _user.add({ ...req.body, ...{ password: hash(req.body.password) } });
    onSuccess(res, { message: "User created" });
  } catch (err) {
    onError(res, err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    // check data exist
    const result = await _user.single({ id });
    if (!result) return onError(res, { message: "User not found" });

    // validation input
    const errors = validationResult(req);
    if (!errors.isEmpty()) return onFailed(res, errors.array());

    // do update
    await _user.update(id, data);
    onSuccess(res, { message: "User updated" });
  } catch (err) {
    onError(res, err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    // check data exist
    const result = await _user.single({ id });
    if (!result) return onError(res, { message: "User not found" });

    // do delete
    await _user.delete(id);
    onSuccess(res, { message: "User deleted" });
  } catch (err) {
    onError(res, err);
  }
};

exports.addRelated = async (req, res) => {
  try {
    if (req.url) {
      const related = req.url.split("/")[2];
      const { id } = req.params;
      // check data exist
      const result = await _user.single({ id });
      if (!result) return onError(res, { message: "User not found" });

      // validation input
      const errors = validationResult(req);
      if (!errors.isEmpty()) return onFailed(res, errors.array());

      // do add
      await _user.addRelated(related, id, req.body);
      onSuccess(res, { message: `Related ${related} created` });
    }
  } catch (err) {
    onError(res, err);
  }
};

exports.deleteRelated = async (req, res) => {
  try {
    if (req.url) {
      const related = req.url.split("/")[2];
      const { id } = req.params;
      // check data exist
      const result = await _user.single({ id });
      if (!result) return onError(res, { message: "User not found" });

      // validation input
      const errors = validationResult(req);
      if (!errors.isEmpty()) return onFailed(res, errors.array());

      // do delete
      const { companies, jobs } = req.body;

      if (companies) {
        await Promise.all(
          companies.map(async (target_id) => {
            await _user.deleteRelated(related, id, target_id);
          })
        );
      }

      if (jobs) {
        await Promise.all(
          jobs.map(async (target_id) => {
            await _user.deleteRelated(related, id, target_id);
          })
        );
      }

      onSuccess(res, { message: `Related ${related} deleted` });
    }
  } catch (err) {
    onError(res, err);
  }
};
