const express = require("express");
const routes = express.Router();
const userController = require("../controller/userController");

routes.get("/profile", userController.getProfile);
routes.put("/update-profile", userController.updateProfile);
routes.put("/change-password", userController.changePassword);
routes.post("/findAll", userController.findAll)

module.exports = routes;