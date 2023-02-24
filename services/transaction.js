const Membership = require("../model/membership");
const PaymentService = require("./payment/stripe");

module.exports = {
  create: async (userId,cardDetails,amount) => {
    try {
      let result = await PaymentService.chargeMembership(userId,cardDetails,amount)
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};
