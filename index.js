require("pg");
require("dotenv").config();
const express = require("express");
const app = express();
const route = require("./router");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 9000;

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use(cookieParser());
app.use("/v1", route);
app.listen(PORT, () => console.log(`server is running at PORT ${PORT}`));
