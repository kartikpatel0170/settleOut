const StripeHandler = require("./stripeHandler");
const User = require("../../model/user");
const logger = require("../../config/logger");

module.exports = {
  async createCustomer(userId, email) {
    try {
      const stripeObj = await StripeHandler.getStripeObject();
      const customer = await stripeObj.customers.create({
        email: email
      });

      await User.updateOne(
        {
          _id: userId
        },
        {
          stripeCustomerId: customer.id
        }
      );

      return true;
    } catch (error) {
      logger.error("Error - createCustomer", error);
      throw new Error(error);
    }
  },

  async addCardToCustomer(customerId, cardDetails) {
    try {
      const stripeObj = await StripeHandler.getStripeObject();
      const cardToken = await StripeHandler.getToken(cardDetails);

      return await stripeObj.customers.createSource(customerId, {
        source: cardToken.id
      });
    } catch (error) {
      logger.error("Error - addCardToCustomer", error);
      throw new Error(error);
    }
  },

  /* eslint-disable */
  async chargeMembership(userId, cardDetails, amount) {
    try {
      const user = await User.findOne({ _id: userId });
      const cardId = await this.addCardToCustomer(
        user.stripeCustomerId,
        cardDetails
      );
      const stripeObj = await StripeHandler.getStripeObject();
      const chargeObj = await stripeObj.charges.create({
        amount: amount,
        currency: "cad",
        customer: user.stripeCustomerId,
        card: cardId.id
      });
      return chargeObj;
    } catch (error) {
      logger.error("Error - chargeMembership", error);
      throw error;
    }
  }
};
