const { body } = require("express-validator");
const _user = require("../../services/user");
const _job = require("../../services/job");
const _company = require("../../services/company");

exports.postValidation = [
  body("user_id")
    .exists()
    .withMessage("User ID is required")
    .bail()
    .notEmpty()
    .withMessage("User ID cannot be empty")
    .bail()
    .isNumeric()
    .withMessage("User ID is not valid, numeric expected")
    .bail()
    .custom(async (user_id) => {
      const isExist = await _user.single({ id: user_id });
      if (!isExist) throw new Error("User not found");
    }),
  body("company_id")
    .exists()
    .withMessage("Company ID is required")
    .bail()
    .notEmpty()
    .withMessage("Company ID cannot be empty")
    .bail()
    .isNumeric()
    .withMessage("Company ID is not valid, numeric expected")
    .bail()
    .custom(async (company_id) => {
      const isExist = await _company.single({ id: company_id });
      if (!isExist) throw new Error("Company not found");
    }),
  body("job_id")
    .exists()
    .withMessage("Job ID is required")
    .bail()
    .notEmpty()
    .withMessage("Job ID cannot be empty")
    .bail()
    .isNumeric()
    .withMessage("Job ID is not valid, numeric expected")
    .bail()
    .custom(async (job_id) => {
      const isExist = await _job.single({ id: job_id });
      if (!isExist) throw new Error("Job not found");
    }),
  body("attendance_in")
    .exists()
    .withMessage("Attendance In is required")
    .bail()
    .notEmpty()
    .withMessage("Attendance In cannot be empty"),
  body("attendance_out")
    .optional()
    .notEmpty()
    .withMessage("Attendance Out cannot be empty"),
  body("latitude")
    .optional()
    .notEmpty()
    .withMessage("Latitude cannot be empty")
    .bail()
    .isFloat()
    .withMessage("Phone is not valid, float value expected"),
  body("longitude")
    .optional()
    .notEmpty()
    .withMessage("Longitude cannot be empty")
    .bail()
    .isFloat()
    .withMessage("Phone is not valid, float value expected"),
];

exports.putValidation = [
  body("user_id")
    .optional()
    .notEmpty()
    .withMessage("User ID cannot be empty")
    .bail()
    .isNumeric()
    .withMessage("User ID is not valid, numeric expected")
    .bail()
    .custom(async (user_id) => {
      const isExist = await _user.single({ id: user_id });
      if (!isExist) throw new Error("User not found");
    }),
  body("company_id")
    .optional()
    .notEmpty()
    .withMessage("Company ID cannot be empty")
    .bail()
    .isNumeric()
    .withMessage("Company ID is not valid, numeric expected")
    .bail()
    .custom(async (company_id) => {
      const isExist = await _company.single({ id: company_id });
      if (!isExist) throw new Error("Company not found");
    }),
  body("job_id")
    .optional()
    .notEmpty()
    .withMessage("Job ID cannot be empty")
    .bail()
    .isNumeric()
    .withMessage("Job ID is not valid, numeric expected")
    .bail()
    .custom(async (job_id) => {
      const isExist = await _job.single({ id: job_id });
      if (!isExist) throw new Error("Job not found");
    }),
  body("attendance_in")
    .optional()
    .notEmpty()
    .withMessage("Attendance In cannot be empty"),
  body("attendance_out")
    .optional()
    .notEmpty()
    .withMessage("Attendance Out cannot be empty"),
  body("latitude")
    .optional()
    .notEmpty()
    .withMessage("Latitude cannot be empty")
    .bail()
    .isFloat()
    .withMessage("Phone is not valid, float value expected"),
  body("longitude")
    .optional()
    .notEmpty()
    .withMessage("Longitude cannot be empty")
    .bail()
    .isFloat()
    .withMessage("Phone is not valid, float value expected"),
];
