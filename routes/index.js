const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/user", require("./user"));
router.use("/feedback", require("./feedback"));
router.use("/membership", require("./membership"));
router.use("/task", require("./task"));

module.exports = router;