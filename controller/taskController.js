const taskService = require("../services/task");
const util = require("../utils/messages");
const { MESSAGE } = require("../config/message");

module.exports = {
  create: async (req, res) => {
    try {
        let {membershipId,agentId,userId}=req.body
      let result = await taskService.create(membershipId,agentId,userId);

      if (result) {
        return util.successResponse(result, res);
      } else {
        return util.failureResponse(MESSAGE.BAD_REQUEST, res);
      }
    } catch (error) {
      console.error("Error - login", error);
      return util.failureResponse(error, res);
    }
  },
  findAll: async (req, res) => {
    try {
        let { query, options } = req.body;
        if (!query) {
          query = {};
        }
        if (!options) {
          options = {};
        }
      let result = await taskService.findAll(query, options );
      
      if (result) {
        return util.successResponse(result, res);
      } else {
        return util.failureResponse(MESSAGE.BAD_REQUEST, res);
      }
    } catch (error) {
      console.error("Error - login", error);
      return util.failureResponse(error, res);
    }
  },
  updateTaskList: async (req, res) => {
    try {
        let {name, taskId}=req.body
      let result = await taskService.updateCheckBox(name, taskId)
      
      if (result) {
        return util.successResponse(result, res);
      } else {
        return util.failureResponse(MESSAGE.BAD_REQUEST, res);
      }
    } catch (error) {
      console.error("Error - login", error);
      return util.failureResponse(error, res);
    }
  },
  update: async (req, res) => {
    try {
        let { taskId,...body}=req.body
      let result = await taskService.update(body, taskId)
      
      if (result) {
        return util.successResponse(result, res);
      } else {
        return util.failureResponse(MESSAGE.BAD_REQUEST, res);
      }
    } catch (error) {
      console.error("Error - login", error);
      return util.failureResponse(error, res);
    }
  },
};
