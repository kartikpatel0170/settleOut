const feedbackService = require("../services/feedback");
const util = require("../utils/messages");
const { MESSAGE } = require("../config/message");

module.exports = {
  create: async (req, res) => {
    try {
      let { agentId, userId, feedback, rating } = req.body;
      let result = await feedbackService.addfeedback(
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
      console.error("Error - feedback", error);
      return util.failureResponse(error, res);
    }
  },
  
  findAll: async (req, res) => {
    try {
      let userId = req.body.userId;
      console.log(req.body)
      let result = await feedbackService.findAll(userId);
  
        return util.successResponse(result, res);

    } catch (error) {
      console.error("Error - feedback", error);
      return util.failureFeedback(error?.data || error, res);
    }
  },
};
