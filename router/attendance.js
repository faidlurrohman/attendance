const express = require("express");
const router = express.Router();
const { id } = require("../utils/validations");
const {
  postValidation,
  putValidation,
} = require("../utils/validations/attendance");
const {
  getAttendance,
  getAllAttendances,
  addAttendance,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendance");

router.post("/", postValidation, addAttendance);
router.put("/:id", id, putValidation, updateAttendance);
router.delete("/:id", id, deleteAttendance);
router.get("/:id", id, getAttendance);
router.get("/", getAllAttendances);

module.exports = router;
