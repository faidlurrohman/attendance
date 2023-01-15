const { body } = require("express-validator");
const _job = require("../../services/job");
const _company = require("../../services/company");

exports.postValidation = [
  body("name")
    .exists()
    .withMessage("Job Name is required")
    .bail()
    .notEmpty()
    .withMessage("Job Name cannot be empty")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Job Name must have 3 characters min")
    .bail()
    .custom(async (name) => {
      const isExist = await _job.single({ name });
      if (isExist) throw new Error("Job Name already taken");
    }),
];

exports.putValidation = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Job Name cannot be empty")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Job Name must have 3 characters min")
    .bail()
    .custom(async (name) => {
      const isExist = await _job.single({ name });
      if (isExist) throw new Error("Job Name already taken");
    }),
];

exports.relatedValidation = [
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
