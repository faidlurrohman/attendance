const { validationResult } = require("express-validator");
const _company = require("../services/company");
const { onSuccess, onError, onFailed } = require("../utils/responses");

exports.getAllCompanies = async (_, res) => {
  try {
    const results = await _company.all();
    onSuccess(res, results);
  } catch (err) {
    onError(res, err);
  }
};

exports.getCompany = async (req, res) => {
  try {
    const { id } = req.params;

    // check data exist
    const result = await _company.single({ id });
    if (!result) return onError(res, { message: "Company not found" });

    onSuccess(res, result);
  } catch (err) {
    onError(res, err);
  }
};

exports.addCompany = async (req, res) => {
  try {
    // validation input
    const errors = validationResult(req);
    if (!errors.isEmpty()) return onFailed(res, errors.array());

    // do add
    await _company.add(req.body);
    onSuccess(res, { message: "Company created" });
  } catch (err) {
    onError(res, err);
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    // check data exist
    const result = await _company.single({ id });
    if (!result) return onError(res, { message: "Company not found" });

    // validation input
    const errors = validationResult(req);
    if (!errors.isEmpty()) return onFailed(res, errors.array());

    // do update
    await _company.update(id, data);
    onSuccess(res, { message: "Company updated" });
  } catch (err) {
    onError(res, err);
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    // check data exist
    const result = await _company.single({ id });
    if (!result) return onError(res, { message: "Company not found" });

    // do delete
    await _company.delete(id);
    onSuccess(res, { message: "Company deleted" });
  } catch (err) {
    onError(res, err);
  }
};

exports.addRelated = async (req, res) => {
  try {
    const { id } = req.params;
    // check data exist
    const result = await _company.single({ id });
    if (!result) return onError(res, { message: "Company not found" });

    // validation input
    const errors = validationResult(req);
    if (!errors.isEmpty()) return onFailed(res, errors.array());

    // do add
    await _company.addRelated(id, req.body);
    onSuccess(res, { message: "Related jobs created" });
  } catch (err) {
    onError(res, err);
  }
};

exports.deleteRelated = async (req, res) => {
  try {
    const { id } = req.params;
    // check data exist
    const result = await _company.single({ id });
    if (!result) return onError(res, { message: "Company not found" });

    // validation input
    const errors = validationResult(req);
    if (!errors.isEmpty()) return onFailed(res, errors.array());

    // do delete
    const { jobs } = req.body;
    if (jobs) {
      await Promise.all(
        jobs.map(async (job_id) => {
          await _company.deleteRelated(id, job_id);
        })
      );
    }

    onSuccess(res, { message: "Related jobs deleted" });
  } catch (err) {
    onError(res, err);
  }
};
