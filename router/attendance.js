const express = require("express");
const router = express.Router();
const { id } = require("../utils/validations");
const {
  postValidation,
  putValidation,
} = require("../utils/validations/attendance");
const {
  getAttendance,
  getAttendanceByUser,
  getAttendanceByCompany,
  getAttendanceByJob,
  getAllAttendances,
  addAttendance,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendance");

router.post("/", postValidation, addAttendance);
router.put("/:id", id, putValidation, updateAttendance);
router.delete("/:id", id, deleteAttendance);
router.get("/:id", id, getAttendance);
router.get("/user/:id", id, getAttendanceByUser);
router.get("/company/:id", id, getAttendanceByCompany);
router.get("/job/:id", id, getAttendanceByJob);
router.get("/", getAllAttendances);

module.exports = router;
