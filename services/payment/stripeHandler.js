const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const stripeSingleton = {
  instance: null,

  async createInstance() {
    if (!this.instance) {
      this.instance = await require("stripe")(STRIPE_SECRET_KEY);
    }
    return this.instance;
  }
};

module.exports = {
  async getStripeObject() {
    try {
      const stripe = await stripeSingleton.createInstance();
      return stripe;
    } catch (error) {
      throw new Error(error);
    }
  },

  async getToken(cardDetails) {
    try {
      const instance = await stripeSingleton.createInstance();
      return await instance.tokens.create({
        card: {
          number: cardDetails.number,
          exp_month: cardDetails.exp_month,
          exp_year: cardDetails.exp_year,
          cvc: cardDetails.cvc
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }
};
