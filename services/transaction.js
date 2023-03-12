const Membership = require("../model/membership");
const PaymentService = require("./payment/stripe");
const service = require("../utils/dbService");
const taskService = require("./task");
module.exports = {
  create: async (userId, cardDetails, amount, membershipId,agentId) => {
    try {
      // let membershipData=await Membership.findById(membershipId)
      let result = await PaymentService.chargeMembership(
        userId,
        cardDetails,
        amount
      );
      await taskService.create(membershipId, agentId, userId);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};