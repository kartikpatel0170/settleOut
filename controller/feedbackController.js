const feedbackService = require("../services/feedback");
const util = require("../utils/messages");
const logger = require("../config/logger");
const { MESSAGE } = require("../config/message");

module.exports = {
  async create(req, res) {
    try {
      const { agentId, userId, feedback, rating } = req.body;

      // Input validation
      if (!agentId || !userId || !feedback || !rating) {
        return util.failureResponse(MESSAGE.BAD_REQUEST, res, 400);
      }

      const result = await feedbackService.addfeedback(agentId, userId, feedback, rating);
      await util.successResponse(result, res);
    } catch (error) {
      logger.error("Error - create feedback", error);
      await util.failureResponse(error?.data || error, res);
    }
  },

  async findAll(req, res) {
    try {
      const userId = req.body.userId;

      // Input validation
      if (!userId) {
        return util.failureResponse(MESSAGE.BAD_REQUEST, res, 400);
      }

      const result = await feedbackService.findAllFeedback(userId);
      await util.successResponse(result, res);
    } catch (error) {
      logger.error("Error - findAll feedback", error);
      await util.failureFeedback(error?.data || error, res);
    }
  }
};
