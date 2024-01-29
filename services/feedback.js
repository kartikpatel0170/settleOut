const User = require("../model/user");
const service = require("../utils/dbService");
const logger = require("../config/logger");

module.exports = {
  addFeedback: async (agentId, userId, feedback, rating) => {
    try {
      const result = await User.findOneAndUpdate(
        { _id: agentId },
        {
          $push: {
            feedback: {
              userId: userId,
              feedback: feedback,
              date: new Date()
            }
          },
          $set: { ratings: rating }
        },
        { new: true }
      );
      return result;
    } catch (error) {
      logger.error("Error in addFeedback", error);
      throw error;
    }
  },

  findAll: async (userId) => {
    try {
      const user = await service.getSingleDocumentById(User, userId);
      if (!user) {
        return "There is no data";
      }
      return user.feedback;
    } catch (error) {
      logger.error("Error in findAllFeedback", error);
      throw error;
    }
  }
};
