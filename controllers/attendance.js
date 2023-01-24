const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const { Company_Jobs } = require("../models");
const { onSuccess, onError, onFailed } = require("../utils/responses");
const _attendance = require("../services/attendance");

exports.getAllAttendances = async (_, res) => {
  try {
    const results = await _attendance.all();
    onSuccess(res, results);
  } catch (err) {
    onError(res, err);
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    // check data exist
    const result = await _attendance.single({ id });
    if (!result) return onError(res, { message: "Attendance not found" });

    onSuccess(res, result);
  } catch (err) {
    onError(res, err);
  }
};

exports.getAttendanceByUser = async (req, res) => {
  try {
    const { id } = req.params;

    // check data exist
    const result = await _attendance.related({ user_id: id });
    if (!result) return onError(res, { message: "Attendance not found" });

    onSuccess(res, result);
  } catch (err) {
    onError(res, err);
  }
};

exports.getAttendanceByCompany = async (req, res) => {
  try {
    const { id } = req.params;

    // check data exist
    const result = await _attendance.related({ company_id: id });
    if (!result) return onError(res, { message: "Attendance not found" });

    onSuccess(res, result);
  } catch (err) {
    onError(res, err);
  }
};

exports.getAttendanceByJob = async (req, res) => {
  try {
    const { id } = req.params;

    // check data exist
    const result = await _attendance.related({ job_id: id });
    if (!result) return onError(res, { message: "Attendance not found" });

    onSuccess(res, result);
  } catch (err) {
    onError(res, err);
  }
};

exports.addAttendance = async (req, res) => {
  try {
    // validation input
    const errors = validationResult(req);
    if (!errors.isEmpty()) return onFailed(res, errors.array());

    // check related job with company
    const { company_id, job_id } = req.body;
    const isRelated = await Company_Jobs.findOne({
      where: { [Op.and]: [{ company_id }, { job_id }] },
    });
    if (!isRelated)
      return onError(res, { message: "Selected job not related with company" });

    // do add
    await _attendance.add(req.body);
    onSuccess(res, { message: "Attendance created" });
  } catch (err) {
    onError(res, err);
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    // check data exist
    const result = await _attendance.single({ id });
    if (!result) return onError(res, { message: "Attendance not found" });

    // validation input
    const errors = validationResult(req);
    if (!errors.isEmpty()) return onFailed(res, errors.array());

    // check related job with company
    const { company_id, job_id } = req.body;
    if (company_id && job_id) {
      const isRelated = await Company_Jobs.findOne({
        where: { [Op.and]: [{ company_id }, { job_id }] },
      });
      if (!isRelated)
        return onError(res, {
          message: "Selected job not related with company",
        });
    }

    // do update
    await _attendance.update(id, data);
    onSuccess(res, { message: "Attendance updated" });
  } catch (err) {
    onError(res, err);
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    // check data exist
    const result = await _attendance.single({ id });
    if (!result) return onError(res, { message: "Attendance not found" });

    // do delete
    await _attendance.delete(id);
    onSuccess(res, { message: "Attendance deleted" });
  } catch (err) {
    onError(res, err);
  }
};
