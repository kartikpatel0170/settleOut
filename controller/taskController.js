const taskService = require("../services/task");
const util = require("../utils/messages");
const logger = require("../config/logger");
const { MESSAGE } = require("../config/message");

module.exports = {
  async create(req, res) {
    try {
      const { membershipId, agentId, userId } = req.body;
      const result = await taskService.create(membershipId, agentId, userId);

      if (result) {
        return util.successResponse(result, res);
      } else {
        return util.failureResponse(MESSAGE.BAD_REQUEST, res);
      }
    } catch (error) {
      logger.error("Error - create task", error);
      return util.failureResponse(error, res);
    }
  },

  async findAll(req, res) {
    try {
      let { query, options } = req.body;
      query = query || {};
      options = options || {};
      const result = await taskService.findAll(query, options);

      if (result) {
        return util.successResponse(result, res);
      } else {
        return util.failureResponse(MESSAGE.BAD_REQUEST, res);
      }
    } catch (error) {
      logger.error("Error - find all tasks", error);
      return util.failureResponse(error, res);
    }
  },

  async updateTaskList(req, res) {
    try {
      const { name, taskId } = req.body;
      const result = await taskService.updateCheckBox(name, taskId);

      if (result) {
        return util.successResponse(result, res);
      } else {
        return util.failureResponse(MESSAGE.BAD_REQUEST, res);
      }
    } catch (error) {
      logger.error("Error - update task list", error);
      return util.failureResponse(error, res);
    }
  },

  async update(req, res) {
    try {
      const { taskId, ...body } = req.body;
      const result = await taskService.update(body, taskId);

      if (result) {
        return util.successResponse(result, res);
      } else {
        return util.failureResponse(MESSAGE.BAD_REQUEST, res);
      }
    } catch (error) {
      logger.error("Error - update task", error);
      return util.failureResponse(error, res);
    }
  }
};
