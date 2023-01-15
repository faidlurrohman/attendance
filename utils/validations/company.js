const { body } = require("express-validator");
const _company = require("../../services/company");
const _job = require("../../services/job");

exports.postValidation = [
  body("name")
    .exists()
    .withMessage("Company Name is required")
    .bail()
    .notEmpty()
    .withMessage("Company Name cannot be empty")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Company Name must have 2 characters min")
    .bail()
    .custom(async (name) => {
      const isExist = await _company.single({ name });
      if (isExist) throw new Error("Company Name already taken");
    }),
  body("phone")
    .optional()
    .isNumeric()
    .withMessage("Phone is not valid, numeric expected"),
];

exports.putValidation = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Company Name cannot be empty")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Company Name must have 2 characters min")
    .bail()
    .custom(async (name) => {
      const isExist = await _company.single({ name });
      if (isExist) throw new Error("Company Name already taken");
    }),
  body("phone")
    .optional()
    .isNumeric()
    .withMessage("Phone is not valid, numeric expected"),
];

exports.relatedValidation = [
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
