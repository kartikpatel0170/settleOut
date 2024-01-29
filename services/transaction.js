const Membership = require("../model/membership");
const PaymentService = require("./payment/stripe");
const service = require("../utils/dbService");
const taskService = require("./task");
const logger = require("../config/logger");

module.exports = {
  create: async (userId, cardDetails, amount, membershipId, agentId) => {
    try {
      // let membershipData = await Membership.findById(membershipId);
      let result = await PaymentService.chargeMembership(
        userId,
        cardDetails,
        amount
      );
      await taskService.create(membershipId, agentId, userId);
      return result;
    } catch (error) {
      logger.error("Error in createMembership", error);
      throw error;
    }
  }
};
