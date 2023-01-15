const { validationResult } = require("express-validator");
const _job = require("../services/job");
const { onSuccess, onError, onFailed } = require("../utils/responses");

exports.getAllJobs = async (_, res) => {
  try {
    const results = await _job.all();
    onSuccess(res, results);
  } catch (err) {
    onError(res, err);
  }
};

exports.getJob = async (req, res) => {
  try {
    const { id } = req.params;

    // check data exist
    const result = await _job.single({ id });
    if (!result) return onError(res, { message: "Job not found" });

    onSuccess(res, result);
  } catch (err) {
    onError(res, err);
  }
};

exports.addJob = async (req, res) => {
  try {
    // validation input
    const errors = validationResult(req);
    if (!errors.isEmpty()) return onFailed(res, errors.array());

    // do add
    await _job.add(req.body);
    onSuccess(res, { message: "Job created" });
  } catch (err) {
    onError(res, err);
  }
};

exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    // check data exist
    const result = await _job.single({ id });
    if (!result) return onError(res, { message: "Job not found" });

    // validation input
    const errors = validationResult(req);
    if (!errors.isEmpty()) return onFailed(res, errors.array());

    // do update
    await _job.update(id, data);
    onSuccess(res, { message: "Job updated" });
  } catch (err) {
    onError(res, err);
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    // check data exist
    const result = await _job.single({ id });
    if (!result) return onError(res, { message: "Job not found" });

    // do delete
    await _job.delete(id);
    onSuccess(res, { message: "Job deleted" });
  } catch (err) {
    onError(res, err);
  }
};

exports.addRelated = async (req, res) => {
  try {
    const { id } = req.params;
    // check data exist
    const result = await _job.single({ id });
    if (!result) return onError(res, { message: "Job not found" });

    // validation input
    const errors = validationResult(req);
    if (!errors.isEmpty()) return onFailed(res, errors.array());

    // do add
    await _job.addRelated(id, req.body);
    onSuccess(res, { message: "Related companies created" });
  } catch (err) {
    onError(res, err);
  }
};

exports.deleteRelated = async (req, res) => {
  try {
    const { id } = req.params;
    // check data exist
    const result = await _job.single({ id });
    if (!result) return onError(res, { message: "Job not found" });

    // validation input
    const errors = validationResult(req);
    if (!errors.isEmpty()) return onFailed(res, errors.array());

    // do delete
    const { companies } = req.body;
    if (companies) {
      await Promise.all(
        companies.map(async (company_id) => {
          await _job.deleteRelated(id, company_id);
        })
      );
    }

    onSuccess(res, { message: "Related companies deleted" });
  } catch (err) {
    onError(res, err);
  }
};
