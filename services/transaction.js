const Membership = require("../model/membership");
const PaymentService = require("./payment/stripe");
const service = require("../utils/dbService");
const taskService = require("./task");
const logger = require("../config/logger");

class TransactionService {
  async createMembership(userId, cardDetails, amount, membershipId, agentId) {
    try {
      // let membershipData = await Membership.findById(membershipId);
      let result = await PaymentService.chargeMembership(userId, cardDetails, amount);
      await taskService.createTask(membershipId, agentId, userId);
      return result;
    } catch (error) {
      logger.error("Error in createMembership", { userId, error });
      throw new Error("Failed to create membership.");
    }
  }
}

module.exports = new TransactionService();
