const { body } = require("express-validator");
const _user = require("../../services/user");
const _company = require("../../services/company");
const _job = require("../../services/job");

exports.postValidation = [
  body("first_name")
    .exists()
    .withMessage("First Name is required")
    .bail()
    .notEmpty()
    .withMessage("First Name cannot be empty")
    .bail()
    .isLength({ min: 3 })
    .withMessage("First Name must have 3 characters min"),
  body("last_name")
    .exists()
    .withMessage("Last Name is required")
    .bail()
    .notEmpty()
    .withMessage("Last Name cannot be empty")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Last Name must have 3 characters min"),
  body("nik")
    .exists()
    .withMessage("NIK is required")
    .bail()
    .notEmpty()
    .withMessage("NIK cannot be empty")
    .bail()
    .isNumeric()
    .withMessage("NIK numeric expected")
    .bail()
    .isLength({ min: 6 })
    .withMessage("NIK must have 6 characters min")
    .bail()
    .custom(async (nik) => {
      const isExist = await _user.single({ nik });
      if (isExist) throw new Error("NIK already taken");
    }),
  body("username")
    .exists()
    .withMessage("Username is required")
    .bail()
    .notEmpty()
    .withMessage("Username cannot be empty")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Username must have 6 characters min")
    .bail()
    .custom((value) => !/\s/.test(value))
    .withMessage("No spaces are allowed in the Username")
    .bail()
    .custom(async (username) => {
      const isExist = await _user.single({ username });
      if (isExist) throw new Error("Username already taken");
    }),
  body("email")
    .exists()
    .withMessage("Email is required")
    .bail()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .bail()
    .isEmail()
    .normalizeEmail()
    .withMessage("Email is not valid")
    .bail()
    .custom(async (email) => {
      const isExist = await _user.single({ email });
      if (isExist) throw new Error("Email already taken");
    }),
  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must have 6 characters min"),
  body("phone")
    .optional()
    .notEmpty()
    .withMessage("Phone cannot be empty")
    .bail()
    .isNumeric()
    .withMessage("Phone numeric expected"),
  body("address")
    .optional()
    .notEmpty()
    .withMessage("Address cannot be empty")
    .bail()
    .withMessage("Address cannot be empty"),
];

exports.relatedCompaniesValidation = [
  body("companies")
    .exists()
    .withMessage("Companies is required")
    .bail()
    .isArray()
    .withMessage("Companies values not valid, array expected")
    .bail()
    .isNumeric()
    .withMessage(
      "Companies array value not valid, numerix expected on each index"
    )
    .bail()
    .custom(async (companies) => {
      await Promise.all(
        companies.map(async (id) => {
          if (!isNaN(id) || !["", null, undefined].includes(id)) {
            const isExist = await _company.single({ id });
            if (!isExist) throw new Error("Company not found");
          } else {
            throw new Error(
              "Companies array value not valid, numerix expected on each index"
            );
          }
        })
      );
    }),
];

exports.relatedJobsValidation = [
  body("jobs")
    .exists()
    .withMessage("Jobs is required")
    .bail()
    .isArray()
    .withMessage("Jobs values not valid, array expected")
    .bail()
    .isNumeric()
    .withMessage("Jobs array value not valid, numerix expected on each index")
    .bail()
    .custom(async (jobs) => {
      await Promise.all(
        jobs.map(async (id) => {
          if (!isNaN(id) || !["", null, undefined].includes(id)) {
            const isExist = await _job.single({ id });
            if (!isExist) throw new Error("Job not found");
          } else {
            throw new Error(
              "Jobs array value not valid, numerix expected on each index"
            );
          }
        })
      );
    }),
];
