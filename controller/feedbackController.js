const feedbackService = require("../services/feedback");
const util = require("../utils/messages");
const logger = require("../config/logger");
const { MESSAGE } = require("../config/message");

module.exports = {
  async create(req, res) {
    try {
      const { agentId, userId, feedback, rating } = req.body;
      const result = await feedbackService.addfeedback(
        agentId,
        userId,
        feedback,
        rating
      );

      if (result) {
        return util.successResponse(result, res);
      } else {
        return util.failureResponse(MESSAGE.BAD_REQUEST, res);
      }
    } catch (error) {
      logger.error("Error - create feedback", error);
      return util.failureResponse(error, res);
    }
  },

  async findAll(req, res) {
    try {
      const userId = req.body.userId;
      const result = await feedbackService.findAll(userId);

      return util.successResponse(result, res);
    } catch (error) {
      logger.error("Error - findAll feedback", error);
      return util.failureFeedback(error?.data || error, res);
    }
  }
};
