const express = require("express");
const routes = express.Router();
const feedbackController = require("../controller/feedbackController");

routes.put("/add-feedback", feedbackController.create);
routes.post("/getfeedback", feedbackController.findAll);

module.exports = routes;