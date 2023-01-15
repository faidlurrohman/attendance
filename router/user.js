const express = require("express");
const router = express.Router();
const { id } = require("../utils/validations");
const {
  postValidation,
  relatedJobsValidation,
  relatedCompaniesValidation,
} = require("../utils/validations/user");
const {
  addUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  addRelated,
  deleteRelated,
} = require("../controllers/user");

router.post("/", postValidation, addUser);
router.put("/:id", id, updateUser);
router.delete("/:id", id, deleteUser);
router.get("/:id", id, getUser);
router.get("/", getAllUsers);
// related
router.post(
  "/related/companies/:id",
  id,
  relatedCompaniesValidation,
  addRelated
);
router.delete(
  "/related/companies/:id",
  id,
  relatedCompaniesValidation,
  deleteRelated
);
router.post("/related/jobs/:id", id, relatedJobsValidation, addRelated);
router.delete("/related/jobs/:id", id, relatedJobsValidation, deleteRelated);

module.exports = router;
