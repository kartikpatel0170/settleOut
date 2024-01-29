const transactionService = require("../services/transaction");
const util = require("../utils/messages");
const logger = require("../config/logger");
const { MESSAGE } = require("../config/message");

module.exports = {
  async create(req, res) {
    try {
      const { userId, cardDetails, amount, membershipId, agentId } = req.body;
      const result = await transactionService.create(
        userId,
        cardDetails,
        amount,
        membershipId,
        agentId
      );

      if (result) {
        return util.successResponse(result, res);
      } else {
        return util.failureResponse(MESSAGE.BAD_REQUEST, res);
      }
    } catch (error) {
      logger.error("Error - create transaction", error);
      return util.failureResponse(error, res);
    }
  }
};
