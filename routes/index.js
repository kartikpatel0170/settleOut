const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/user", require("./user"));
router.use("/membership", require("./membership"));
router.use("/transaction", require("./transaction"));
router.use("/task", require("./task"));
router.use("/feedback", require("./feedback"));

module.exports = router;