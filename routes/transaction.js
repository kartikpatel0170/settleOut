const express = require("express");
const routes = express.Router();
const transactionController = require("../controller/transactionController");

routes.post("/create", transactionController.create);

module.exports = routes;
