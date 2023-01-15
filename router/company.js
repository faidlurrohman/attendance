const express = require("express");
const router = express.Router();
const { id } = require("../utils/validations");
const {
  postValidation,
  putValidation,
  relatedValidation,
} = require("../utils/validations/company");
const {
  addCompany,
  updateCompany,
  deleteCompany,
  getCompany,
  getAllCompanies,
  addRelated,
  deleteRelated,
} = require("../controllers/company");

router.post("/", postValidation, addCompany);
router.put("/:id", id, putValidation, updateCompany);
router.delete("/:id", id, deleteCompany);
router.get("/:id", id, getCompany);
router.get("/", getAllCompanies);
// related
router.post("/related/:id", id, relatedValidation, addRelated);
router.delete("/related/:id", id, relatedValidation, deleteRelated);

module.exports = router;
