const StripeHandler = require(`./stripeHandler`);
const User = require(`../../model/user`);

module.exports = {
  async createCustomer(userId, email) {
    try {
      let stripeObj = await StripeHandler.getStripeObject();
      let customer = await stripeObj.customers.create({
        email: email,
      });

      await User.updateOne(
        {
          _id: userId,
        },
        {
          stripeCustomerId: customer.id,
        }
      );

      return true;
    } catch (error) {
      console.error("Error -createCustomer", error);
      throw new Error(error);
    }
  },

  async addCardToCustomer(customerId, cardDetails) {
    try {
      let stripeObj = await StripeHandler.getStripeObject();
      let cardToken = await StripeHandler.getToken(cardDetails);
      
      return await stripeObj.customers.createSource(customerId, {
        source: cardToken.id,
      });
    } catch (error) {
      console.error("Error- addCardTOCustomer", error);
      throw new Error(error);
    }
  },

  async chargeMembership(userId, cardDetails, amount) {
    try {
      const user = await User.findOne({ _id: userId });
      let cardId = await this.addCardToCustomer(user.stripeCustomerId, cardDetails);
      let stripeObj = await StripeHandler.getStripeObject();
      let chargeObj = await stripeObj.charges.create({
        amount: amount,
        currency: "cad",
        customer: user.stripeCustomerId,
        card: cardId.id,
      });
      return chargeObj;
    } catch (e) {
      throw e;
    }
  },
};
