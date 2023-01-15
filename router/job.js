const express = require("express");
const router = express.Router();
const { id } = require("../utils/validations");
const {
  postValidation,
  putValidation,
  relatedValidation,
} = require("../utils/validations/job");
const {
  addJob,
  updateJob,
  deleteJob,
  getJob,
  getAllJobs,
  addRelated,
  deleteRelated,
} = require("../controllers/job");

router.post("/", postValidation, addJob);
router.put("/:id", id, putValidation, updateJob);
router.delete("/:id", id, deleteJob);
router.get("/:id", id, getJob);
router.get("/", getAllJobs);
// related
router.post("/related/:id", id, relatedValidation, addRelated);
router.delete("/related/:id", id, relatedValidation, deleteRelated);

module.exports = router;
