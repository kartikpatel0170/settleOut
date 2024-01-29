const express = require("express");
const routes = express.Router();
const taskController = require("../controller/taskController");

routes.post("/create", taskController.create);
routes.post("/findAll", taskController.findAll);
routes.patch("/updateTaskList", taskController.updateTaskList);
routes.put("/update", taskController.update);

module.exports = routes;
