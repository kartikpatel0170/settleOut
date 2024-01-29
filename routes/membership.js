const express = require("express");
const routes = express.Router();
const membershipController = require("../controller/membershipController");

routes.post("/create", membershipController.create);
routes.post("/findAll", membershipController.findAll);

module.exports = routes;
