const express = require("express");
const router = express.Router();

const { validateToken } = require("../controllers/auth");
const { onSuccess } = require("../utils/responses");

const _authRouter = require("./auth");
const _userRouter = require("./user");
const _jobRouter = require("./job");
const _companyRouter = require("./company");
const _attendanceRouter = require("./attendance");

// _
router.get("/", (_, response) =>
  onSuccess(response, { message: "eating hamburger!" })
);

router.use(`/auth`, _authRouter);
router.use(`/${process.env.URL}/user`, validateToken, _userRouter);
router.use(`/${process.env.URL}/job`, validateToken, _jobRouter);
router.use(`/${process.env.URL}/company`, validateToken, _companyRouter);
router.use(`/${process.env.URL}/attendance`, validateToken, _attendanceRouter);

module.exports = router;
